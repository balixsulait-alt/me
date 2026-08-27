import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper for lazy Gemini AI instance
  const getAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Health check endpoint (Render friendly)
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'operational',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'Sulaiman Balikoowa Portfolio & Threat Simulation Engine',
      environment: process.env.NODE_ENV || 'development',
    });
  });

  // Threat Intel & Live Feed
  app.get('/api/simulations/threat-intel', (req, res) => {
    const intelNodes = [
      { id: 'CVE-2024-3094', title: 'XZ Utils Backdoor (SSH Bypass)', severity: 'CRITICAL', score: 10.0, category: 'Supply Chain', status: 'MITIGATED', detected: '2024-03-29' },
      { id: 'CVE-2024-21626', title: 'runc Container Breakout Leaks', severity: 'HIGH', score: 8.6, category: 'Container Security', status: 'PATCHED', detected: '2024-01-31' },
      { id: 'CVE-2023-4863', title: 'libwebp Heap Buffer Overflow', severity: 'CRITICAL', score: 9.8, category: 'Memory Corruption', status: 'RESOLVED', detected: '2023-09-12' },
      { id: 'CVE-2023-44487', title: 'HTTP/2 Rapid Reset DDoS', severity: 'HIGH', score: 7.5, category: 'DDoS Vector', status: 'FILTERED', detected: '2023-10-10' },
      { id: 'CVE-2024-6387', title: 'regreSSHion OpenSSH Signal Handler Race', severity: 'HIGH', score: 8.1, category: 'Remote Code Exec', status: 'HARDENED', detected: '2024-07-01' }
    ];
    res.json({ success: true, count: intelNodes.length, feed: intelNodes });
  });

  // AI Security Code & Threat Analyzer
  app.post('/api/ai/security-audit', async (req, res) => {
    const { codeSnippet, language, attackScenario } = req.body;

    if (!codeSnippet && !attackScenario) {
      return res.status(400).json({ error: 'Code snippet or attack scenario is required.' });
    }

    try {
      const ai = getAI();
      if (!ai) {
        // Fallback intelligent simulation if no API key is set in local environment
        return res.json({
          simulated: true,
          analysis: {
            vulnerabilityIdentified: attackScenario || 'Unsanitized Input in Dynamic Query / Execution Vector',
            riskLevel: 'HIGH (CVSS 8.4)',
            cwe: 'CWE-89 (SQL Injection) / CWE-78 (OS Command Injection)',
            exploitationPath: 'Attacker injects escape sequences into parameter buffers, triggering arbitrary execution or unauthorized state mutation.',
            remediation: [
              'Implement parameterized queries or prepared statements with strict type bounds.',
              'Apply principle of least privilege on runtime service accounts.',
              'Enforce strict input validation via regex whitelist before parsing.'
            ],
            patchedSnippet: `// Patched Implementation (Red Team Hardened):\n// Enforce parameterized execution and sanitization bounds\nconst safeResult = await db.query(\n  'SELECT id, role, hash FROM users WHERE username = $1 AND active = true',\n  [sanitizedInput]\n);`,
            redTeamNotes: 'Verified payload deterrence against automated fuzzers and sqlmap automated extraction sweeps.'
          }
        });
      }

      const prompt = `You are Sulaiman Balikoowa's automated Ethical Hacking & Red Team Security Analysis assistant.
Analyze the following code snippet or attack scenario:
Language: ${language || 'Auto-detect'}
Scenario: ${attackScenario || 'General Security & Vulnerability Audit'}
Code:
\`\`\`
${codeSnippet || 'N/A'}
\`\`\`

Provide a strict, professional cybersecurity audit in JSON format with the following keys:
- vulnerabilityIdentified (string)
- riskLevel (string, e.g. "CRITICAL (CVSS 9.8)" or "HIGH (CVSS 8.2)")
- cwe (string, e.g. "CWE-89")
- exploitationPath (string, step-by-step description of how a red teamer exploits it)
- remediation (array of 3-4 bullet strings)
- patchedSnippet (string with corrected, hardened code)
- redTeamNotes (string, proactive defense advice)`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '{}';
      const parsed = JSON.parse(text);
      return res.json({ simulated: false, analysis: parsed });
    } catch (err: any) {
      console.error('Error in security audit:', err);
      return res.status(500).json({ error: 'Failed to analyze security payload: ' + (err.message || 'Internal error') });
    }
  });

  // AI Big Data Pipeline & Query Optimizer
  app.post('/api/ai/optimize-query', async (req, res) => {
    const { query, engine, volume } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query or pipeline script is required.' });
    }

    try {
      const ai = getAI();
      if (!ai) {
        return res.json({
          simulated: true,
          optimization: {
            bottleneck: 'Full Table Scan & Unpartitioned Shuffle in distributed stages',
            estimatedSpeedup: '4.8x Throughput Improvement',
            memoryImpact: '-62% RAM Allocation / Garbage Collection pressure reduced',
            optimizedQuery: `-- Partition-pruned & Indexed vectorized aggregation\nSELECT event_date, tenant_id, COUNT(1) AS agg_events, APPROX_COUNT_DISTINCT(user_ip) AS unique_sources\nFROM security_telemetry_stream PARTITION (date = CURRENT_DATE)\nWHERE status_code >= 400\nGROUP BY event_date, tenant_id;`,
            recommendations: [
              'Introduce timestamp bucketing to prevent Spark/PostgreSQL partition skew.',
              'Replace exact count distinct with HyperLogLog for high-cardinality streaming.',
              'Broadcast small lookup tables to eliminate costly shuffle stages.'
            ]
          }
        });
      }

      const prompt = `You are Sulaiman Balikoowa's Big Data Architecture & Stream Pipeline Optimizer.
Analyze the following data query or distributed processing pipeline logic:
Engine: ${engine || 'Distributed SQL / PySpark / PostgreSQL'}
Data Scale: ${volume || '10M+ events/min'}
Query/Logic:
\`\`\`
${query}
\`\`\`

Provide an optimization report in JSON format with keys:
- bottleneck (string)
- estimatedSpeedup (string)
- memoryImpact (string)
- optimizedQuery (string)
- recommendations (array of strings)`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '{}';
      const parsed = JSON.parse(text);
      return res.json({ simulated: false, optimization: parsed });
    } catch (err: any) {
      console.error('Error in query optimization:', err);
      return res.status(500).json({ error: 'Failed to optimize data query: ' + (err.message || 'Internal error') });
    }
  });

  // Contact submission
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log(`[Contact Form Received] From: ${name} <${email}> | Subject: ${subject}`);
    res.json({
      success: true,
      message: 'Transmission acknowledged. Sulaiman Balikoowa will respond promptly via balixsulait@gmail.com.',
      timestamp: new Date().toISOString(),
    });
  });

  // Vite middleware in dev or static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Cyber Ops] Sulaiman Balikoowa Portfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
