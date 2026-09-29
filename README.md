# Sulaiman Balikoowa — Portfolio

Interactive cybersecurity, ethical hacking and big data portfolio built with React, Vite, Tailwind CSS and an Express server.

## Run locally

Prerequisites: Node.js 18+

```bash
npm install
npm run dev
```

The app runs on http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

The server reads the `PORT` environment variable (default `3000`).

## Deploy on SnapDeploy

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Port: use the `PORT` environment variable (the server already does)
- Health check path: `/api/health`
