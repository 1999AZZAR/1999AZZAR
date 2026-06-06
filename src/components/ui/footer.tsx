'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const navItems = [
  { href: '/', labelKey: 'navHome' },
  { href: '/about', labelKey: 'navAbout' },
  { href: '/services', labelKey: 'navServices' },
  { href: '/blog', labelKey: 'navBlog' },
  { href: '/projects', labelKey: 'navPortfolio' },
  { href: '/contact', labelKey: 'navContact' },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="mt-32 border-t border-foreground/10 bg-background pt-24 pb-12 relative z-10 overflow-hidden">
      <div className="max-w-[80rem] mx-auto px-6">
        <div className="grid grid-cols-12 gap-12">
          
          {/* 3. Primary Typo: Plus Jakarta Sans for Brand/Narrative */}
          <div className="col-span-12 lg:col-span-6 space-y-8">
            <div className="flex items-center gap-4 group">
              <div className="w-16 h-16 bg-accent text-background flex items-center justify-center font-sans font-bold text-3xl tracking-tighter group-hover:scale-110 transition-transform shadow-[8px_8px_0px_0px_rgba(42,37,32,1)]">
                AB
              </div>
              <span className="font-sans font-bold tracking-tighter text-3xl uppercase leading-none border-b-8 border-accent pb-2">
                AZZAR<span className="text-accent">.</span>
              </span>
            </div>
            {/* 2. Color Roles: Muted Foreground for Metadata/Captions */}
            <p className="text-2xl text-muted-foreground leading-tight max-w-sm font-sans font-bold italic uppercase tracking-tighter">
              {t('heroDesc' as any)}
            </p>
          </div>

          {/* 3. Secondary Typo: JetBrains Mono for Technical Labels (NAV/SOCIAL) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-8">
            <h4 className="font-mono font-semibold text-[0.75rem] uppercase tracking-[0.2em] text-accent">01 // NAV</h4>
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="font-sans font-bold italic uppercase text-2xl tracking-tighter hover:text-accent transition-colors w-fit"
                >
                  {t(item.labelKey as any)}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-8">
            <h4 className="font-mono font-semibold text-[0.75rem] uppercase tracking-[0.2em] text-accent">02 // SOCIAL</h4>
            <div className="flex flex-col gap-4 font-sans font-bold italic uppercase text-2xl tracking-tighter">
              <a href="https://github.com/1999azzar" target="_blank" rel="noopener noreferrer me" className="flex items-center gap-3 hover:text-accent transition-colors w-fit">
                GitHub <ArrowUpRight size={24} strokeWidth={3} />
              </a>
              <a href="https://linkedin.com/in/azzar-budiyanto" target="_blank" rel="noopener noreferrer me" className="flex items-center gap-3 hover:text-accent transition-colors w-fit">
                LinkedIn <ArrowUpRight size={24} strokeWidth={3} />
              </a>
              <a href="https://x.com/siapa_hayosiapa" target="_blank" rel="noopener noreferrer me" className="flex items-center gap-3 hover:text-accent transition-colors w-fit text-accent">
                X_Twitter <ArrowUpRight size={24} strokeWidth={3} />
              </a>
            </div>
          </div>

          {/* Copyright - Strictly Mono per Guide */}
          <div className="col-span-12 mt-24 pt-12 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6 font-mono text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground italic">
              <span>© {currentYear} AZZAR BUDIYANTO</span>
              <span className="w-1.5 h-1.5 bg-accent rounded-full hidden md:block"></span>
              <span>All Rights Reserved</span>
            </div>
            <div className="font-mono text-[0.7rem] font-semibold uppercase tracking-widest text-accent italic underline decoration-2">
              Swiss-Archival Spec v1.1.0
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}