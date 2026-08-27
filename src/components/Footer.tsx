import React, { useState, useEffect } from 'react';
import { Shield, Terminal, ArrowUp, Github, Mail, Radio } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  const [timeUtc, setTimeUtc] = useState('');
  const [uptimeSecs, setUptimeSecs] = useState(84920);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUtc(new Date().toUTCString());
      setUptimeSecs((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  return (
    <footer className="bg-slate-900 dark:bg-[#02050c] border-t border-slate-200 dark:border-cyan-500/20 text-slate-400 font-mono text-xs py-12 relative overflow-hidden transition-colors duration-200">
      
      {/* Grid Pattern in Footer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#060e1d_1px,transparent_1px),linear-gradient(to_bottom,#060e1d_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 border-b border-slate-800">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-cyan-950/80 border border-blue-500/30 dark:border-cyan-500/40 flex items-center justify-center text-blue-400 dark:text-cyan-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-bold tracking-wider">
                SULAIMAN BALIKOOWA
              </div>
              <div className="text-[11px] text-slate-400">
                Full-Stack Dev · Ethical Hacker · Big Data Nerd · Future Founder 2030
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 dark:bg-slate-900 hover:bg-slate-700 dark:hover:bg-slate-800 border border-slate-700 text-blue-300 dark:text-cyan-300 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Shell</span>
            </button>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 dark:bg-slate-900 hover:bg-slate-700 dark:hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-blue-950/70 hover:bg-blue-900 dark:bg-cyan-950/70 dark:hover:bg-cyan-900 border border-blue-500/40 dark:border-cyan-500/40 text-blue-300 dark:text-cyan-300 transition-colors"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Middle Telemetry Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left text-[11px] text-slate-400">
          <div>
            <span className="text-slate-500 dark:text-slate-400">SOC Node Time: </span>
            <span className="text-blue-400 dark:text-cyan-300 font-semibold">{timeUtc || 'SYNCING...'}</span>
          </div>
          <div className="sm:text-center">
            <span className="text-slate-500 dark:text-slate-400">Kernel Probe Uptime: </span>
            <span className="text-emerald-400 font-semibold">{formatUptime(uptimeSecs)}</span>
          </div>
          <div className="sm:text-right">
            <span className="text-slate-500 dark:text-slate-400">Deployment Target: </span>
            <span className="text-blue-400 dark:text-cyan-300 font-semibold">Render Node Production Host</span>
          </div>
        </div>

        {/* Bottom Copyright and Motto */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Sulaiman Balikoowa. All systems operational.
          </div>
          <div className="text-blue-400 dark:text-cyan-400 font-semibold">
            "Code it. Break it. Secure it. Analyze it."
          </div>
        </div>

      </div>
    </footer>
  );
};
