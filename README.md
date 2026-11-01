# Virnobyte website

Astro 7 website for Virnobyte (IT services, computer repair, CCTV and networking in Chikhali, Pimpri-Chinchwad and Pune). It includes an admin panel, a membership card and coin system, and a 3D custom PC builder.

## Run it locally

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

## Production Deployment (Hostinger VPS & Cloud Linux)

The project includes an enterprise-grade `docker-compose.yml` pre-configured for Hostinger VPS with:
- **Private Network Isolation**: Node.js port 4321 is not exposed to the public internet.
- **Caddy Edge Reverse Proxy**: Fully automated Let's Encrypt / ZeroSSL TLS certificates, HTTP/2 & HTTP/3 (QUIC), and auto-renewals.
- **Resource Constraints**: CPU and Memory limits to protect the VPS from out-of-memory lockups.
- **Log Rotation**: Capped container logs (30MB max) to protect VPS disk space.
- **Zero-Downtime Live Backups**: Atomic snapshots using SQLite `VACUUM INTO`.

### Quick Setup Steps on Hostinger VPS

1. **Point your domain** DNS `A` records (`@` and `www`) to your Hostinger VPS public IP.
2. **SSH into your Hostinger VPS**:
   ```bash
   ssh root@<YOUR_HOSTINGER_VPS_IP>
   ```
3. **Clone the repository**:
   ```bash
   git clone <YOUR_GIT_REPO_URL> /opt/virnobyte
   cd /opt/virnobyte
   ```
4. **Create and edit your production `.env`**:
   ```bash
   cp .env.example .env
   nano .env
   ```
   *Set `PUBLIC_SITE_URL`, `DOMAIN_NAME`, `ACME_EMAIL`, `ADMIN_PASSWORD`, and your SMTP credentials.*
5. **Start the containers in the background**:
   ```bash
   docker compose up -d --build
   ```
6. **Check health and logs**:
   ```bash
   docker compose ps
   docker compose logs -f
   ```

### Database Live Backup

To create an atomic, zero-downtime backup of the live SQLite database:
```bash
docker compose exec virnobyte node scripts/backup.mjs
```
*Backups are saved to `/app/data/backups/` and older snapshots are automatically pruned after 14 days.*

## Scripts

- `npm run images` — re-download the 4K photo library.
- `node scripts/brand-assets.mjs` — rebuild logo variants, favicons and the web manifest from `src/assets/virnobyte-logo.png`.
- `node scripts/backup.mjs` — create an atomic snapshot of `data/virnobyte.db`.
