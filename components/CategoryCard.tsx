import Link from 'next/link';
import type { Category } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const imageUrl = category.metadata?.image?.imgix_url;
  const name = getMetafieldValue(category.metadata?.name) || category.title;
  const description = getMetafieldValue(category.metadata?.description);

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-surface-800 bg-surface-900 transition-all duration-300 hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-surface-800">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={225}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-600/20 to-brand-900/20">
            <span className="text-5xl">🏷️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-brand-400 sm:text-xl">
          {name}
        </h3>
        {description && (
          <p className="mt-2 line-clamp-2 text-sm text-surface-400 leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-400 transition-colors group-hover:text-brand-300">
          Browse collection
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}