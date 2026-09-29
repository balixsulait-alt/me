# ---- build stage ----
FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY package.json ./
# No lockfile on purpose: lets npm resolve the correct native binaries
# (tailwind oxide, lightningcss, rollup) for the build platform.
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

# ---- runtime stage ----
FROM node:20-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.cjs"]
