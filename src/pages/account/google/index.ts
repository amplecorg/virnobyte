import type { APIRoute } from 'astro';
import { randomBytes } from 'node:crypto';
import { siteOrigin } from '@/lib/auth';
import { isSecure } from '@/lib/commerce/http';
import { GOOGLE_STATE_COOKIE, googleAuthUrl, googleConfig } from '@/lib/google';

/** GET /account/google?next=/checkout — sends the shopper to Google's account chooser. */
export const GET: APIRoute = (ctx) => {
  if (!googleConfig().enabled) return ctx.redirect('/account/login', 302);
  const next = ctx.url.searchParams.get('next') ?? '';
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '';
  // The state ties Google's reply to this browser (stops forged sign-in callbacks) and carries "next".
  const state = randomBytes(24).toString('base64url');
  ctx.cookies.set(GOOGLE_STATE_COOKIE, JSON.stringify({ state, next: safeNext }), {
    path: '/account/google',
    httpOnly: true,
    sameSite: 'lax',
    secure: isSecure(ctx),
    maxAge: 600,
  });
  return ctx.redirect(googleAuthUrl(`${siteOrigin(ctx)}/account/google/callback`, state), 302);
};
