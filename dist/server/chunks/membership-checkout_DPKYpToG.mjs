import { i as get, l as txImmediate, r as db } from "./db_CrQR8QZK.mjs";
import { n as activateMembership, p as nextCardNumber, s as currentMembership } from "./data_rJFB0L58.mjs";
import { randomBytes } from "node:crypto";
//#region src/lib/commerce/membership-checkout.ts
/**
* Buying a membership card online. The purchase is an ordinary `orders` row (kind = 'membership'),
* so it gets the same gateway flow, payment verification, webhooks, admin listing and GST invoice
* as a shop order. When the payment is confirmed, the card is activated and its welcome coins
* credited (see activatePaidMembership, called from markOrderPaid).
*/
/** SAC for IT maintenance / support services; editable later on the order if your accountant prefers another. */
var MEMBERSHIP_SAC = "998713";
function newRef() {
	const d = /* @__PURE__ */ new Date();
	const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	return `VB-${ymd}-${[...randomBytes(8)].map((b) => alphabet[b % 32]).join("")}`;
}
function createMembershipOrder(input) {
	const d = db();
	if (!d) throw new Error("Payments are unavailable right now. Please call us.");
	const { plan, customer: c } = input;
	const existing = currentMembership(input.userId);
	if (existing?.status === "active") throw new Error("You already have an active card. Contact us to change plans.");
	const ref = newRef();
	const name = `${plan.name} membership card`;
	const mrp = Math.max(plan.price, plan.mrp || 0);
	txImmediate(() => {
		let membershipId = existing?.status === "pending" ? existing.id : 0;
		if (membershipId) d.prepare("UPDATE memberships SET plan_id = ? WHERE id = ?").run(plan.id, membershipId);
		else membershipId = Number(d.prepare("INSERT INTO memberships (user_id, plan_id, card_number, status) VALUES (?, ?, ?, 'pending')").run(input.userId, plan.id, nextCardNumber()).lastInsertRowid);
		const res = d.prepare(`INSERT INTO orders (
          order_id, product_id, product_name, product_slug, quantity, unit_price, mrp,
          discount, delivery_fee, total_amount, subtotal, items_count,
          customer_name, customer_phone, customer_email,
          address_line1, address_line2, pincode, city, state, address_type,
          payment_method, payment_status, order_status, gateway, notes, user_id, cart_id,
          customer_company, customer_gstin, kind, membership_id
        ) VALUES (?,NULL,?,?,1,?,?, ?,0,?,?,1, ?,?,?, ?,?,?,?,?,?, ?,'PENDING','PENDING_PAYMENT',?,?,?,NULL, ?,?,'membership',?)`).run(ref, name, `membership-${plan.slug}`, plan.price, mrp, mrp - plan.price, plan.price, plan.price, c.customerName, c.customerPhone, c.customerEmail, c.addressLine1, c.addressLine2, c.pincode, c.city, c.state, c.addressType, input.gateway, input.gateway, c.notes, input.userId, c.customerCompany, c.customerGstin, membershipId);
		d.prepare(`INSERT INTO order_items (order_id, product_id, product_slug, product_name, image, quantity, unit_price, mrp, line_total, hsn, gst_rate)
       VALUES (?, NULL, ?, ?, '', 1, ?, ?, ?, ?, 0)`).run(Number(res.lastInsertRowid), `membership-${plan.slug}`, name, plan.price, mrp, plan.price, MEMBERSHIP_SAC);
	});
	return get("SELECT * FROM orders WHERE order_id = ?", ref);
}
/** Payment confirmed for a membership order: activate its card once (idempotent). */
function activatePaidMembership(order) {
	if (order.kind !== "membership" || !order.membership_id) return;
	if (get("SELECT status FROM memberships WHERE id = ?", order.membership_id)?.status === "pending") activateMembership(order.membership_id, null);
}
//#endregion
export { createMembershipOrder as n, activatePaidMembership as t };
