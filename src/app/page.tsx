'use client';

import { ArrowUpRight, Cpu, Search, Activity, Globe, Newspaper, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import RotatingSkills from '@/components/ui/rotating-skills';

export default function HomePage() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const currentHalf = new Date().getMonth() < 6 ? (language === 'id' ? 'pertama' : 'first') : (language === 'id' ? 'kedua' : 'second');

  return (
    <main className="min-h-screen pt-32 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO - YEARBOOK COLORS + EDITORIAL UI */}
        <section className="mb-48 border-b-2 border-border pb-24">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="space-y-10 max-w-4xl">
               <div className="flex items-center gap-4 text-accent">
                 <span className="marginalia tracking-[0.6em] !h-auto !writing-mode-horizontal">EST. 1999 // SYSTEMS_ENGINEERING</span>
                 <div className="h-[1px] w-12 bg-accent" />
               </div>

               <h1 className="headline-editorial text-foreground leading-none" dangerouslySetInnerHTML={{ __html: `Azzar<br />Budiyanto<span class="text-accent">.</span>` }} />

               <div className="max-w-2xl">
                 <p className="text-2xl md:text-3xl font-serif italic text-muted-foreground leading-snug mb-12" dangerouslySetInnerHTML={{ __html: t('heroQuote' as any) }} />
                 
                 <div className="flex flex-wrap gap-6 pt-4">
                    <Link href="/projects" className="btn-editorial">
                      {t('exploreWorks' as any) || 'EXPLORE WORKS'}
                    </Link>
                    <Link href="/contact" className="group flex items-center gap-3 font-sans font-black italic text-xs tracking-[0.2em] uppercase hover:text-accent transition-all">
                      {t('hireTheEngineer' as any) || 'HIRE THE ENGINEER'} <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                 </div>
               </div>
            </div>

            <div className="hidden lg:block lg:pt-12">
              <div className="marginalia !tracking-[0.8em] h-64 border-l border-border pl-4">
                COORDINATE_DATA: 7.7956° S, 110.3695° E
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITY GRID - YEARBOOK THEME */}
        <section className="mb-48">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
              {/* STATUS BOX */}
              <div className="lg:col-span-5 p-12 bg-card border-2 border-border group hover:border-accent transition-colors">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-accent">
                    <Activity size={20} strokeWidth={3} />
                    <span className="font-sans font-black text-[10px] tracking-[0.3em] italic uppercase">{t('statusTitle' as any)}</span>
                  </div>
                  <h3 className="text-6xl md:text-8xl font-sans font-black italic tracking-tighter text-foreground group-hover:text-accent transition-colors leading-none">{t('statusOnline' as any)}</h3>
                  <p className="font-serif italic text-lg text-muted-foreground leading-relaxed">
                    {t('statusAvailability' as any).replace('${half}', currentHalf).replace('${year}', currentYear.toString())}
                  </p>
                </div>
              </div>

              {/* KNOWLEDGE BOX */}
              <div className="lg:col-span-7 bg-foreground p-12 md:p-16 text-background relative overflow-hidden group min-h-[400px]">
                 <div className="space-y-8 relative z-10">
                   <div className="flex items-center gap-3 text-accent">
                      <Globe size={20} strokeWidth={3} />
                      <span className="font-sans font-black text-[10px] tracking-[0.3em] italic uppercase">{t('specializationTitle' as any)}</span>
                   </div>
                   <div className="font-sans text-4xl md:text-7xl font-black italic uppercase leading-[0.9] tracking-tighter">
                      {t('masteringArt' as any)} 
                      <div className="mt-8 text-accent h-24 md:h-32"><RotatingSkills /></div>
                   </div>
                 </div>
                 <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              </div>
           </div>
        </section>

        {/* JOURNAL - YEARBOOK THEME */}
        <section className="mb-20">
           <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-8 border-b-2 border-border mb-12">
              <h2 className="text-5xl md:text-8xl font-sans font-black italic tracking-tighter uppercase leading-none">{t('journalTitle' as any)}<span className="text-accent">.</span></h2>
              <Link href="/blog" className="group flex items-center gap-2 font-sans font-black italic text-xs tracking-widest uppercase hover:text-accent transition-all">
                {t('viewAllThoughts' as any)} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>

           <Link href="/blog" className="group block p-12 bg-card border-2 border-border hover:border-accent transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                 <div className="space-y-6 max-w-4xl">
                    <div className="flex items-center gap-4">
                       <Newspaper size={32} className="text-accent" />
                       <span className="font-sans font-black text-xs tracking-[0.3em] italic uppercase">{t('fromTheLab' as any)}</span>
                    </div>
                    <h3 className="font-serif italic text-3xl md:text-6xl leading-[1.1] tracking-tight group-hover:text-accent transition-colors">
                       "{t('blogQuote' as any)}"
                    </h3>
                 </div>
                 <ArrowUpRight size={80} className="shrink-0 opacity-10 group-hover:opacity-100 group-hover:text-accent transition-all duration-700" strokeWidth={3} />
              </div>
           </Link>
        </section>

      </div>
    </main>
  );
}