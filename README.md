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

## Deploy on Render

Option A (blueprint): push the repo to GitHub, then in Render choose **New > Blueprint**; `render.yaml` configures everything.

Option B (manual): create a **Web Service** with
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Health check path: `/api/health`

Render provides `PORT` automatically; no other environment variables are needed.
