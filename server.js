// ==============================================================================
// Hostinger Web Apps & Production Server Entrypoint
// ==============================================================================
import http from 'node:http';
import { existsSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const proc = typeof globalThis.process !== 'undefined' ? globalThis.process : undefined;
const env = proc?.env || {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure cwd is always the project directory
try {
  proc?.chdir?.(__dirname);
} catch {}

// Automatically load .env if present
try {
  proc?.loadEnvFile?.();
} catch {
  // no .env file
}

// Hostinger Web Apps and Cloud PaaS use port 3000 by default
env.PORT = env.PORT || '3000';
env.HOST = env.HOST || '0.0.0.0';
env.NODE_ENV = 'production';

console.log(`[Virnobyte] Launching on ${env.HOST}:${env.PORT} with Node ${proc?.version}`);
console.log(`[Virnobyte] Working directory: ${__dirname}`);

const entryPath = resolve(__dirname, 'dist', 'server', 'entry.mjs');

// If dist folder is missing, build it automatically on the fly
if (!existsSync(entryPath)) {
  console.log('[Virnobyte] dist/server/entry.mjs not found. Running "npm run build" automatically...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (err) {
    console.error('[Virnobyte Error] Failed to auto-build application:', err);
  }
}

// Try to launch Astro standalone server
try {
  console.log(`[Virnobyte] Importing Astro standalone server from ${entryPath}`);
  await import(pathToFileURL(entryPath).href);
  console.log('[Virnobyte] Astro standalone server started successfully.');
} catch (err) {
  console.error('[Virnobyte Fatal Startup Error]:', err);

  // Start an emergency diagnostic server so the error is visible in HTTP responses
  const port = Number(env.PORT) || 3000;
  const host = env.HOST || '0.0.0.0';
  const nodeModulesPath = resolve(__dirname, 'node_modules');
  const hasNodeModules = existsSync(nodeModulesPath);

  const emergencyServer = http.createServer((req, res) => {
    res.writeHead(500, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(
      JSON.stringify(
        {
          error: 'Virnobyte Server Startup Failure',
          message: err?.message,
          code: err?.code,
          stack: err?.stack,
          nodeVersion: proc?.version,
          platform: proc?.platform,
          cwd: proc?.cwd ? proc.cwd() : '.',
          __dirname,
          hasDist: existsSync(entryPath),
          hasNodeModules,
          nodeModulesCount: hasNodeModules ? (readdirSync(nodeModulesPath).length) : 0,
          env: {
            PORT: env.PORT,
            HOST: env.HOST,
            NODE_ENV: env.NODE_ENV,
          },
        },
        null,
        2
      )
    );
  });

  emergencyServer.listen(port, host, () => {
    console.log(`[Virnobyte Emergency Server] Listening on http://${host}:${port} to expose startup error.`);
  });
}
