import Link from 'next/link';
import { getProducts, getCategories, getReviews } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import ReviewCard from '@/components/ReviewCard';

export const revalidate = 60;

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews(),
  ]);

  const featuredProducts = products.slice(0, 4);
  const latestReviews = reviews.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-950 py-20 sm:py-28 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/20 via-surface-950 to-surface-950" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-brand-600/10 blur-3xl" />

        <div className="container-main relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-400">
              <span>🔥</span>
              <span>Fresh drops for sneakerheads</span>
            </div>

            <h1 className="heading-display text-white">
              Step Into the
              <span className="block bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                Culture
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-surface-400 leading-relaxed">
              A place for sneakerheads. Dope Kicks offers premium sneakers and collectibles for those who live and breathe the culture.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-brand-500/25 transition-all duration-200 hover:bg-brand-600 hover:shadow-brand-500/40"
              >
                Shop Now
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 rounded-xl border border-surface-700 px-8 py-3.5 text-base font-bold text-white transition-all duration-200 hover:border-surface-600 hover:bg-surface-800"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="container-main">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-brand-400">Featured</span>
                <h2 className="heading-section mt-1 text-white">Hot Picks 🔥</h2>
              </div>
              <Link
                href="/products"
                className="hidden items-center gap-1 text-sm font-medium text-brand-400 transition-colors hover:text-brand-300 sm:flex"
              >
                View all
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-400 transition-colors hover:text-brand-300"
              >
                View all products
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="border-t border-surface-800 bg-surface-900/50 py-16 sm:py-24">
          <div className="container-main">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-400">Collections</span>
              <h2 className="heading-section mt-1 text-white">Shop by Category</h2>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      {latestReviews.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="container-main">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-brand-400">Social Proof</span>
                <h2 className="heading-section mt-1 text-white">What the Culture Says ⭐</h2>
              </div>
              <Link
                href="/reviews"
                className="hidden items-center gap-1 text-sm font-medium text-brand-400 transition-colors hover:text-brand-300 sm:flex"
              >
                All reviews
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t border-surface-800 bg-gradient-to-br from-brand-950 via-surface-900 to-surface-950 py-16 sm:py-24">
        <div className="container-main text-center">
          <h2 className="heading-section text-white">Ready to Level Up Your Collection?</h2>
          <p className="mx-auto mt-4 max-w-lg text-surface-400 leading-relaxed">
            Explore our full catalog of sneakers and collectibles. New drops every week.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-brand-500/25 transition-all duration-200 hover:bg-brand-600 hover:shadow-brand-500/40"
          >
            Explore All Products
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}