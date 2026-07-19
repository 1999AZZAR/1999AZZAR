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
  const [payMgmtSeparate, setPayMgmtSeparate] = useState(false);
  const [projectDescription, setProjectDescription] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);

  const [results, setResults] = useState<{
    rateUSD: number;
    projectTotalUSD: number;
    totalConsultationUSD: number;
    taxUSD: number;
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

    const projectTotalUSD = Math.max(Math.round(rateUSD * hours), 500);
    const mgmtFeeUSD = Math.round(projectTotalUSD * 0.15);
    const taxUSD = projectTotalUSD > 500 ? Math.round((projectTotalUSD + mgmtFeeUSD) * 0.11) : 0;
    const days = Math.ceil(hours / 8);

    const percentages = paymentPlan.split('-').slice(1).map(p => parseInt(p) / 100);
    let installments: { desc: string; amount: number; isMgmt: boolean }[] = [];

    if (payMgmtSeparate) {
      const engTotal = projectTotalUSD + taxUSD;
      percentages.forEach((pct, i) => {
        installments.push({
          desc: `${t('pricingPaymentProjectLabel' as any)} ${i + 1}`,
          amount: Math.round(engTotal * pct),
          isMgmt: false
        });
      });
      installments.push({
        desc: 'Management Fee',
        amount: mgmtFeeUSD,
        isMgmt: true
      });
    } else {
      const combinedTotal = projectTotalUSD + mgmtFeeUSD + taxUSD;
      percentages.forEach((pct, i) => {
        installments.push({
          desc: `${t('pricingPaymentProjectLabel' as any)} ${i + 1}`,
          amount: Math.round(combinedTotal * pct),
          isMgmt: false
        });
      });
    }

    setResults({
      rateUSD: Math.round(rateUSD),
      projectTotalUSD,
      totalConsultationUSD: mgmtFeeUSD,
      taxUSD,
      days,
      installments
    });
  }, [hours, paymentPlan, payMgmtSeparate, t]);

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
                  checked={payMgmtSeparate} 
                  onChange={(e) => setPayMgmtSeparate(e.target.checked)}
                  className="w-5 h-5 rounded border-border bg-paper-3 accent-accent transition-all cursor-pointer"
                />
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-text group-hover:text-text-2 transition-colors">Separate Mgmt Fee</span>
            </label>
          </div>
        </div>

        {results && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="pt-6 border-t border-border space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              {results.taxUSD > 0 && (
                <div className="card-surface p-4 flex items-center gap-3">
                  <Calculator size={16} className="text-accent shrink-0" />
                  <div>
                    <p className="stat-label">Tax (11%)</p>
                    <p className="stat-value !text-base">{formatValue(results.taxUSD)}</p>
                  </div>
                </div>
              )}
              <div className="card-surface bg-accent/10 border-accent/30 p-4 flex items-center gap-3">
                <Calculator size={16} className="text-accent shrink-0" />
                <div>
                  <p className="stat-label text-accent">{t('calcTotalEst' as any)}</p>
                  <p className="stat-value !text-base">{formatValue(results.projectTotalUSD + results.totalConsultationUSD + results.taxUSD)}</p>
                  {results.totalConsultationUSD > 0 && <p className="text-[0.55rem] font-mono text-accent">incl. 15% mgmt fee</p>}
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
              className="relative w-[92%] max-w-[420px]"
            >
              <button 
                onClick={() => setShowReceipt(false)}
                className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full bg-paper-3 border border-border flex items-center justify-center text-text hover:text-accent transition-colors"
              >
                <X size={14} />
              </button>

              <div id="printable-receipt" className="bg-[#fbfbf9] text-[#1a1a1a] font-mono relative pb-4 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                {/* Jagged top edge */}
                <div className="absolute -top-[10px] left-0 right-0 h-[10px] bg-repeat-x" style={{ backgroundImage: 'radial-gradient(circle at 50% 0, transparent 4px, #fbfbf9 5px)', backgroundSize: '10px 10px' }} />

                <div className="px-6 md:px-8 pt-8 pb-2 text-sm md:text-[13px] leading-relaxed">
                  {/* Header */}
                  <div className="text-center font-bold text-lg md:text-xl tracking-[0.2em] uppercase mb-1">
                    * AZZAR *
                  </div>
                  <p className="text-center text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">Project Estimate / {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                  
                  <div className="border-t-2 border-dashed border-gray-400 my-4"></div>
                  
                  {/* Ref */}
                  <div className="flex justify-between text-[11px] uppercase tracking-wider mb-4">
                    <span>Ref: #{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                    <span>{language === 'id' ? 'ESTIMASI' : 'ESTIMATE'}</span>
                  </div>

                  <div className="border-t-2 border-dashed border-gray-400 my-4"></div>

                  {/* Line items */}
                  <table className="w-full text-[12px] uppercase">
                    <thead>
                      <tr className="text-[9px] text-gray-500 tracking-[0.2em]">
                        <th className="font-normal pb-3 text-left">Item</th>
                        <th className="font-normal pb-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="py-2">Engineering ({hours}h &times; {formatValue(results.rateUSD)}/hr)</td><td className="py-2 text-right">{formatValue(results.projectTotalUSD)}</td></tr>
                      <tr><td className="py-2">Management Fee (15%)</td><td className="py-2 text-right">{formatValue(results.totalConsultationUSD)}</td></tr>
                      {results.taxUSD > 0 && <tr><td className="py-2">Tax (11%)</td><td className="py-2 text-right">{formatValue(results.taxUSD)}</td></tr>}
                    </tbody>
                  </table>

                  <div className="border-t-2 border-dashed border-gray-400 my-4"></div>

                  {/* Total */}
                  <div className="flex justify-between text-sm font-bold tracking-wider">
                    <span>TOTAL</span>
                    <span>{formatValue(results.projectTotalUSD + results.totalConsultationUSD + results.taxUSD)}</span>
                  </div>

                  <div className="border-t-2 border-dashed border-gray-400 my-4"></div>

                  {/* Installments */}
                  <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2">Payment Plan: {paymentPlan}</p>
                  <table className="w-full text-[11px] uppercase">
                    <tbody>
                      {results.installments.map((inst, idx) => (
                        <tr key={idx}>
                          <td className="py-1.5">{inst.desc}{inst.isMgmt ? ' (mgmt)' : ''}</td>
                          <td className="py-1.5 text-right">{formatValue(inst.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {projectDescription && (
                    <>
                      <div className="border-t-2 border-dashed border-gray-400 my-4"></div>
                      <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-1">Notes</p>
                      <p className="text-[11px] text-gray-700 italic leading-relaxed">{projectDescription}</p>
                    </>
                  )}

                  <div className="border-t-2 border-dashed border-gray-400 my-4"></div>

                  {/* Actions */}
                  <div className="flex justify-center gap-4 py-2">
                    <button onClick={() => window.print()} className="text-[9px] uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors">
                      <Printer size={14} className="inline mr-1" /> Print
                    </button>
                    <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="text-[9px] uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors">
                      <ExternalLink size={14} className="inline mr-1" /> WhatsApp
                    </a>
                    <a href={`mailto:azzar.mr.zs@gmail.com?subject=Project Estimate&body=${encodeURIComponent(projectDescription)}`} className="text-[9px] uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors">
                      <Mail size={14} className="inline mr-1" /> Email
                    </a>
                  </div>

                  <div className="border-t-2 border-dashed border-gray-400 my-4"></div>

                  {/* Footer */}
                  <div className="text-center text-[9px] text-gray-500 uppercase tracking-wider space-y-1">
                    <p>{t('receiptFooter' as any)}</p>
                  </div>

                  {/* Barcode */}
                  <div className="flex justify-center mt-6 px-4">
                    <div className="w-full h-10 opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(90deg, black 0, black 2px, transparent 2px, transparent 4px, black 4px, black 8px, transparent 8px, transparent 10px, black 10px, black 11px, transparent 11px, transparent 14px)' }} />
                  </div>
                  <div className="text-center text-[10px] mt-1 tracking-[0.6em] font-bold text-gray-600">AZZAR-EST</div>
                </div>

                {/* Jagged bottom edge */}
                <div className="absolute -bottom-[10px] left-0 right-0 h-[10px] bg-repeat-x" style={{ backgroundImage: 'radial-gradient(circle at 50% 10px, transparent 4px, #fbfbf9 5px)', backgroundSize: '10px 10px' }} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
