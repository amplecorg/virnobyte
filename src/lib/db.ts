import { createRequire } from 'node:module';
import { mkdirSync, existsSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import os from 'node:os';
import { seedDatabase } from './seed';
import { SERVICES } from './content/services';
import { POSTS } from './content/posts';
import { INVENTORY_SCHEMA } from './inventory/schema';

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
  offer_tag TEXT NOT NULL DEFAULT '',
  wow_deal TEXT NOT NULL DEFAULT '',
  bank_offer TEXT NOT NULL DEFAULT '',
  emi_offer TEXT NOT NULL DEFAULT '',
  partner_offer TEXT NOT NULL DEFAULT '',
  warranty TEXT NOT NULL DEFAULT '',
  replacement_policy TEXT NOT NULL DEFAULT '',
  diagnostic_setup TEXT NOT NULL DEFAULT '',
  delivery_text TEXT NOT NULL DEFAULT '',
  delivery_sub TEXT NOT NULL DEFAULT '',
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

-- One cart per browser (cookie token); user_id is attached once the shopper signs in.
CREATE TABLE IF NOT EXISTS carts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT NOT NULL UNIQUE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_carts_user ON carts(user_id);

-- Cart lines hold only product + quantity; prices are always read live from products.
CREATE TABLE IF NOT EXISTS cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cart_id INTEGER NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  added_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (cart_id, product_id)
);

-- Order lines are a price snapshot taken at checkout; later product edits never change them.
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER,
  product_slug TEXT NOT NULL,
  product_name TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '',
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL,
  mrp INTEGER NOT NULL DEFAULT 0,
  line_total INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- Gateway webhook log; the UNIQUE event id makes webhook handling idempotent.
