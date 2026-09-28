'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function BlogFooter({
  feed,
  base,
  total,
  totalPages,
  safePage,
}: {
  feed: string;
  base: string;
  total: number;
  totalPages: number;
  safePage: number;
}) {
  const { t } = useLanguage();
  const pageHref = (n: number) => (n <= 1 ? '/blog' : `/blog?page=${n}`);

  return (
    <>
      {totalPages > 1 && total > 0 && (
        <nav aria-label={t('ariaPaginationBlog' as any)} className="flex items-center justify-center gap-2 mt-10">
          <Link
            href={pageHref(safePage - 1)}
            aria-label={t('ariaPrev' as any)}
            aria-disabled={safePage === 1}
            className={`btn-ghost !py-2 !px-3 ${safePage === 1 ? 'opacity-30 pointer-events-none' : ''}`}
          >
            ←
          </Link>
          {Array.from({ length: totalPages }).map((_, i) => {
            const num = i + 1;
            if (totalPages > 7 && Math.abs(num - safePage) > 2 && num !== 1 && num !== totalPages) {
              return num === 2 || num === totalPages - 1 ? (
                <span key={num} className="mono-meta text-text/30">…</span>
              ) : null;
            }
            return (
              <Link
                key={num}
                href={pageHref(num)}
                aria-label={`${t('ariaPage' as any)} ${num}`}
                aria-current={num === safePage ? 'page' : undefined}
                className={`min-w-9 px-2 py-2 rounded-md text-[0.65rem] font-mono tracking-wider text-center transition-all ${num === safePage ? 'bg-text text-paper' : 'text-text hover:text-text-2 hover:bg-paper-3'}`}
              >
                {num}
              </Link>
            );
          })}
          <Link
            href={pageHref(safePage + 1)}
            aria-label={t('ariaNext' as any)}
            aria-disabled={safePage === totalPages}
            className={`btn-ghost !py-2 !px-3 ${safePage === totalPages ? 'opacity-30 pointer-events-none' : ''}`}
          >
            →
          </Link>
        </nav>
      )}

      <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="text-sm-body text-text/50">
          {t('blogSubscribe' as any)} <a href={feed} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{t('blogRssFeed' as any)}</a> · <a href={base} target="_blank" rel="noopener noreferrer me" className="text-accent hover:underline">{t('blogFullArchive' as any)}</a>
        </p>
        <p className="mono-meta text-[0.55rem]">{total} {t('articlesCount' as any)}</p>
      </div>
    </>
  );
}
