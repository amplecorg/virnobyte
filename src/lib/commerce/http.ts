import type { APIContext } from 'astro';

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, no-store' },
  });

export const isSecure = (ctx: Pick<APIContext, 'url' | 'request'>) =>
  ctx.url.protocol === 'https:' || ctx.request.headers.get('x-forwarded-proto') === 'https';

export function getPublicOrigin(ctx: Pick<APIContext, 'url' | 'request'>): string {
  const req = ctx.request;
  const proto = req.headers.get('x-forwarded-proto') || ctx.url.protocol.replace(':', '');
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || ctx.url.host;

  if (proto === 'https') {
    return `https://${host}`;
  }

  // If local development (http://localhost:4321 or http://127.0.0.1) without an HTTPS reverse proxy
  const siteUrl = (process.env.PUBLIC_SITE_URL || '').trim().replace(/\/+$/, '');
  if (siteUrl && siteUrl.startsWith('https://')) {
    return siteUrl;
  }

  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return 'https://virnobyte.com';
  }

  return `https://${host}`;
}

export async function readJson(request: Request): Promise<Record<string, any>> {
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? body : {};
  } catch {
    return {};
  }
}
