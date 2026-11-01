// ==============================================================================
// Hostinger Web Apps & Production Server Entrypoint
// ==============================================================================
import process from 'node:process';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

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

// If dist folder is missing, build it automatically on the fly
if (!existsSync(entryPath)) {
  console.log('[Virnobyte] Built server entry not found. Running "npm run build" automatically...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (err) {
    console.error('[Virnobyte Error] Failed to auto-build application:', err);
    process.exit(1);
  }
}

console.log(`[Virnobyte] Launching server on http://${process.env.HOST}:${process.env.PORT}`);

// Launch the compiled Astro standalone server
await import(entryPath);
