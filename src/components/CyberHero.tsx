import React, { useState, useEffect } from 'react';
import { Shield, Terminal, Database, Radio, ArrowDown, ExternalLink, Mail, Copy, Check, Sparkles, Cpu, Flame, Lock } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CyberHeroProps {
  onOpenTerminal: () => void;
}

export const CyberHero: React.FC<CyberHeroProps> = ({ onOpenTerminal }) => {
  const [copied, setCopied] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [threatCount, setThreatCount] = useState(14820);

  const fullTitle = 'Code it. Break it. Secure it. Analyze it.';

  // Typewriter effect for motto
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Live simulated threat defense counter incrementing
  useEffect(() => {
    const timer = setInterval(() => {
      setThreatCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Ambient background grid and glow for light and dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(14,165,233,0.12),rgba(255,255,255,0)_75%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(6,182,212,0.18),rgba(2,6,23,0)_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0b192e_1px,transparent_1px),linear-gradient(to_bottom,#0b192e_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40 dark:opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bio & Core Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 text-xs font-mono shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">STATUS: RED TEAM READY</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono">
                <Flame className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span className="font-medium">FUTURE FOUNDER BY 2030 🚀</span>
              </div>
            </div>

            {/* Main Name & Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                Hey there, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-teal-600 dark:from-cyan-400 dark:via-teal-300 dark:to-blue-500">
                  {PERSONAL_INFO.name}
                </span>{' '}
                <span className="inline-block animate-bounce">👋</span>
              </h1>
              <p className="text-base sm:text-lg font-mono text-cyan-700 dark:text-cyan-400 font-semibold">
                Full-Stack Dev · Ethical Hacker · Big Data Nerd
              </p>
            </div>

            {/* Interactive Typewriter Motto Banner */}
            <div className="p-3.5 rounded-lg bg-white dark:bg-[#050e1d]/90 border border-slate-200 dark:border-cyan-500/30 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-300 flex items-center justify-between shadow-sm dark:shadow-[inset_0_1px_15px_rgba(6,182,212,0.15)]">
              <div className="flex items-center gap-2">
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">&gt;</span>
                <span className="text-emerald-700 dark:text-emerald-300 font-semibold tracking-wide">{typedTitle}</span>
                <span className="w-2 h-4 bg-cyan-600 dark:bg-cyan-400 animate-pulse inline-block" />
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-slate-800 hidden sm:inline-block font-semibold">
                CORE PHILOSOPHY
              </span>
            </div>

            {/* About Description */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl">
              Full-stack developer fluent across modern systems programming, web frameworks, and mobile architectures. Red team thinker with deep passion for offensive security, penetration testing, digital forensics, and high-throughput big data pipelines. Currently engineering high-resiliency architectures and preparing the foundation for an autonomous AI-driven cyber defense startup targeted for 2030.
            </p>

            {/* Call to action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#simulator"
                id="hero-launch-simulator-btn"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white font-mono text-xs sm:text-sm font-semibold shadow-md dark:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02]"
              >
                <Radio className="w-4 h-4 text-cyan-100 animate-pulse" />
                <span>Launch Attack Simulator</span>
              </a>

              <a
                href="#bigdata"
                id="hero-explore-pipeline-btn"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-cyan-500/40 text-slate-800 dark:text-cyan-300 font-mono text-xs sm:text-sm font-medium transition-all hover:border-cyan-500 shadow-sm"
              >
                <Database className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Big Data Dashboard</span>
              </a>

              <button
                id="hero-open-cli-btn"
                onClick={onOpenTerminal}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/70 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-mono text-xs sm:text-sm transition-all"
                title="Launch Interactive Terminal"
              >
                <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>CLI Terminal</span>
              </button>
            </div>

            {/* Contact quick strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold">📬 Email:</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-700 dark:text-cyan-400 hover:underline">
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1 text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-semibold">🌐 GitHub:</span>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-700 dark:text-cyan-400 hover:underline flex items-center gap-0.5"
                >
                  <span>balixsulait-alt</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Serious Male Security Engineer Workstation Illustration & Live HUD Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-2xl blur-xl opacity-20 dark:opacity-35 transition duration-1000" />
              
              {/* Card Container */}
              <div className="relative rounded-2xl bg-white dark:bg-[#060c18] border border-slate-200 dark:border-cyan-500/30 overflow-hidden shadow-xl dark:shadow-2xl">
                
                {/* Workstation Top Bar */}
                <div className="px-4 py-2.5 bg-slate-100 dark:bg-[#030712] border-b border-slate-200 dark:border-cyan-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium">
                      sulaiman@workstation:~# soc_active
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/40 font-semibold animate-pulse">
                    LIVE TELEMETRY
                  </span>
                </div>

                {/* Male Security Engineer Workstation Image */}
                <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden group">
                  <img
                    src="/src/assets/images/male_security_engineer_1787824868103.jpg"
                    alt="Sulaiman Balikoowa at Cybersecurity and Big Data Workstation"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle HUD Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Floating Telemetry Badges */}
                  <div className="absolute top-3 left-3 px-2.5 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/40 text-[11px] font-mono text-cyan-300 flex items-center gap-2 shadow-lg">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>eBPF Firewall: <strong className="text-white font-bold">ENFORCING</strong></span>
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-indigo-500/40 text-[11px] font-mono text-indigo-300 flex items-center gap-2 shadow-lg">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Kafka Pipeline: <strong className="text-white font-bold">1.8M EPS</strong></span>
                  </div>

                  {/* Bottom Stats Overlay inside image */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/90 backdrop-blur-md border border-slate-700/80 text-xs font-mono space-y-2 text-white">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1 text-cyan-300 font-medium">
                        <Lock className="w-3.5 h-3.5 text-cyan-400" />
                        Attacks Blocked Today:
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {threatCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 h-full w-[94%] animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-300">
                      <span>Mitigation Latency: <strong>0.8ms</strong></span>
                      <span>Cluster Health: <strong className="text-emerald-400">100%</strong></span>
                    </div>
                  </div>
                </div>

                {/* Quick Profile Footer Strip */}
                <div className="p-3 bg-slate-50 dark:bg-[#040812] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400">
                  <span className="text-slate-800 dark:text-slate-300 font-medium">Red Team & Big Data Engineer</span>
                  <span className="text-cyan-700 dark:text-cyan-400 font-semibold">balixsulait@gmail.com</span>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Highlight Metric Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 sm:mt-16">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white dark:bg-[#060e1d]/80 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-cyan-500/40 shadow-sm dark:shadow-none backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-sans">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

