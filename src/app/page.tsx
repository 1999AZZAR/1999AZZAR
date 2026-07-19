'use client';

import { ArrowUpRight, Cpu, Activity, Globe, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import RotatingSkills from '@/components/ui/rotating-skills';
import { useLanguage } from '@/context/LanguageContext';

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function HomePage() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const currentHalf = new Date().getMonth() < 6
    ? (language === 'id' ? 'PERTAMA' : 'FIRST')
    : (language === 'id' ? 'KEDUA' : 'SECOND');

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="page-container"
    >
      {/* HERO */}
      <section className="section-spacing border-b border-border pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8 space-y-10">
            <motion.div variants={fadeUp} className="flex items-center gap-2.5">
              <Cpu size={16} className="text-accent" strokeWidth={1.5} />
              <span className="section-label">EST. 1999 — IoT & Full-Stack Engineer</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="heading-xl !text-[clamp(2.8rem,8vw,5.5rem)] !font-[500] tracking-[-0.03em] leading-[0.95]">
              Azzar<br />
              <span className="gradient-text">Budiyanto</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-text leading-relaxed max-w-2xl font-[350]" dangerouslySetInnerHTML={{ __html: t('heroQuote' as any) }} />

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <Link href="/projects" className="btn-primary">
                {t('navPortfolio' as any)} <ArrowUpRight size={14} />
              </Link>
              <Link href="/about" className="btn-ghost">
                {t('navAbout' as any)}
              </Link>
              <Link href="/contact" className="btn-ghost">
                {t('hireMe' as any)} <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="lg:col-span-4 hidden lg:flex flex-col items-end justify-end">
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-text/50 [writing-mode:vertical-lr] border-r border-border pr-4 h-48">
              ARCHIVAL_REF_001999
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATUS + SKILLS */}
      <section className="section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={fadeUp} className="card-surface p-8 md:p-10 space-y-6">
            <div className="flex items-center gap-2.5">
              <Activity size={14} className="text-accent" strokeWidth={1.5} />
              <span className="section-label">{t('statusTitle' as any)}</span>
            </div>
            <p className="heading-lg !text-[clamp(2rem,5vw,3.5rem)] gradient-text !font-[500]">
              {t('statusOnline' as any)}
            </p>
            <p className="text-sm-body">
              {t('statusAvailability' as any).replace('${half}', currentHalf).replace('${year}', currentYear.toString())}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="card-surface bg-paper-3/50 p-8 md:p-10 space-y-6">
            <div className="flex items-center gap-2.5">
              <Globe size={14} className="text-accent" strokeWidth={1.5} />
              <span className="section-label">{t('specializationTitle' as any)}</span>
            </div>
            <p className="heading-lg !font-[500]">
              {t('masteringArt' as any)}
            </p>
            <div className="h-12">
              <RotatingSkills />
            </div>
            <div className="pt-4 border-t border-border">
              <Link href="/about" className="mono-meta hover:text-accent transition-colors inline-flex items-center gap-1.5">
                {t('aboutIdentityTitle' as any)} <ArrowUpRight size={10} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* JOURNAL */}
      <section>
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-6 border-b border-border mb-8">
          <div>
            <span className="section-label">{t('fromTheLab' as any)}</span>
            <h2 className="heading-lg mt-2">{t('journalTitle' as any)}</h2>
          </div>
          <Link href="/blog" className="btn-ghost !py-2 !px-4 shrink-0">
            {t('viewAllThoughts' as any)} <ArrowUpRight size={12} />
          </Link>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Link href="/blog" className="card-surface-subtle block p-8 md:p-10 space-y-6 group">
            <div className="flex items-center gap-3">
              <Newspaper size={18} className="text-accent" strokeWidth={1.5} />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-text">Latest Entry</span>
            </div>
            <p className="heading-md group-hover:text-accent transition-colors">
              &ldquo;{t('blogQuote' as any)}&rdquo;
            </p>
            <div className="flex items-center gap-2 text-sm-body">
              <span className="mono-meta">Read more</span>
              <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
}
