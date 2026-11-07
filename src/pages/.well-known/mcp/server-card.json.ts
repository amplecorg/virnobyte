import type { APIRoute } from 'astro';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

export const GET: APIRoute = ({ site, url }) => {
  const origin = site ? new URL(site).origin : url.origin;
  const filePath = resolve(process.cwd(), 'public/.well-known/mcp/server-card.json');

  let card: any;
  if (existsSync(filePath)) {
    try {
      card = JSON.parse(readFileSync(filePath, 'utf-8'));
      card.endpoint = `${origin}/api/mcp`;
      card.contact.url = origin;
    } catch {
      card = { name: 'virnobyte', version: '1.0.0', endpoint: `${origin}/api/mcp` };
    }
  } else {
    card = { name: 'virnobyte', version: '1.0.0', endpoint: `${origin}/api/mcp` };
  }

  return new Response(JSON.stringify(card, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

