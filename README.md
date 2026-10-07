# Virnobyte website

Astro 7 website for Virnobyte (IT services, computer repair, CCTV and networking in Chikhali, Pimpri-Chinchwad and Pune). It includes an admin panel, a membership card and coin system, and a 3D custom PC builder.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build && npm start   # production server (PORT, HOST env vars)
```

On first start the SQLite database (`data/virnobyte.db`) is created and seeded, and an admin account is created from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`. Sign in at **/admin**.

Requires Node 22.12+ (uses the built-in `node:sqlite`, so there are no native modules to compile).

## Stack

| Part | Choice |
| --- | --- |
| Framework | Astro 7, `output: 'server'` with `@astrojs/node` (server-rendered HTML for every page) |
| Data | SQLite via `node:sqlite`, auto-migrated in `src/lib/db.ts` |
| Images | 4K source photos in `src/assets/photos`, served as AVIF/WebP `srcset` by `astro:assets`; admin uploads converted to WebP (≤ 3840 px) |
| PC builder | React island (`client:load`) + Three.js / React Three Fiber / drei. Three.js is a lazy chunk loaded only on `/custom-pc-builder` |
| Fonts | Bricolage Grotesque (self-hosted, preloaded) — one family, four sizes |

## What the admin controls (`/admin`)

- **Members & coins** — create members, issue/activate/renew membership cards, edit card number, status, validity and visits, credit or redeem coins with a reason (full ledger), reset passwords.
- **Plans & card design** — price, crossed-out price, welcome coins, visits, validity, benefits, and the card's colours and pattern, with a live card preview.
- **Coin program** — coin name, rupee value, max % of a bill, expiry, rules.
- **Business details (NAP)** — one source for header, footer, contact page, map, JSON-LD and cards.
- **Home hero, careers page, announcement bar, search-engine verification codes.**
- **Content** — services (with SEO title/description/H1, FAQs), blog, FAQs, products, portfolio, gallery, careers roles (pay required before publishing), testimonials (only verified ones should be published), legal pages.
- **Leads** — booking-form enquiries, job applications and PC build quotes/orders.
- **PC builder** — parts catalogue with prices and specs, preset builds, GST and fees.

## SEO implementation

- `src/components/SEO.astro`: title, description, canonical, robots, Open Graph, Twitter card, JSON-LD.
- Dynamic 1200×630 OG images per service, post, role and page: `/og/...jpg` (cached in `data/og-cache`).
- JSON-LD: LocalBusiness/ComputerStore, WebSite, Service, BreadcrumbList, FAQPage (only for visible FAQs), BlogPosting, JobPosting (with real pay only).
- `/sitemap.xml` (canonical, indexable URLs only; empty portfolio/gallery pages are excluded and noindexed) and `/robots.txt`.
- Middleware 301s: uppercase → lowercase, trailing slash removal, and all old WordPress URLs (`/memberships`, `/shop`, `/terms-conditions`, `/latest-news`, …).
- No invented ratings, reviews, hours, certifications or benchmark scores.

## Deploying

1. Set `PUBLIC_SITE_URL` (canonical domain), `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and optionally `DATA_DIR` (persistent volume for the database and uploads).
2. `npm ci && npm run build && npm start` behind HTTPS (nginx/Caddy or a Node host). Keep `src/assets/photos` deployed alongside `dist` (used by the OG image generator).
3. Back up `DATA_DIR` regularly — it holds members, coins, enquiries and uploads.

## Before launch — please verify

- **PC builder prices and specs** are indicative seed values. Update them in *Parts & prices*.
- **Photos** are free-licence Unsplash images (no attribution required). Replace the hero, careers and portfolio images with real photos of your workshop and work.
- **Testimonials** imported from the old site are unpublished until verified.
- **Careers**: the seeded *Field Service Technician* role is a draft and needs a real pay range before it can be published.
- **Hiring timeline**, **coin rules**, **terms** and **privacy policy** text are drafts written for Virnobyte; review them.
- Opening hours are blank on purpose. Add them in Settings once confirmed.
- 3D `.glb` models: add files under `public/models/<category>/` and set the part's *3D model URL*; otherwise the built-in procedural model is used.

## Scripts

- `npm run images` — re-download the 4K photo library.
- `node scripts/brand-assets.mjs` — rebuild logo variants, favicons and the web manifest from `src/assets/virnobyte-logo.png`.
