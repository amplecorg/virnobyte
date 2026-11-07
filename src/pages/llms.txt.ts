import type { APIRoute } from 'astro';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

export const GET: APIRoute = ({ site }) => {
  const origin = site ? new URL(site).origin : 'https://virnobyte.com';
  let body = '';
  const filePath = resolve(process.cwd(), 'public/llms.txt');

  if (existsSync(filePath)) {
    body = readFileSync(filePath, 'utf-8');
    body = body.replace(/https:\/\/virnobyte\.com/g, origin);
  } else {
    body = `# Virnobyte\n> IT Services, Computer Repair & Hardware in Pune & PCMC.\nWebsite: ${origin}\n`;
  }

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

