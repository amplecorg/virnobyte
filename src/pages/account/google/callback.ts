import type { APIRoute } from 'astro';
import { createSession, rateLimit, siteOrigin } from '@/lib/auth';
import { isSecure } from '@/lib/commerce/http';
import { GOOGLE_STATE_COOKIE, googleConfig, googleProfile, userForGoogle } from '@/lib/google';

/** GET /account/google/callback — Google sends the shopper back here with a one-time code. */
export const GET: APIRoute = async (ctx) => {
  const fail = (msg: string) => ctx.redirect(`/account/login?google_error=${encodeURIComponent(msg)}`, 303);
  if (!googleConfig().enabled) return fail('Google sign-in is not set up.');
  if (!rateLimit(`google:${ctx.clientAddress}`, 20, 10 * 60_000)) return fail('Too many attempts. Please wait a few minutes.');

  let saved: { state?: string; next?: string } = {};
  try {
    saved = JSON.parse(ctx.cookies.get(GOOGLE_STATE_COOKIE)?.value || '{}');
  } catch {}
  ctx.cookies.delete(GOOGLE_STATE_COOKIE, { path: '/account/google' });

  const code = ctx.url.searchParams.get('code');
  const state = ctx.url.searchParams.get('state');
  if (ctx.url.searchParams.get('error')) return fail('Google sign-in was cancelled.');
  if (!code || !state || !saved.state || state !== saved.state) return fail('That sign-in link expired. Please try again.');

  try {
    const profile = await googleProfile(code, `${siteOrigin(ctx)}/account/google/callback`);
    const user = userForGoogle(profile);
    createSession(ctx.cookies, user.id, isSecure(ctx));
    return ctx.redirect(saved.next || '/account', 303);
  } catch (e: any) {
    console.warn('[Google sign-in] failed:', e?.message);
    return fail(e?.message || 'Google sign-in failed. Please try again.');
  }
};
