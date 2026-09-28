'use client';

import { useLanguage } from '@/context/LanguageContext';

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-hidden="true" aria-label={t('ariaLoadingProjects' as any)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-surface overflow-hidden flex flex-col">
          <div className="skeleton-shimmer aspect-video border-b border-border" />
          <div className="p-7 space-y-5 flex-1">
            <div className="flex justify-between items-center">
              <div className="skeleton-shimmer h-3 w-10 rounded" />
              <div className="skeleton-shimmer h-4 w-4 rounded-full" />
            </div>
            <div className="skeleton-shimmer h-6 w-3/4 rounded" />
            <div className="space-y-2">
              <div className="skeleton-shimmer h-3 w-full rounded" />
              <div className="skeleton-shimmer h-3 w-full rounded" />
              <div className="skeleton-shimmer h-3 w-2/3 rounded" />
            </div>
          </div>
          <div className="mx-7 mb-7 pt-5 border-t border-border flex justify-between">
            <div className="skeleton-shimmer h-4 w-16 rounded-full" />
            <div className="skeleton-shimmer h-4 w-20 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PostGridSkeleton({ count = 6 }: { count?: number }) {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-hidden="true" aria-label={t('ariaLoadingArticles' as any)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-surface p-7 flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="skeleton-shimmer h-3 w-8 rounded" />
              <div className="skeleton-shimmer h-4 w-4 rounded-full" />
            </div>
            <div className="skeleton-shimmer h-5 w-2/3 rounded mb-3" />
            <div className="space-y-2">
              <div className="skeleton-shimmer h-3 w-full rounded" />
              <div className="skeleton-shimmer h-3 w-full rounded" />
              <div className="skeleton-shimmer h-3 w-1/2 rounded" />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
            <div className="skeleton-shimmer h-3 w-24 rounded" />
            <div className="skeleton-shimmer h-3 w-16 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
