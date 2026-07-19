'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Newspaper } from 'lucide-react';

export default function BlogHeader() {
  const { t } = useLanguage();
  return (
    <section className="section-spacing border-b border-border pb-16 md:pb-20">
      <div className="flex items-center gap-2.5 mb-6">
        <Newspaper size={16} className="text-accent" strokeWidth={1.5} />
        <span className="section-label">Journal</span>
      </div>
      <h1 className="heading-xl mb-6">
        Thoughts<span className="text-accent">.</span>
      </h1>
    </section>
  );
}
