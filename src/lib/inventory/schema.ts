/**
 * Dropship inventory tables. Kept apart from `products`: inventory only ever writes
 * `products.in_stock` (for tracked products), so the shop, cart and checkout keep working unchanged.
 *
 * - inv_sources      Where stock lives: Virnobyte's own stock (one row, kind 'own') and each vendor.
 * - inv_stock        Units on hand per source × product (what the source says it can ship).
 * - inv_products     Which products inventory controls, plus their low-stock level and cached availability.
 * - inv_allocations  Which source ships which order line, and its fulfilment status.
 * - inv_movements    Log of every quantity change (never money).
 */
export const INVENTORY_SCHEMA = `
CREATE TABLE IF NOT EXISTS inv_sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL DEFAULT 'vendor' CHECK (kind IN ('own','vendor')),
  name TEXT NOT NULL,
  contact_name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  priority INTEGER NOT NULL DEFAULT 10,
  active INTEGER NOT NULL DEFAULT 1,
  update_method TEXT NOT NULL DEFAULT 'portal',
  stale_hours INTEGER NOT NULL DEFAULT 24,
  stock_updated_at TEXT,
  portal_token_hash TEXT NOT NULL DEFAULT '',
  portal_last_seen TEXT,
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS inv_stock (
  source_id INTEGER NOT NULL REFERENCES inv_sources(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  qty INTEGER NOT NULL DEFAULT 0 CHECK (qty >= 0),
  sku TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (source_id, product_id)
);
CREATE INDEX IF NOT EXISTS idx_inv_stock_product ON inv_stock(product_id);

CREATE TABLE IF NOT EXISTS inv_products (
  product_id INTEGER PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  tracked INTEGER NOT NULL DEFAULT 1,
  low_level INTEGER NOT NULL DEFAULT 2,
  low_alerted INTEGER NOT NULL DEFAULT 0,
  available INTEGER NOT NULL DEFAULT 0,
  synced_at TEXT
);

CREATE TABLE IF NOT EXISTS inv_allocations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  order_item_id INTEGER REFERENCES order_items(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL,
  source_id INTEGER REFERENCES inv_sources(id) ON DELETE SET NULL,
  qty INTEGER NOT NULL CHECK (qty > 0),
  status TEXT NOT NULL,
  expires_at TEXT,
  courier TEXT NOT NULL DEFAULT '',
  tracking_no TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  assigned_at TEXT,
  shipped_at TEXT,
  delivered_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_inv_alloc_status ON inv_allocations(status);
CREATE INDEX IF NOT EXISTS idx_inv_alloc_source ON inv_allocations(source_id, status);
CREATE INDEX IF NOT EXISTS idx_inv_alloc_order ON inv_allocations(order_id);
CREATE INDEX IF NOT EXISTS idx_inv_alloc_product ON inv_allocations(product_id, status);

CREATE TABLE IF NOT EXISTS inv_movements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_id INTEGER,
  product_id INTEGER NOT NULL,
  delta INTEGER NOT NULL,
  qty_after INTEGER NOT NULL,
  kind TEXT NOT NULL,
  ref TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  actor TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_inv_mov_product ON inv_movements(product_id, id);
CREATE INDEX IF NOT EXISTS idx_inv_mov_source ON inv_movements(source_id, id);

INSERT INTO inv_sources (kind, name, priority, update_method, stale_hours)
SELECT 'own', 'Virnobyte (own stock)', 0, 'manual', 0
WHERE NOT EXISTS (SELECT 1 FROM inv_sources WHERE kind = 'own');
`;
