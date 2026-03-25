import type { Review } from '@/types';
import { getMetafieldValue, getNumericMetafieldValue } from '@/lib/cosmic';

interface ReviewCardProps {
  review: Review;
  showProduct?: boolean;
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const reviewerName = getMetafieldValue(review.metadata?.reviewer_name) || 'Anonymous';
  const rating = getNumericMetafieldValue(review.metadata?.rating);
  const reviewText = getMetafieldValue(review.metadata?.review);
  const product = review.metadata?.product;
  const productTitle = product?.title || '';

  function renderStars(count: number): React.ReactNode[] {
    const stars: React.ReactNode[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-4 w-4 ${i <= count ? 'text-yellow-400' : 'text-surface-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  }

  return (
    <div className="flex flex-col rounded-2xl border border-surface-800 bg-surface-900 p-5 transition-all duration-300 hover:border-surface-700">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20 text-brand-400 font-bold text-sm">
            {reviewerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{reviewerName}</p>
            {showProduct && productTitle && (
              <p className="text-xs text-surface-400">
                on <span className="text-brand-400">{productTitle}</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {renderStars(rating)}
        </div>
      </div>

      {/* Review Text */}
      {reviewText && (
        <p className="mt-4 flex-1 text-sm text-surface-300 leading-relaxed">
          &ldquo;{reviewText}&rdquo;
        </p>
      )}
    </div>
  );
}