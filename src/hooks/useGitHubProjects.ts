'use client';

import { useState, useEffect } from 'react';

export interface Project {
  name: string;
  description: string;
  homepage: string | null;
  html_url: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  archived: boolean;
}

function parseLiveSiteFile(text: string): Project[] {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.includes('|'))
    .map(line => {
      const [urlPart, metaPart] = line.split('|').map(s => s.trim());
      const name = metaPart?.split(' - ')[0]?.trim() || urlPart;
      const description = metaPart?.split(' - ').slice(1).join(' - ').trim() || '';
      return {
        name,
        description,
        homepage: urlPart,
        html_url: urlPart,
        updated_at: new Date().toISOString(),
        stargazers_count: 0,
        forks_count: 0,
        language: 'Web',
        topics: [],
        archived: false,
      };
    });
}

export function useGitHubProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const [githubProjects, liveSiteProjects] = await Promise.all([
        (async (): Promise<Project[]> => {
          try {
            const usernames = ['1999AZZAR', 'lily-osp'];
            let allProjects: any[] = [];

            for (const username of usernames) {
              const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
              if (response.ok) {
                const data = await response.json();
                allProjects = [...allProjects, ...data];
              }
            }

            return allProjects
              .filter(repo => !repo.archived)
              .sort((a, b) => {
                const popA = a.stargazers_count + a.forks_count;
                const popB = b.stargazers_count + b.forks_count;
                return popB - popA || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
              });
          } catch {
            setError('GitHub API unavailable');
            return [];
          }
        })(),
        (async (): Promise<Project[]> => {
          try {
            const res = await fetch('/live_site.txt');
            if (res.ok) {
              return parseLiveSiteFile(await res.text());
            }
          } catch {}
          return [];
        })(),
      ]);

      const seen = new Set<string>();
      const merged: Project[] = [];

      for (const p of [...githubProjects, ...liveSiteProjects]) {
        const raw = p.homepage || '';
        const key = raw.replace(/\/+$/, '').replace(/^https?:\/\//, '').toLowerCase();
        if (key && !seen.has(key)) {
          seen.add(key);
          merged.push(p);
        } else if (!key && !seen.has(p.name.toLowerCase())) {
          seen.add(p.name.toLowerCase());
          merged.push(p);
        }
      }

      setProjects(merged);
      setLoading(false);
    }

    fetchData();
  }, []);

  return { projects, loading, error };
}
