// ==============================================================================
// Hostinger Web Apps & Production Server Entrypoint
// ==============================================================================
import process from 'node:process';
import http from 'node:http';
import { existsSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure cwd is always the project directory
try {
  process.chdir(__dirname);
} catch {}

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

console.log(`[Virnobyte] Launching on ${process.env.HOST}:${process.env.PORT} with Node ${process.version}`);
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
  const port = Number(process.env.PORT) || 3000;
  const host = process.env.HOST || '0.0.0.0';
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
          nodeVersion: process.version,
          platform: process.platform,
          cwd: process.cwd(),
          __dirname,
          hasDist: existsSync(entryPath),
          hasNodeModules,
          nodeModulesCount: hasNodeModules ? (readdirSync(nodeModulesPath).length) : 0,
          env: {
            PORT: process.env.PORT,
            HOST: process.env.HOST,
            NODE_ENV: process.env.NODE_ENV,
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
