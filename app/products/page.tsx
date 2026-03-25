import type { Metadata } from 'next';
import { getProducts, getCategories } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'All Products — Dope Kicks',
  description: 'Browse our full collection of sneakers and collectibles.',
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="py-12 sm:py-16">
      <div className="container-main">
        {/* Header */}
        <div className="mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-400">Collection</span>
          <h1 className="heading-section mt-1 text-white">All Products</h1>
          <p className="mt-3 max-w-2xl text-surface-400 leading-relaxed">
            Browse our full catalog of sneakers and collectibles. Every pair is hand-picked for the culture.
          </p>
        </div>

        {/* Category Quick Links */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="rounded-full border border-surface-700 bg-surface-800/50 px-4 py-2 text-sm font-medium text-surface-300 transition-colors hover:border-brand-500/50 hover:bg-brand-500/10 hover:text-brand-400"
              >
                {category.metadata?.name || category.title}
              </Link>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-surface-800 bg-surface-900 py-20">
            <span className="text-5xl">👟</span>
            <h3 className="mt-4 text-lg font-semibold text-white">No products yet</h3>
            <p className="mt-2 text-sm text-surface-400">
              Check back soon for fresh drops.
            </p>
          </div>
        )}

        {/* Product Count */}
        {products.length > 0 && (
          <p className="mt-8 text-center text-sm text-surface-500">
            Showing {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}