import type { APIContext } from 'astro';

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, no-store' },
  });

export const isSecure = (ctx: Pick<APIContext, 'url' | 'request'>) =>
  ctx.url.protocol === 'https:' || ctx.request.headers.get('x-forwarded-proto') === 'https';

export async function readJson(request: Request): Promise<Record<string, any>> {
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? body : {};
  } catch {
    return {};
  }
}
