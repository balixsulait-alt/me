import React, { useState } from 'react';
import { Terminal, Shield, Sparkles, AlertCircle, CheckCircle2, RefreshCw, Code2, Database, Zap, Lock } from 'lucide-react';

export const AISecurityLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'security' | 'bigdata'>('security');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Security Audit State
  const [securityLanguage, setSecurityLanguage] = useState('Node.js / Express');
  const [attackScenario, setAttackScenario] = useState('SQL Injection / Parameter Tampering');
  const [securityCode, setSecurityCode] = useState(`// Vulnerable API Route in Node.js
app.get('/api/users/profile', async (req, res) => {
  const { username } = req.query;
  // Unsanitized raw query string concatenation
  const rawQuery = "SELECT id, username, password_hash, email FROM accounts WHERE username = '" + username + "'";
  const results = await db.query(rawQuery);
  res.json(results.rows);
});`);
  const [securityResult, setSecurityResult] = useState<any>(null);

  // Big Data Optimizer State
  const [dataEngine, setDataEngine] = useState('Distributed SQL / PySpark');
  const [dataVolume, setDataVolume] = useState('25M events / hour');
  const [queryCode, setQueryCode] = useState(`-- Unoptimized Telemetry Aggregation
SELECT * FROM raw_security_logs
WHERE status = 'FAILED_LOGIN'
AND event_timestamp >= NOW() - INTERVAL '7 days'
ORDER BY event_timestamp DESC;`);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);

  const handleRunSecurityAudit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/security-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codeSnippet: securityCode,
          language: securityLanguage,
          attackScenario,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Audit failed');
      setSecurityResult(data.analysis);
    } catch (err: any) {
      setError(err.message || 'Failed to communicate with AI Security agent.');
    } finally {
      setLoading(false);
    }
  };

  const handleRunQueryOptimizer = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/optimize-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryCode,
          engine: dataEngine,
          volume: dataVolume,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Optimization failed');
      setOptimizationResult(data.optimization);
    } catch (err: any) {
      setError(err.message || 'Failed to optimize data query.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-lab" className="py-16 md:py-24 bg-slate-50 dark:bg-[#030712] relative border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-cyan-950/80 border border-blue-200 dark:border-cyan-500/40 text-blue-700 dark:text-cyan-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>AI RED TEAM & QUERY ANALYSIS AGENT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            AI Security Code Auditor & Query Optimizer
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans">
            Powered by Sulaiman's automated security audit rules & Gemini AI engine. Test code vulnerability exploitation paths or optimize big data pipelines in seconds.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'security'
                ? 'bg-blue-600 text-white dark:bg-cyan-500/20 dark:text-cyan-300 dark:border dark:border-cyan-400 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white shadow-sm'
            }`}
          >
            <Shield className="w-4 h-4 text-blue-200 dark:text-cyan-400" />
            <span>Vulnerability & Exploit Auditor</span>
          </button>
          <button
            onClick={() => setActiveTab('bigdata')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'bigdata'
                ? 'bg-indigo-600 text-white dark:bg-indigo-500/20 dark:text-indigo-300 dark:border dark:border-indigo-400 shadow-sm dark:shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white shadow-sm'
            }`}
          >
            <Database className="w-4 h-4 text-indigo-200 dark:text-indigo-400" />
            <span>Big Data Stream Optimizer</span>
          </button>
        </div>

        {/* Lab Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Code Input */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-[#060e1d] border border-slate-200 dark:border-cyan-500/30 shadow-sm dark:shadow-xl space-y-4">
            
            {activeTab === 'security' ? (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="font-mono text-xs text-slate-700 dark:text-slate-300 font-bold">
                    SECURITY CODE AUDIT WORKBENCH
                  </div>
                  <select
                    value={securityLanguage}
                    onChange={(e) => setSecurityLanguage(e.target.value)}
                    className="px-2.5 py-1 bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-slate-700 rounded text-xs font-mono text-blue-700 dark:text-cyan-300"
                  >
                    <option>Node.js / Express</option>
                    <option>Python / Django / Flask</option>
                    <option>C++ / Memory Buffers</option>
                    <option>PHP / Laravel</option>
                    <option>Java / Spring Boot</option>
                    <option>Dart / Flutter</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-700 dark:text-slate-300 font-medium">Attack Vector Scenario:</label>
                  <input
                    type="text"
                    value={attackScenario}
                    onChange={(e) => setAttackScenario(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-slate-800 rounded text-xs font-mono text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-700 dark:text-slate-300 font-medium">Code Snippet to Audit:</label>
                  <textarea
                    rows={8}
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    className="w-full p-3 bg-slate-900 dark:bg-black/80 border border-slate-800 dark:border-cyan-500/30 rounded-lg text-xs font-mono text-emerald-400 dark:text-emerald-300 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:border-cyan-400"
                  />
                </div>

                <button
                  id="run-security-audit-btn"
                  onClick={handleRunSecurityAudit}
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600 dark:hover:from-cyan-500 dark:hover:to-blue-500 text-white font-mono text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                  <span>{loading ? 'Analyzing Attack Vectors...' : 'Execute Red Team Security Audit'}</span>
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="font-mono text-xs text-slate-700 dark:text-slate-300 font-bold">
                    DISTRIBUTED QUERY WORKBENCH
                  </div>
                  <select
                    value={dataEngine}
                    onChange={(e) => setDataEngine(e.target.value)}
                    className="px-2.5 py-1 bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-slate-700 rounded text-xs font-mono text-indigo-600 dark:text-indigo-300"
                  >
                    <option>Distributed SQL / PySpark</option>
                    <option>PostgreSQL / TimescaleDB</option>
                    <option>MongoDB Aggregation</option>
                    <option>Kafka Stream Processing</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-700 dark:text-slate-300 font-medium">Data Volume Scale:</label>
                  <input
                    type="text"
                    value={dataVolume}
                    onChange={(e) => setDataVolume(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-slate-800 rounded text-xs font-mono text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-700 dark:text-slate-300 font-medium">Data Pipeline Query / Script:</label>
                  <textarea
                    rows={8}
                    value={queryCode}
                    onChange={(e) => setQueryCode(e.target.value)}
                    className="w-full p-3 bg-slate-900 dark:bg-black/80 border border-slate-800 dark:border-indigo-500/30 rounded-lg text-xs font-mono text-indigo-300 dark:text-indigo-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:border-indigo-400"
                  />
                </div>

                <button
                  id="run-query-optimizer-btn"
                  onClick={handleRunQueryOptimizer}
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-violet-600 dark:hover:from-indigo-500 dark:hover:to-violet-500 text-white font-mono text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  <span>{loading ? 'Optimizing Partition Execution...' : 'Analyze & Optimize Pipeline'}</span>
                </button>
              </>
            )}

            {error && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-500/40 rounded-lg text-xs font-mono text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

          </div>

          {/* Right Column: AI Analysis Output */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-[#040914] border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm dark:shadow-xl">
            
            {activeTab === 'security' ? (
              securityResult ? (
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white uppercase">AUDIT VERDICT</span>
                    <span className="px-2.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/40 font-bold">
                      {securityResult.riskLevel}
                    </span>
                  </div>

                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">Identified Vulnerability & CWE:</div>
                    <div className="text-sm font-bold text-blue-700 dark:text-cyan-300 mt-0.5">
                      {securityResult.vulnerabilityIdentified} ({securityResult.cwe})
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">Adversary Exploitation Path:</div>
                    <p className="text-slate-700 dark:text-slate-300 mt-1 font-sans text-xs leading-relaxed bg-slate-50 dark:bg-black/60 p-2.5 rounded border border-slate-200 dark:border-slate-800">
                      {securityResult.exploitationPath}
                    </p>
                  </div>

                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">Hardened Remediation Checklist:</div>
                    <ul className="mt-1 space-y-1 text-slate-700 dark:text-slate-300 text-xs">
                      {securityResult.remediation?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">Red-Team Patched Code:</div>
                    <pre className="mt-1 p-3 bg-slate-950 border border-emerald-500/40 rounded-lg text-emerald-400 text-[11px] overflow-x-auto">
                      {securityResult.patchedSnippet}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 dark:text-slate-400 space-y-2 font-mono text-xs">
                  <Shield className="w-8 h-8 text-blue-600/40 dark:text-cyan-500/40 animate-pulse" />
                  <span>Click "Execute Red Team Security Audit" to trigger deep vulnerability inspection.</span>
                </div>
              )
            ) : (
              optimizationResult ? (
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white uppercase">OPTIMIZATION REPORT</span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40 font-bold">
                      {optimizationResult.estimatedSpeedup}
                    </span>
                  </div>

                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">Detected Query Bottleneck:</div>
                    <div className="text-sm font-bold text-indigo-700 dark:text-indigo-300 mt-0.5">
                      {optimizationResult.bottleneck}
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">Memory & Resource Footprint:</div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                      {optimizationResult.memoryImpact}
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">Optimized Execution Query:</div>
                    <pre className="mt-1 p-3 bg-slate-950 border border-indigo-500/40 rounded-lg text-indigo-300 text-[11px] overflow-x-auto">
                      {optimizationResult.optimizedQuery}
                    </pre>
                  </div>

                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">Architecture Recommendations:</div>
                    <ul className="mt-1 space-y-1 text-slate-700 dark:text-slate-300 text-xs">
                      {optimizationResult.recommendations?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 dark:text-slate-400 space-y-2 font-mono text-xs">
                  <Zap className="w-8 h-8 text-indigo-600/40 dark:text-indigo-500/40 animate-pulse" />
                  <span>Click "Analyze & Optimize Pipeline" to inspect execution plans and partition layouts.</span>
                </div>
              )
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
