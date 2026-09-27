import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, FileWarning } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist on Azzar Budiyanto\'s portfolio.',
  robots: { index: false, follow: true },
};

const shortcuts = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

export default function NotFound() {
  return (
    <main className="page-container">
      <section className="section-spacing">
        <div className="flex items-center gap-2.5 mb-6">
          <FileWarning size={16} className="text-accent" strokeWidth={1.5} />
          <span className="section-label">Error_404</span>
        </div>

        <h1 className="heading-xl mb-8">
          LOST<span className="text-accent">?</span>
        </h1>

        <p className="text-sm-body max-w-2xl mb-4">
          The route you requested doesn&apos;t exist on this server. It may have been moved,
          renamed, or never existed in the first place.
        </p>
        <p className="typewriter text-text/30 text-[0.7rem] mb-12">
          &gt; status: 404 — null response_
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mb-12">
          {shortcuts.map((s) => (
            <Link key={s.href} href={s.href} className="card-surface p-5 flex items-center justify-between group">
              <span className="heading-md !text-base group-hover:text-accent transition-colors">{s.label}</span>
              <ArrowUpRight size={16} className="text-text/30 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          ))}
        </div>

        <Link href="/" className="btn-primary">
          Back to Home <ArrowUpRight size={14} />
        </Link>
      </section>
    </main>
  );
}
