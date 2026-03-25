import type { Metadata } from 'next';
import { getCategories } from '@/lib/cosmic';
import CategoryCard from '@/components/CategoryCard';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Categories — Dope Kicks',
  description: 'Browse sneaker and collectible categories at Dope Kicks.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="py-12 sm:py-16">
      <div className="container-main">
        {/* Header */}
        <div className="mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-400">Collections</span>
          <h1 className="heading-section mt-1 text-white">All Categories</h1>
          <p className="mt-3 max-w-2xl text-surface-400 leading-relaxed">
            Explore our curated collections of sneakers and collectibles.
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-surface-800 bg-surface-900 py-20">
            <span className="text-5xl">🏷️</span>
            <h3 className="mt-4 text-lg font-semibold text-white">No categories yet</h3>
            <p className="mt-2 text-sm text-surface-400">
              Categories will appear here once added.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}