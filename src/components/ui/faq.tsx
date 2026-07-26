'use client';

import { ChevronDown, CircleHelp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const questions = {
  en: [
    ['What kinds of projects do you take on?', 'Web applications, APIs, automation, IoT and embedded systems, AI integrations, technical consulting, and focused training. If your project crosses several of these areas, that is usually a good fit.'],
    ['What happens after I send a brief?', 'I review the goals, constraints, budget, and timeline, then reply by email with questions or a proposed next step.'],
    ['Can you work with an existing product or codebase?', 'Yes. I can audit, repair, extend, or modernize an existing system. Access and technical constraints are reviewed before scope is confirmed.'],
    ['How do pricing and payments work?', 'Rates depend on scope, risk, and duration. Projects start at USD 500, with milestones and payment terms agreed before development begins.'],
    ['Do you work remotely and internationally?', 'Yes. I am based in Indonesia and work remotely with clients worldwide. Async updates are the default, with calls when they are useful.'],
  ],
  id: [
    ['Proyek seperti apa yang Anda kerjakan?', 'Aplikasi web, API, otomasi, IoT dan sistem tertanam, integrasi AI, konsultasi teknis, serta pelatihan terfokus. Proyek lintas beberapa bidang tersebut biasanya sangat cocok.'],
    ['Apa yang terjadi setelah saya mengirim brief?', 'Saya meninjau tujuan, batasan, anggaran, dan linimasa, lalu membalas melalui email dengan pertanyaan atau usulan langkah berikutnya.'],
    ['Bisakah Anda mengerjakan produk atau codebase yang sudah ada?', 'Bisa. Saya dapat mengaudit, memperbaiki, mengembangkan, atau memodernisasi sistem yang ada. Akses dan batasan teknis ditinjau sebelum ruang lingkup disepakati.'],
    ['Bagaimana sistem harga dan pembayarannya?', 'Harga bergantung pada ruang lingkup, risiko, dan durasi. Nilai proyek mulai dari USD 500, dengan milestone dan ketentuan pembayaran yang disepakati sebelum pengembangan dimulai.'],
    ['Apakah Anda menerima proyek remote dan internasional?', 'Ya. Saya berbasis di Indonesia dan bekerja remote dengan klien di seluruh dunia. Pembaruan asinkron menjadi standar, dengan panggilan saat memang berguna.'],
  ],
} as const;

export default function FAQ() {
  const { language } = useLanguage();
  const heading = language === 'id' ? 'PERTANYAAN YANG SERING DIAJUKAN.' : 'QUESTIONS, ANSWERED.';
  const label = language === 'id' ? 'Tanya_Jawab' : 'Q_And_A';

  return (
    <section aria-labelledby="faq-title" className="section-spacing border-t border-border pt-16 md:pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <CircleHelp size={16} className="text-accent" strokeWidth={1.5} aria-hidden="true" />
            <span className="section-label">{label}</span>
          </div>
          <h2 id="faq-title" className="heading-lg mt-4">{heading}</h2>
        </div>
        <div className="lg:col-span-8 border-t border-border">
          {questions[language].map(([question, answer], index) => (
            <details key={question} className="group border-b border-border">
              <summary className="min-h-16 py-5 flex items-center gap-5 cursor-pointer list-none focus-visible:outline-2">
                <span className="mono-meta text-accent">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-base md:text-lg text-text-2 flex-1">{question}</h3>
                <ChevronDown size={17} className="text-text/50 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="text-sm-body pl-12 pr-8 pb-6 max-w-2xl">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
