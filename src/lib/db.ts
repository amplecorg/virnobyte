import { createRequire } from 'node:module';
import { mkdirSync, existsSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import os from 'node:os';
import { seedDatabase } from './seed';
import { SERVICES } from './content/services';
import { POSTS } from './content/posts';

const proc = typeof globalThis.process !== 'undefined' ? globalThis.process : (typeof process !== 'undefined' ? process : undefined);
const env = proc?.env || {};

// Load .env for both `astro dev` and the standalone server (no-op if missing).
try {
  proc?.loadEnvFile?.();
} catch {
  /* no .env file */
}

let DatabaseSyncClass: any = null;
let sqliteLoadError: string | null = null;

try {
  const req = createRequire(import.meta.url);
  DatabaseSyncClass = req('node:sqlite').DatabaseSync;
} catch (err: any) {
  sqliteLoadError = err?.message || String(err);
  console.warn('[Virnobyte DB Warning] node:sqlite module could not be loaded:', sqliteLoadError);
}

function resolveDataDir(): string {
  if (env.DATA_DIR) {
    try {
      mkdirSync(env.DATA_DIR, { recursive: true });
      return env.DATA_DIR;
    } catch {}
  }

  const cwd = proc?.cwd ? proc.cwd() : '.';

  // 1. If running on Hostinger Web Apps (path has /hbuilds/):
  // Hostinger creates a new random UUID folder under /hbuilds/versions/<uuid> on EVERY deploy.
  // To keep data permanent across all deploys, store it in /home/u.../domains/virnobyte.com/persistent_data/
  if (typeof cwd === 'string' && cwd.includes('/hbuilds/')) {
    try {
      const domainRoot = cwd.split('/hbuilds/')[0];
      const persistentDir = join(domainRoot, 'persistent_data');
      mkdirSync(persistentDir, { recursive: true });

      const persistentDb = join(persistentDir, 'virnobyte.db');
      if (!existsSync(persistentDb)) {
        // Look for the most recent virnobyte.db across previous version directories to rescue user data
        let bestCandidate: string | null = null;
        let latestTime = 0;

        const checkCandidate = (f: string) => {
          if (existsSync(f)) {
            try {
              const st = statSync(f);
              if (st.size > 0 && st.mtimeMs > latestTime) {
                latestTime = st.mtimeMs;
                bestCandidate = f;
              }
            } catch {}
          }
        };

        // Check local cwd first
        checkCandidate(join(cwd, 'data', 'virnobyte.db'));

        // Check previous versions in hbuilds/versions
        const versionsDir = join(domainRoot, 'hbuilds', 'versions');
        if (existsSync(versionsDir)) {
          try {
            const dirs = readdirSync(versionsDir);
            for (const d of dirs) {
              checkCandidate(join(versionsDir, d, 'nodejs', 'data', 'virnobyte.db'));
            }
          } catch {}
        }

        if (bestCandidate) {
          try {
            copyFileSync(bestCandidate, persistentDb);
            console.log(`[Virnobyte DB] Rescued and migrated existing DB from ${bestCandidate} to ${persistentDb}`);
          } catch (copyErr) {
            console.warn('[Virnobyte DB] Failed to copy candidate DB:', copyErr);
          }
        }
      }

      // Also ensure uploads directory exists in persistent storage
      const persistentUploads = join(persistentDir, 'uploads');
      mkdirSync(persistentUploads, { recursive: true });

      return persistentDir;
    } catch (e) {
      console.warn('[Virnobyte DB] Failed to initialize Hostinger persistent directory:', e);
    }
  }

  // 2. Try project root / data (for local development)
  try {
    const p = join(cwd, 'data');
    mkdirSync(p, { recursive: true });
    return p;
  } catch {}

  // 3. Try OS temp directory (CageFS / CloudLinux always grants write access to tmp)
  try {
    const tmp = join(os.tmpdir(), 'virnobyte_data');
    mkdirSync(tmp, { recursive: true });
    return tmp;
  } catch {}

  return join(cwd, 'data');
}

export const DATA_DIR = resolveDataDir();
export const UPLOAD_DIR = join(DATA_DIR, 'uploads');
try {
  mkdirSync(UPLOAD_DIR, { recursive: true });
} catch {}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('admin','customer')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS password_resets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_password_resets_token ON password_resets(token_hash);
CREATE INDEX IF NOT EXISTS idx_password_resets_user ON password_resets(user_id);

CREATE TABLE IF NOT EXISTS plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL DEFAULT 0,
  mrp INTEGER NOT NULL DEFAULT 0,
  coins INTEGER NOT NULL DEFAULT 0,
  doorstep_visits INTEGER NOT NULL DEFAULT 0,
  validity_days INTEGER NOT NULL DEFAULT 365,
  benefits TEXT NOT NULL DEFAULT '[]',
  card_from TEXT NOT NULL DEFAULT '#0b2545',
  card_to TEXT NOT NULL DEFAULT '#1d4e89',
  card_text TEXT NOT NULL DEFAULT '#ffffff',
  card_pattern TEXT NOT NULL DEFAULT 'circuit',
  badge TEXT NOT NULL DEFAULT '',
  featured INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS memberships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id INTEGER NOT NULL REFERENCES plans(id),
  card_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','active','expired','cancelled')),
  start_date TEXT,
  end_date TEXT,
  visits_used INTEGER NOT NULL DEFAULT 0,
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS coin_ledger (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  delta INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_by INTEGER REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  h1 TEXT NOT NULL DEFAULT '',
  intro TEXT NOT NULL DEFAULT '',
  problems TEXT NOT NULL DEFAULT '[]',
  includes TEXT NOT NULL DEFAULT '[]',
  benefits TEXT NOT NULL DEFAULT '[]',
  faqs TEXT NOT NULL DEFAULT '[]',
  note TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  group_name TEXT NOT NULL DEFAULT 'Repair',
  footer INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  related TEXT NOT NULL DEFAULT '[]',
  published INTEGER NOT NULL DEFAULT 1,
  published_at TEXT NOT NULL DEFAULT (date('now')),
  updated_at TEXT NOT NULL DEFAULT (date('now'))
);

CREATE TABLE IF NOT EXISTS faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  topic TEXT NOT NULL DEFAULT 'General',
  home INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  quote TEXT NOT NULL,
  published INTEGER NOT NULL DEFAULT 0,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Laptops',
  summary TEXT NOT NULL DEFAULT '',
  price INTEGER,
  mrp INTEGER,
  condition TEXT NOT NULL DEFAULT 'New',
  image TEXT NOT NULL DEFAULT '',
  images TEXT NOT NULL DEFAULT '[]',
  rating TEXT NOT NULL DEFAULT '4.5',
  rating_count TEXT NOT NULL DEFAULT '128 Ratings & 42 Reviews',
  badge TEXT NOT NULL DEFAULT 'Assured',
  offer_tag TEXT NOT NULL DEFAULT 'Extra ₹1,000 off with Virnobyte Card',
  warranty TEXT NOT NULL DEFAULT '1 Year Virnobyte Warranty',
  replacement_policy TEXT NOT NULL DEFAULT '7-Day Replacement Guarantee',
  diagnostic_setup TEXT NOT NULL DEFAULT 'Free On-Site Diagnostic Setup',
  delivery_text TEXT NOT NULL DEFAULT 'Free Delivery by Tomorrow',
  delivery_sub TEXT NOT NULL DEFAULT 'Doorstep setup & testing in PCMC & Pune',
  wow_deal TEXT NOT NULL DEFAULT 'Exchange Old Laptop / PC & save up to ₹15,000',
  in_stock INTEGER NOT NULL DEFAULT 1,
  published INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('cctv-projects','networking-projects','office-it-setup','hardware-installations')),
  title TEXT NOT NULL,
  client_type TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  scope TEXT NOT NULL DEFAULT '[]',
  image TEXT NOT NULL DEFAULT '',
  completed_on TEXT NOT NULL DEFAULT '',
  published INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS gallery (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  published INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  promise TEXT NOT NULL DEFAULT '',
  employment_type TEXT NOT NULL DEFAULT 'FULL_TIME',
  location TEXT NOT NULL DEFAULT 'Chikhali, Pimpri-Chinchwad',
  salary_min INTEGER NOT NULL DEFAULT 0,
  salary_max INTEGER NOT NULL DEFAULT 0,
  pay_note TEXT NOT NULL DEFAULT '',
  experience TEXT NOT NULL DEFAULT '',
  about_role TEXT NOT NULL DEFAULT '',
  duties TEXT NOT NULL DEFAULT '[]',
  growth TEXT NOT NULL DEFAULT '[]',
  fits TEXT NOT NULL DEFAULT '[]',
  image TEXT NOT NULL DEFAULT '',
  valid_through TEXT NOT NULL DEFAULT '',
  published INTEGER NOT NULL DEFAULT 1,
  posted_at TEXT NOT NULL DEFAULT (date('now'))
);

