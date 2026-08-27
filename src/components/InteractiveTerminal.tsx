import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, ChevronRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, REALISTIC_PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command?: string; output: string | React.ReactNode; isError?: boolean }>>([
    {
      output: (
        <div className="space-y-1 text-slate-300">
          <div className="text-cyan-400 font-bold">
            Sulaiman Balikoowa Cyber Shell [v4.2.0-ebpf-telemetry]
          </div>
          <div className="text-slate-400 text-xs">
            Type <span className="text-emerald-300 font-semibold">'help'</span> for a list of available red-team commands.
          </div>
        </div>
      ),
    },
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = async (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let response: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        response = (
          <div className="space-y-1 text-xs">
            <div className="text-cyan-300 font-bold mb-1">AVAILABLE COMMANDS:</div>
            <div><span className="text-emerald-300 font-semibold">whoami</span> - Display operator profile & title</div>
            <div><span className="text-emerald-300 font-semibold">cat bio.md</span> - Print Sulaiman's README & mission statement</div>
            <div><span className="text-emerald-300 font-semibold">skills</span> - List 18+ polyglot languages & security toolsets</div>
            <div><span className="text-emerald-300 font-semibold">projects</span> - View flagship architecture portfolio & metrics</div>
            <div><span className="text-emerald-300 font-semibold">nmap [target]</span> - Execute simulated port & service discovery</div>
            <div><span className="text-emerald-300 font-semibold">threats</span> - Fetch live CVE threat intelligence feed</div>
            <div><span className="text-emerald-300 font-semibold">benchmark</span> - Run AES-256 vs ChaCha20 crypto benchmarks</div>
            <div><span className="text-emerald-300 font-semibold">roadmap</span> - Inspect 2030 future founder milestones</div>
            <div><span className="text-emerald-300 font-semibold">contact</span> - Display email and transmission channels</div>
            <div><span className="text-emerald-300 font-semibold">clear</span> - Clear terminal buffer</div>
            <div><span className="text-emerald-300 font-semibold">exit</span> - Close terminal session</div>
          </div>
        );
        break;

      case 'whoami':
        response = (
          <div className="text-xs space-y-1">
            <div className="text-white font-bold">{PERSONAL_INFO.name} ({PERSONAL_INFO.handle})</div>
            <div className="text-cyan-300">{PERSONAL_INFO.title}</div>
            <div className="text-slate-400">Motto: "{PERSONAL_INFO.motto}"</div>
            <div className="text-emerald-400">Email: {PERSONAL_INFO.email}</div>
          </div>
        );
        break;

      case 'cat':
        if (args.includes('bio') || args.includes('readme')) {
          response = (
            <div className="text-xs space-y-2 text-slate-300">
              <div className="text-cyan-400 font-bold">balixsulait-alt / README.md</div>
              <p>Hey there, I'm Sulaiman Balikoowa 👋</p>
              <p>Full-Stack Dev · Ethical Hacker · Big Data Nerd · Future Founder by 2030 🚀</p>
              <p className="text-slate-400">{PERSONAL_INFO.about}</p>
              <p className="text-emerald-300 font-bold">"Code it. Break it. Secure it. Analyze it."</p>
            </div>
          );
        } else {
          response = <span className="text-rose-400">File not found: {args || '(empty)'}. Try 'cat bio.md'.</span>;
        }
        break;

      case 'skills':
        response = (
          <div className="text-xs space-y-2">
            <div className="text-cyan-400 font-bold">CORE TECHNICAL SPECIALTIES:</div>
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.title} className="space-y-0.5">
                <div className="text-emerald-300 font-semibold underline">{cat.title}:</div>
                <div className="text-slate-300 pl-2">
                  {cat.skills.map((s) => s.name).join(', ')}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        response = (
          <div className="text-xs space-y-2">
            <div className="text-cyan-400 font-bold">FLAGSHIP ARCHITECTURES:</div>
            {REALISTIC_PROJECTS.map((p) => (
              <div key={p.id} className="p-2 rounded bg-black/40 border border-slate-800">
                <div className="text-emerald-300 font-bold">{p.title}</div>
                <div className="text-slate-400">{p.subtitle}</div>
                <div className="text-cyan-300 mt-1">Stack: {p.techStack.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'nmap':
        const target = args || '192.168.1.1';
        response = (
          <div className="text-xs space-y-1 font-mono text-slate-300">
            <div className="text-cyan-400">Starting Nmap 7.94 ( https://nmap.org ) at {new Date().toLocaleTimeString()}</div>
            <div>Nmap scan report for {target}</div>
            <div>Host is up (0.00042s latency).</div>
            <div>Not shown: 994 closed tcp ports (reset)</div>
            <div className="text-emerald-300 font-bold mt-1">PORT     STATE    SERVICE       VERSION</div>
            <div>22/tcp   open     ssh           OpenSSH 8.9p1 Ubuntu (TLS 1.3 key-only)</div>
            <div>80/tcp   open     http          nginx 1.24.0 (301 Moved Permanently)</div>
            <div>443/tcp  open     ssl/https     nginx 1.24.0 (Zero-Trust AST Proxy)</div>
            <div>3306/tcp filtered mysql         MySQL Community Server (eBPF protected)</div>
            <div>5432/tcp filtered postgresql    PostgreSQL 16 (TimescaleDB cluster)</div>
            <div>8080/tcp open     http-proxy    AegisStream Kafka Ingestion (mTLS)</div>
            <div className="text-cyan-300 mt-1">Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds</div>
          </div>
        );
        break;

      case 'threats':
        try {
          const res = await fetch('/api/simulations/threat-intel');
          const data = await res.json();
          response = (
            <div className="text-xs space-y-1.5">
              <div className="text-cyan-400 font-bold">LIVE MITRE & CVE THREAT INTEL FEED:</div>
              {data.feed.map((node: any) => (
                <div key={node.id} className="flex items-center justify-between p-1.5 rounded bg-black/40 border border-slate-800">
                  <div>
                    <span className="text-emerald-300 font-bold">{node.id}</span> - <span className="text-slate-300">{node.title}</span>
                  </div>
                  <span className="text-rose-400 font-bold text-[10px]">{node.severity} ({node.score})</span>
                </div>
              ))}
            </div>
          );
        } catch {
          response = <span className="text-rose-400">Failed to query threat intelligence stream.</span>;
        }
        break;

      case 'benchmark':
        response = (
          <div className="text-xs space-y-1 font-mono">
            <div className="text-cyan-400 font-bold">CRYPTOGRAPHIC CIPHER BENCHMARK:</div>
            <div className="text-slate-300">1. AES-256-GCM (Hardware AES-NI): <span className="text-emerald-300 font-bold">4.28M ops/s</span> (0.23 μs)</div>
            <div className="text-slate-300">2. ChaCha20-Poly1305 (ARM NEON): <span className="text-emerald-300 font-bold">3.89M ops/s</span> (0.26 μs)</div>
            <div className="text-slate-300">3. Argon2id (64MB RAM Hard): <span className="text-cyan-300 font-bold">82 ops/s</span> (12.2 ms)</div>
            <div className="text-slate-300">4. Stream Ingestion Pipeline: <span className="text-cyan-300 font-bold">1.84M events/sec</span> (&lt;5ms SLA)</div>
          </div>
        );
        break;

      case 'roadmap':
        response = (
          <div className="text-xs space-y-1">
            <div className="text-cyan-400 font-bold">ROADMAP: 2030 FUTURE FOUNDER 🚀</div>
            <div>• 2024-2025: Full-Stack Polyglot & Offensive Red Team Mastery</div>
            <div>• 2026-2027: Distributed eBPF Sensors & Big Data Stream Engines</div>
            <div>• 2028-2029: Autonomous AI Adversary & Defense Agent Framework</div>
            <div className="text-emerald-300 font-bold">• 2030: Launch of CyberData AI Defense Enterprise Platform</div>
          </div>
        );
        break;

      case 'contact':
        response = (
          <div className="text-xs space-y-1">
            <div className="text-cyan-400 font-bold">SULAIMAN BALIKOOWA TRANSMISSION CHANNELS:</div>
            <div>Email: <span className="text-emerald-300">balixsulait@gmail.com</span></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-cyan-300 underline">https://github.com/balixsulait-alt</a></div>
            <div>Location: Global / Remote Available</div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        response = (
          <span className="text-rose-400">
            command not recognized: '{cmd}'. Type <span className="text-cyan-300 font-bold">'help'</span> for reference.
          </span>
        );
    }

    setHistory((prev) => [...prev, { command: trimmed, output: response }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full rounded-2xl bg-[#040814] border border-cyan-500/50 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isMaximized ? 'h-[94vh] max-w-6xl' : 'h-[580px] max-w-3xl'
        }`}
      >
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-[#02050c] border-b border-cyan-500/30 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="ml-3 font-mono text-xs text-slate-300 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>sulaiman@balikoowa-soc: ~</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded hover:bg-slate-800 hover:text-white"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-800 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3 cursor-text bg-[#030712]/95"
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-emerald-400 font-bold">root@balikoowa:#</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
              )}
              <div className="text-slate-300 pl-3 border-l border-cyan-500/20">{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-cyan-400 pt-1">
            <span className="text-emerald-400 font-bold shrink-0">root@balikoowa:#</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white font-mono text-xs focus:outline-none caret-cyan-400"
              autoFocus
              placeholder="type 'help' or command..."
            />
          </div>

          <div ref={terminalBottomRef} />
        </div>

        {/* Terminal Quick Command Hints */}
        <div className="px-4 py-2 bg-[#02050c] border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
          <div className="flex flex-wrap gap-1.5">
            {['help', 'whoami', 'nmap', 'threats', 'benchmark', 'roadmap', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-[10px]"
              >
                {cmd}
              </button>
            ))}
          </div>
          <span>Press ESC or type 'exit' to close</span>
        </div>
      </div>
    </div>
  );
};
