'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  Cpu, Code, Database, Brain, Globe, 
  ShieldCheck, Terminal, Server, Layout, Settings, 
  Activity, Zap, Camera, Music, Film, Tv, Book, Plane,
  FileText, Calendar, Briefcase, ArrowUpRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

export default function AboutPage() {
  const { t } = useLanguage();
  const [ageInDays, setAgeInDays] = useState<number>(0);

  useEffect(() => {
    const birthDate = new Date('1999-10-09');
    const updateAge = () => {
      const today = new Date();
      const diff = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
      setAgeInDays(diff);
    };
    updateAge();
    const timer = setInterval(updateAge, 86400000);
    return () => clearInterval(timer);
  }, []);

  const skillCategories = [
    { id: "prog", icon: <Code size={20} />, titleKey: "progLanguagesTitle" },
    { id: "web", icon: <Globe size={20} />, titleKey: "webdevStackTitle" },
    { id: "iot", icon: <Cpu size={20} />, titleKey: "embeddedIotTitle" },
    { id: "ctrl", icon: <Settings size={20} />, titleKey: "controlSystemsTitle" },
    { id: "devops", icon: <Server size={20} />, titleKey: "devopsCloudTitle" },
    { id: "ai", icon: <Brain size={20} />, titleKey: "aiMlTitle" },
    { id: "gui", icon: <Layout size={20} />, titleKey: "guiDevTitle" },
    { id: "db", icon: <Database size={20} />, titleKey: "databaseMgmtTitle" },
    { id: "os", icon: <Terminal size={20} />, titleKey: "osToolsTitle" },
  ];

  const experiences = [
    { key: "LeadDev", company: "PT. TURGA BERKAH KUBRA", period: "2026/01 — PRESENT", achievements: ["expLeadDev1", "expLeadDev2", "expLeadDev3", "expLeadDev4", "expLeadDev5"] },
    { key: "Freelancer", company: "Self-employed", period: "2018/10 — PRESENT", achievements: ["expFreelancer1", "expFreelancer2", "expFreelancer3", "expFreelancer4", "expFreelancer5", "expFreelancer8", "expFreelancer9"] },
    { key: "Trainer", company: "Indobot Academy", period: "2022/01 — 2023/01", achievements: ["expTrainer1", "expTrainer2", "expTrainer3", "expTrainer4"] },
    { key: "Photographer", company: "Lembaran Kasih", period: "2020/09 — 2021/09", achievements: ["expPhotographer1", "expPhotographer2", "expPhotographer3", "expPhotographer4"] },
    { key: "Ambassador", company: "cicil.co.id", period: "2020/01 — 2021/04", achievements: ["expAmbassador1", "expAmbassador2"] },
  ];

  const interests = [
    { icon: <Code size={18} />, key: "interestPython" },
    { icon: <Cpu size={18} />, key: "interestMcu" },
    { icon: <Layout size={18} />, key: "interestUiux" },
    { icon: <Zap size={18} />, key: "interestAutomation" },
    { icon: <Camera size={18} />, key: "interestPhoto" },
    { icon: <Activity size={18} />, key: "interestComputer" },
    { icon: <Settings size={18} />, key: "interestRobot" },
    { icon: <Music size={18} />, key: "interestMusic" },
    { icon: <Film size={18} />, key: "interestFilms" },
    { icon: <Tv size={18} />, key: "interestAnime" },
    { icon: <Book size={18} />, key: "interestReading" },
    { icon: <Plane size={18} />, key: "interestTravel" },
  ];

  return (
    <main className="page-container">
      {/* IDENTITY */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible" className="section-spacing border-b border-border pb-16 md:pb-20">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="section-label">{t('aboutIdentityTitle' as any)}</span>
        </div>
        
        <h1 className="heading-xl mb-12" dangerouslySetInnerHTML={{ __html: t('aboutEngineerHeadline' as any) }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-8">
            <p className="heading-md italic font-[400] text-text leading-snug">
              &ldquo;{t('aboutBlueprintQuote' as any)}&rdquo;
            </p>
            
            <div className="text-sm-body space-y-4" dangerouslySetInnerHTML={{ __html: t('summaryText' as any) }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card-surface p-5 flex items-center gap-4">
                <Calendar size={18} className="text-accent shrink-0" />
                <div>
                  <p className="stat-label">{t('aboutOperationalAge' as any)}</p>
                  <p className="stat-value">{ageInDays.toLocaleString()} <span className="mono-meta text-[0.55rem]">{t('aboutDays' as any)}</span></p>
                </div>
              </div>
              <div className="card-surface p-5 flex items-center gap-4">
                <Briefcase size={18} className="text-accent shrink-0" />
                <div>
                  <p className="stat-label">{t('aboutStatusLabel' as any)}</p>
                  <p className="stat-value text-accent">{t('freelanceStatus' as any)}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="/cv/" target="_blank" rel="noopener noreferrer" className="btn-primary">
                {t('aboutDownloadCV' as any)} <FileText size={14} />
              </a>
              <a href="/porto_photo_azzar.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                {t('aboutPhotoPorto' as any)} <Camera size={14} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-square rounded-lg overflow-hidden border border-border bg-paper-3">
              <img src="/azzar.png" alt="Azzar Budiyanto" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* SKILLS */}
      <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-spacing">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-6 border-b border-border mb-10">
          <div>
            <span className="section-label">{t('aboutCoreCompetencies' as any)}</span>
            <h2 className="heading-lg mt-1" dangerouslySetInnerHTML={{ __html: t('aboutTechStack' as any) }} />
          </div>
        </div>

        <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div key={i} variants={fadeUp} className="card-surface p-6 space-y-4">
              <div className="w-10 h-10 rounded-md bg-accent/10 text-accent flex items-center justify-center">
                {cat.icon}
              </div>
              <h3 className="heading-md !text-base">
                {t(cat.titleKey as any)}
              </h3>
              <p className="text-sm-body text-text/70">
                {t((cat.titleKey.replace('Title', 'Desc')) as any)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* EXPERIENCE */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-spacing">
        <div className="pb-6 border-b border-border mb-10">
          <span className="section-label">{t('aboutTimelineTitle' as any)}</span>
        </div>
        
        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="card-surface p-8 space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="heading-md">{exp.key}</h3>
                  <p className="mono-meta text-[0.6rem] mt-1">{exp.company}</p>
                </div>
                <span className="mono-meta text-accent shrink-0">{exp.period}</span>
              </div>
              <ul className="space-y-2">
                {exp.achievements.map((ach, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-sm-body text-text/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    {t(ach as any)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* INTERESTS */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-spacing">
        <div className="pb-6 border-b border-border mb-10">
          <span className="section-label">{t('aboutHumanInterests' as any)}</span>
          <h2 className="heading-lg mt-1" dangerouslySetInnerHTML={{ __html: t('aboutPersonalTitle' as any) }} />
        </div>

        <motion.div variants={stagger} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {interests.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="card-surface p-5 flex flex-col items-center text-center gap-3 hover:bg-accent/10 hover:border-accent transition-all group cursor-default"
            >
              <div className="text-text group-hover:text-accent transition-colors">{item.icon}</div>
              <span className="text-[0.6rem] font-mono uppercase tracking-wider text-text/70 group-hover:text-accent transition-colors leading-tight">
                {t(item.key as any)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </main>
  );
}
