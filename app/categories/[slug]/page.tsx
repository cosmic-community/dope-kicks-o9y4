// app/categories/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategory, getMetafieldValue } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found — Dope Kicks' };
  }

  const name = getMetafieldValue(category.metadata?.name) || category.title;

  return {
    title: `${name} — Dope Kicks`,
    description: getMetafieldValue(category.metadata?.description) || `Browse ${name} at Dope Kicks.`,
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);

  const name = getMetafieldValue(category.metadata?.name) || category.title;
  const description = getMetafieldValue(category.metadata?.description);
  const imageUrl = category.metadata?.image?.imgix_url;

  return (
    <div className="py-12 sm:py-16">
      <div className="container-main">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-surface-400">
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/categories" className="transition-colors hover:text-white">Categories</Link>
          <span>/</span>
          <span className="text-surface-300">{name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-10 overflow-hidden rounded-2xl border border-surface-800 bg-surface-900">
          <div className="relative">
            {imageUrl ? (
              <div className="relative h-48 sm:h-64">
                <img
                  src={`${imageUrl}?w=1400&h=500&fit=crop&auto=format,compress`}
                  alt={name}
                  width={1400}
                  height={500}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/50 to-transparent" />
              </div>
            ) : (
              <div className="h-32 bg-gradient-to-br from-brand-600/20 to-brand-900/20" />
            )}
            <div className={`${imageUrl ? 'absolute bottom-0 left-0 right-0' : ''} p-6 sm:p-8`}>
              <h1 className="text-2xl font-extrabold text-white sm:text-3xl">{name}</h1>
              {description && (
                <p className="mt-2 max-w-2xl text-surface-300 leading-relaxed">{description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-surface-400">
              {products.length} product{products.length !== 1 ? 's' : ''} in this category
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-surface-800 bg-surface-900 py-20">
            <span className="text-5xl">👟</span>
            <h3 className="mt-4 text-lg font-semibold text-white">No products in this category</h3>
            <p className="mt-2 text-sm text-surface-400">
              Check back soon for new additions.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-brand-600"
            >
              Browse all products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}