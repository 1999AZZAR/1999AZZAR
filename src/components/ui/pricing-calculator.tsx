'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Calculator, Calendar, DollarSign, User, Briefcase, 
  Receipt, X, Send, Mail, Download, Printer, ExternalLink
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

  // Results State
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

    const Rmax = 35;
    const Rmin = 20;
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
        const roundedFee = Math.round(fee);
        consultationFees.push(roundedFee);
        totalConsultationUSD += roundedFee;
    }

    const projectTotalUSD = Math.max(rateUSD * hours, 250);
    const days = Math.ceil(hours / 8);

    const percentages = paymentPlan.split('-').slice(1).map(p => parseInt(p) / 100);
    let installments: { desc: string; amount: number; isConsultation: boolean }[] = [];

    if (payConsultationSeparate && numConsultationFees > 0) {
      percentages.forEach((pct, i) => {
        installments.push({
          desc: `Project Payment ${i + 1}`,
          amount: projectTotalUSD * pct,
          isConsultation: false
        });
      });
      consultationFees.forEach((fee, i) => {
        installments.push({
          desc: `Consultation Fee ${i + 1}`,
          amount: fee,
          isConsultation: true
        });
      });
    } else {
      const combinedTotal = projectTotalUSD + totalConsultationUSD;
      percentages.forEach((pct, i) => {
        installments.push({
          desc: `Payment ${i + 1}`,
          amount: combinedTotal * pct,
          isConsultation: false
        });
      });
    }

    setResults({
      rateUSD,
      projectTotalUSD,
      totalConsultationUSD,
      days,
      installments
    });
  }, [hours, paymentPlan, payConsultationSeparate]);

  const formatValue = (usdAmount: number) => {
    const converted = usdAmount * exchangeRates[currency];
    return new Intl.NumberFormat(currency === 'IDR' ? 'id-ID' : 'en-US', {
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
    <div className="p-8 md:p-12 bg-card border-[6px] border-foreground shadow-[20px_20px_0px_0px_rgba(42,37,32,1)] relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 text-accent">
           <Calculator size={24} strokeWidth={3} />
           <span className="text-xs font-black uppercase tracking-[0.3em] italic">Project_Estimator_v3.0</span>
        </div>
      </div>
      
      <div className="space-y-10">
        {/* INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-[11px] font-black uppercase tracking-[0.2em] mb-4 italic">Hours_Quantity</label>
            <input 
              type="number" 
              value={hours || ''} 
              onChange={(e) => setHours(Number(e.target.value))}
              placeholder="0.00"
              className="w-full bg-background border-4 border-foreground p-6 focus:outline-none focus:bg-accent focus:text-background transition-all font-black text-4xl italic tracking-tighter"
            />
          </div>
          <div>
            <label className="block text-[11px] font-black uppercase tracking-[0.2em] mb-4 italic">Currency</label>
            <div className="grid grid-cols-2 gap-2">
              {(['USD', 'IDR', 'EUR', 'GBP'] as const).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`py-3 text-sm font-black italic border-4 border-foreground transition-all ${currency === cur ? 'bg-accent text-background border-accent' : 'bg-background hover:bg-foreground hover:text-background'}`}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-black uppercase tracking-[0.2em] mb-4 italic">Project_Brief (Optional)</label>
          <textarea 
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder={t('pricingProjectDescriptionPlaceholder' as any)}
            className="w-full bg-background border-4 border-foreground p-6 min-h-[120px] focus:outline-none focus:border-accent transition-all font-sans font-bold text-sm uppercase italic"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-[11px] font-black uppercase tracking-[0.2em] mb-4 italic">Payment_Plan</label>
            <select 
              value={paymentPlan}
              onChange={(e) => setPaymentPlan(e.target.value)}
              className="w-full bg-background border-4 border-foreground p-4 font-black italic uppercase text-xs outline-none focus:bg-foreground focus:text-background transition-all"
            >
              <option value="1-100">Single Payment (100%)</option>
              <option value="2-50-50">Milestones (50/50)</option>
              <option value="3-30-40-30">Progressive (30/40/30)</option>
              <option value="4-25-25-25-25">Quarters (25x4)</option>
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-4 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={payConsultationSeparate} 
                onChange={(e) => setPayConsultationSeparate(e.target.checked)}
                className="w-8 h-8 border-4 border-foreground rounded-none appearance-none checked:bg-accent transition-all cursor-pointer"
              />
              <span className="text-[11px] font-black uppercase italic group-hover:text-accent transition-colors">Separate Consultation Fees</span>
            </label>
          </div>
        </div>

        {/* RESULTS */}
        {results && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-10 border-t-4 border-foreground/10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-background border-2 border-foreground flex items-center gap-4">
                <DollarSign size={20} className="text-accent" />
                <div>
                  <p className="text-[9px] font-black text-muted-foreground uppercase italic">Rate/Hr</p>
                  <p className="text-xl font-black italic">{formatValue(results.rateUSD)}</p>
                </div>
              </div>
              <div className="p-4 bg-background border-2 border-foreground flex items-center gap-4">
                <Calendar size={20} className="text-accent" />
                <div>
                  <p className="text-[9px] font-black text-muted-foreground uppercase italic">Duration</p>
                  <p className="text-xl font-black italic">{results.days} DAYS</p>
                </div>
              </div>
              <div className="p-4 bg-foreground text-background border-2 border-foreground flex items-center gap-4">
                <Calculator size={20} className="text-accent" />
                <div>
                  <p className="text-[9px] font-black text-accent uppercase italic">Total_Est</p>
                  <p className="text-xl font-black italic">
                    {formatValue(results.projectTotalUSD + results.totalConsultationUSD)}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowReceipt(true)}
              className="w-full bg-accent text-background py-6 font-black italic uppercase text-sm tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-foreground transition-all shadow-[8px_8px_0px_0px_rgba(26,24,20,1)]"
            >
              <Receipt size={20} /> GENERATE_PROJECT_RECEIPT_
            </button>
          </motion.div>
        )}
      </div>

      {/* RECEIPT MODAL */}
      <AnimatePresence>
        {showReceipt && results && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-foreground/90 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background border-[12px] border-foreground max-w-2xl w-full p-8 md:p-16 relative shadow-2xl"
            >
              <button 
                onClick={() => setShowReceipt(false)}
                className="absolute top-8 right-8 p-2 hover:text-accent transition-colors"
              >
                <X size={32} strokeWidth={3} />
              </button>

              <div id="printable-receipt" className="space-y-12">
                 {/* Header */}
                 <div className="border-b-4 border-foreground pb-8 flex justify-between items-end">
                    <div className="space-y-2">
                       <h2 className="text-4xl font-black italic uppercase tracking-tighter">PROJECT_RECEIPT</h2>
                       <p className="text-[10px] font-black opacity-50 uppercase tracking-widest">NO. #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-50">DATE_ISSUED</p>
                       <p className="font-sans font-black italic">{new Date().toLocaleDateString()}</p>
                    </div>
                 </div>

                 {/* Content */}
                 <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-4">
                       <p className="text-[10px] font-black uppercase tracking-widest text-accent italic">01 // PROJECT_SPECS</p>
                       <div className="space-y-2 text-sm font-bold uppercase italic">
                          <div className="flex justify-between"><span>HOURS:</span> <span>{hours}</span></div>
                          <div className="flex justify-between"><span>DURATION:</span> <span>{results.days} DAYS</span></div>
                          <div className="flex justify-between"><span>CURRENCY:</span> <span>{currency}</span></div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <p className="text-[10px] font-black uppercase tracking-widest text-accent italic">02 // FINANCIAL_DATA</p>
                       <div className="space-y-2 text-sm font-bold uppercase italic">
                          <div className="flex justify-between"><span>PROJECT:</span> <span>{formatValue(results.projectTotalUSD)}</span></div>
                          <div className="flex justify-between"><span>CONSULT:</span> <span>{formatValue(results.totalConsultationUSD)}</span></div>
                          <div className="flex justify-between border-t-2 border-foreground pt-2 mt-2 text-accent">
                             <span>TOTAL:</span> <span>{formatValue(results.projectTotalUSD + results.totalConsultationUSD)}</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 {projectDescription && (
                    <div className="space-y-4">
                       <p className="text-[10px] font-black uppercase tracking-widest text-accent italic">03 // PROJECT_DESCRIPTION_</p>
                       <p className="font-serif italic text-sm text-foreground/80 leading-relaxed border-2 border-border p-4 bg-white">
                          {projectDescription}
                       </p>
                    </div>
                 )}

                 {/* QR Codes Section */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y-4 border-foreground/10">
                    <div className="flex flex-col items-center gap-4 text-center">
                       <p className="text-[9px] font-black uppercase tracking-widest italic">CHANNEL_WHATSAPP</p>
                       <div className="p-4 bg-white border-2 border-foreground">
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(getWhatsAppLink())}`}
                            alt="WhatsApp QR"
                            className="w-32 h-32"
                          />
                       </div>
                       <a href={getWhatsAppLink()} target="_blank" className="text-[10px] font-black uppercase italic underline flex items-center gap-2">
                          OPEN_WHATSAPP <ExternalLink size={12} />
                       </a>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4 text-center border-l-2 border-foreground/10 pl-8">
                       <p className="text-xs font-black uppercase italic leading-tight">Ready to initiate development?</p>
                       <p className="text-[10px] font-bold uppercase italic opacity-50">Project commences upon initial milestone clearance.</p>
                       <div className="flex gap-4">
                          <button onClick={() => window.print()} className="p-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-all">
                             <Printer size={20} />
                          </button>
                          <a href={`mailto:azzar.mr.zs@gmail.com?subject=Project Inquiry&body=${encodeURIComponent(projectDescription)}`} className="p-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-all">
                             <Mail size={20} />
                          </a>
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.5em] italic text-muted-foreground">
                       ENGINEERED BY AZZAR BUDIYANTO // EST. 1999
                    </p>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}