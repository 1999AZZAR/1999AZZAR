'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Newspaper } from 'lucide-react';

export default function BlogHeader() {
  const { t } = useLanguage();
  return (
    <section className="mb-24 border-b-[16px] border-foreground pb-16">
      <div className="flex items-center gap-3 text-accent mb-8">
        <Newspaper size={24} strokeWidth={3} />
        <span className="text-xs font-black uppercase tracking-[0.4em] italic underline decoration-4">
          {t('portoHeaderLabel' as any)}
        </span>
      </div>
      <h1 className="headline-main mb-12" dangerouslySetInnerHTML={{ __html: t('portoHeadline' as any).replace('WORKS', 'THOUGHTS').replace('PILIHAN', 'TERBARU') }} />
    </section>
  );
}
