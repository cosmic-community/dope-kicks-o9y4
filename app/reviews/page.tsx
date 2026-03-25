import type { Metadata } from 'next';
import { getReviews } from '@/lib/cosmic';
import ReviewCard from '@/components/ReviewCard';
import { getNumericMetafieldValue } from '@/lib/cosmic';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Customer Reviews — Dope Kicks',
  description: 'See what sneakerheads are saying about Dope Kicks products.',
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  // Calculate overall stats
  let avgRating = 0;
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, r) => sum + getNumericMetafieldValue(r.metadata?.rating), 0);
    avgRating = totalRating / reviews.length;
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="container-main">
        {/* Header */}
        <div className="mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-400">Community</span>
          <h1 className="heading-section mt-1 text-white">Customer Reviews</h1>
          <p className="mt-3 max-w-2xl text-surface-400 leading-relaxed">
            Real reviews from real sneakerheads. See what the culture thinks about our products.
          </p>
        </div>

        {/* Stats */}
        {reviews.length > 0 && (
          <div className="mb-10 flex flex-wrap items-center gap-6 rounded-2xl border border-surface-800 bg-surface-900 p-6">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-white">{avgRating.toFixed(1)}</p>
              <div className="mt-1 flex items-center gap-0.5">
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
              <p className="mt-1 text-xs text-surface-400">Average Rating</p>
            </div>
            <div className="h-12 w-px bg-surface-700" />
            <div className="text-center">
              <p className="text-4xl font-extrabold text-white">{reviews.length}</p>
              <p className="mt-1 text-xs text-surface-400">Total Reviews</p>
            </div>
          </div>
        )}

        {/* Reviews Grid */}
        {reviews.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-surface-800 bg-surface-900 py-20">
            <span className="text-5xl">⭐</span>
            <h3 className="mt-4 text-lg font-semibold text-white">No reviews yet</h3>
            <p className="mt-2 text-sm text-surface-400">
              Be the first to share your experience!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}