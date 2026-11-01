import { defineMiddleware } from 'astro:middleware';
import { userFromCookies } from './lib/auth';

// Old WordPress URLs → new canonical pages (permanent redirects keep their link equity).
const LEGACY: Record<string, string> = {
  '/memberships': '/membership',
  '/shop': '/products',
  '/cart': '/membership',
  '/checkout': '/membership',
  '/my-account': '/account',
  '/terms-conditions': '/terms-and-conditions',
  '/terms-and-condition': '/terms-and-conditions',
  '/refund_returns': '/terms-and-conditions',
  '/policies': '/terms-and-conditions',
  '/cpu-desktop-and-laptop': '/services/computer-repair',
  '/annual-maintenance-contract': '/services/amc-services',
  '/latest-news': '/blog',
  '/contact-us': '/contact',
  '/our-certificates': '/about#certificates',
  '/our-leadership-vision': '/about',
  '/about-us': '/about',
  '/product/canon-printer': '/products',
  '/product/basic-plan': '/membership',
  '/product/professional-it-support': '/membership',
  '/product/enterprise-it-care': '/membership',
  '/product/premium-it-partner': '/membership',
};

const PRIVATE = /^\/(admin|account|api)(\/|$)/;

export const onRequest = defineMiddleware(async (ctx, next) => {
  const url = ctx.url;
  // Use the raw request path: Astro may normalise ctx.url's trailing slash.
  const pathname = new URL(ctx.request.url).pathname;

  // Canonicalise: lowercase, no trailing slash, no duplicate slashes (static assets excluded).
  if (!pathname.startsWith('/_') && !pathname.startsWith('/uploads/') && ctx.request.method === 'GET') {
    let clean = pathname.replace(/\/{2,}/g, '/');
    if (clean.length > 1 && clean.endsWith('/')) clean = clean.replace(/\/+$/, '');
    if (!PRIVATE.test(clean)) clean = clean.toLowerCase();
    const target = LEGACY[clean] ?? clean;
    if (target !== pathname) {
      return ctx.redirect(target + url.search, 301);
    }
  }

  const user = userFromCookies(ctx.cookies);
  ctx.locals.user = user;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!user || user.role !== 'admin') return ctx.redirect(`/admin/login?next=${encodeURIComponent(pathname)}`);
  }
  if (pathname.startsWith('/api/admin') && (!user || user.role !== 'admin')) {
    return new Response('Forbidden', { status: 403 });
  }
  if (
    pathname === '/account' ||
    (pathname.startsWith('/account/') &&
      !/^\/account\/(login|register|forgot-password|reset-password)$/.test(pathname))
  ) {
    if (!user) return ctx.redirect(`/account/login?next=${encodeURIComponent(pathname + url.search)}`);
  }

  const res = await next();
  const h = res.headers;
  h.set('X-Content-Type-Options', 'nosniff');
  h.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  h.set('X-Frame-Options', 'SAMEORIGIN');
  h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (PRIVATE.test(pathname)) {
    h.set('Cache-Control', 'private, no-store');
    h.set('X-Robots-Tag', 'noindex, nofollow');
  } else if (!h.has('Cache-Control') && (h.get('content-type') ?? '').includes('text/html')) {
    // Short shared cache; admin edits appear within a minute on a CDN.
    h.set('Cache-Control', user ? 'private, no-cache' : 'public, max-age=0, s-maxage=60, stale-while-revalidate=600');
  }
  return res;
});
