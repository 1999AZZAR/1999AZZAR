'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/', labelKey: 'navHome' },
  { href: '/about', labelKey: 'navAbout' },
  { href: '/services', labelKey: 'navServices' },
  { href: '/blog', labelKey: 'navBlog' },
  { href: '/projects', labelKey: 'navPortfolio' },
  { href: '/contact', labelKey: 'navContact' },
] as const;

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'id' : 'en';
    setLanguage(nextLang as any);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-foreground/10">
      <div className="max-w-[80rem] mx-auto px-6 h-20 flex items-center justify-between gap-8">
        
        <Link href="/" className="flex items-center gap-3 group shrink-0" onClick={() => setIsOpen(false)}>
          <div className="w-10 h-10 bg-accent text-background flex items-center justify-center font-sans font-bold text-xl tracking-tighter group-hover:scale-105 transition-transform shadow-[3px_3px_0px_0px_rgba(42,37,32,1)]">
            AB
          </div>
          <span className="font-sans font-bold tracking-tighter text-lg hidden md:block uppercase leading-none border-b-4 border-accent pb-1">
            AZZAR<span className="text-accent">.</span>
          </span>
        </Link>

        {/* 3. Typography Hierarchy: Navigation Menu uses JetBrains Mono */}
        <div className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="font-mono font-semibold text-[0.75rem] uppercase tracking-[0.1em] hover:text-accent transition-colors"
            >
              {t(item.labelKey as any)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-2 font-mono font-semibold text-[0.75rem] uppercase tracking-widest hover:text-accent border-l border-foreground/10 pl-6 h-10"
          >
            <Globe size={14} />
            {language.toUpperCase()}
          </button>
          
          <Link href="/contact" className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-foreground text-background font-mono font-semibold text-[0.75rem] tracking-[0.1em] uppercase hover:bg-accent transition-all group shadow-sm">
            {t('hireMe' as any).toUpperCase()} <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>

          <button 
            className="xl:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 5rem)' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 right-0 bg-accent text-background overflow-y-auto xl:hidden z-40"
          >
            <div className="p-12 min-h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                {navItems.map((item, i) => (
                  <motion.div key={item.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 + (i * 0.1) }}>
                    <Link 
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="font-sans text-5xl font-bold uppercase italic tracking-tighter hover:translate-x-4 transition-transform block"
                    >
                      {t(item.labelKey as any)}<span className="text-foreground">.</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 space-y-8 border-t border-background/20 pt-8">
                <button onClick={() => { toggleLanguage(); }} className="font-mono text-xl font-bold uppercase tracking-widest flex items-center gap-4 w-full">
                  <Globe size={24} /> {language === 'en' ? 'INDONESIAN' : 'ENGLISH'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}