'use client';

import { useLanguage } from '@/context/LanguageContext';
import PricingCalculator from '@/components/ui/pricing-calculator';
import { 
  Mail, Phone, MapPin, Send, MessageCircle, ShieldCheck, 
  Zap, Clock, TrendingUp, Info, Github, Linkedin, 
  Twitter, Instagram, Youtube, PenTool, Database, 
  Code2, Cpu, Globe, Camera
} from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const { t } = useLanguage();

  const socialLinks = [
    { name: 'X / Twitter', url: 'https://x.com/siapa_hayosiapa', handle: '@siapa_hayosiapa' },
    { name: 'Instagram', url: 'https://www.instagram.com/azzar_budiyanto/', handle: '@azzar_budiyanto' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/azzar-budiyanto/', handle: 'Azzar Budiyanto' },
    { name: 'Telegram', url: 'https://t.me/azzar_budiyanto', handle: '@azzar_budiyanto' },
    { name: 'YouTube', url: 'https://www.youtube.com/@azzar.', handle: '@azzar.' },
    { name: 'Pinterest', url: 'https://id.pinterest.com/azzar_budiyanto/', handle: 'azzar_budiyanto' },
    { name: 'DeviantArt', url: 'https://www.deviantart.com/azzar01', handle: 'azzar01' },
    { name: 'Medium', url: 'https://medium.com/@azzar_budiyanto', handle: '@azzar_budiyanto' },
  ];

  const devLinks = [
    { name: 'GitHub', url: 'https://github.com/1999azzar', handle: '1999azzar' },
    { name: 'Devpost', url: 'https://devpost.com/1999AZZAR', handle: '1999AZZAR' },
    { name: 'HackerRank', url: 'https://www.hackerrank.com/profile/azzar_mr_zs', handle: 'azzar_mr_zs' },
    { name: 'Wokwi', url: 'https://wokwi.com/makers/azzar', handle: 'makers/azzar' },
    { name: 'CodePen', url: 'https://codepen.io/azzar', handle: 'azzar' },
    { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/azzar', handle: 'azzar' },
    { name: 'CodeCrafters', url: 'https://app.codecrafters.io/users/1999AZZAR', handle: '1999AZZAR' },
  ];

  const benefits = [
    { icon: <Clock />, textKey: "pricingBenefit1" },
    { icon: <ShieldCheck />, textKey: "pricingBenefit2" },
    { icon: <Zap />, textKey: "pricingBenefit3" },
    { icon: <TrendingUp />, textKey: "pricingBenefit4" }
  ];

  return (
    <main className="min-h-screen pt-40 pb-24 px-6 max-w-7xl mx-auto">
      {/* CONNECTION SECTION */}
      <section className="mb-32 border-b-[min(16px,4vw)] border-foreground pb-16">
        <div className="flex items-center gap-3 text-accent mb-8">
          <MessageCircle size={24} strokeWidth={3} className="shrink-0" />
          <span className="text-xs font-black uppercase tracking-[0.4em] italic underline decoration-4 truncate">{t('contactHeaderLabel' as any)}</span>
        </div>
        
        <h1 className="headline-main mb-16" dangerouslySetInnerHTML={{ __html: t('contactHeadline' as any) }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Socials & Dev Channels */}
          <div className="lg:col-span-5 space-y-16 overflow-hidden">
            <div>
              <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter border-b-4 border-foreground pb-4 mb-10">{t('contactDirectAccess' as any)}</h2>
              <div className="space-y-12">
                <a href="mailto:azzar.mr.zs@gmail.com" className="group block overflow-hidden">
                  <span className="text-[11px] font-black uppercase tracking-widest text-accent italic mb-2 block">{t('contactEmailLabel' as any)}</span>
                  <div className="text-xl sm:text-2xl md:text-4xl font-black italic uppercase tracking-tighter group-hover:text-accent transition-colors flex items-center gap-4 break-all sm:break-normal">
                    azzar.mr.zs@gmail.com <Mail className="shrink-0 opacity-20 group-hover:opacity-100 transition-opacity" size={24} strokeWidth={3} />
                  </div>
                </a>
                <div className="group block">
                  <span className="text-[11px] font-black uppercase tracking-widest text-accent italic mb-2 block">{t('contactBaseOps' as any)}</span>
                  <div className="text-xl sm:text-2xl md:text-4xl font-black italic uppercase tracking-tighter flex items-center gap-4">
                    INDONESIA <MapPin size={24} strokeWidth={3} className="text-accent shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter border-b-4 border-foreground pb-4 mb-10">{t('contactNeuralNets' as any)}</h2>
              <div className="grid grid-cols-1 gap-4">
                {socialLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.url} 
                    target="_blank" 
                    className="flex justify-between items-center py-4 border-b-2 border-foreground hover:bg-foreground hover:text-background px-4 transition-all group gap-4"
                  >
                    <span className="text-lg font-black uppercase italic tracking-tighter whitespace-nowrap">{link.name}</span>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 truncate">{link.handle}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter border-b-4 border-foreground pb-4 mb-10">{t('contactDevChannels' as any)}</h2>
              <div className="grid grid-cols-1 gap-4">
                {devLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.url} 
                    target="_blank" 
                    className="flex justify-between items-center py-4 border-b-2 border-foreground hover:bg-accent hover:border-accent hover:text-background px-4 transition-all group gap-4"
                  >
                    <span className="text-lg font-black uppercase italic tracking-tighter whitespace-nowrap">{link.name}</span>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 truncate">{link.handle}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-accent italic uppercase">{t('navServices' as any)}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border-2 border-foreground bg-card h-full">
                    <div className="text-accent shrink-0">{b.icon}</div>
                    <span className="text-[10px] font-black uppercase italic tracking-wider leading-tight">{t(b.textKey as any)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Contact Action */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-40 space-y-12">
              <div className="p-8 md:p-12 bg-foreground text-background border-4 border-foreground shadow-[20px_20px_0px_0px_rgba(139,26,26,1)] space-y-6">
                <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter flex items-center gap-4 text-accent">
                  <Info size={32} strokeWidth={3} /> {t('contactProjectIntake' as any)}
                </h3>
                <p className="text-lg font-bold uppercase italic leading-relaxed opacity-80">
                  {t('contactProjectIntakeDesc' as any)}
                </p>
                <div className="pt-6 border-t-2 border-background/20 flex items-center gap-3">
                   <Zap size={20} className="text-accent" />
                   <span className="text-xs font-black uppercase tracking-widest">{t('contactMinProject' as any)}</span>
                </div>
              </div>

              <PricingCalculator />
              
              <a 
                href="https://t.me/azzar_budiyanto" 
                target="_blank"
                className="btn-swiss-primary !text-xl md:!text-3xl !py-10 !px-12 shadow-[min(20px,3vw)_min(20px,3vw)_0px_0px_rgba(139,26,26,1)] w-full flex justify-between items-center group"
              >
                {t('contactTelegramBtn' as any)}
                <Send size={40} strokeWidth={3} className="group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}