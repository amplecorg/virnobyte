import { all, db } from '../db';
import { reconcileOrder } from './checkout';
import { refundOrderCoins } from './coins';
import { reconcileOrderStock } from '../inventory/stock';

const ABANDON_HOURS = 24;

/**
 * Orders that were never finished: a COD order whose OTP was never entered, or an online order
 * that was never paid. After 24 hours they are cancelled, their coins go back to the customer and
 * any held stock is released. Online orders are first re-checked with the gateway, so a real
 * payment that simply reached us late is never cancelled.
 */
export async function closeAbandonedOrders(): Promise<number> {
  const d = db();
  if (!d) return 0;
  const stale = all<{ id: number; order_id: string; order_status: string }>(
    `SELECT id, order_id, order_status FROM orders
     WHERE order_status IN ('AWAITING_OTP','PENDING_PAYMENT') AND payment_status != 'PAID'
       AND created_at <= datetime('now', '-${ABANDON_HOURS} hours')
     LIMIT 50`,
  );
  let closed = 0;
  for (const o of stale) {
    if (o.order_status === 'PENDING_PAYMENT') {
      const fresh = await reconcileOrder(o.order_id).catch(() => undefined);
      if (!fresh || fresh.payment_status === 'PAID') continue;
    }
    const why = o.order_status === 'AWAITING_OTP' ? 'OTP not entered within 24 hours' : 'not paid within 24 hours';
    const res = d
      .prepare(
        `UPDATE orders SET order_status = 'CANCELLED', notes = trim(notes || ' [Auto-cancelled: ' || ? || ']'), updated_at = CURRENT_TIMESTAMP
         WHERE id = ? AND order_status = ? AND payment_status != 'PAID'`,
      )
      .run(why, o.id, o.order_status);
    if (!Number(res.changes)) continue;
    refundOrderCoins(o.order_id, o.order_status === 'AWAITING_OTP' ? 'order not confirmed' : 'order not paid');
    reconcileOrderStock(o.id);
    closed++;
  }
  return closed;
}
