import { all, get, json, run, tx } from './db';
import { getSettings } from './settings';

export interface Service {
  id: number;
  slug: string;
  name: string;
  short: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  problems: string[];
  includes: string[];
  benefits: string[];
  faqs: { q: string; a: string }[];
  note: string;
  image: string;
  group_name: string;
  footer: number;
}

const hydrateService = (r: any): Service => ({
  ...r,
  problems: json(r.problems, []),
  includes: json(r.includes, []),
  benefits: json(r.benefits, []),
  faqs: json(r.faqs, []),
});

export const services = () =>
  all('SELECT * FROM services WHERE published = 1 ORDER BY sort, id').map(hydrateService);

export const service = (slug: string) => {
  const r = get('SELECT * FROM services WHERE slug = ? AND published = 1', slug);
  return r ? hydrateService(r) : undefined;
};

export interface Plan {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  mrp: number;
  coins: number;
  doorstep_visits: number;
  validity_days: number;
  benefits: string[];
  card_from: string;
  card_to: string;
  card_text: string;
  card_pattern: string;
  badge: string;
  featured: number;
  active: number;
}

export const hydratePlan = (r: any): Plan => ({ ...r, benefits: json(r.benefits, []) });

export const plans = (includeInactive = false) =>
  all(`SELECT * FROM plans ${includeInactive ? '' : 'WHERE active = 1'} ORDER BY sort, id`).map(hydratePlan);

export const planById = (id: number) => {
  const r = get('SELECT * FROM plans WHERE id = ?', id);
  return r ? hydratePlan(r) : undefined;
};

export interface Membership {
  id: number;
  user_id: number;
  plan_id: number;
  card_number: string;
  status: 'pending' | 'active' | 'expired' | 'cancelled';
  start_date: string | null;
  end_date: string | null;
  visits_used: number;
  notes: string;
  created_at: string;
}

/** Latest membership for a user, with expiry applied on read. */
export function currentMembership(userId: number): (Membership & { plan: Plan }) | undefined {
  const m = get<Membership>(
    `SELECT * FROM memberships WHERE user_id = ?
     ORDER BY CASE status WHEN 'active' THEN 0 WHEN 'pending' THEN 1 ELSE 2 END, id DESC LIMIT 1`,
    userId,
  );
  if (!m) return undefined;
  if (m.status === 'active' && m.end_date && m.end_date < new Date().toISOString().slice(0, 10)) {
    run("UPDATE memberships SET status = 'expired' WHERE id = ?", m.id);
    m.status = 'expired';
  }
  const plan = planById(m.plan_id)!;
  return { ...m, plan };
}

export function coinBalance(userId: number): number {
  return get<{ b: number }>('SELECT COALESCE(SUM(delta), 0) AS b FROM coin_ledger WHERE user_id = ?', userId)!.b;
}

export function coinHistory(userId: number, limit = 50) {
  return all<{ id: number; delta: number; reason: string; created_at: string }>(
    'SELECT id, delta, reason, created_at FROM coin_ledger WHERE user_id = ? ORDER BY id DESC LIMIT ?',
    userId,
    limit,
  );
}

export function addCoins(userId: number, delta: number, reason: string, by: number | null) {
  if (!Number.isInteger(delta) || delta === 0) throw new Error('Enter a whole number of coins other than zero.');
  if (delta < 0 && coinBalance(userId) + delta < 0) throw new Error('That would take the balance below zero.');
  run('INSERT INTO coin_ledger (user_id, delta, reason, created_by) VALUES (?, ?, ?, ?)', userId, delta, reason, by);
}

