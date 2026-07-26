'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight, Mail, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const projectTypeValues = ['web', 'iot', 'automation', 'ai-data', 'consulting', 'training', 'custom'] as const;

const copy = {
  en: {
    label: 'Project_Brief',
    title: 'Tell me about the project.',
    intro: 'Share the essentials. This will open a prepared email in your mail app for review before sending.',
    name: 'Name / Client',
    email: 'Email',
    type: 'Project type',
    typePlaceholder: 'Select a project type',
    types: ['Web application', 'IoT / Embedded system', 'Automation', 'AI / Data', 'Consulting', 'Training', 'Custom'],
    customType: 'Custom project type',
    budget: 'Budget range',
    budgetPlaceholder: 'Select a budget range',
    budgets: ['USD 500 - 1,000', 'USD 1,000 - 3,000', 'USD 3,000 - 10,000', 'USD 10,000+', 'Not sure yet'],
    timeline: 'Timeline',
    timelinePlaceholder: 'e.g. 6-8 weeks or launch by October',
    description: 'Project description',
    descriptionPlaceholder: 'What are you building, who is it for, and what outcome do you need?',
    submit: 'Prepare email',
    note: 'Opens your default email application. Nothing is stored on this website.',
    subject: 'New project brief',
  },
  id: {
    label: 'Brief_Proyek',
    title: 'Ceritakan proyek Anda.',
    intro: 'Bagikan informasi utamanya. Email yang sudah disiapkan akan dibuka di aplikasi email Anda untuk ditinjau sebelum dikirim.',
    name: 'Nama / Klien',
    email: 'Email',
    type: 'Jenis proyek',
    typePlaceholder: 'Pilih jenis proyek',
    types: ['Aplikasi web', 'IoT / Sistem tertanam', 'Otomasi', 'AI / Data', 'Konsultasi', 'Pelatihan', 'Kustom'],
    customType: 'Jenis proyek kustom',
    budget: 'Rentang anggaran',
    budgetPlaceholder: 'Pilih rentang anggaran',
    budgets: ['USD 500 - 1.000', 'USD 1.000 - 3.000', 'USD 3.000 - 10.000', 'USD 10.000+', 'Belum yakin'],
    timeline: 'Linimasa',
    timelinePlaceholder: 'contoh: 6-8 minggu atau rilis sebelum Oktober',
    description: 'Deskripsi proyek',
    descriptionPlaceholder: 'Apa yang ingin dibuat, untuk siapa, dan hasil apa yang dibutuhkan?',
    submit: 'Siapkan email',
    note: 'Membuka aplikasi email bawaan Anda. Tidak ada data yang disimpan di situs ini.',
    subject: 'Brief proyek baru',
  },
} as const;

export default function ProjectBrief() {
  const { language } = useLanguage();
  const text = copy[language];
  const [projectType, setProjectType] = useState('');
  const isCustom = projectType === 'custom';

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const clientName = String(form.get('name') || '').trim();
    const customType = String(form.get('customType') || '').trim();
    const typeIndex = projectTypeValues.indexOf(projectType as typeof projectTypeValues[number]);
    const resolvedType = isCustom ? customType : text.types[typeIndex];
    const body = [
      `Name / client: ${clientName}`,
      `Email: ${String(form.get('email') || '').trim()}`,
      `Project type: ${resolvedType}`,
      `Budget range: ${String(form.get('budget') || '').trim()}`,
      `Timeline: ${String(form.get('timeline') || '').trim()}`,
      '',
      'Project description:',
      String(form.get('description') || '').trim(),
    ].join('\n');

    window.location.href = `mailto:azzar.budi@gmail.com?subject=${encodeURIComponent(`${text.subject}: ${clientName}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section aria-labelledby="project-brief-title" className="section-spacing border-t border-border pt-16 md:pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <span className="section-label">{text.label}</span>
          <h2 id="project-brief-title" className="heading-lg mt-4 mb-5">{text.title}</h2>
          <p className="text-sm-body max-w-sm">{text.intro}</p>
        </div>

        <form onSubmit={prepareEmail} className="lg:col-span-8 card-surface p-6 md:p-10" aria-describedby="project-brief-note">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={text.name} htmlFor="brief-name">
              <input id="brief-name" name="name" className="input-field" autoComplete="name" maxLength={100} required />
            </Field>
            <Field label={text.email} htmlFor="brief-email">
              <input id="brief-email" name="email" type="email" className="input-field" autoComplete="email" maxLength={254} required />
            </Field>
            <Field label={text.type} htmlFor="brief-type">
              <select id="brief-type" name="projectType" className="input-field" value={projectType} onChange={(event) => setProjectType(event.target.value)} required>
                <option value="" disabled>{text.typePlaceholder}</option>
                {text.types.map((type, index) => <option key={projectTypeValues[index]} value={projectTypeValues[index]}>{type}</option>)}
              </select>
            </Field>
            <Field label={text.budget} htmlFor="brief-budget">
              <select id="brief-budget" name="budget" className="input-field" defaultValue="" required>
                <option value="" disabled>{text.budgetPlaceholder}</option>
                {text.budgets.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
              </select>
            </Field>
            {isCustom && (
              <Field label={text.customType} htmlFor="brief-custom-type" className="md:col-span-2">
                <input id="brief-custom-type" name="customType" className="input-field" maxLength={100} required />
              </Field>
            )}
            <Field label={text.timeline} htmlFor="brief-timeline" className="md:col-span-2">
              <input id="brief-timeline" name="timeline" className="input-field" placeholder={text.timelinePlaceholder} maxLength={120} required />
            </Field>
            <Field label={text.description} htmlFor="brief-description" className="md:col-span-2">
              <textarea id="brief-description" name="description" className="input-field min-h-40 resize-y" placeholder={text.descriptionPlaceholder} maxLength={1200} required />
            </Field>
          </div>

          <div className="mt-7 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center gap-5 sm:justify-between">
            <p id="project-brief-note" className="mono-meta normal-case tracking-normal max-w-md flex items-start gap-2">
              <Mail size={14} className="text-accent shrink-0 mt-0.5" aria-hidden="true" /> {text.note}
            </p>
            <button type="submit" className="btn-primary min-h-11 shrink-0">
              <Send size={14} aria-hidden="true" /> {text.submit} <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, htmlFor, className = '', children }: { label: string; htmlFor: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mono-meta block mb-2">{label}</label>
      {children}
    </div>
  );
}
