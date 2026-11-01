# Stage 1: Build the Astro application
FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Install dependencies needed for build
COPY package.json package-lock.json ./
RUN npm install

# Copy project source files
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Production runtime (Hostinger Web Apps & VPS optimized)
FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
# Port 3000 is the standard expected by Hostinger Web Apps & cloud PaaS
ENV PORT=3000
ENV DATA_DIR=/app/data

# Install production dependencies only
COPY package.json package-lock.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copy built application and server launcher from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js

# Copy required runtime assets (photos for dynamic OG image generator and public directory)
COPY --from=builder /app/src/assets/photos ./src/assets/photos
COPY --from=builder /app/public ./public

# Prepare persistent data directory for SQLite database and uploads
RUN mkdir -p /app/data/uploads && chmod -R 777 /app/data

# Expose HTTP ports (3000 for Hostinger Web Apps; 4321 for standard Astro)
EXPOSE 3000
EXPOSE 4321

# Volume for SQLite database, WAL files, and media uploads
VOLUME ["/app/data"]

# Container health monitoring for Hostinger
HEALTHCHECK --interval=20s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# Run the server launcher with Node
CMD ["node", "--disable-warning=ExperimentalWarning", "./server.js"]
