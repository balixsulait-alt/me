import React from 'react';
import { Rocket, CheckCircle2, Clock, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { ROADMAP_2030 } from '../data/portfolioData';

export const StartupRoadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-16 md:py-24 bg-white dark:bg-[#020617] relative border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      
      {/* Ambient background styling */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.06),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_100%,rgba(6,182,212,0.08),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-cyan-950/80 border border-blue-200 dark:border-cyan-500/40 text-blue-700 dark:text-cyan-300 text-xs font-mono font-semibold">
            <Rocket className="w-3.5 h-3.5 text-blue-600 dark:text-amber-400" />
            <span>VENTURE VISION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Future Founder by 2030 🚀
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans">
            "Busy cooking a startup; Target: 2030." Building the next-generation autonomous AI adversary emulation and distributed threat defense fabric.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          
          {/* Vertical Connecting Line on Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-400 via-indigo-400 to-purple-400 dark:from-cyan-500 dark:via-blue-500 dark:to-indigo-500 -translate-x-1/2 opacity-30" />

          <div className="space-y-8 lg:space-y-12">
            {ROADMAP_2030.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={milestone.year}
                  className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Card */}
                  <div className="w-full lg:w-1/2">
                    <div className="p-6 rounded-2xl bg-white dark:bg-[#050c18] border border-slate-200 dark:border-cyan-500/30 hover:border-blue-400 dark:hover:border-cyan-400/60 shadow-sm dark:shadow-xl space-y-3 transition-all duration-300 group">
                      
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-blue-700 dark:text-cyan-400 px-2.5 py-0.5 rounded bg-blue-50 dark:bg-cyan-950/80 border border-blue-200 dark:border-cyan-500/40">
                          {milestone.year}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                          milestone.status === 'completed' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40' :
                          milestone.status === 'in-progress' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/40' :
                          'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/40'
                        }`}>
                          {milestone.status.replace('-', ' ')}
                        </span>
                      </div>

                      <h3 className="text-base font-bold font-mono text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                        {milestone.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                        {milestone.description}
                      </p>

                      {/* Deliverables List */}
                      <div className="pt-2 space-y-1.5 border-t border-slate-100 dark:border-slate-800">
                        {milestone.deliverables.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Center Node Icon on Desktop */}
                  <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#060e1d] border-2 border-blue-500 dark:border-cyan-400 text-blue-600 dark:text-cyan-300 shadow-md dark:shadow-[0_0_15px_rgba(6,182,212,0.5)] shrink-0 z-10">
                    {milestone.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : milestone.status === 'in-progress' ? (
                      <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <Rocket className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </div>

                  {/* Empty Spacer on other side */}
                  <div className="hidden lg:block w-1/2" />

                </div>
              );
            })}
          </div>

        </div>

        {/* Founder Callout Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 dark:from-cyan-950/40 dark:via-[#060e1d] dark:to-blue-950/40 border border-blue-200 dark:border-cyan-500/30 text-center space-y-3 shadow-sm">
          <h4 className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            "Open to Collaborations on Open-Source & Groundbreaking Builds"
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-sans">
            Interested in partnering on offensive security toolsets, distributed data stream architectures, or early venture ideation?
          </p>
          <div className="pt-1">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-mono text-xs font-semibold shadow-sm transition-all"
            >
              <span>Connect with Sulaiman</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
