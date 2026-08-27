import React, { useState } from 'react';
import { Cpu, ExternalLink, Github, Layers, Shield, Terminal, ArrowUpRight, CheckCircle2, X, Activity, Radio, Database } from 'lucide-react';
import { REALISTIC_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

export const RealisticProjectsGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'cybersecurity' | 'bigdata' | 'fullstack' | 'mobile'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? REALISTIC_PROJECTS
    : REALISTIC_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-16 md:py-24 bg-slate-50 dark:bg-[#020617] relative border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.06),transparent_60%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-cyan-950/80 border border-blue-200 dark:border-cyan-500/40 text-blue-700 dark:text-cyan-300 text-xs font-mono mb-2 font-semibold">
              <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>FLAGSHIP ARCHITECTURE & ENGINEERING</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Featured Cybersecurity & Big Data Projects
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-sans">
              Production-tested systems combining offensive red team tools, kernel telemetry, distributed streaming, and zero-trust proxies.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'cybersecurity', label: 'Cybersecurity & Red Team' },
              { id: 'bigdata', label: 'Big Data Streams' },
              { id: 'fullstack', label: 'Full-Stack' },
              { id: 'mobile', label: 'Mobile Security' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all ${
                  activeFilter === tab.id
                    ? 'bg-blue-600 text-white dark:bg-cyan-500/20 dark:text-cyan-300 dark:border dark:border-cyan-400 shadow-sm dark:shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-white dark:bg-[#050c18] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-cyan-500/50 shadow-sm dark:shadow-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              {/* Project Card Image & Header */}
              <div>
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300 uppercase font-semibold">
                    {project.category}
                  </div>

                  {project.featured && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-semibold">
                      FLAGSHIP BUILD
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-mono text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-blue-600 dark:text-cyan-400 font-mono font-semibold line-clamp-1">
                    {project.subtitle}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics Badges Strip */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="p-2 rounded bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-slate-800 font-mono text-[11px]">
                        <div className="text-slate-500 dark:text-slate-400 text-[10px]">{m.label}</div>
                        <div className="text-blue-700 dark:text-cyan-300 font-bold mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-4 flex items-center justify-between gap-2 pt-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 font-semibold transition-colors"
                >
                  <span>Inspect Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors"
                      title="Launch Simulation / Demo"
                    >
                      <Radio className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal / Architecture Inspector */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#060e1d] border border-slate-200 dark:border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-6 text-left">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-blue-600 dark:text-cyan-400 uppercase tracking-wider font-semibold">
                  ARCHITECTURE SPECIFICATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-mono mt-0.5 font-medium">
                  {selectedProject.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
              {selectedProject.description}
            </p>

            {/* Architecture Highlights */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono text-slate-900 dark:text-white uppercase tracking-wider font-bold">
                Deep Architecture Highlights & Security Mechanisms:
              </h4>
              <div className="space-y-2">
                {selectedProject.architectureDetails.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance & Security Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-900 dark:text-white uppercase tracking-wider font-bold">
                Performance Benchmarks:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-blue-50 dark:bg-cyan-950/20 border border-blue-200 dark:border-cyan-500/30 font-mono text-xs">
                    <div className="text-slate-500 dark:text-slate-400 text-[10px]">{m.label}</div>
                    <div className="text-lg font-bold text-blue-700 dark:text-cyan-300 mt-0.5">{m.value}</div>
                    {m.change && <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-semibold">{m.change}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-900 dark:text-white uppercase tracking-wider font-bold">
                Full Polyglot Tech Stack:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-mono text-xs border border-slate-200 dark:border-slate-700"
              >
                Close Inspector
              </button>
              
              <div className="flex items-center gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-mono text-xs border border-slate-200 dark:border-slate-600"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProject.liveDemoUrl && (
                  <a
                    href={selectedProject.liveDemoUrl}
                    onClick={() => setSelectedProject(null)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-mono text-xs font-semibold"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>Open Live Simulator</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
