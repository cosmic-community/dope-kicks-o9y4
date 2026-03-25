// app/products/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getReviewsByProduct, getMetafieldValue } from '@/lib/cosmic';
import ReviewCard from '@/components/ReviewCard';
import { getNumericMetafieldValue } from '@/lib/cosmic';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found — Dope Kicks' };
  }

  return {
    title: `${product.title} — Dope Kicks`,
    description: getMetafieldValue(product.metadata?.description) || `Check out ${product.title} at Dope Kicks.`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProduct(product.id);

  const description = getMetafieldValue(product.metadata?.description);
  const price = product.metadata?.price;
  const salePrice = product.metadata?.sale_price;
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
  const mainImage = product.metadata?.product_image;
  const gallery = product.metadata?.gallery;
  const category = product.metadata?.category;
  const hasSale = salePrice && price && salePrice < price;

  function getInventoryInfo(status: string): { label: string; color: string } {
    const normalized = status.toLowerCase();
    if (normalized.includes('out')) {
      return { label: 'Out of Stock', color: 'text-red-400' };
    }
    if (normalized.includes('low')) {
      return { label: 'Low Stock', color: 'text-yellow-400' };
    }
    return { label: 'In Stock', color: 'text-emerald-400' };
  }

  const inventory = inventoryStatus ? getInventoryInfo(inventoryStatus) : null;

  // Calculate average rating
  let avgRating = 0;
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, r) => sum + getNumericMetafieldValue(r.metadata?.rating), 0);
    avgRating = totalRating / reviews.length;
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="container-main">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-surface-400">
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/products" className="transition-colors hover:text-white">Products</Link>
          <span>/</span>
          <span className="text-surface-300">{product.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="overflow-hidden rounded-2xl border border-surface-800 bg-surface-900">
              {mainImage?.imgix_url ? (
                <img
                  src={`${mainImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center">
                  <span className="text-8xl">👟</span>
                </div>
              )}
            </div>

            {/* Gallery */}
            {gallery && gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((image, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-surface-800 bg-surface-900"
                  >
                    <img
                      src={`${image.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                      alt={`${product.title} gallery ${index + 1}`}
                      width={150}
                      height={150}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category */}
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="mb-2 inline-flex w-fit items-center rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-400 transition-colors hover:bg-brand-500/20"
              >
                {category.metadata?.name || category.title}
              </Link>
            )}

            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{product.title}</h1>

            {/* Rating Summary */}
            {reviews.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(avgRating) ? 'text-yellow-400' : 'text-surface-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-surface-400">
                  {avgRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              {hasSale ? (
                <>
                  <span className="text-3xl font-extrabold text-brand-400">${salePrice.toFixed(2)}</span>
                  <span className="text-lg text-surface-500 line-through">${price.toFixed(2)}</span>
                  <span className="rounded-full bg-brand-500 px-2.5 py-0.5 text-xs font-bold text-white">
                    {Math.round(((price - salePrice) / price) * 100)}% OFF
                  </span>
                </>
              ) : price ? (
                <span className="text-3xl font-extrabold text-white">${price.toFixed(2)}</span>
              ) : (
                <span className="text-lg text-surface-500">Price TBD</span>
              )}
            </div>

            {/* Inventory Status */}
            {inventory && (
              <div className="mt-4 flex items-center gap-2">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    inventory.label === 'In Stock'
                      ? 'bg-emerald-400'
                      : inventory.label === 'Low Stock'
                        ? 'bg-yellow-400'
                        : 'bg-red-400'
                  }`}
                />
                <span className={`text-sm font-medium ${inventory.color}`}>
                  {inventory.label}
                </span>
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="mt-8 border-t border-surface-800 pt-8">
                <h2 className="text-lg font-bold text-white">Description</h2>
                <div
                  className="mt-3 text-sm text-surface-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16 border-t border-surface-800 pt-12">
          <h2 className="heading-section text-white">
            Customer Reviews
            {reviews.length > 0 && (
              <span className="ml-2 text-lg font-normal text-surface-500">({reviews.length})</span>
            )}
          </h2>

          {reviews.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showProduct={false} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-surface-800 bg-surface-900 py-12 text-center">
              <span className="text-4xl">⭐</span>
              <p className="mt-3 text-surface-400">No reviews yet for this product.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}