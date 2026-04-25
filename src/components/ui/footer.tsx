'use client';

import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, Twitter, MessageCircle, Instagram } from 'lucide-react';
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
    <footer className="mt-32 border-t-[12px] border-foreground bg-background pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-12">
          
          {/* Logo Section */}
          <div className="col-span-12 lg:col-span-6 space-y-8">
            <div className="flex items-center gap-4 group">
              <div className="w-16 h-16 bg-accent text-background flex items-center justify-center font-black text-3xl tracking-tighter group-hover:scale-110 transition-transform shadow-[8px_8px_0px_0px_rgba(42,37,32,1)]">
                AB
              </div>
              <span className="font-black tracking-tighter text-3xl uppercase leading-none border-b-8 border-accent pb-2">
                AZZAR<span className="text-accent">.</span>
              </span>
            </div>
            <p className="text-2xl text-muted-foreground leading-tight max-w-sm font-black italic uppercase">
              Engineering Resilient Digital & Physical Systems.
            </p>
          </div>

          {/* Links Sections */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent italic">Navigation</h4>
            <div className="flex flex-col gap-4 text-xl font-black italic uppercase tracking-tighter">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="hover:text-accent transition-colors w-fit"
                >
                  {t(item.labelKey as any)}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent italic">Socials</h4>
            <div className="flex flex-col gap-4 text-xl font-black italic uppercase tracking-tighter">
              <a href="https://github.com/1999azzar" target="_blank" className="flex items-center gap-3 hover:text-accent transition-colors w-fit">
                GitHub <ArrowUpRight size={20} />
              </a>
              <a href="https://linkedin.com/in/azzar-budiyanto" target="_blank" className="flex items-center gap-3 hover:text-accent transition-colors w-fit">
                LinkedIn <ArrowUpRight size={20} />
              </a>
              <a href="https://x.com/siapa_hayosiapa" target="_blank" className="flex items-center gap-3 hover:text-accent transition-colors w-fit text-accent">
                X (Twitter) <ArrowUpRight size={20} />
              </a>
              <a href="https://t.me/azzar_budiyanto" target="_blank" className="flex items-center gap-3 hover:text-accent transition-colors w-fit">
                Telegram <ArrowUpRight size={20} />
              </a>
              <a href="https://wa.me/+6282232529804" target="_blank" className="flex items-center gap-3 hover:text-accent transition-colors w-fit">
                WhatsApp <ArrowUpRight size={20} />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="col-span-12 mt-24 pt-12 border-t-4 border-foreground flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6 text-xs font-black uppercase tracking-widest text-muted-foreground italic">
              <span>© {currentYear} AZZAR BUDIYANTO</span>
              <span className="w-2 h-2 bg-accent rounded-full hidden md:block"></span>
              <span>All Rights Reserved</span>
            </div>
            <div className="text-xs font-black uppercase tracking-widest text-accent italic underline decoration-2">
              Designed for High Impact
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}