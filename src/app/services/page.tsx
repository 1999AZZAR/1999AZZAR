'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  Cpu, Globe, Zap, MessageSquare, Database, ShieldCheck, 
  Terminal, PenTool, Layout, Layers, Brain, Search, 
  Activity, Settings, Code, Server
} from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    { icon: <Cpu />, key: "Arduino" },
    { icon: <Layers />, key: "Api" },
    { icon: <Zap />, key: "Automation" },
    { icon: <Settings />, key: "Consulting" },
    { icon: <Database />, key: "Data" },
    { icon: <Cpu />, key: "Embedded" },
    { icon: <ShieldCheck />, key: "Security" },
    { icon: <Settings />, key: "Training" },
    { icon: <Activity />, key: "Project" },
    { icon: <PenTool />, key: "Writing" },
    { icon: <Layout />, key: "Uiux" },
    { icon: <Globe />, key: "Web" },
    { icon: <Brain />, key: "AiGen" },
    { icon: <Brain />, key: "MlSol" },
    { icon: <Server />, key: "DevopsCloud" },
    { icon: <Server />, key: "LinuxSys" },
    { icon: <Database />, key: "BackendWeb" },
    { icon: <Code />, key: "CustomSoftware" },
    { icon: <Terminal />, key: "CliTool" },
    { icon: <Search />, key: "Seo" }
  ];

  return (
    <main className="min-h-screen pt-40 pb-24 px-6 max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <section className="mb-24 border-b-[16px] border-foreground pb-16">
        <div className="flex items-center gap-3 text-accent mb-8">
          <Zap size={24} strokeWidth={3} />
          <span className="text-xs font-black uppercase tracking-[0.4em] italic underline decoration-4">Capability_Matrix</span>
        </div>
        
        <h1 className="headline-main mb-12">
          OUR<br />SERVICES<span className="text-accent">.</span>
        </h1>

        <p className="text-xl md:text-3xl font-black italic text-muted-foreground max-w-3xl leading-tight uppercase tracking-tighter">
          High-performance engineering solutions for complex digital and physical challenges.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <ServiceCard key={i} service={service} index={i + 1} />
        ))}
      </div>

      {/* CTA SECTION */}
      <section className="mt-32 p-12 bg-accent text-background border-[10px] border-foreground shadow-[20px_20px_0px_0px_rgba(42,37,32,1)] flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Ready to scale?</h2>
          <p className="text-xl font-bold uppercase italic opacity-80">Let's discuss your next breakthrough project.</p>
        </div>
        <Link href="/contact" className="btn-swiss-primary !bg-foreground !text-background !text-xl !py-8 !px-12 shadow-none hover:!bg-background hover:!text-foreground">
          ESTABLISH_CONNECTION
        </Link>
      </section>
    </main>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const { t } = useLanguage();
  
  let titleKey = `service${service.key}Title`;
  let descKey = `service${service.key}Desc`;
  
  if (service.key === 'DevopsCloud') {
    titleKey = 'serviceDevopsCloudTitle2';
    descKey = 'serviceDevopsCloudDesc2';
  }
  
  const title = t(titleKey as any);
  const desc = t(descKey as any);

  if (!title || title === titleKey) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1 }}
      className="p-10 bg-card border-4 border-foreground shadow-[10px_10px_0px_0px_rgba(42,37,32,1)] hover:shadow-[15px_15px_0px_0px_rgba(139,26,26,1)] hover:-translate-y-1 transition-all group flex flex-col justify-between"
    >
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="w-16 h-16 bg-foreground text-background flex items-center justify-center group-hover:bg-accent transition-colors">
            {service.icon}
          </div>
          <span className="text-4xl font-black italic text-accent opacity-20">#{index.toString().padStart(2, '0')}</span>
        </div>
        
        <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight group-hover:text-accent transition-colors">
          {title}
        </h3>
        
        <p className="text-xs font-bold text-muted-foreground uppercase italic leading-relaxed tracking-wider">
          {desc.replace(/<[^>]*>?/gm, '')}
        </p>
      </div>

      <div className="mt-12 pt-8 border-t-2 border-foreground/10 flex justify-between items-center">
        <Link href="/contact" className="text-[10px] font-black uppercase tracking-[0.2em] italic hover:text-accent transition-colors flex items-center gap-2">
          ESTIMATE_COST <Search size={14} />
        </Link>
      </div>
    </motion.div>
  );
}