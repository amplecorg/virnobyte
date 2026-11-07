// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';

// Canonical origin used for <link rel="canonical">, OG URLs, sitemap and JSON-LD.
const SITE = process.env.PUBLIC_SITE_URL || 'https://virnobyte.com';

export default defineConfig({
  site: SITE,
  output: 'server',
  security: {
    checkOrigin: false,
  },
  adapter: node({ mode: 'standalone' }),
  // React is used only for the PC builder island; no other page ships React.
  integrations: [react()],
  // The middleware 301s trailing-slash URLs to the canonical form.
  trailingSlash: 'ignore',
  build: { format: 'file', inlineStylesheets: 'never' },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  image: {
    // Responsive widths up to 4K for hero and full-bleed photography.
    breakpoints: [480, 768, 1080, 1440, 1920, 2560, 3840],
  },
  server: {
    port: 3000,
    host: true,
  },
  vite: {
    server: {
      allowedHosts: true,
    },
    ssr: { external: ['node:sqlite'] },
  },
});
