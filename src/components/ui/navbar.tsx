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
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 border-b-4 border-foreground">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between gap-8">
        
        <Link href="/" className="flex items-center gap-3 group shrink-0" onClick={() => setIsOpen(false)}>
          <div className="w-12 h-12 bg-accent text-background flex items-center justify-center font-black text-2xl tracking-tighter group-hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(42,37,32,1)]">
            AB
          </div>
          <span className="font-black tracking-tighter text-xl hidden md:block uppercase leading-none border-b-4 border-accent pb-1">
            AZZAR<span className="text-accent">.</span>
          </span>
        </Link>

        <div className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="text-[11px] font-black uppercase tracking-[0.2em] hover:text-accent transition-colors italic"
            >
              {t(item.labelKey as any)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-2 text-[11px] font-black uppercase tracking-widest hover:text-accent border-l-4 border-foreground pl-6 h-12 italic"
          >
            <Globe size={16} />
            {language.toUpperCase()}
          </button>
          
          <Link href="/contact" className="hidden lg:flex items-center gap-2 px-8 py-3 bg-foreground text-background font-black text-[11px] uppercase tracking-widest hover:bg-accent transition-all group shadow-ambient italic">
            {t('contact' as any).toUpperCase()} <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>

          <button 
            className="xl:hidden p-3 bg-foreground text-background shadow-[4px_4px_0px_0px_rgba(139,26,26,1)]"
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
            animate={{ opacity: 1, height: 'calc(100vh - 6rem)' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-24 left-0 right-0 bg-accent text-background overflow-y-auto xl:hidden z-40"
          >
            <div className="p-12 min-h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                {navItems.map((item, i) => (
                  <motion.div key={item.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 + (i * 0.1) }}>
                    <Link 
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-5xl font-black uppercase italic tracking-tighter hover:translate-x-4 transition-transform block"
                    >
                      {t(item.labelKey as any)}<span className="text-foreground">.</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 space-y-8">
                <button onClick={() => { toggleLanguage(); }} className="text-2xl font-black uppercase italic border-t-4 border-background pt-8 flex items-center gap-4 w-full">
                  <Globe size={32} /> {language === 'en' ? 'Indonesian' : 'English'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}