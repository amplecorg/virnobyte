import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const s = site ? new URL(site).origin : 'https://virnobyte.com';
  const body = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /account
Disallow: /api/
Disallow: /og-cache/

# AI & Agent Directives
Content-Signal: search=yes, ai-train=no

# Machine-Readable LLM Context & Agent Index
Sitemap: ${s}/sitemap.xml
`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
