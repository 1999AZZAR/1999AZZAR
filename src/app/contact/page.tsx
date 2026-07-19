'use client';

import { useLanguage } from '@/context/LanguageContext';
import PricingCalculator from '@/components/ui/pricing-calculator';
import { 
  Mail, MapPin, Send, MessageCircle, ShieldCheck, 
  Zap, Clock, TrendingUp, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function ContactPage() {
  const { t } = useLanguage();

  const socialLinks = [
    { name: 'X / Twitter', handle: '@siapa_hayosiapa', url: 'https://x.com/siapa_hayosiapa' },
    { name: 'Instagram', handle: '@azzar_budiyanto', url: 'https://www.instagram.com/azzar_budiyanto/' },
    { name: 'LinkedIn', handle: 'Azzar Budiyanto', url: 'https://linkedin.com/in/azzar-budiyanto/' },
    { name: 'Telegram', handle: '@azzar_budiyanto', url: 'https://t.me/azzar_budiyanto' },
    { name: 'YouTube', handle: '@azzar.', url: 'https://www.youtube.com/@azzar.' },
    { name: 'Pinterest', handle: 'azzar_budiyanto', url: 'https://id.pinterest.com/azzar_budiyanto/' },
    { name: 'DeviantArt', handle: 'azzar01', url: 'https://www.deviantart.com/azzar01' },
    { name: 'Medium', handle: '@azzar_budiyanto', url: 'https://medium.com/@azzar_budiyanto' },
  ];

  const devLinks = [
    { name: 'GitHub', handle: '1999azzar', url: 'https://github.com/1999azzar' },
    { name: 'Devpost', handle: '1999AZZAR', url: 'https://devpost.com/1999AZZAR' },
    { name: 'HackerRank', handle: 'azzar_mr_zs', url: 'https://www.hackerrank.com/profile/azzar_mr_zs' },
    { name: 'Wokwi', handle: 'makers/azzar', url: 'https://wokwi.com/makers/azzar' },
    { name: 'CodePen', handle: 'azzar', url: 'https://codepen.io/azzar' },
    { name: 'freeCodeCamp', handle: 'azzar', url: 'https://www.freecodecamp.org/azzar' },
    { name: 'CodeCrafters', handle: '1999AZZAR', url: 'https://app.codecrafters.io/users/1999AZZAR' },
  ];

  const benefits = [
    { icon: <Clock size={18} />, textKey: "pricingBenefit1" },
    { icon: <ShieldCheck size={18} />, textKey: "pricingBenefit2" },
    { icon: <Zap size={18} />, textKey: "pricingBenefit3" },
    { icon: <TrendingUp size={18} />, textKey: "pricingBenefit4" }
  ];

  return (
    <main className="page-container">
      {/* HEADER */}
      <motion.section initial="hidden" animate="visible" variants={fadeUp} className="section-spacing border-b border-border pb-16 md:pb-20">
        <div className="flex items-center gap-2.5 mb-6">
          <MessageCircle size={16} className="text-accent" strokeWidth={1.5} />
          <span className="section-label">{t('contactHeaderLabel' as any)}</span>
        </div>
        
        <h1 className="heading-xl mb-8" dangerouslySetInnerHTML={{ __html: t('contactHeadline' as any) }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="heading-md mb-6">{t('contactDirectAccess' as any)}</h2>
              <div className="space-y-6">
                <a href="mailto:azzar.budi@gmail.com" className="block group">
                  <span className="mono-meta text-accent mb-1 block">{t('contactEmailLabel' as any)}</span>
                  <p className="heading-md !text-lg group-hover:text-accent transition-colors break-all">
                    azzar.budi@gmail.com <ArrowUpRight size={14} className="inline" />
                  </p>
                </a>
                <div>
                  <span className="mono-meta text-accent mb-1 block">{t('contactBaseOps' as any)}</span>
                  <p className="heading-md !text-lg flex items-center gap-2">
                    Indonesia <MapPin size={16} className="text-accent" />
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="heading-md mb-6">{t('contactNeuralNets' as any)}</h2>
              <div className="space-y-1">
                {socialLinks.map((link) => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer me"
                    className="flex justify-between items-center py-3 px-4 rounded-md hover:bg-paper-3 transition-all group gap-4"
                  >
                    <span className="font-body text-sm text-text-2 group-hover:text-accent transition-colors">{link.name}</span>
                    <span className="mono-meta text-[0.55rem] group-hover:text-text-2 transition-colors">{link.handle}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h2 className="heading-md mb-6">{t('contactDevChannels' as any)}</h2>
              <div className="space-y-1">
                {devLinks.map((link) => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer me"
                    className="flex justify-between items-center py-3 px-4 rounded-md hover:bg-paper-3 transition-all group gap-4"
                  >
                    <span className="font-body text-sm text-text-2 group-hover:text-accent transition-colors">{link.name}</span>
                    <span className="mono-meta text-[0.55rem] group-hover:text-text-2 transition-colors">{link.handle}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <span className="section-label">{t('navServices' as any)}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((b, i) => (
                  <div key={i} className="card-surface p-4 flex items-center gap-3">
                    <div className="text-accent shrink-0">{b.icon}</div>
                    <span className="font-mono text-[0.6rem] uppercase tracking-wider text-text/70 leading-tight">{t(b.textKey as any)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24 space-y-8">
              <div className="card-surface bg-accent/5 border-accent/20 p-8 md:p-10 space-y-4">
                <h3 className="heading-md flex items-center gap-3 text-accent">
                  Let&apos;s work together
                </h3>
                <p className="text-sm-body">
                  {t('contactProjectIntakeDesc' as any)}
                </p>
                <div className="pt-4 border-t border-border flex items-center gap-2.5">
                  <Zap size={14} className="text-accent" />
                  <span className="mono-meta">{t('contactMinProject' as any)}</span>
                </div>
              </div>

              <PricingCalculator />
              
              <a href="https://t.me/azzar_budiyanto" target="_blank" rel="noopener noreferrer me"
                className="btn-primary w-full justify-between !py-5 !px-8 group"
              >
                {t('contactTelegramBtn' as any)}
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
