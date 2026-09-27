'use client';

import Link from 'next/link';
import { ArrowUpRight, FileWarning } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const shortcuts = [
  { href: '/', labelKey: 'navHome' },
  { href: '/about', labelKey: 'navAbout' },
  { href: '/services', labelKey: 'navServices' },
  { href: '/projects', labelKey: 'navPortfolio' },
  { href: '/blog', labelKey: 'navBlog' },
  { href: '/contact', labelKey: 'navContact' },
] as const;

export default function NotFoundContent() {
  const { t } = useLanguage();

  return (
    <section className="section-spacing">
      <div className="flex items-center gap-2.5 mb-6">
        <FileWarning size={16} className="text-accent" strokeWidth={1.5} />
        <span className="section-label">Error_404</span>
      </div>

      <h1 className="heading-xl mb-8">
        LOST<span className="text-accent">?</span>
      </h1>

      <p className="text-sm-body max-w-2xl mb-4">
        {t('notFoundDesc' as any)}
      </p>
      <p className="typewriter text-text/30 text-[0.7rem] mb-12">
        &gt; status: 404 — null response_
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mb-12">
        {shortcuts.map((s) => (
          <Link key={s.href} href={s.href} className="card-surface p-5 flex items-center justify-between group">
            <span className="heading-md !text-base group-hover:text-accent transition-colors">{t(s.labelKey as any)}</span>
            <ArrowUpRight size={16} className="text-text/30 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </Link>
        ))}
      </div>

      <Link href="/" className="btn-primary">
        {t('notFoundBack' as any)} <ArrowUpRight size={14} />
      </Link>
    </section>
  );
}
