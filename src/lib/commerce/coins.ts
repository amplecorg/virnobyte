import { db, get } from '../db';
import { getSettings } from '../settings';

/**
 * Paying part of an order with Virno Coins (like Flipkart SuperCoins).
 * All limits come from Admin → Settings → Coin program:
 *   valueInr             ₹ per coin (1 by default)
 *   maxRedeemPercent     at most this % of the items' price can be paid with coins (0 = no % limit)
 *   maxCoinsPerOrder     hard cap per order (0 = no cap)
 *   minOrderForCoins     coins can be used only when the items cost at least this much
 *   redeemAtCheckout     master switch for the website checkout
 * Coins are taken from the balance when the order is placed and given back automatically
 * if the order is cancelled or never paid / never confirmed with the OTP.
 */
export interface CoinRules {
  enabled: boolean;
  name: string;
  valueInr: number;
  maxPercent: number;
  maxPerOrder: number;
  minOrder: number;
}

export function coinRules(): CoinRules {
  const c = (getSettings().coins || {}) as Record<string, any>;
  return {
    enabled: c.redeemAtCheckout !== false,
    name: String(c.name || 'Virno Coins'),
    valueInr: Math.max(1, Math.trunc(Number(c.valueInr) || 1)),
    maxPercent: Math.min(100, Math.max(0, Math.trunc(Number(c.maxRedeemPercent) || 0))),
    maxPerOrder: Math.max(0, Math.trunc(Number(c.maxCoinsPerOrder) || 0)),
    minOrder: Math.max(0, Math.trunc(Number(c.minOrderForCoins) || 0)),
  };
}

export const coinBalanceOf = (userId: number) =>
  get<{ b: number }>('SELECT COALESCE(SUM(delta), 0) AS b FROM coin_ledger WHERE user_id = ?', userId)?.b ?? 0;

export interface CoinQuote {
  /** Coins the customer has. */
  balance: number;
  /** Coins that would be used on this order (0 when not allowed). */
  coins: number;
  /** Rupees off. */
  discount: number;
  /** Why coins cannot be used, shown under the option. Empty when they can. */
  note: string;
  rules: CoinRules;
}

/** How many coins this customer can put towards items worth `itemsTotal` rupees. */
export function coinQuote(userId: number | null | undefined, itemsTotal: number): CoinQuote {
  const rules = coinRules();
  const balance = userId ? Math.max(0, coinBalanceOf(userId)) : 0;
  const none = (note: string): CoinQuote => ({ balance, coins: 0, discount: 0, note, rules });
  if (!rules.enabled) return none('');
  if (!balance) return none('');
  if (itemsTotal < rules.minOrder) return none(`Coins can be used on orders of ₹${rules.minOrder} or more.`);
  // Rupee limits: the % cap, the per-order cap, and never the whole bill (online payment needs at least ₹1).
  let maxRupees = itemsTotal - 1;
  if (rules.maxPercent > 0) maxRupees = Math.min(maxRupees, Math.floor((itemsTotal * rules.maxPercent) / 100));
  if (rules.maxPerOrder > 0) maxRupees = Math.min(maxRupees, rules.maxPerOrder * rules.valueInr);
  const coins = Math.max(0, Math.min(balance, Math.floor(maxRupees / rules.valueInr)));
  if (!coins) return none('This order is too small to use coins.');
  return { balance, coins, discount: coins * rules.valueInr, note: '', rules };
}

/** Takes coins for a new order. Call inside the order transaction; throws if the balance changed meanwhile. */
export function spendCoinsForOrder(userId: number, coins: number, orderRef: string) {
  if (coins <= 0) return;
  const d = db();
  const bal = (d.prepare('SELECT COALESCE(SUM(delta), 0) AS b FROM coin_ledger WHERE user_id = ?').get(userId) as { b: number }).b;
  if (bal < coins) throw new Error('Your coin balance changed. Please review your order and try again.');
  d.prepare('INSERT INTO coin_ledger (user_id, delta, reason, created_by) VALUES (?, ?, ?, NULL)').run(userId, -coins, `Used on order ${orderRef}`);
}

/** Gives an order's coins back exactly once (cancelled, unpaid or never confirmed). Returns coins refunded. */
export function refundOrderCoins(orderRef: string, why: string): number {
  const d = db();
  if (!d) return 0;
  const o = d.prepare('SELECT id, user_id, coins_used FROM orders WHERE order_id = ?').get(orderRef) as
    | { id: number; user_id: number | null; coins_used: number }
    | undefined;
  if (!o || !o.user_id || !o.coins_used) return 0;
  // The guarded UPDATE makes a second (concurrent) call a no-op.
  const claimed = d.prepare('UPDATE orders SET coins_refunded = 1 WHERE id = ? AND coins_refunded = 0').run(o.id);
  if (!Number(claimed.changes)) return 0;
  d.prepare('INSERT INTO coin_ledger (user_id, delta, reason, created_by) VALUES (?, ?, ?, NULL)').run(o.user_id, o.coins_used, `Refund for order ${orderRef} — ${why}`);
  return o.coins_used;
}
