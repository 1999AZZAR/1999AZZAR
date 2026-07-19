'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  Cpu, Globe, Zap, Database, ShieldCheck, 
  Terminal, PenTool, Layout, Layers, Brain, Search, 
  Activity, Settings, Code, Server, MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

function getIcon(key: string) {
  const icons: Record<string, React.ReactNode> = {
    Arduino: <Cpu size={20} />,
    Api: <Layers size={20} />,
    Automation: <Zap size={20} />,
    Consulting: <MessageSquare size={20} />,
    Data: <Database size={20} />,
    Embedded: <Cpu size={20} />,
    Security: <ShieldCheck size={20} />,
    Training: <Settings size={20} />,
    Project: <Activity size={20} />,
    Writing: <PenTool size={20} />,
    Uiux: <Layout size={20} />,
    Web: <Globe size={20} />,
    AiGen: <Brain size={20} />,
    MlSol: <Brain size={20} />,
    DevopsCloud: <Server size={20} />,
    LinuxSys: <Server size={20} />,
    BackendWeb: <Database size={20} />,
    CustomSoftware: <Code size={20} />,
    CliTool: <Terminal size={20} />,
    Seo: <Search size={20} />,
  };
  return icons[key] || <Code size={20} />;
}

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    { key: "Arduino" }, { key: "Api" }, { key: "Automation" },
    { key: "Consulting" }, { key: "Data" }, { key: "Embedded" },
    { key: "Security" }, { key: "Training" }, { key: "Project" },
    { key: "Writing" }, { key: "Uiux" }, { key: "Web" },
    { key: "AiGen" }, { key: "MlSol" }, { key: "DevopsCloud" },
    { key: "LinuxSys" }, { key: "BackendWeb" }, { key: "CustomSoftware" },
    { key: "CliTool" }, { key: "Seo" }
  ];

  return (
    <main className="page-container">
      {/* HEADER */}
      <motion.section initial="hidden" animate="visible" variants={fadeUp} className="section-spacing border-b border-border pb-16 md:pb-20">
        <div className="flex items-center gap-2.5 mb-6">
          <Zap size={16} className="text-accent" strokeWidth={1.5} />
          <span className="section-label">Capabilities</span>
        </div>
        
        <h1 className="heading-xl mb-6">
          Services<span className="text-accent">.</span>
        </h1>

        <p className="text-sm-body max-w-2xl">
          High-performance engineering solutions for complex digital and physical challenges.
        </p>
      </motion.section>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, i) => {
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
            <motion.div key={i} variants={fadeUp} className="card-surface p-7 space-y-5 flex flex-col justify-between group">
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 rounded-md bg-accent/10 text-accent flex items-center justify-center">
                    {getIcon(service.key)}
                  </div>
                  <span className="mono-meta text-accent/30">#{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="heading-md !text-base group-hover:text-accent transition-colors">{title}</h3>
                <p className="text-sm-body text-text/60">{desc.replace(/<[^>]*>?/gm, '')}</p>
              </div>
              <div className="pt-5 border-t border-border">
                <Link href="/contact" className="mono-meta text-[0.6rem] hover:text-accent transition-colors inline-flex items-center gap-1.5">
                  Estimate cost <ArrowUpRight size={10} />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* CTA */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-24 card-surface bg-accent/5 border-accent/20 p-10 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2">
          <h2 className="heading-lg">Ready to scale?</h2>
          <p className="text-sm-body">Let&apos;s discuss your next breakthrough project.</p>
        </div>
        <Link href="/contact" className="btn-primary shrink-0">
          Establish Connection <ArrowUpRight size={14} />
        </Link>
      </motion.section>
    </main>
  );
}
