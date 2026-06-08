'use client';

import { useState, useMemo } from 'react';
import { useGitHubProjects, Project } from '@/hooks/useGitHubProjects';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Star, GitFork, Loader2, Briefcase, Globe, Code2, Search as SearchIcon } from 'lucide-react';
import Fuse from 'fuse.js';

type ViewType = 'web' | 'repos';

export default function ProjectsPage() {
  const { projects, loading, error } = useGitHubProjects();
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<ViewType>('web');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryFiltered = useMemo(() => {
    return projects.filter(project => {
      if (currentView === 'web') {
        return (project.homepage && project.homepage.trim() !== '') || 
               project.name.toLowerCase().includes('site') || 
               project.name.toLowerCase().includes('porto') ||
               project.name.toLowerCase().includes('wikipedia');
      }
      return !project.archived;
    });
  }, [projects, currentView]);

  const fuse = useMemo(() => {
    return new Fuse(categoryFiltered, {
      keys: ['name', 'description', 'language', 'topics'],
      threshold: 0.3,
      distance: 100,
    });
  }, [categoryFiltered]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return categoryFiltered;
    return fuse.search(searchQuery).map(result => result.item);
  }, [searchQuery, categoryFiltered, fuse]);

  return (
    <main className="min-h-screen pt-40 pb-24 px-6 max-w-7xl mx-auto">
      <section className="mb-24 border-b-[16px] border-foreground pb-16">
        <div className="flex items-center gap-3 text-accent mb-8">
          <Briefcase size={24} strokeWidth={3} />
          <span className="text-xs font-black uppercase tracking-[0.4em] italic underline decoration-4">Engineering_Portfolio</span>
        </div>
        
        <h1 className="headline-main mb-12">
          SELECTED<br />WORKS<span className="text-accent">.</span>
        </h1>

        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12">
          <div className="space-y-8 w-full max-w-2xl">
            <p className="text-xl md:text-3xl font-black italic text-muted-foreground leading-tight uppercase tracking-tighter">
              A deep dive into industrial IoT architectures and scalable systems.
            </p>
            
            <div className="relative group max-w-lg">
              <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH_PROJECTS_DATABASE..."
                className="w-full bg-card border-4 border-foreground p-6 pl-16 font-sans font-black italic text-xs tracking-widest uppercase outline-none focus:bg-white focus:border-accent transition-all shadow-[8px_8px_0px_0px_rgba(42,37,32,1)]"
              />
            </div>
          </div>
          
          <div className="flex bg-foreground p-2 shadow-[12px_12px_0px_0px_rgba(139,26,26,1)] shrink-0">
            <button 
              onClick={() => setCurrentView('web')}
              className={`px-8 py-4 text-[10px] font-black uppercase italic tracking-widest transition-all flex items-center gap-3 ${currentView === 'web' ? 'bg-accent text-background' : 'text-background hover:bg-accent/50'}`}
            >
              <Globe size={16} /> LIVE_SITES
            </button>
            <button 
              onClick={() => setCurrentView('repos')}
              className={`px-8 py-4 text-[10px] font-black uppercase italic tracking-widest transition-all flex items-center gap-3 ${currentView === 'repos' ? 'bg-accent text-background' : 'text-background hover:bg-accent/50'}`}
            >
              <Code2 size={16} /> REPOSITORIES
            </button>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-40">
          <Loader2 className="w-16 h-16 animate-spin text-accent" strokeWidth={4} />
        </div>
      ) : error ? (
        <div className="p-12 border-4 border-accent text-accent font-black text-2xl italic text-center uppercase shadow-[15px_15px_0px_0px_rgba(139,26,26,1)]">
          {error}
        </div>
      ) : (
        <div className="space-y-12">
          <div className="flex justify-between items-end border-b-4 border-foreground/10 pb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent italic">
              MATCH_RESULTS: {filteredProjects.length} FOUND_
            </span>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.name} project={project} index={index + 1} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-32 border-4 border-dashed border-muted text-center bg-card/30"
            >
               <p className="text-3xl font-black italic uppercase text-muted-foreground opacity-50 mb-4">Query yielded null response_</p>
               <button onClick={() => setSearchQuery('')} className="btn-swiss-outline !py-4 !px-8 mx-auto">CLEAR_FILTERS</button>
            </motion.div>
          )}
        </div>
      )}
    </main>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a 
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        layout: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      href={project.homepage || project.html_url || '#'}
      target="_blank"
      className="group bg-card border-4 border-foreground p-10 shadow-[12px_12px_0px_0px_rgba(42,37,32,1)] hover:shadow-[20px_20px_0px_0px_rgba(139,26,26,1)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between min-h-[450px]"
    >
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <span className="text-4xl font-black italic text-accent tracking-tighter leading-none">
            #{index.toString().padStart(2, '0')}
          </span>
          <ArrowUpRight size={40} className="group-hover:text-accent transition-colors shrink-0" strokeWidth={3} />
        </div>

        <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-tight uppercase group-hover:text-accent transition-colors break-words">
          {project.name.replace(/-/g, ' ')}
        </h3>

        <p className="text-sm font-bold text-muted-foreground uppercase italic leading-relaxed line-clamp-4">
          {project.description || 'Architectural implementation for specialized engineering environments and automated system protocols.'}
        </p>
      </div>

      <div className="mt-12 pt-8 border-t-2 border-foreground/10 flex flex-wrap gap-8 items-center">
        {project.language && (
          <span className="px-5 py-2 bg-foreground text-background text-[11px] font-black uppercase tracking-[0.2em] italic">
            {project.language}
          </span>
        )}
        <div className="flex gap-6">
          <span className="text-xs font-black flex items-center gap-3 italic">
            <Star size={18} fill="currentColor" className="text-accent" /> {project.stargazers_count}
          </span>
          <span className="text-xs font-black flex items-center gap-3 italic">
            <GitFork size={18} strokeWidth={3} /> {project.forks_count}
          </span>
        </div>
      </div>
    </motion.a>
  );
}
