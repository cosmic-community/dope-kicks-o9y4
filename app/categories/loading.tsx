export default function CategoriesLoading() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container-main">
        {/* Header Skeleton */}
        <div className="mb-10">
          <div className="h-4 w-24 animate-pulse rounded bg-surface-800" />
          <div className="mt-2 h-9 w-48 animate-pulse rounded bg-surface-800" />
          <div className="mt-3 h-5 w-72 animate-pulse rounded bg-surface-800" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-surface-800 bg-surface-900">
              <div className="aspect-video animate-pulse bg-surface-800" />
              <div className="p-5 space-y-3">
                <div className="h-6 w-40 animate-pulse rounded bg-surface-800" />
                <div className="h-4 w-full animate-pulse rounded bg-surface-800" />
                <div className="h-4 w-32 animate-pulse rounded bg-surface-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}