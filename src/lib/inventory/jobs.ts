import { expireHolds, syncProducts } from './stock';
import { registerInventoryNotifications } from './notify';
import { closeAbandonedOrders } from '../commerce/housekeeping';

/**
 * Background upkeep, started once per app process on the first request:
 *  - every minute: release holds whose online payment never arrived
 *  - every 5 minutes: full re-sync, so vendors whose stock went out of date stop counting
 * Every step is idempotent, so several processes sharing the database is fine.
 */
const G = globalThis as any;

export function startInventoryJobs() {
  registerInventoryNotifications();
  if (G.__vbInventoryJobs) return;
  G.__vbInventoryJobs = true;

  let tick = 0;
  let busy = false;
  const run = async () => {
    if (busy) return;
    busy = true;
    try {
      expireHolds();
      if (tick % 5 === 0) {
        syncProducts();
        // Orders left without OTP / payment for 24 h are cancelled and their coins given back.
        await closeAbandonedOrders();
      }
    } catch (e) {
      console.warn('[Inventory] background job failed:', e);
    } finally {
      tick++;
      busy = false;
    }
  };
  const first = setTimeout(run, 3_000);
  const every = setInterval(run, 60_000);
  first.unref?.();
  every.unref?.();
}
