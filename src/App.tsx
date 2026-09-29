import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { CyberHero } from './components/CyberHero';
import { TechStackShowcase } from './components/TechStackShowcase';
import { AttackSimulator } from './components/AttackSimulator';
import { BigDataDashboard } from './components/BigDataDashboard';
import { RealisticProjectsGrid } from './components/RealisticProjectsGrid';
import { ProjectMetricsAnalyzer } from './components/ProjectMetricsAnalyzer';
import { StartupRoadmap } from './components/StartupRoadmap';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';

function PortfolioApp() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active scroll section for navigation highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'simulator', 'bigdata', 'projects', 'metrics', 'roadmap', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut for terminal (`Ctrl + ~` or `~`)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/20 selection:text-blue-900 dark:selection:bg-cyan-500/30 dark:selection:text-cyan-200 transition-colors duration-200">
      
      {/* Navigation */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero & Profile Introduction with Workstation Visual */}
        <CyberHero onOpenTerminal={() => setTerminalOpen(true)} />

        {/* 2. Languages, Databases, Tools & Cyber Focus */}
        <TechStackShowcase />

        {/* 3. Real-Time Cyber Attack & Defense Simulations */}
        <AttackSimulator />

        {/* 4. Big Data Processing Visualizations & Live Stream Pipeline */}
        <BigDataDashboard />

        {/* 5. Realistic Flagship Architecture Projects */}
        <RealisticProjectsGrid />

        {/* 6. Project Metrics & Analysis Tools */}
        <ProjectMetricsAnalyzer />


        {/* 7. 2030 Future Founder Roadmap */}
        <StartupRoadmap />

        {/* 8. Secure Contact & Transmission Channel */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Interactive Global Cyber Shell Terminal Modal */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}

