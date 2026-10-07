import type { APIRoute } from 'astro';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, resolve, sep } from 'node:path';
import { UPLOAD_DIR } from '@/lib/db';

const TYPES: Record<string, string> = {
  webp: 'image/webp',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  avif: 'image/avif',
};

export const GET: APIRoute = ({ params }) => {
  const root = resolve(UPLOAD_DIR);
  const file = resolve(join(root, params.path ?? ''));
  if (!file.startsWith(root + sep) || !existsSync(file) || !statSync(file).isFile()) {
    return new Response('Not found', { status: 404 });
  }
  const type = TYPES[file.split('.').pop()!.toLowerCase()];
  if (!type) return new Response('Not found', { status: 404 });
  return new Response(readFileSync(file), {
    headers: { 'Content-Type': type, 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
