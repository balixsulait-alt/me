import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health check endpoint
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

  // Contact submission
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
    }
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
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Cyber Ops] Sulaiman Balikoowa Portfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
