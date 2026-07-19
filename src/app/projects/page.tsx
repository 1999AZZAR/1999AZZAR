'use client';

import { useState, useMemo } from 'react';
import { useGitHubProjects, Project } from '@/hooks/useGitHubProjects';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, GitFork, Loader2, Globe, Code2, Search } from 'lucide-react';
import Fuse from 'fuse.js';

type ViewType = 'web' | 'repos';

export default function ProjectsPage() {
  const { projects, loading, error } = useGitHubProjects();
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<ViewType>('web');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryFiltered = useMemo(() => {
    const filtered = projects.filter(project => {
      if (currentView === 'web') {
        return (project.homepage && project.homepage.trim() !== '') || 
               project.name.toLowerCase().includes('site') || 
               project.name.toLowerCase().includes('porto') ||
               project.name.toLowerCase().includes('wikipedia');
      }
      return !project.archived;
    });

    if (currentView === 'repos') {
      return [...filtered].sort((a, b) => {
        const popA = a.stargazers_count + a.forks_count;
        const popB = b.stargazers_count + b.forks_count;
        return popB - popA || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });
    }

    return filtered;
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
    <main className="page-container">
      <section className="section-spacing border-b border-border pb-16 md:pb-20">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="section-label">{t('portoHeaderLabel' as any)}</span>
        </div>
        
        <h1 className="heading-xl mb-8" dangerouslySetInnerHTML={{ __html: t('portoHeadline' as any) }} />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="space-y-4 w-full max-w-lg">
            <p className="text-sm-body">
              {t('portoSubheadline' as any)}
            </p>
            
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text/50" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('portoSearchPlaceholder' as any)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div className="flex bg-paper-3 rounded-lg p-1 border border-border shrink-0">
            <button 
              onClick={() => setCurrentView('web')}
              className={`px-5 py-2.5 rounded-md text-[0.65rem] font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${currentView === 'web' ? 'bg-accent text-paper' : 'text-text hover:text-text-2'}`}
            >
              <Globe size={14} /> {t('portoLiveSites' as any)}
            </button>
            <button 
              onClick={() => setCurrentView('repos')}
              className={`px-5 py-2.5 rounded-md text-[0.65rem] font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${currentView === 'repos' ? 'bg-accent text-paper' : 'text-text hover:text-text-2'}`}
            >
              <Code2 size={14} /> {t('portoRepositories' as any)}
            </button>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-accent" strokeWidth={2} />
        </div>
      ) : error ? (
        <div className="card-surface p-10 text-center">
          <p className="text-sm-body text-accent">{error}</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-end pb-2">
            <span className="mono-meta">
              {filteredProjects.length} {t('portoFound' as any)}
            </span>
          </div>

          <motion.div
            key={`${currentView}-${searchQuery}-${filteredProjects.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index + 1} />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card-surface p-16 text-center"
            >
              <p className="text-sm-body text-text/50 mb-4">{t('portoNoResults' as any)}</p>
              <button onClick={() => setSearchQuery('')} className="btn-ghost !py-2 !px-4">{t('portoClearFilters' as any)}</button>
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      href={project.homepage || project.html_url || '#'}
      target="_blank"
      className="card-surface p-7 flex flex-col justify-between min-h-[280px] group"
    >
      <div className="space-y-5">
        <div className="flex justify-between items-start">
          <span className="mono-meta text-accent">#{index.toString().padStart(2, '0')}</span>
          <ArrowUpRight size={18} className="text-text/30 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" strokeWidth={1.5} />
        </div>

        <h3 className="heading-md group-hover:text-accent transition-colors">
          {project.name.replace(/-/g, ' ')}
        </h3>

        <p className="text-sm-body text-text/60 line-clamp-3">
          {project.description || 'No description available.'}
        </p>
      </div>

      <div className="mt-8 pt-5 border-t border-border flex flex-wrap gap-4 items-center">
        {project.language && (
          <span className="tag">{project.language}</span>
        )}
        <div className="flex gap-4 ml-auto">
          <span className="mono-meta text-[0.55rem] flex items-center gap-1.5">
            <Star size={12} className="text-accent" /> {project.stargazers_count}
          </span>
          <span className="mono-meta text-[0.55rem] flex items-center gap-1.5">
            <GitFork size={12} /> {project.forks_count}
          </span>
        </div>
      </div>
    </motion.a>
  );
}
