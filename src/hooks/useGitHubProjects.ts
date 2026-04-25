'use client';

import { useState, useEffect } from 'react';

export interface Project {
  name: string;
  description: string;
  homepage: string;
  html_url: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  archived: boolean;
}

export function useGitHubProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
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

        const sorted = allProjects
          .filter(repo => !repo.archived)
          .sort((a, b) => {
            const popA = a.stargazers_count + a.forks_count;
            const popB = b.stargazers_count + b.forks_count;
            return popB - popA || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          });

        setProjects(sorted);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { projects, loading, error };
}
