import { i as get, r as db } from "./db_CrQR8QZK.mjs";
import { n as getSettings } from "./settings_C74a6Mrw.mjs";
//#region src/lib/commerce/coins.ts
function coinRules() {
	const c = getSettings().coins || {};
	return {
		enabled: c.redeemAtCheckout !== false,
		name: String(c.name || "Virno Coins"),
		valueInr: Math.max(1, Math.trunc(Number(c.valueInr) || 1)),
		maxPercent: Math.min(100, Math.max(0, Math.trunc(Number(c.maxRedeemPercent) || 0))),
		maxPerOrder: Math.max(0, Math.trunc(Number(c.maxCoinsPerOrder) || 0)),
		minOrder: Math.max(0, Math.trunc(Number(c.minOrderForCoins) || 0))
	};
}
var coinBalanceOf = (userId) => get("SELECT COALESCE(SUM(delta), 0) AS b FROM coin_ledger WHERE user_id = ?", userId)?.b ?? 0;
/** How many coins this customer can put towards items worth `itemsTotal` rupees. */
function coinQuote(userId, itemsTotal) {
	const rules = coinRules();
	const balance = userId ? Math.max(0, coinBalanceOf(userId)) : 0;
	const none = (note) => ({
		balance,
		coins: 0,
		discount: 0,
		note,
		rules
	});
	if (!rules.enabled) return none("");
	if (!balance) return none("");
	if (itemsTotal < rules.minOrder) return none(`Coins can be used on orders of ₹${rules.minOrder} or more.`);
	let maxRupees = itemsTotal - 1;
	if (rules.maxPercent > 0) maxRupees = Math.min(maxRupees, Math.floor(itemsTotal * rules.maxPercent / 100));
	if (rules.maxPerOrder > 0) maxRupees = Math.min(maxRupees, rules.maxPerOrder * rules.valueInr);
	const coins = Math.max(0, Math.min(balance, Math.floor(maxRupees / rules.valueInr)));
	if (!coins) return none("This order is too small to use coins.");
	return {
		balance,
		coins,
		discount: coins * rules.valueInr,
		note: "",
		rules
	};
}
/** Takes coins for a new order. Call inside the order transaction; throws if the balance changed meanwhile. */
function spendCoinsForOrder(userId, coins, orderRef) {
	if (coins <= 0) return;
	const d = db();
	if (d.prepare("SELECT COALESCE(SUM(delta), 0) AS b FROM coin_ledger WHERE user_id = ?").get(userId).b < coins) throw new Error("Your coin balance changed. Please review your order and try again.");
	d.prepare("INSERT INTO coin_ledger (user_id, delta, reason, created_by) VALUES (?, ?, ?, NULL)").run(userId, -coins, `Used on order ${orderRef}`);
}
/** Gives an order's coins back exactly once (cancelled, unpaid or never confirmed). Returns coins refunded. */
function refundOrderCoins(orderRef, why) {
	const d = db();
	if (!d) return 0;
	const o = d.prepare("SELECT id, user_id, coins_used FROM orders WHERE order_id = ?").get(orderRef);
	if (!o || !o.user_id || !o.coins_used) return 0;
	const claimed = d.prepare("UPDATE orders SET coins_refunded = 1 WHERE id = ? AND coins_refunded = 0").run(o.id);
	if (!Number(claimed.changes)) return 0;
	d.prepare("INSERT INTO coin_ledger (user_id, delta, reason, created_by) VALUES (?, ?, ?, NULL)").run(o.user_id, o.coins_used, `Refund for order ${orderRef} — ${why}`);
	return o.coins_used;
}
//#endregion
export { refundOrderCoins as n, spendCoinsForOrder as r, coinQuote as t };