CREATE TABLE IF NOT EXISTS pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT (date('now'))
);

CREATE TABLE IF NOT EXISTS pc_parts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('cpu','motherboard','ram','gpu','storage','psu','cooler','case','extra')),
  brand TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL,
  specs TEXT NOT NULL DEFAULT '{}',
  price INTEGER NOT NULL DEFAULT 0,
  model_url TEXT NOT NULL DEFAULT '',
  in_stock INTEGER NOT NULL DEFAULT 1,
  active INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS pc_presets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  parts TEXT NOT NULL DEFAULT '[]',
  active INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS pc_builds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  parts TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  subtotal INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'saved' CHECK (status IN ('saved','quote','quoted','ordered','closed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL DEFAULT 'service',
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  topic TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  area TEXT NOT NULL DEFAULT '',
  preferred TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','closed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL UNIQUE,
  product_id INTEGER,
  product_name TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL,
  mrp INTEGER,
  discount INTEGER NOT NULL DEFAULT 0,
  delivery_fee INTEGER NOT NULL DEFAULT 0,
  total_amount INTEGER NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL DEFAULT '',
  address_line1 TEXT NOT NULL,
  address_line2 TEXT NOT NULL DEFAULT '',
  pincode TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Pune',
  state TEXT NOT NULL DEFAULT 'Maharashtra',
  address_type TEXT NOT NULL DEFAULT 'Home',
  payment_method TEXT NOT NULL DEFAULT 'cashfree',
  payment_status TEXT NOT NULL DEFAULT 'PENDING',
  order_status TEXT NOT NULL DEFAULT 'CONFIRMED',
  cashfree_order_id TEXT NOT NULL DEFAULT '',
  cashfree_session_id TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

let instance: any = null;
let dbInitError: string | null = null;

export function getDbStatus() {
  return {
    ok: !!instance,
    sqliteAvailable: !!DatabaseSyncClass,
    sqliteLoadError,
    dbInitError,
    dataDir: DATA_DIR,
    nodeVersion: proc?.version || 'unknown',
  };
}

export function db(): any {
  if (instance) return instance;

  if (!DatabaseSyncClass) {
    return null;
  }

  try {
    const dbPath = join(DATA_DIR, 'virnobyte.db');
    let d: any;
    try {
      d = new DatabaseSyncClass(dbPath);
    } catch (diskErr: any) {
      console.warn(`[Virnobyte DB] Disk DB (${dbPath}) failed: ${diskErr?.message}. Falling back to in-memory database.`);
      d = new DatabaseSyncClass(':memory:');
    }

    // Try WAL mode, fallback to DELETE if WAL fails (e.g. shared hosting / CageFS)
    try {
      d.exec('PRAGMA journal_mode = WAL;');
    } catch (walErr: any) {
      console.warn('[Virnobyte DB] WAL mode failed, falling back to DELETE mode:', walErr?.message);
      try {
        d.exec('PRAGMA journal_mode = DELETE;');
      } catch {}
    }

    try {
      d.exec('PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;');
    } catch {}

    d.exec(SCHEMA);

    // Auto-migration: ensure products table has all modern Flipkart & e-commerce columns
    try {
      const cols = d.prepare('PRAGMA table_info(products)').all() as { name: string }[];
      const colSet = new Set(cols.map((c: any) => c.name));

      const productMigrations: [string, string][] = [
        ['images', "TEXT NOT NULL DEFAULT '[]'"],
        ['rating', "TEXT NOT NULL DEFAULT '4.5'"],
        ['rating_count', "TEXT NOT NULL DEFAULT '128 Ratings & 42 Reviews'"],
        ['badge', "TEXT NOT NULL DEFAULT 'Assured'"],
        ['offer_tag', "TEXT NOT NULL DEFAULT 'Extra ₹1,000 off with Virnobyte Card'"],
        ['warranty', "TEXT NOT NULL DEFAULT '1 Year Virnobyte Warranty'"],
        ['replacement_policy', "TEXT NOT NULL DEFAULT '7-Day Replacement Guarantee'"],
        ['diagnostic_setup', "TEXT NOT NULL DEFAULT 'Free On-Site Diagnostic Setup'"],
        ['delivery_text', "TEXT NOT NULL DEFAULT 'Free Delivery by Tomorrow'"],
        ['delivery_sub', "TEXT NOT NULL DEFAULT 'Doorstep setup & testing in PCMC & Pune'"],
        ['wow_deal', "TEXT NOT NULL DEFAULT 'Exchange Old Laptop / PC & save up to ₹15,000'"],
      ];

      for (const [colName, colDef] of productMigrations) {
        if (!colSet.has(colName)) {
          d.exec(`ALTER TABLE products ADD COLUMN ${colName} ${colDef}`);
        }
      }

      if (!colSet.has('images')) {
        d.exec("UPDATE products SET images = json_array(image) WHERE image != '' AND (images = '' OR images = '[]')");
      }
    } catch (migErr) {
      console.warn('[Virnobyte DB] Migration error for products table:', migErr);
    }

    // Auto-migration: ensure orders table exists
    try {
      d.exec(`
        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id TEXT NOT NULL UNIQUE,
          product_id INTEGER,
          product_name TEXT NOT NULL,
          product_slug TEXT NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1,
          unit_price INTEGER NOT NULL,
          mrp INTEGER,
          discount INTEGER NOT NULL DEFAULT 0,
          delivery_fee INTEGER NOT NULL DEFAULT 0,
          total_amount INTEGER NOT NULL,
          customer_name TEXT NOT NULL,
          customer_phone TEXT NOT NULL,
          customer_email TEXT NOT NULL DEFAULT '',
          address_line1 TEXT NOT NULL,
          address_line2 TEXT NOT NULL DEFAULT '',
          pincode TEXT NOT NULL,
          city TEXT NOT NULL DEFAULT 'Pune',
          state TEXT NOT NULL DEFAULT 'Maharashtra',
          address_type TEXT NOT NULL DEFAULT 'Home',
          payment_method TEXT NOT NULL DEFAULT 'cashfree',
          payment_status TEXT NOT NULL DEFAULT 'PENDING',
          order_status TEXT NOT NULL DEFAULT 'CONFIRMED',
          cashfree_order_id TEXT NOT NULL DEFAULT '',
          cashfree_session_id TEXT NOT NULL DEFAULT '',
          notes TEXT NOT NULL DEFAULT '',
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
    } catch (migErr) {
      console.warn('[Virnobyte DB] Migration error for orders table:', migErr);
    }

    seedDatabase(d);
    instance = d;
    return d;
  } catch (err: any) {
    dbInitError = err?.message || String(err);
    console.error('[Virnobyte DB Init Error]:', err);
    return null;
  }
}

function serviceToRow(s: any, idx = 0) {
  return {
    id: idx + 1,
    slug: s.slug,
    name: s.name,
    short: s.short,
    title: s.title,
    description: s.description,
    h1: s.h1,
    intro: s.intro,
    problems: JSON.stringify(s.problems || []),
    includes: JSON.stringify(s.includes || []),
    benefits: JSON.stringify(s.benefits || []),
    faqs: JSON.stringify(s.faqs || []),
    note: s.note ?? '',
    image: s.image,
    group_name: s.group,
    footer: s.footer ? 1 : 0,
    published: 1,
    sort: idx,
  };
}

function fallbackAll(sql: string, params: any[]): any[] {
  const s = sql.toLowerCase();
  if (s.includes('from services')) {
    if (params && params.length > 0 && typeof params[0] === 'string') {
      const match = SERVICES.find((x) => x.slug === params[0]);
      return match ? [serviceToRow(match)] : [];
    }
    return SERVICES.map((svc, i) => serviceToRow(svc, i));
  }
  if (s.includes('from posts')) {
    return POSTS.map((p, i) => ({
      id: i + 1,
      slug: p.slug,
      title: p.title,
      description: p.description,
      body: p.body,
      image: p.image,
      related: JSON.stringify(p.related || []),
      published: 1,
      published_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0],
    }));
  }
  if (s.includes('from plans')) {
    return [
      { id: 1, slug: 'basic', name: 'Basic', tagline: 'For a home computer or laptop', price: 999, mrp: 1299, coins: 500, doorstep_visits: 2, validity_days: 365, benefits: '[]', card_from: '#0f2a4a', card_to: '#2a5d8f', card_text: '#ffffff', card_pattern: 'circuit', badge: '', featured: 0, active: 1, sort: 0 },
      { id: 2, slug: 'pro', name: 'Pro', tagline: 'For families and home offices', price: 1799, mrp: 1999, coins: 1000, doorstep_visits: 4, validity_days: 365, benefits: '[]', card_from: '#062c5c', card_to: '#0a66c2', card_text: '#ffffff', card_pattern: 'circuit', badge: 'Most chosen', featured: 1, active: 1, sort: 1 },
      { id: 3, slug: 'pro-plus', name: 'Pro+', tagline: 'For shops and small offices', price: 2499, mrp: 2999, coins: 2000, doorstep_visits: 8, validity_days: 365, benefits: '[]', card_from: '#111418', card_to: '#3a3f47', card_text: '#ffffff', card_pattern: 'grid', badge: '', featured: 0, active: 1, sort: 2 },
    ];
  }
  if (s.includes('from faqs')) {
    return [
      { id: 1, question: 'Where is Virnobyte located?', answer: 'Our office is at Office No. 1, Sadichha Complex, near Bright Computer Education, Savtamali, Mahadev Temple Road, Jadhav Wadi, Chikhali, Pimpri-Chinchwad, Maharashtra 411062.', topic: 'General', home: 1, published: 1, sort: 0 },
      { id: 2, question: 'Which areas do you serve?', answer: 'We serve Chikhali, Pimpri-Chinchwad and Pune. Walk-in repairs are handled at our Chikhali workshop, and doorstep visits are available for homes and offices in these areas.', topic: 'General', home: 1, published: 1, sort: 1 },
      { id: 3, question: 'Do you provide doorstep computer service?', answer: 'Yes. Many repairs, installations and network jobs are done on-site. If a fault needs workshop equipment, we take the device with us and tell you when it will be ready.', topic: 'Repairs', home: 1, published: 1, sort: 2 },
    ];
  }
  if (s.includes('from testimonials')) {
    return [];
  }
  if (s.includes('from settings')) {
    return [];
  }
  return [];
}

type Row = Record<string, any>;

export function all<T = Row>(sql: string, ...params: any[]): T[] {
  try {
    const d = db();
    if (d && typeof d.prepare === 'function') {
      return d.prepare(sql).all(...params) as T[];
    }
  } catch (err) {
    console.warn('[Virnobyte DB Warning] Query failed in all():', err);
  }
  return fallbackAll(sql, params) as T[];
}

export function get<T = Row>(sql: string, ...params: any[]): T | undefined {
  try {
    const d = db();
    if (d && typeof d.prepare === 'function') {
      return d.prepare(sql).get(...params) as T | undefined;
    }
  } catch (err) {
    console.warn('[Virnobyte DB Warning] Query failed in get():', err);
  }
  const rows = fallbackAll(sql, params);
  return (rows[0] as T) || undefined;
}

export function run(sql: string, ...params: any[]) {
  try {
    const d = db();
    if (d && typeof d.prepare === 'function') {
      return d.prepare(sql).run(...params);
    }
  } catch (err) {
    console.warn('[Virnobyte DB Warning] Query failed in run():', err);
  }
  return { changes: 0, lastInsertRowid: 0 };
}

export function tx<T>(fn: () => T): T {
  const d = db();
  if (d && typeof d.exec === 'function') {
    d.exec('BEGIN');
    try {
      const out = fn();
      d.exec('COMMIT');
      return out;
    } catch (e) {
      d.exec('ROLLBACK');
      throw e;
    }
  }
  return fn();
}

export function json<T = any>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
