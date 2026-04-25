'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  Cpu, Code, Database, Brain, ArrowDownCircle, Globe, 
  ShieldCheck, Terminal, Server, Layout, Settings, 
  Activity, Zap, Camera, Music, Film, Tv, Book, Plane,
  FileText, Calendar, Briefcase
} from 'lucide-react';
import { useState, useEffect } from 'react';

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
    { id: "prog", icon: <Code />, titleKey: "progLanguagesTitle" },
    { id: "web", icon: <Globe />, titleKey: "webdevStackTitle" },
    { id: "iot", icon: <Cpu />, titleKey: "embeddedIotTitle" },
    { id: "ctrl", icon: <Settings />, titleKey: "controlSystemsTitle" },
    { id: "devops", icon: <Server />, titleKey: "devopsCloudTitle" },
    { id: "ai", icon: <Brain />, titleKey: "aiMlTitle" },
    { id: "gui", icon: <Layout />, titleKey: "guiDevTitle" },
    { id: "db", icon: <Database />, titleKey: "databaseMgmtTitle" },
    { id: "os", icon: <Terminal />, titleKey: "osToolsTitle" },
  ];

  const experiences = [
    { key: "Freelancer", company: "Self-employed", period: "2018/10 — PRESENT", achievements: ["expFreelancer1", "expFreelancer2", "expFreelancer3", "expFreelancer4", "expFreelancer5", "expFreelancer8", "expFreelancer9"] },
    { key: "Trainer", company: "Indobot Academy", period: "2022/01 — 2023/01", achievements: ["expTrainer1", "expTrainer2", "expTrainer3", "expTrainer4"] },
    { key: "Photographer", company: "Lembaran Kasih", period: "2020/09 — 2021/09", achievements: ["expPhotographer1", "expPhotographer2", "expPhotographer3", "expPhotographer4"] },
    { key: "Ambassador", company: "cicil.co.id", period: "2020/01 — 2021/04", achievements: ["expAmbassador1", "expAmbassador2"] },
  ];

  const interests = [
    { icon: <Code />, key: "interestPython" },
    { icon: <Cpu />, key: "interestMcu" },
    { icon: <Layout />, key: "interestUiux" },
    { icon: <Zap />, key: "interestAutomation" },
    { icon: <Camera />, key: "interestPhoto" },
    { icon: <Activity />, key: "interestComputer" },
    { icon: <Settings />, key: "interestRobot" },
    { icon: <Music />, key: "interestMusic" },
    { icon: <Film />, key: "interestFilms" },
    { icon: <Tv />, key: "interestAnime" },
    { icon: <Book />, key: "interestReading" },
    { icon: <Plane />, key: "interestTravel" },
  ];

  return (
    <main className="min-h-screen pt-40 pb-24 px-6 max-w-7xl mx-auto">
      {/* IDENTITY SECTION */}
      <section className="mb-32 border-b-[16px] border-foreground pb-16">
        <div className="flex items-center gap-3 text-accent mb-8">
          <ArrowDownCircle size={24} strokeWidth={3} />
          <span className="text-xs font-black uppercase tracking-[0.4em] italic">Biographical_Data</span>
        </div>
        
        <h1 className="headline-main mb-16">
          THE<br />ENGINEER<span className="text-accent">.</span>
        </h1>

        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="text-3xl md:text-5xl font-black italic text-foreground leading-[1.1] uppercase tracking-tighter mb-12">
              "Blending engineering precision with creative problem-solving to build connected systems."
            </div>
            
            <div className="text-xl font-bold text-muted-foreground italic uppercase leading-relaxed space-y-8 mb-12">
              <p>{t('summaryText' as any)}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
               <div className="p-4 bg-background border-2 border-foreground flex items-center gap-4">
                  <Calendar size={20} className="text-accent" />
                  <div>
                    <p className="text-[9px] font-black uppercase opacity-50">Operational_Age</p>
                    <p className="text-xl font-black italic tracking-tighter">{ageInDays.toLocaleString()} DAYS</p>
                  </div>
               </div>
               <div className="p-4 bg-background border-2 border-foreground flex items-center gap-4">
                  <Briefcase size={20} className="text-accent" />
                  <div>
                    <p className="text-[9px] font-black uppercase opacity-50">Status</p>
                    <p className="text-xl font-black italic tracking-tighter text-accent uppercase">{t('freelanceStatus' as any)}</p>
                  </div>
               </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <a href="/rcv_en_azzar.pdf" target="_blank" className="btn-swiss-primary !w-fit group">
                DOWNLOAD FULL_CV.PDF <FileText size={20} className="group-hover:rotate-12 transition-transform" />
              </a>
              <a href="/porto_photo_azzar.pdf" target="_blank" className="btn-swiss-outline !w-fit group">
                PHOTO_PORTFOLIO.PDF <Camera size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="aspect-square bg-accent border-[12px] border-foreground shadow-[24px_24px_0px_0px_rgba(42,37,32,1)] relative overflow-hidden group">
               <img src="/azzar.png" alt="Azzar Budiyanto" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute top-6 left-6 px-4 py-2 bg-foreground text-background font-black text-xs tracking-widest uppercase italic">EST. 1999</div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 pb-12 border-b-8 border-foreground mb-16">
          <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">TECH_STACK<span className="text-accent">.</span></h2>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-accent italic pb-2">Core Competencies</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, i) => (
            <div key={i} className="p-8 bg-card border-4 border-foreground shadow-[10px_10px_0px_0px_rgba(139,26,26,1)] space-y-6 flex flex-col h-full group hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 bg-foreground text-background flex items-center justify-center group-hover:bg-accent transition-colors">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter">
                {t(cat.titleKey as any)}
              </h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase italic leading-relaxed tracking-wider">
                {t((cat.titleKey.replace('Title', 'Desc')) as any)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="mb-32">
        <div className="flex items-center gap-3 text-accent mb-12">
          <span className="text-xs font-black uppercase tracking-[0.4em] italic underline decoration-4">Operational_Timeline</span>
        </div>
        <div className="grid grid-cols-1 gap-12">
          {experiences.map((exp, i) => (
            <div key={i} className="p-10 bg-card border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(42,37,32,1)] group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b-4 border-foreground/10 pb-8">
                <div>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter group-hover:text-accent transition-colors">{exp.key}</h3>
                  <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mt-2">{exp.company}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black italic text-accent">{exp.period}</span>
                </div>
              </div>
              <ul className="space-y-4">
                {exp.achievements.map((ach, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-xs font-bold uppercase italic tracking-wide text-foreground/80">
                    <span className="w-2 h-2 bg-accent mt-1 shrink-0" />
                    {t(ach as any)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* INTERESTS SECTION */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 pb-12 border-b-8 border-foreground mb-16">
          <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">PERSONAL<span className="text-accent">.</span></h2>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-accent italic pb-2">Human Interests</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {interests.map((item, i) => (
            <div key={i} className="p-6 bg-foreground text-background border-4 border-foreground flex flex-col items-center text-center gap-4 shadow-ambient hover:bg-accent transition-all duration-300">
               <div className="text-accent group-hover:text-background">{item.icon}</div>
               <span className="text-[10px] font-black uppercase italic tracking-widest leading-tight">{t(item.key as any)}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