CREATE TABLE IF NOT EXISTS payment_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL,
  event_id TEXT NOT NULL,
  event_type TEXT NOT NULL DEFAULT '',
  order_ref TEXT NOT NULL DEFAULT '',
  payload TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (provider, event_id)
);
`;

let instance: any = null;
let dbInitError: string | null = null;
let journalMode = '';
let inMemory = false;
const startedAt = new Date().toISOString();

export function getDbStatus() {
  return {
    ok: !!instance,
    sqliteAvailable: !!DatabaseSyncClass,
    sqliteLoadError,
    dbInitError,
    dataDir: DATA_DIR,
    // Diagnostics: different pids/startedAt across requests mean several app processes share the DB.
    journalMode,
    inMemory,
    pid: proc?.pid,
    startedAt,
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
      // Never accept admin edits into a throwaway in-memory DB on the live site: they would
      // silently vanish on the next restart. Fail loudly instead (the site serves built-in content).
      if (env.NODE_ENV === 'production') throw diskErr;
      console.warn(`[Virnobyte DB] Disk DB (${dbPath}) failed: ${diskErr?.message}. Falling back to in-memory database.`);
      d = new DatabaseSyncClass(':memory:');
      inMemory = true;
    }

    // Wait for other processes' locks instead of failing a save.
    try {
      d.exec('PRAGMA busy_timeout = 10000;');
    } catch {}

    // Journal mode. WAL needs reliable shared memory between processes; on shared hosting
    // (Hostinger hbuilds / persistent_data, CageFS, network storage) several Node processes can
    // otherwise miss or overwrite each other's saves — edits then "revert after some time".
    // The classic rollback journal (DELETE) is safe across processes there.
    const shared = /persistent_data|\/hbuilds\//.test(DATA_DIR);
    const wanted = String(env.SQLITE_JOURNAL_MODE || (shared ? 'DELETE' : 'WAL')).toUpperCase();
    try {
      if (wanted !== 'WAL') d.exec('PRAGMA wal_checkpoint(TRUNCATE);');
      d.exec(`PRAGMA journal_mode = ${wanted === 'WAL' ? 'WAL' : 'DELETE'};`);
    } catch (jmErr: any) {
      console.warn(`[Virnobyte DB] Could not set journal_mode=${wanted}:`, jmErr?.message);
    }
    try {
      journalMode = String((d.prepare('PRAGMA journal_mode').get() as any)?.journal_mode ?? '');
    } catch {}

    try {
      // FULL fsyncs each commit, so a save survives a process being recycled right after it.
      d.exec(`PRAGMA foreign_keys = ON; PRAGMA synchronous = ${journalMode === 'wal' ? 'NORMAL' : 'FULL'};`);
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
        ['offer_tag', "TEXT NOT NULL DEFAULT ''"],
        ['wow_deal', "TEXT NOT NULL DEFAULT ''"],
        ['bank_offer', "TEXT NOT NULL DEFAULT ''"],
        ['emi_offer', "TEXT NOT NULL DEFAULT ''"],
        ['partner_offer', "TEXT NOT NULL DEFAULT ''"],
        ['warranty', "TEXT NOT NULL DEFAULT ''"],
        ['replacement_policy', "TEXT NOT NULL DEFAULT ''"],
        ['diagnostic_setup', "TEXT NOT NULL DEFAULT ''"],
        ['delivery_text', "TEXT NOT NULL DEFAULT ''"],
        ['delivery_sub', "TEXT NOT NULL DEFAULT ''"],
        // GST invoicing: blank HSN / 0% means "use the company default from settings".
        ['hsn', "TEXT NOT NULL DEFAULT ''"],
        ['gst_rate', 'INTEGER NOT NULL DEFAULT 0'],
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

    // Auto-migration: ensure posts table columns exist for image size and content control
    try {
      const postCols = d.prepare('PRAGMA table_info(posts)').all() as { name: string }[];
      const postColSet = new Set(postCols.map((c) => c.name));
      const postMigrations: [string, string][] = [
        ['image_size', "TEXT NOT NULL DEFAULT '21/9'"],
        ['image_fit', "TEXT NOT NULL DEFAULT 'cover'"],
        ['author', "TEXT NOT NULL DEFAULT 'Virnobyte Team'"],
      ];

      for (const [colName, colDef] of postMigrations) {
        if (!postColSet.has(colName)) {
          d.exec(`ALTER TABLE posts ADD COLUMN ${colName} ${colDef}`);
        }
      }
    } catch (migErr) {
      console.warn('[Virnobyte DB] Migration error for posts table:', migErr);
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

    // Auto-migration: multi-item orders and gateway-neutral payment columns
    try {
      const orderCols = d.prepare('PRAGMA table_info(orders)').all() as { name: string }[];
      const orderColSet = new Set(orderCols.map((c) => c.name));
      const orderMigrations: [string, string][] = [
        ['user_id', 'INTEGER'],
        ['cart_id', 'INTEGER'],
        ['items_count', 'INTEGER NOT NULL DEFAULT 1'],
        ['subtotal', 'INTEGER NOT NULL DEFAULT 0'],
        ['gateway', "TEXT NOT NULL DEFAULT ''"],
        ['gateway_order_id', "TEXT NOT NULL DEFAULT ''"],
        ['gateway_payment_id', "TEXT NOT NULL DEFAULT ''"],
        ['paid_at', 'TEXT'],
        // Tax invoice: number is issued once (when paid, or at COD confirmation) and never changes.
        ['invoice_no', "TEXT NOT NULL DEFAULT ''"],
        ['invoice_date', 'TEXT'],
        ['customer_company', "TEXT NOT NULL DEFAULT ''"],
        ['customer_gstin', "TEXT NOT NULL DEFAULT ''"],
      ];
      for (const [colName, colDef] of orderMigrations) {
        if (!orderColSet.has(colName)) {
          d.exec(`ALTER TABLE orders ADD COLUMN ${colName} ${colDef}`);
        }
      }
      d.exec('CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id)');
      d.exec('CREATE INDEX IF NOT EXISTS idx_orders_gateway_order ON orders(gateway_order_id)');
      d.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_invoice_no ON orders(invoice_no) WHERE invoice_no != ''");
      // Per-financial-year running number for website invoices (e.g. 26-27 → 1, 2, 3…).
      d.exec('CREATE TABLE IF NOT EXISTS invoice_counters (fy TEXT PRIMARY KEY, last INTEGER NOT NULL DEFAULT 0)');
      const itemCols = new Set((d.prepare('PRAGMA table_info(order_items)').all() as { name: string }[]).map((c) => c.name));
      if (!itemCols.has('hsn')) d.exec("ALTER TABLE order_items ADD COLUMN hsn TEXT NOT NULL DEFAULT ''");
      if (!itemCols.has('gst_rate')) d.exec('ALTER TABLE order_items ADD COLUMN gst_rate INTEGER NOT NULL DEFAULT 0');
    } catch (migErr) {
      console.warn('[Virnobyte DB] Migration error for orders columns:', migErr);
    }

    // Google sign-in, coin redemption on orders, order OTP and membership purchases.
    try {
      const userCols = new Set((d.prepare('PRAGMA table_info(users)').all() as { name: string }[]).map((c) => c.name));
      if (!userCols.has('google_sub')) d.exec('ALTER TABLE users ADD COLUMN google_sub TEXT');
      d.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_users_google_sub ON users(google_sub) WHERE google_sub IS NOT NULL');
      const oc = new Set((d.prepare('PRAGMA table_info(orders)').all() as { name: string }[]).map((c) => c.name));
      const add: [string, string][] = [
        ['coins_used', 'INTEGER NOT NULL DEFAULT 0'],
        ['coin_discount', 'INTEGER NOT NULL DEFAULT 0'],
        ['coins_refunded', 'INTEGER NOT NULL DEFAULT 0'],
        // 'product' (shop order) or 'membership' (membership card purchase).
        ['kind', "TEXT NOT NULL DEFAULT 'product'"],
        ['membership_id', 'INTEGER'],
      ];
      for (const [c, def] of add) if (!oc.has(c)) d.exec(`ALTER TABLE orders ADD COLUMN ${c} ${def}`);
      d.exec(`CREATE TABLE IF NOT EXISTS order_otps (
        order_id INTEGER PRIMARY KEY REFERENCES orders(id) ON DELETE CASCADE,
        code_hash TEXT NOT NULL,
        sent_to TEXT NOT NULL DEFAULT '',
        expires_at TEXT NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0,
        sends INTEGER NOT NULL DEFAULT 1,
        last_sent_at TEXT NOT NULL DEFAULT (datetime('now')),
        verified_at TEXT
      )`);
    } catch (migErr) {
      console.warn('[Virnobyte DB] Migration error for sign-in / coins / OTP columns:', migErr);
    }

    // Dropship inventory (separate tables; see lib/inventory/schema.ts).
    try {
      d.exec(INVENTORY_SCHEMA);
    } catch (migErr) {
      console.warn('[Virnobyte DB] Migration error for inventory tables:', migErr);
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

let txDepth = 0;

function runTx<T>(begin: string, fn: () => T): T {
  const d = db();
  // Nested calls join the outer transaction instead of failing on a second BEGIN.
  if (!d || typeof d.exec !== 'function' || txDepth > 0) return fn();
  d.exec(begin);
  txDepth++;
  try {
    const out = fn();
    txDepth--;
    d.exec('COMMIT');
    return out;
  } catch (e) {
    txDepth--;
    try {
      d.exec('ROLLBACK');
    } catch {}
    throw e;
  }
}

export function tx<T>(fn: () => T): T {
  return runTx('BEGIN', fn);
}

/**
 * Takes the write lock up front. Use when the transaction reads then writes based on what it read
 * (stock checks), so two app processes can never both sell the last unit.
 */
export function txImmediate<T>(fn: () => T): T {
  return runTx('BEGIN IMMEDIATE', fn);
}

export function json<T = any>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
