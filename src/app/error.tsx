'use client';

import Link from 'next/link';
import { ArrowUpRight, RotateCcw, TriangleAlert } from 'lucide-react';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="page-container">
      <section className="section-spacing">
        <div className="flex items-center gap-2.5 mb-6">
          <TriangleAlert size={16} className="text-accent" strokeWidth={1.5} />
          <span className="section-label">Runtime_Error</span>
        </div>

        <h1 className="heading-xl mb-8">
          FAULT<span className="text-accent">.</span>
        </h1>

        <p className="text-sm-body max-w-2xl mb-4">
          Something failed while rendering this page. The fault has been isolated —
          retrying usually recovers the session.
        </p>
        <p className="typewriter text-text/30 text-[0.7rem] mb-12">
          &gt; status: 500 — attempting recovery_
        </p>

        <div className="flex flex-wrap gap-4">
          <button onClick={() => reset()} className="btn-primary">
            <RotateCcw size={14} /> Try Again
          </button>
          <Link href="/" className="btn-ghost">
            Back to Home <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
