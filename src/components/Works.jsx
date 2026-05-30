import React, { useState, useEffect } from 'react';
import Reveal from './ui/Reveal';


const dummyProjects = [
  {
    id: '01',
    name: 'Coming Soon',
    description: 'Exciting new project currently in development.',
    tech: 'TBA',
    url: '#',
  },
  {
    id: '02',
    name: 'Coming Soon',
    description: 'Exciting new project currently in development.',
    tech: 'TBA',
    url: '#',
  },
  {
    id: '03',
    name: 'Coming Soon',
    description: 'Exciting new project currently in development.',
    tech: 'TBA',
    url: '#',
  },
];

export default function Works() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/raihanwisteria/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Filter out forks if desired, or just map directly
          setProjects(
            data.map((repo, i) => ({
              id: String(i + 1).padStart(2, '0'),
              name: repo.name,
              description: repo.description || 'No description available.',
              tech: repo.language || 'Multiple',
              url: repo.html_url,
            }))
          );
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayProjects = projects.length > 0 ? projects : dummyProjects;

  return (
    <section id="works" className="min-h-[100svh] flex flex-col justify-center py-12">
      <Reveal className="mx-auto w-full max-w-3xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              03 / Works
            </span>
            <h2 className="font-sans text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
              Projects
            </h2>
          </div>
          <span className="rounded-full px-3 py-1 font-sans text-xs font-medium mb-1 bg-elevated text-text-muted">
            {loading ? '...' : projects.length} repos
          </span>
        </div>

        <p className="mb-12 max-w-2xl font-sans text-base leading-relaxed text-text-secondary md:text-lg">
          A curated selection of open-source projects reflecting my continuous pursuit of elegant problem-solving.
        </p>

        {/* Project List — glassmorphism cards */}
        <div className="flex flex-col gap-2">
          {displayProjects.map((project, index) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group rounded-2xl border px-4 py-3 transition-all duration-300 md:px-5 md:py-3.5 transform-gpu border-glass-border bg-glass backdrop-blur-lg hover:border-border-mid hover:bg-card hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-sans text-[11px] font-medium tabular-nums text-text-faint">
                      {project.id}
                    </span>
                    <h3 className="truncate font-sans text-[14px] font-medium text-text-primary group-hover:text-accent transition-colors duration-200">
                      {project.name}
                    </h3>
                  </div>
                  <p className="truncate font-sans text-[12px] text-text-muted pl-7">
                    {project.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3 pl-7">
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider bg-accent-light text-accent">
                      {project.tech}
                    </span>
                  </div>
                </div>
              </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
