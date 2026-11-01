// ==============================================================================
// Hostinger Web Apps & Production Server Entrypoint
// ==============================================================================
import process from 'node:process';
import { existsSync } from 'node:fs';

// Automatically load .env if present
try {
  process.loadEnvFile();
} catch {
  // no .env file
}

// Hostinger Web Apps and Cloud PaaS use port 3000 by default
process.env.PORT = process.env.PORT || '3000';
process.env.HOST = process.env.HOST || '0.0.0.0';
process.env.NODE_ENV = 'production';

const entryPath = './dist/server/entry.mjs';

if (!existsSync(entryPath)) {
  console.error(`[Virnobyte Error] Built server entry '${entryPath}' was not found!`);
  console.error('Please ensure "npm run build" has been executed before starting the server.');
  process.exit(1);
}

console.log(`[Virnobyte] Launching server on http://${process.env.HOST}:${process.env.PORT}`);

// Launch the compiled Astro standalone server
await import(entryPath);
