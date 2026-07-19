'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Calculator, Calendar, DollarSign, Receipt, X, Send, 
  Mail, Download, Printer, ExternalLink, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PricingCalculator() {
  const { t, language } = useLanguage();
  const [hours, setHours] = useState<number>(0);
  const [currency, setCurrency] = useState<'USD' | 'IDR' | 'EUR' | 'GBP'>('USD');
  const [paymentPlan, setPaymentPlan] = useState('2-50-50'); 
  const [payConsultationSeparate, setPayConsultationSeparate] = useState(false);
  const [projectDescription, setProjectDescription] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);

  const [results, setResults] = useState<{
    rateUSD: number;
    projectTotalUSD: number;
    totalConsultationUSD: number;
    days: number;
    installments: { desc: string; amount: number; isConsultation: boolean }[];
  } | null>(null);

  const exchangeRates = {
    USD: 1,
    IDR: 15500,
    EUR: 0.93,
    GBP: 0.79
  };

  useEffect(() => {
    if (hours <= 0 || isNaN(hours)) {
      setResults(null);
      return;
    }

    const Rmax = 45;
    const Rmin = 25;
    const Hmin = 8;
    const Hmax = 208;

    let rateUSD;
    if (hours <= Hmin) rateUSD = Rmax;
    else if (hours >= Hmax) rateUSD = Rmin;
    else rateUSD = Rmax - ((Rmax - Rmin) / (Hmax - Hmin)) * (hours - Hmin);

    const numConsultationFees = Math.floor(hours / 30);
    let totalConsultationUSD = 0;
    const consultationFees: number[] = [];

    for (let i = 0; i < numConsultationFees; i++) {
        const baseFee = 95;
        const variation = Math.sin(hours * 0.1 + i * 0.5) * 15;
        const fee = Math.max(70, Math.min(120, baseFee + variation));
        consultationFees.push(Math.round(fee));
        totalConsultationUSD += Math.round(fee);
    }

    const projectTotalUSD = Math.max(rateUSD * hours, 250);
    const days = Math.ceil(hours / 8);

    const percentages = paymentPlan.split('-').slice(1).map(p => parseInt(p) / 100);
    let installments: { desc: string; amount: number; isConsultation: boolean }[] = [];

    if (payConsultationSeparate && numConsultationFees > 0) {
      percentages.forEach((pct, i) => {
        installments.push({
          desc: `${t('pricingPaymentProjectLabel' as any)} ${i + 1}`,
          amount: Math.round(projectTotalUSD * pct),
          isConsultation: false
        });
      });
      consultationFees.forEach((fee, i) => {
        installments.push({
          desc: `${t('pricingPaymentConsultationLabel' as any)} ${i + 1}`,
          amount: fee,
          isConsultation: true
        });
      });
    } else {
      const combinedTotal = projectTotalUSD + totalConsultationUSD;
      percentages.forEach((pct, i) => {
        installments.push({
          desc: `${t('pricingPaymentProjectLabel' as any)} ${i + 1}`,
          amount: Math.round(combinedTotal * pct),
          isConsultation: false
        });
      });
    }

    setResults({
      rateUSD: Math.round(rateUSD),
      projectTotalUSD: Math.round(projectTotalUSD),
      totalConsultationUSD: Math.round(totalConsultationUSD),
      days,
      installments
    });
  }, [hours, paymentPlan, payConsultationSeparate, t]);

  const formatValue = (usdAmount: number) => {
    const converted = usdAmount * exchangeRates[currency];
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: currency === 'IDR' ? 0 : 2
    }).format(converted);
  };

  const getWhatsAppLink = () => {
    if (!results) return '';
    let msg = `Hi Azzar! I'm interested in your development services.\n\n`;
    if (projectDescription) msg += `PROJECT DESCRIPTION:\n${projectDescription}\n\n`;
    msg += `PROJECT DETAILS:\n- Hours: ${hours}\n- Currency: ${currency}\n- Plan: ${paymentPlan}\n\n`;
    msg += `TOTAL: ${formatValue(results.projectTotalUSD + results.totalConsultationUSD)}`;
    return `https://wa.me/+6282232529804?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="card-surface bg-accent/5 border-accent/20 p-8 md:p-10">
      <div className="flex items-center gap-2.5 mb-6">
        <Calculator size={16} className="text-accent" strokeWidth={1.5} />
        <span className="section-label">{t('calcTitle' as any)}</span>
      </div>
      
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="mono-meta block mb-3">{t('calcHoursLabel' as any)}</label>
            <input 
              type="number" 
              min="0"
              value={hours || ''} 
              onChange={(e) => setHours(Math.max(0, Number(e.target.value)))}
              placeholder="0"
              className="input-field font-display text-2xl font-semibold tracking-tight"
            />
          </div>
          <div>
            <label className="mono-meta block mb-3">{t('calcCurrencyLabel' as any)}</label>
            <div className="grid grid-cols-4 gap-2">
              {(['USD', 'IDR', 'EUR', 'GBP'] as const).map((cur) => (
                <button key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`py-2.5 rounded-md text-xs font-mono font-medium transition-all ${currency === cur ? 'bg-accent text-paper' : 'bg-paper-3 text-text hover:text-text-2 border border-border'}`}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="mono-meta block mb-3">{t('calcProjectBriefLabel' as any)}</label>
          <textarea 
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder={t('pricingProjectDescriptionPlaceholder' as any)}
            className="input-field min-h-[100px] resize-y"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="mono-meta block mb-3">{t('calcPlanLabel' as any)}</label>
            <select 
              value={paymentPlan}
              onChange={(e) => setPaymentPlan(e.target.value)}
              className="input-field appearance-none cursor-pointer"
            >
              <option value="1-100">{t('calcPlanSingle' as any)}</option>
              <option value="2-50-50">{t('calcPlanMilestones' as any)}</option>
              <option value="3-30-40-30">{t('calcPlanProgressive' as any)}</option>
              <option value="4-25-25-25-25">{t('calcPlanQuarters' as any)}</option>
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={payConsultationSeparate} 
                onChange={(e) => setPayConsultationSeparate(e.target.checked)}
                className="w-5 h-5 rounded border-border bg-paper-3 accent-accent transition-all cursor-pointer"
              />
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-text group-hover:text-text-2 transition-colors">{t('calcConsSeparate' as any)}</span>
            </label>
          </div>
        </div>

        {results && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="pt-6 border-t border-border space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card-surface p-4 flex items-center gap-3">
                <DollarSign size={16} className="text-accent shrink-0" />
                <div>
                  <p className="stat-label">{t('calcRateHr' as any)}</p>
                  <p className="stat-value !text-base">{formatValue(results.rateUSD)}</p>
                </div>
              </div>
              <div className="card-surface p-4 flex items-center gap-3">
                <Calendar size={16} className="text-accent shrink-0" />
                <div>
                  <p className="stat-label">{t('calcDuration' as any)}</p>
                  <p className="stat-value !text-base">{results.days} {language === 'id' ? 'HARI' : 'DAYS'}</p>
                </div>
              </div>
              <div className="card-surface bg-accent/10 border-accent/30 p-4 flex items-center gap-3">
                <Calculator size={16} className="text-accent shrink-0" />
                <div>
                  <p className="stat-label text-accent">{t('calcTotalEst' as any)}</p>
                  <p className="stat-value !text-base">{formatValue(results.projectTotalUSD + results.totalConsultationUSD)}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowReceipt(true)}
              className="btn-primary w-full !py-4"
            >
              <Receipt size={16} /> {t('calcGenReceipt' as any)}
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showReceipt && results && (
          <div id="printable-receipt-wrapper" className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-paper/80 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="card-surface max-w-lg w-full p-8 md:p-10 relative shadow-2xl"
            >
              <button 
                onClick={() => setShowReceipt(false)}
                className="absolute top-5 right-5 p-1.5 rounded-md hover:bg-paper-3 text-text hover:text-text-2 transition-colors"
              >
                <X size={18} />
              </button>

              <div id="printable-receipt" className="space-y-8">
                <div className="border-b border-border pb-6 flex justify-between items-end">
                  <div className="space-y-1">
                    <h2 className="heading-md">{t('receiptTitle' as any)}</h2>
                    <p className="mono-meta text-[0.5rem]">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="mono-meta text-[0.5rem]">{t('receiptDate' as any)}</p>
                    <p className="font-body text-sm text-text-2">{new Date().toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <p className="mono-meta text-accent">{t('receiptSpecs' as any)}</p>
                    <div className="space-y-1.5 text-sm text-text">
                      <div className="flex justify-between"><span className="text-text/50">HOURS:</span> <span className="text-text-2">{hours}</span></div>
                      <div className="flex justify-between"><span className="text-text/50">DURATION:</span> <span className="text-text-2">{results.days} {language === 'id' ? 'HARI' : 'DAYS'}</span></div>
                      <div className="flex justify-between"><span className="text-text/50">CURRENCY:</span> <span className="text-text-2">{currency}</span></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="mono-meta text-accent">{t('receiptFinancial' as any)}</p>
                    <div className="space-y-1.5 text-sm text-text">
                      <div className="flex justify-between"><span className="text-text/50">PROJECT:</span> <span className="text-text-2">{formatValue(results.projectTotalUSD)}</span></div>
                      <div className="flex justify-between"><span className="text-text/50">CONSULT:</span> <span className="text-text-2">{formatValue(results.totalConsultationUSD)}</span></div>
                      <div className="flex justify-between border-t border-border pt-2 mt-2 text-accent font-medium">
                        <span>TOTAL:</span> <span>{formatValue(results.projectTotalUSD + results.totalConsultationUSD)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {projectDescription && (
                  <div className="space-y-3">
                    <p className="mono-meta text-accent">{t('receiptBrief' as any)}</p>
                    <p className="text-sm-body bg-paper-3 p-4 rounded-md">{projectDescription}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-y border-border">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <p className="mono-meta">{t('receiptWhatsapp' as any)}</p>
                    <div className="p-3 bg-paper-3 rounded-md border border-border">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(getWhatsAppLink())}`}
                        alt="WhatsApp QR"
                        className="w-28 h-28"
                      />
                    </div>
                    <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="mono-meta text-accent text-[0.55rem] flex items-center gap-1.5 hover:underline">
                      OPEN WHATSAPP <ExternalLink size={10} />
                    </a>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3 text-center border-l border-border pl-6">
                    <p className="font-body text-sm text-text-2">{t('receiptReady' as any)}</p>
                    <div className="flex gap-3">
                      <button onClick={() => window.print()} className="chip hover:bg-accent hover:text-paper hover:border-accent">
                        <Printer size={14} />
                      </button>
                      <a href={`mailto:azzar.mr.zs@gmail.com?subject=Project Inquiry&body=${encodeURIComponent(projectDescription)}`} className="chip hover:bg-accent hover:text-paper hover:border-accent">
                        <Mail size={14} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="mono-meta text-[0.5rem]">{t('receiptFooter' as any)}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
