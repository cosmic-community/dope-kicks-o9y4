export default function ReviewsLoading() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container-main">
        {/* Header Skeleton */}
        <div className="mb-10">
          <div className="h-4 w-24 animate-pulse rounded bg-surface-800" />
          <div className="mt-2 h-9 w-56 animate-pulse rounded bg-surface-800" />
          <div className="mt-3 h-5 w-80 animate-pulse rounded bg-surface-800" />
        </div>

        {/* Stats Skeleton */}
        <div className="mb-10 flex items-center gap-6 rounded-2xl border border-surface-800 bg-surface-900 p-6">
          <div className="space-y-2 text-center">
            <div className="mx-auto h-10 w-14 animate-pulse rounded bg-surface-800" />
            <div className="mx-auto h-4 w-20 animate-pulse rounded bg-surface-800" />
          </div>
          <div className="h-12 w-px bg-surface-700" />
          <div className="space-y-2 text-center">
            <div className="mx-auto h-10 w-10 animate-pulse rounded bg-surface-800" />
            <div className="mx-auto h-4 w-20 animate-pulse rounded bg-surface-800" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="rounded-2xl border border-surface-800 bg-surface-900 p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-surface-800" />
                <div className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-surface-800" />
                  <div className="h-3 w-32 animate-pulse rounded bg-surface-800" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-surface-800" />
                <div className="h-3 w-4/5 animate-pulse rounded bg-surface-800" />
                <div className="h-3 w-3/5 animate-pulse rounded bg-surface-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}