import React, { useState } from 'react';
import { Mail, Github, Copy, Check, Send, Shield, Key, Terminal, MessageSquare, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showPgp, setShowPgp] = useState(false);
  const [pgpCopied, setPgpCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.10
Comment: Sulaiman Balikoowa <balixsulait@gmail.com>

mQENBF+K...SULAIMAN...BALIKOOWA...CYBER...KEY...
4096R/0x8F94D27C1290EE04
Fingerprint: 4E92 1A8F 309B 810C DD24  76B1 8F94 D27C 1290 EE04
-----END PGP PUBLIC KEY BLOCK-----`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPgp = () => {
    navigator.clipboard.writeText(pgpKey);
    setPgpCopied(true);
    setTimeout(() => setPgpCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Transmission failed');
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-50 dark:bg-[#030712] relative border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(14,165,233,0.06),transparent_80%)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(6,182,212,0.12),transparent_80%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-cyan-950/80 border border-blue-200 dark:border-cyan-500/40 text-blue-700 dark:text-cyan-300 text-xs font-mono font-semibold">
            <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>TRANSMISSION CHANNEL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Initiate Contact & Collaborations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans">
            Reach out for red teaming consultations, distributed big data architecture audits, or startup venture discussions.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Info & Keys */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Primary Email Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#060e1d] border border-slate-200 dark:border-cyan-500/30 shadow-sm dark:shadow-xl space-y-4 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
                  DIRECT TRANSMISSION
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div>
                <div className="text-slate-500 dark:text-slate-400 text-xs font-medium">Primary Contact Email:</div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-300 transition-colors block mt-0.5 break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-cyan-300 font-medium transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
                </button>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-xs text-white font-bold transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Mail</span>
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#060e1d] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl space-y-3 font-mono">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                COMMUNITY & REPOSITORIES
              </span>
              
              <div className="space-y-2 pt-1 text-xs">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>GitHub: <strong>balixsulait-alt</strong></span>
                  </div>
                  <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-semibold">Open Profile →</span>
                </a>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>HackTheBox: <strong>Pro Hacker Labs</strong></span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40 font-semibold">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* PGP Public Key Section */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                  <Key className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span>PGP Encrypted Ingestion</span>
                </div>
                <button
                  onClick={() => setShowPgp(!showPgp)}
                  className="text-[11px] text-blue-600 dark:text-cyan-400 hover:underline font-semibold"
                >
                  {showPgp ? 'Hide Key' : 'View PGP Key'}
                </button>
              </div>

              {showPgp && (
                <div className="pt-2 space-y-2">
                  <pre className="p-2.5 bg-slate-900 dark:bg-black rounded border border-slate-800 text-[10px] text-slate-300 dark:text-slate-400 overflow-x-auto select-all">
                    {pgpKey}
                  </pre>
                  <button
                    onClick={handleCopyPgp}
                    className="w-full py-1.5 rounded bg-slate-200 dark:bg-slate-900 hover:bg-slate-300 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[11px] text-slate-800 dark:text-cyan-300 font-medium flex items-center justify-center gap-1.5"
                  >
                    {pgpCopied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{pgpCopied ? 'PGP Key Copied' : 'Copy Public Key'}</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Encrypted Message Dispatcher Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#060e1d] border border-slate-200 dark:border-cyan-500/30 shadow-sm dark:shadow-xl space-y-6">
              
              <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-mono text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                    Dispatch Secure Message to Sulaiman
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    Direct transmission logged and forwarded to balixsulait@gmail.com
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-cyan-950 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-500/30 font-semibold">
                  TLS ENCRYPTED
                </span>
              </div>

              {status === 'success' ? (
                <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/50 text-center space-y-3 font-mono">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Transmission Acknowledged!</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Your message has been received by Sulaiman Balikoowa. A response will be dispatched to your email address promptly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-700 dark:text-slate-300 font-medium">Your Name / Handle *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Hunter"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-black/70 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:border-cyan-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-700 dark:text-slate-300 font-medium">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-black/70 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700 dark:text-slate-300 font-medium">Topic / Inquiry Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Red Team Audit / Big Data Architecture / Collab"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-black/70 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700 dark:text-slate-300 font-medium">Message Transmission *</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project, attack simulation requirements, or collaboration scope..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-black/70 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:border-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-cyan-600 dark:via-teal-600 dark:to-blue-600 dark:hover:from-cyan-500 dark:hover:to-blue-500 text-white font-mono text-xs font-bold shadow-sm dark:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === 'submitting' ? 'Encrypting & Dispatching...' : 'Transmit Message'}</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
