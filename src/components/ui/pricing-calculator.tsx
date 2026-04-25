'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Calculator, Calendar, DollarSign, User, Briefcase } from 'lucide-react';

export default function PricingCalculator() {
  const { t } = useLanguage();
  const [hours, setHours] = useState<number>(0);
  const [currency, setCurrency] = useState<'USD' | 'IDR' | 'EUR' | 'GBP'>('USD');
  const [paymentPlan, setPaymentPlan] = useState('2-50-50'); // Default: 2 installments
  const [payConsultationSeparate, setPayConsultationSeparate] = useState(false);

  // Results State
  const [results, setResults] = useState<{
    rateUSD: number;
    projectTotalUSD: number;
    totalConsultationUSD: number;
    days: number;
    installments: { desc: string; amount: number; isConsultation: boolean }[];
  } | null>(null);

  // Fixed conversion rates (In real app, fetch these)
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

    // Original Pricing Constants
    const Rmax = 35;   // Max rate ($)
    const Rmin = 20;   // Min rate ($)
    const Hmin = 8;    // Min hours for max rate
    const Hmax = 208;  // Max hours for min rate

    // 1. Calculate Rate
    let rateUSD;
    if (hours <= Hmin) rateUSD = Rmax;
    else if (hours >= Hmax) rateUSD = Rmin;
    else rateUSD = Rmax - ((Rmax - Rmin) / (Hmax - Hmin)) * (hours - Hmin);

    // 2. Calculate Consultation Fees (every 30 hours = 1 fee)
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

    // 3. Project Total (Min $250)
    const projectTotalUSD = Math.max(rateUSD * hours, 250);
    const days = Math.ceil(hours / 8);

    // 4. Installments
    const percentages = paymentPlan.split('-').slice(1).map(p => parseInt(p) / 100);
    let installments: { desc: string; amount: number; isConsultation: boolean }[] = [];

    if (payConsultationSeparate && numConsultationFees > 0) {
      // Split Project Cost
      percentages.forEach((pct, i) => {
        installments.push({
          desc: `Project Payment ${i + 1}`,
          amount: projectTotalUSD * pct,
          isConsultation: false
        });
      });
      // Separate Consultation
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

  return (
    <div className="p-12 bg-card border-[6px] border-foreground shadow-[20px_20px_0px_0px_rgba(42,37,32,1)] relative overflow-hidden">
      <div className="flex items-center gap-3 text-accent mb-8">
         <Calculator size={24} strokeWidth={3} />
         <span className="text-xs font-black uppercase tracking-[0.3em] italic">Project_Estimator_v2.0</span>
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
          <div className="pt-10 border-t-4 border-foreground/10 space-y-8">
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

            {/* BREAKDOWN */}
            <div className="space-y-4">
               <h4 className="text-[11px] font-black uppercase italic tracking-widest text-accent">Payment_Breakdown_</h4>
               <div className="grid grid-cols-1 gap-2">
                 {results.installments.map((inst, i) => (
                   <div key={i} className={`p-4 border-2 border-foreground flex justify-between items-center ${inst.isConsultation ? 'bg-accent/10 border-accent italic' : 'bg-background'}`}>
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-foreground text-background text-[10px] flex items-center justify-center font-black">{i+1}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          {inst.isConsultation ? <User size={14} /> : <Briefcase size={14} />}
                          {inst.desc}
                        </span>
                      </div>
                      <span className="text-lg font-black italic tracking-tighter">{formatValue(inst.amount)}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}