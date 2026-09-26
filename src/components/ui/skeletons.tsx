export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-hidden="true" aria-label="Loading projects">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-surface overflow-hidden flex flex-col animate-pulse">
          <div className="aspect-video border-b border-border bg-paper-3" />
          <div className="p-7 space-y-5 flex-1">
            <div className="flex justify-between items-center">
              <div className="h-3 w-10 rounded bg-paper-3" />
              <div className="h-4 w-4 rounded-full bg-paper-3" />
            </div>
            <div className="h-6 w-3/4 rounded bg-paper-3" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-paper-3" />
              <div className="h-3 w-full rounded bg-paper-3" />
              <div className="h-3 w-2/3 rounded bg-paper-3" />
            </div>
          </div>
          <div className="mx-7 mb-7 pt-5 border-t border-border flex justify-between">
            <div className="h-4 w-16 rounded-full bg-paper-3" />
            <div className="h-4 w-20 rounded bg-paper-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PostGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-hidden="true" aria-label="Loading articles">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-surface p-7 flex flex-col justify-between min-h-[260px] animate-pulse">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="h-3 w-8 rounded bg-paper-3" />
              <div className="h-4 w-4 rounded-full bg-paper-3" />
            </div>
            <div className="h-5 w-2/3 rounded bg-paper-3 mb-3" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-paper-3" />
              <div className="h-3 w-full rounded bg-paper-3" />
              <div className="h-3 w-1/2 rounded bg-paper-3" />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
            <div className="h-3 w-24 rounded bg-paper-3" />
            <div className="h-3 w-16 rounded bg-paper-3" />
          </div>
        </div>
      ))}
    </div>
  );
}
