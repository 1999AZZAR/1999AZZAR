'use client';

import { ArrowUpRight, Cpu, Search, Activity, Globe, Newspaper, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import RotatingSkills from '@/components/ui/rotating-skills';
import { useLanguage } from '@/context/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function HomePage() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const currentHalf = new Date().getMonth() < 6 ? (language === 'id' ? 'PERTAMA' : 'FIRST') : (language === 'id' ? 'KEDUA' : 'SECOND');

  return (
    <main className="min-h-screen pt-32 pb-40 relative blueprint-grid">
      <div className="blueprint-line left-0" />
      <div className="blueprint-line left-1/4 hidden md:block" />
      <div className="blueprint-line left-1/2 hidden md:block" />
      <div className="blueprint-line left-3/4 hidden md:block" />
      <div className="blueprint-line right-0" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[80rem] mx-auto px-6 relative z-10"
      >
        
        {/* HERO SECTION */}
        <section className="mb-48 border-b border-border pb-24">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <motion.div variants={itemVariants} className="space-y-12 max-w-5xl">
               <div className="flex items-center gap-4 text-accent">
                 <span className="mono-label">EST. 1999 // SYSTEM_SPEC_V1.1</span>
                 <div className="h-[1px] w-12 bg-accent" />
               </div>

               <h1 className="headline-editorial text-foreground leading-[0.8] select-none">
                Azzar<br />Budiyanto<span className="text-accent underline decoration-[12px] underline-offset-[12px]">.</span>
               </h1>

               <div className="max-w-3xl space-y-12">
                 <p className="text-3xl md:text-5xl font-sans font-bold italic tracking-tight text-foreground leading-[1.1]" dangerouslySetInnerHTML={{ __html: t('heroQuote' as any) }} />
                 
                 <div className="flex flex-wrap gap-6 pt-4">
                    <Link href="/projects" className="btn-editorial">
                      {t('navPortfolio' as any)}
                    </Link>
                    <Link href="/contact" className="group flex items-center gap-3 font-mono font-semibold text-[0.75rem] tracking-[0.1em] uppercase hover:text-accent transition-all">
                      {t('hireMe' as any)} <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                 </div>
               </div>
            </motion.div>

            <div className="hidden lg:block lg:pt-12">
              <div className="marginalia !tracking-[0.8em] h-64 border-l border-border pl-4">
                ARCHIVAL_REF_001999
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITY GRID */}
        <section className="mb-48">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
              {/* STATUS BOX */}
              <motion.div variants={itemVariants} className="lg:col-span-5 p-12 bg-card border border-border group hover:border-accent transition-colors relative overflow-hidden">
                <div className="space-y-8 relative z-10">
                  <div className="flex items-center gap-3 text-accent">
                    <Activity size={18} strokeWidth={3} />
                    <span className="mono-label">{t('statusTitle' as any)}</span>
                  </div>
                  <h3 className="text-7xl md:text-8xl font-sans font-bold italic tracking-tighter text-foreground group-hover:text-accent transition-colors leading-none">
                    {t('statusOnline' as any)}
                  </h3>
                  <p className="font-sans font-normal text-lg text-muted-foreground leading-relaxed normal-case">
                    {t('statusAvailability' as any).replace('${half}', currentHalf).replace('${year}', currentYear.toString())}
                  </p>
                </div>
              </motion.div>

              {/* KNOWLEDGE BOX */}
              <motion.div variants={itemVariants} className="lg:col-span-7 bg-foreground p-12 md:p-16 text-background relative overflow-hidden group min-h-[450px] shadow-2xl flex flex-col justify-between">
                 <div className="space-y-12 relative z-10">
                   <div className="flex items-center gap-3 text-accent">
                      <Globe size={18} strokeWidth={3} />
                      <span className="mono-label !text-background/60">{t('specializationTitle' as any)}</span>
                   </div>
                   <div className="font-sans text-4xl md:text-7xl font-bold italic uppercase leading-[0.85] tracking-tighter">
                      {t('masteringArt' as any)} 
                      <div className="mt-8 text-accent h-24 md:h-32"><RotatingSkills /></div>
                   </div>
                 </div>
                 
                 <div className="pt-8 border-t border-background/10 relative z-10">
                    <Link href="/about" className="mono-label !text-background hover:text-accent transition-colors flex items-center gap-2">
                       {t('aboutIdentityTitle' as any)} <ArrowRight size={14} />
                    </Link>
                 </div>
              </motion.div>
           </div>
        </section>

        {/* JOURNAL SECTION */}
        <section className="mb-20">
           <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-8 border-b border-border mb-12">
              <h2 className="text-5xl md:text-9xl font-sans font-bold italic tracking-tighter uppercase leading-none">{t('journalTitle' as any)}<span className="text-accent">.</span></h2>
              <Link href="/blog" className="group flex items-center gap-2 font-mono font-semibold text-[0.75rem] tracking-widest uppercase hover:text-accent transition-all">
                {t('viewAllThoughts' as any)} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>

           <motion.div variants={itemVariants}>
              <Link href="/blog" className="group block p-12 bg-card border border-border hover:border-accent transition-all duration-500 shadow-sm hover:shadow-2xl relative overflow-hidden">
                 <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="space-y-8 max-w-5xl">
                       <div className="flex items-center gap-4">
                          <Newspaper size={32} className="text-accent" strokeWidth={3} />
                          <span className="mono-label">{t('fromTheLab' as any)}</span>
                       </div>
                       <h3 className="font-sans font-bold italic text-3xl md:text-7xl leading-[1.05] tracking-tighter text-foreground group-hover:text-accent transition-colors uppercase">
                          "{t('blogQuote' as any)}"
                       </h3>
                    </div>
                    <ArrowUpRight size={120} className="shrink-0 opacity-5 group-hover:opacity-100 group-hover:text-accent group-hover:rotate-12 transition-all duration-700 hidden xl:block" strokeWidth={3} />
                 </div>
                 <div className="bracket bracket-tl" />
                 <div className="bracket bracket-tr" />
                 <div className="bracket bracket-bl" />
                 <div className="bracket bracket-br" />
              </Link>
           </motion.div>
        </section>

      </motion.div>
    </main>
  );
}