/** Card numbers: PREFIX + year + 8 digits, e.g. VB26 0000 0042 → "VB2600000042". */
export function nextCardNumber() {
  const prefix = getSettings().card.prefix.toUpperCase().replace(/[^A-Z0-9]/g, '') || 'VB';
  const yy = String(new Date().getFullYear()).slice(2);
  const { n } = get<{ n: number }>('SELECT COALESCE(MAX(id), 0) + 1 AS n FROM memberships')!;
  let candidate = `${prefix}${yy}${String(n).padStart(8, '0')}`;
  while (get('SELECT 1 FROM memberships WHERE card_number = ?', candidate)) {
    candidate = `${prefix}${yy}${String(Math.floor(Math.random() * 1e8)).padStart(8, '0')}`;
  }
  return candidate;
}

export function requestMembership(userId: number, planId: number) {
  const existing = currentMembership(userId);
  if (existing && (existing.status === 'pending' || existing.status === 'active')) return existing.id;
  const res = run(
    "INSERT INTO memberships (user_id, plan_id, card_number, status) VALUES (?, ?, ?, 'pending')",
    userId,
    planId,
    nextCardNumber(),
  );
  return Number(res.lastInsertRowid);
}

/** Activates a card, sets validity and credits the plan's welcome coins exactly once. */
export function activateMembership(id: number, adminId: number, startDate?: string) {
  tx(() => {
    const m = get<Membership>('SELECT * FROM memberships WHERE id = ?', id);
    if (!m) throw new Error('Membership not found.');
    const plan = planById(m.plan_id)!;
    const start = startDate || new Date().toISOString().slice(0, 10);
    const end = new Date(new Date(start + 'T00:00:00Z').getTime() + plan.validity_days * 864e5).toISOString().slice(0, 10);
    run("UPDATE memberships SET status = 'active', start_date = ?, end_date = ? WHERE id = ?", start, end, id);
    const reason = `Welcome coins — ${plan.name} card ${m.card_number}`;
    const already = get('SELECT 1 FROM coin_ledger WHERE user_id = ? AND reason = ?', m.user_id, reason);
    if (!already && plan.coins > 0) {
      run('INSERT INTO coin_ledger (user_id, delta, reason, created_by) VALUES (?, ?, ?, ?)', m.user_id, plan.coins, reason, adminId);
    }
  });
}

export const homeFaqs = () => all<{ question: string; answer: string }>('SELECT question, answer FROM faqs WHERE published = 1 AND home = 1 ORDER BY sort, id');
export const allFaqs = () => all<{ question: string; answer: string; topic: string }>('SELECT question, answer, topic FROM faqs WHERE published = 1 ORDER BY sort, id');
export const testimonials = () => all<{ name: string; role: string; quote: string }>('SELECT name, role, quote FROM testimonials WHERE published = 1 ORDER BY sort, id');

export interface Post {
  id: number; slug: string; title: string; description: string; body: string; image: string;
  related: string[]; published_at: string; updated_at: string;
}
const hydratePost = (r: any): Post => ({ ...r, related: json(r.related, []) });
export const posts = (limit = 100) =>
  all("SELECT * FROM posts WHERE published = 1 AND published_at <= date('now') ORDER BY published_at DESC, id DESC LIMIT ?", limit).map(hydratePost);
export const post = (slug: string) => {
  const r = get("SELECT * FROM posts WHERE slug = ? AND published = 1 AND published_at <= date('now')", slug);
  return r ? hydratePost(r) : undefined;
};

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  summary: string;
  price: number | null;
  mrp: number | null;
  condition: string;
  image: string;
  images: string[];
  rating: string;
  rating_count: string;
  badge: string;
  offer_tag: string;
  warranty: string;
  replacement_policy: string;
  diagnostic_setup: string;
  delivery_text: string;
  delivery_sub: string;
  wow_deal: string;
  in_stock: number;
  published: number;
  sort: number;
}

