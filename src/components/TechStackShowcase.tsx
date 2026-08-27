import React, { useState } from 'react';
import { Terminal, Shield, Database, Code2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const TechStackShowcase: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const activeCategory = SKILL_CATEGORIES[activeCategoryIndex];

  return (
    <section id="tech-stack" className="py-16 md:py-20 bg-slate-100/60 dark:bg-[#030712] relative border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-cyan-950/80 border border-blue-200 dark:border-cyan-500/40 text-blue-700 dark:text-cyan-300 text-xs font-mono font-semibold">
            <Code2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>POLYGLOT & SECURITY CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Languages, Security Tools & Data Stacks
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans">
            From low-level memory inspection and red team exploit development to enterprise distributed stream architectures.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white dark:bg-cyan-500/20 dark:text-cyan-300 dark:border dark:border-cyan-400 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white shadow-sm'
                }`}
              >
                {idx === 0 && <Terminal className="w-4 h-4 text-blue-300 dark:text-cyan-400" />}
                {idx === 1 && <Shield className="w-4 h-4 text-rose-300 dark:text-rose-400" />}
                {idx === 2 && <Database className="w-4 h-4 text-indigo-300 dark:text-indigo-400" />}
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCategory.skills.map((skill) => (
            <div
              key={skill.name}
              className="p-5 rounded-xl bg-white dark:bg-[#060e1d] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-cyan-500/40 shadow-sm transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-[10px] font-mono text-blue-700 dark:text-cyan-400 px-2 py-0.5 rounded bg-blue-50 dark:bg-cyan-950/80 border border-blue-200 dark:border-cyan-500/30 font-semibold">
                    {skill.level}% Mastery
                  </span>
                </div>

                <div className="mt-2 inline-block text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/90 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 font-medium">
                  {skill.badge}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 font-sans leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tech Logo Badges Grid */}
        <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-[#050c18] border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">
            Verified Stack Ecosystem
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              'Python', 'C#', 'C++', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
              'PHP', 'Laravel', 'Django', 'Dart', 'Flutter', 'Java', 'HTML5', 'MySQL',
              'Oracle DB', 'MongoDB', 'PostgreSQL', 'Linux', 'Git', 'GitHub', 'Docker',
              'VS Code', 'HackTheBox', 'Metasploit', 'Wireshark', 'RedHat Enterprise'
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300 hover:border-blue-400 dark:hover:border-cyan-500/50 transition-all cursor-default font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

