import type { APIRoute } from 'astro';
import { all } from '@/lib/db';
import { jobs, projects, gallery, PORTFOLIO_CATEGORIES } from '@/lib/data';

// Only canonical, indexable URLs. Private routes and empty (noindex) pages are excluded.
export const GET: APIRoute = ({ site }) => {
  const today = new Date().toISOString().slice(0, 10);
  const urls: { loc: string; lastmod?: string; priority: string }[] = [];
  const add = (path: string, priority = '0.6', lastmod?: string) => {
    const loc = new URL(path, site).href;
    urls.push({ loc: path === '/' ? loc : loc.replace(/\/$/, ''), priority, lastmod });
  };

  add('/', '1.0', today);
  add('/services', '0.9', today);
  for (const s of all<{ slug: string }>('SELECT slug FROM services WHERE published = 1 ORDER BY sort')) add(`/services/${s.slug}`, '0.9');
  add('/membership', '0.8');
  add('/custom-pc-builder', '0.8');
  add('/products', '0.7');
  add('/about', '0.7');
  add('/contact', '0.8');
  add('/faq', '0.6');
  add('/company-profile', '0.5');
  add('/careers', '0.5');
  for (const j of jobs()) add(`/careers/${j.slug}`, '0.5', j.posted_at);
  add('/blog', '0.6');
  for (const p of all<{ slug: string; updated_at: string }>(
    "SELECT slug, updated_at FROM posts WHERE published = 1 AND published_at <= date('now')",
  ))
    add(`/blog/${p.slug}`, '0.6', p.updated_at);
  add('/portfolio', '0.6');
  const proj = projects();
  for (const slug of Object.keys(PORTFOLIO_CATEGORIES)) if (proj.some((p) => p.category === slug)) add(`/portfolio/${slug}`, '0.5');
  if (gallery().length) add('/gallery', '0.4');
  add('/privacy-policy', '0.2');
  add('/terms-and-conditions', '0.2');

  const body = urls
    .map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<priority>${u.priority}</priority></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
};