export const hydrateProduct = (r: any): Product => {
  let images = json<string[]>(r.images, []);
  if (!images.length && r.image) images = [r.image];
  return {
    ...r,
    image: images[0] || r.image || '',
    images,
    rating: r.rating || '4.5',
    rating_count: r.rating_count || '128 Ratings & 42 Reviews',
    badge: r.badge || 'Assured',
    offer_tag: r.offer_tag || 'Extra ₹1,000 off with Virnobyte Card',
    warranty: r.warranty || '1 Year Virnobyte Warranty',
    replacement_policy: r.replacement_policy || '7-Day Replacement Guarantee',
    diagnostic_setup: r.diagnostic_setup || 'Free On-Site Diagnostic Setup',
    delivery_text: r.delivery_text || 'Free Delivery by Tomorrow',
    delivery_sub: r.delivery_sub || 'Doorstep setup & testing in PCMC & Pune',
    wow_deal: r.wow_deal || 'Exchange Old Laptop / PC & save up to ₹15,000',
  };
};

export const products = () =>
  all('SELECT * FROM products WHERE published = 1 ORDER BY sort, id').map(hydrateProduct);

export const product = (slug: string) => {
  const r = get('SELECT * FROM products WHERE slug = ? AND published = 1', slug);
  return r ? hydrateProduct(r) : undefined;
};

export const PORTFOLIO_CATEGORIES = {
  'cctv-projects': { name: 'CCTV Projects', service: 'cctv-installation', blurb: 'Camera installations for homes, shops, offices and industrial sites.' },
  'networking-projects': { name: 'Networking Projects', service: 'networking', blurb: 'Office LANs, Wi-Fi coverage and structured cabling.' },
  'office-it-setup': { name: 'Office IT Setup', service: 'it-consulting', blurb: 'Complete IT for new and expanding offices.' },
  'hardware-installations': { name: 'Hardware Installations', service: 'hardware-solutions', blurb: 'Systems, servers, UPS and peripherals supplied and installed.' },
} as const;
export type PortfolioCategory = keyof typeof PORTFOLIO_CATEGORIES;

export const projects = (category?: string) =>
  (category
    ? all('SELECT * FROM projects WHERE published = 1 AND category = ? ORDER BY sort, id DESC', category)
    : all('SELECT * FROM projects WHERE published = 1 ORDER BY sort, id DESC')
  ).map((r: any) => ({ ...r, scope: json<string[]>(r.scope, []) }));

export const gallery = () => all<{ image: string; caption: string }>('SELECT image, caption FROM gallery WHERE published = 1 ORDER BY sort, id DESC');

export interface Job {
  id: number; slug: string; title: string; promise: string; employment_type: string; location: string;
  salary_min: number; salary_max: number; pay_note: string; experience: string; about_role: string;
  duties: string[]; growth: string[]; fits: string[]; image: string; valid_through: string; posted_at: string;
}
const hydrateJob = (r: any): Job => ({ ...r, duties: json(r.duties, []), growth: json(r.growth, []), fits: json(r.fits, []) });
// A role is only public once it has real pay — the careers page never hides salary.
export const jobs = () =>
  all("SELECT * FROM jobs WHERE published = 1 AND salary_max > 0 AND (valid_through = '' OR valid_through >= date('now')) ORDER BY posted_at DESC").map(hydrateJob);
export const job = (slug: string) => {
  const r = get("SELECT * FROM jobs WHERE slug = ? AND published = 1 AND salary_max > 0", slug);
  return r ? hydrateJob(r) : undefined;
};

export const page = (slug: string) =>
  get<{ title: string; description: string; body: string; updated_at: string }>('SELECT * FROM pages WHERE slug = ?', slug);

export function saveEnquiry(e: {
  kind: string; name: string; phone: string; email?: string; topic?: string; message?: string; area?: string; preferred?: string;
}) {
  run(
    'INSERT INTO enquiries (kind, name, phone, email, topic, message, area, preferred) VALUES (?,?,?,?,?,?,?,?)',
    e.kind, e.name, e.phone, e.email ?? '', e.topic ?? '', e.message ?? '', e.area ?? '', e.preferred ?? '',
  );
}
