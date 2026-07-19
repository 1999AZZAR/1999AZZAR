'use client';

import Link from 'next/link';
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
    <footer className="border-t border-border bg-paper/50">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-12 gap-10 md:gap-12">
          
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-accent text-paper flex items-center justify-center font-display font-semibold text-base">
                AB
              </div>
              <span className="font-display font-semibold tracking-tight text-sm">
                Azzar<span className="text-accent">.</span>
              </span>
            </div>
            <p className="text-sm-body max-w-sm">
              {t('heroDesc' as any)}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://github.com/1999azzar" target="_blank" rel="noopener noreferrer me" className="chip">
                GitHub
              </a>
              <a href="https://linkedin.com/in/azzar-budiyanto" target="_blank" rel="noopener noreferrer me" className="chip">
                LinkedIn
              </a>
              <a href="https://x.com/siapa_hayosiapa" target="_blank" rel="noopener noreferrer me" className="chip">
                X
              </a>
            </div>
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-2 lg:col-start-7 space-y-5">
            <p className="mono-meta">Navigation</p>
            <div className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="font-body text-sm text-text hover:text-text-2 transition-colors w-fit"
                >
                  {t(item.labelKey as any)}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-2 space-y-5">
            <p className="mono-meta">Connect</p>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:azzar.mr.zs@gmail.com" className="font-body text-sm text-text hover:text-text-2 transition-colors w-fit">
                Email
              </a>
              <a href="https://t.me/azzar_budiyanto" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-text hover:text-text-2 transition-colors w-fit">
                Telegram
              </a>
              <a href="https://www.instagram.com/azzar_budiyanto/" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-text hover:text-text-2 transition-colors w-fit">
                Instagram
              </a>
              <a href="https://medium.com/@azzar_budiyanto" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-text hover:text-text-2 transition-colors w-fit">
                Medium
              </a>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="mono-meta text-[0.6rem]">
            &copy; {currentYear} Azzar Budiyanto
          </p>
        </div>
      </div>
    </footer>
  );
}
