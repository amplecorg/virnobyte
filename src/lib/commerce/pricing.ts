/**
 * Pure pricing rules. No database or request access here, so the same
 * function prices the cart page, the checkout summary and the final order.
 * All amounts are whole rupees.
 */
export const MAX_QTY = 10;

export interface Line {
  productId: number;
  slug: string;
  name: string;
  category: string;
  image: string;
  quantity: number;
  unitPrice: number;
  mrp: number;
  lineTotal: number;
  /** False when the product is out of stock or has no online price. */
  available: boolean;
  unavailableReason: string;
  /** Highest quantity the shopper can pick right now (live stock for inventory-tracked products). */
  maxQty: number;
  /** Shown under the line, e.g. "Only 2 left — quantity lowered to 2". */
  stockNote: string;
}

export interface Totals {
  /** Units across purchasable lines. */
  itemCount: number;
  mrpTotal: number;
  discount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export interface DeliveryRules {
  deliveryFee: number;
  minFreeDelivery: number;
}

export const clampQty = (n: unknown) => Math.min(MAX_QTY, Math.max(1, Math.floor(Number(n)) || 1));

export function computeTotals(lines: Line[], rules: DeliveryRules): Totals {
  const buyable = lines.filter((l) => l.available);
  const itemCount = buyable.reduce((n, l) => n + l.quantity, 0);
  const subtotal = buyable.reduce((n, l) => n + l.lineTotal, 0);
  const mrpTotal = buyable.reduce((n, l) => n + Math.max(l.mrp, l.unitPrice) * l.quantity, 0);
  const deliveryFee = itemCount === 0 || subtotal >= rules.minFreeDelivery ? 0 : rules.deliveryFee;
  return {
    itemCount,
    mrpTotal,
    discount: mrpTotal - subtotal,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  };
}
