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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'id' : 'en';
    setLanguage(nextLang as any);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-paper/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between gap-8">
        
        <Link href="/" className="flex items-center gap-3 group shrink-0" onClick={() => setIsOpen(false)}>
          <div className="w-9 h-9 rounded-md bg-accent text-paper flex items-center justify-center font-display font-semibold text-sm tracking-tight group-hover:scale-105 transition-transform">
            AB
          </div>
          <span className="font-display font-semibold tracking-tight hidden sm:block text-sm">
            Azzar<span className="text-accent">.</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-text hover:text-text-2 rounded-md hover:bg-paper-3 transition-all"
            >
              {t(item.labelKey as any)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-text hover:text-text-2 border-l border-border pl-5 h-8 transition-colors"
          >
            <Globe size={12} />
            {language.toUpperCase()}
          </button>
          
          <Link href="/contact" className="hidden md:flex btn-primary !py-2 !px-4 text-[0.65rem]">
            {t('hireMe' as any)} <ArrowUpRight size={12} />
          </Link>

          <button 
            className="lg:hidden p-2 text-text-2 hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-16 left-0 right-0 bg-paper border-b border-border lg:hidden"
          >
            <div className="p-6 space-y-1">
              {navItems.map((item, i) => (
                <motion.div 
                  key={item.href} 
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link 
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-3 px-4 font-display text-lg font-medium text-text-2 hover:text-accent hover:bg-paper-3 rounded-md transition-all"
                  >
                    {t(item.labelKey as any)}
                    <ArrowUpRight size={14} className="opacity-30" />
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 mt-4 border-t border-border">
                <button onClick={toggleLanguage} className="flex items-center gap-3 py-3 px-4 font-mono text-xs uppercase tracking-widest text-text hover:text-text-2 w-full transition-colors">
                  <Globe size={14} /> {language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
