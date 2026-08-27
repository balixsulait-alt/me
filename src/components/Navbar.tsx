import React, { useState, useEffect } from 'react';
import { Shield, Terminal, Activity, Database, Cpu, Menu, X, Radio, ArrowUpRight, Github, Mail, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenTerminal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero', icon: Shield },
    { label: 'Attack Simulator', href: '#simulator', icon: Radio },
    { label: 'Big Data', href: '#bigdata', icon: Database },
    { label: 'Projects', href: '#projects', icon: Cpu },
    { label: 'Metrics', href: '#metrics', icon: Activity },
    { label: 'AI Security Lab', href: '#ai-lab', icon: Terminal },
    { label: '2030 Roadmap', href: '#roadmap', icon: ArrowUpRight },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#030712]/90 backdrop-blur-md border-b border-slate-200 dark:border-cyan-500/20 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-slate-200/50 dark:border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-lg bg-blue-50 dark:bg-gradient-to-br dark:from-cyan-500/20 dark:to-blue-600/30 border border-blue-200 dark:border-cyan-400/40 flex items-center justify-center shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.35)] group-hover:border-blue-500 dark:group-hover:border-cyan-400 transition-colors">
            <Shield className="w-5 h-5 text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-slate-900 dark:text-white text-sm tracking-wider">
                SULAIMAN<span className="text-blue-600 dark:text-cyan-400">.DEV</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 dark:bg-cyan-950/80 border border-blue-200 dark:border-cyan-500/40 text-blue-700 dark:text-cyan-300 font-semibold">
                SOC ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono -mt-0.5">Ethical Hacker & Big Data</p>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/30 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Terminal Launcher */}
          <button
            id="nav-open-terminal-btn"
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-500/60 text-xs font-mono text-slate-800 dark:text-cyan-400 transition-all shadow-sm group"
            title="Open Interactive Cyber Shell (Ctrl + `)"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 group-hover:text-emerald-500 transition-colors" />
            <span>CLI Shell</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-slate-200 dark:bg-black/60 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-800">~</span>
          </button>

          {/* Direct Email Link */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600 dark:hover:from-cyan-500 dark:hover:to-blue-500 text-white font-mono text-xs font-medium shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all hover:scale-[1.02]"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            id="mobile-theme-toggle-btn"
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-cyan-400"
            aria-label="Open Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-[#050b14]/95 border-b border-slate-200 dark:border-cyan-500/20 backdrop-blur-xl px-4 pt-2 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-800"
                >
                  <Icon className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  {link.label}
                </a>
              );
            })}
          </div>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-mono bg-blue-600 dark:bg-cyan-600 text-white rounded-lg font-medium"
            >
              <Mail className="w-4 h-4" />
              Email Sulaiman
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
