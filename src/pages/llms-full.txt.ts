import type { APIRoute } from 'astro';
import { generatePageMarkdown } from '@/lib/agent-markdown';
import { services, products, posts } from '@/lib/data';

export const GET: APIRoute = ({ site }) => {
  const origin = site ? new URL(site).origin : 'https://virnobyte.com';

  const parts: string[] = [];

  // 1. Home
  const homeMd = generatePageMarkdown('/', origin);
  if (homeMd) parts.push(homeMd);

  // 2. Services
  const svcs = services();
  parts.push(`\n# All IT Services (${svcs.length} Services)\n`);
  for (const s of svcs) {
    const sMd = generatePageMarkdown(`/services/${s.slug}`, origin);
    if (sMd) parts.push(sMd);
  }

  // 3. Products
  const prods = products();
  parts.push(`\n# Hardware Store Catalog (${prods.length} Products)\n`);
  for (const p of prods) {
    const pMd = generatePageMarkdown(`/products/${p.slug}`, origin);
    if (pMd) parts.push(pMd);
  }

  // 4. Blog Posts
  const allPosts = posts(10);
  parts.push(`\n# Knowledge Base & Troubleshooting Guides\n`);
  for (const p of allPosts) {
    const bMd = generatePageMarkdown(`/blog/${p.slug}`, origin);
    if (bMd) parts.push(bMd);
  }

  const fullText = parts.join('\n\n---\n\n');

  return new Response(fullText, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

