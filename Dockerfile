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

# Stage 2: Production runtime
FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321
ENV DATA_DIR=/app/data

# Install production dependencies only
COPY package.json package-lock.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy required runtime assets (photos for dynamic OG image generator and public directory)
COPY --from=builder /app/src/assets/photos ./src/assets/photos
COPY --from=builder /app/public ./public

# Prepare persistent data directory for SQLite database and uploads
RUN mkdir -p /app/data/uploads && chmod -R 777 /app/data

# Expose HTTP port
EXPOSE 4321

# Volume for SQLite database, WAL files, and media uploads
VOLUME ["/app/data"]

# Run the Astro standalone server with Node
CMD ["node", "--disable-warning=ExperimentalWarning", "./dist/server/entry.mjs"]
