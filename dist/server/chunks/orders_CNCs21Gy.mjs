import { c as tx, i as get, n as all, r as db } from "./db_DdeOHGNv.mjs";
import { a as emptyCartById } from "./cart_Dct9yH5N.mjs";
import { randomBytes } from "node:crypto";
//#region src/lib/commerce/orders.ts
var clean = (v, max) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);
/** Normalises and validates the delivery form. Returns either a clean customer or a message for the shopper. */
function validateCustomer(input) {
	const digits = String(input.customerPhone ?? "").replace(/\D/g, "");
	const phone = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits.length === 11 && digits.startsWith("0") ? digits.slice(1) : digits;
	const customer = {
		customerName: clean(input.customerName, 80),
		customerPhone: phone,
		customerEmail: clean(input.customerEmail, 120).toLowerCase(),
		addressLine1: clean(input.addressLine1, 200),
		addressLine2: clean(input.addressLine2, 200),
		pincode: String(input.pincode ?? "").replace(/\D/g, ""),
		city: clean(input.city, 80) || "Pune",
		state: clean(input.state, 80) || "Maharashtra",
		addressType: input.addressType === "Work" ? "Work" : "Home",
		notes: clean(input.notes, 500)
	};
	if (customer.customerName.length < 2) return {
		ok: false,
		error: "Please enter your full name."
	};
	if (!/^[6-9]\d{9}$/.test(customer.customerPhone)) return {
		ok: false,
		error: "Please enter a valid 10-digit mobile number."
	};
	if (!/^[1-9]\d{5}$/.test(customer.pincode)) return {
		ok: false,
		error: "Please enter a valid 6-digit pincode."
	};
	if (customer.addressLine1.length < 5) return {
		ok: false,
		error: "Please enter your house / flat and building."
	};
	if (customer.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.customerEmail)) return {
		ok: false,
		error: "Please check the email address."
	};
	return {
		ok: true,
		customer
	};
}
/** e.g. VB-261115-K7Q2M9XD — date for humans, 40 random bits so order pages cannot be guessed. */
function newOrderRef() {
	const d = /* @__PURE__ */ new Date();
	const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	return `VB-${ymd}-${[...randomBytes(8)].map((b) => alphabet[b % 32]).join("")}`;
}
function createOrder(input) {
	const d = db();
	if (!d) throw new Error("Orders are unavailable right now. Please call us to place your order.");
	const lines = input.lines.filter((l) => l.available);
	if (!lines.length) throw new Error("There is nothing to order.");
	const { customer: c, totals } = input;
	const cod = input.paymentMethod === "cod";
	const orderRef = newOrderRef();
	const first = lines[0];
	const summary = lines.map((l) => l.quantity > 1 ? `${l.name} × ${l.quantity}` : l.name).join(" + ").slice(0, 250);
	tx(() => {
		const res = d.prepare(`INSERT INTO orders (
          order_id, product_id, product_name, product_slug, quantity, unit_price, mrp,
          discount, delivery_fee, total_amount, subtotal, items_count,
          customer_name, customer_phone, customer_email,
          address_line1, address_line2, pincode, city, state, address_type,
          payment_method, payment_status, order_status, gateway, notes, user_id, cart_id
        ) VALUES (?,?,?,?,?,?,?, ?,?,?,?,?, ?,?,?, ?,?,?,?,?,?, ?,?,?,?,?,?,?)`).run(orderRef, first.productId, summary, first.slug, totals.itemCount, first.unitPrice, first.mrp, totals.discount, totals.deliveryFee, totals.total, totals.subtotal, lines.length, c.customerName, c.customerPhone, c.customerEmail, c.addressLine1, c.addressLine2, c.pincode, c.city, c.state, c.addressType, cod ? "cod" : input.gateway, cod ? "COD_PENDING" : "PENDING", cod ? "CONFIRMED" : "PENDING_PAYMENT", cod ? "" : input.gateway, c.notes, input.userId, input.cartId);
		const orderDbId = Number(res.lastInsertRowid);
		const item = d.prepare(`INSERT INTO order_items (order_id, product_id, product_slug, product_name, image, quantity, unit_price, mrp, line_total)
       VALUES (?,?,?,?,?,?,?,?,?)`);
		for (const l of lines) item.run(orderDbId, l.productId, l.slug, l.name, l.image, l.quantity, l.unitPrice, l.mrp, l.lineTotal);
	});
	if (cod) emptyCartById(input.cartId);
	return getOrder(orderRef);
}
var getOrder = (orderRef) => get("SELECT * FROM orders WHERE order_id = ?", String(orderRef || ""));
var getOrderByGatewayId = (gatewayOrderId) => gatewayOrderId ? get("SELECT * FROM orders WHERE gateway_order_id = ?", gatewayOrderId) : void 0;
var orderItems = (orderDbId) => all("SELECT product_slug, product_name, image, quantity, unit_price, mrp, line_total FROM order_items WHERE order_id = ? ORDER BY id", orderDbId);
var ordersForUser = (userId, limit = 20) => all("SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC LIMIT ?", userId, limit);
function attachGatewayOrder(orderRef, gatewayOrderId) {
	db()?.prepare("UPDATE orders SET gateway_order_id = ?, updated_at = CURRENT_TIMESTAMP WHERE order_id = ?").run(gatewayOrderId, orderRef);
}
/**
* Idempotent: the browser callback and the webhook can both report the same payment,
* in any order, and the order is marked paid exactly once. Returns true when this call did it.
*/
function markOrderPaid(orderRef, paymentId) {
	const d = db();
	if (!d) return false;
	const res = d.prepare(`UPDATE orders SET payment_status = 'PAID', gateway_payment_id = ?, paid_at = datetime('now'),
         order_status = CASE WHEN order_status = 'PENDING_PAYMENT' THEN 'CONFIRMED' ELSE order_status END,
         updated_at = CURRENT_TIMESTAMP
       WHERE order_id = ? AND payment_status != 'PAID'`).run(paymentId || "", orderRef);
	const changed = Number(res.changes) > 0;
	if (changed) emptyCartById(getOrder(orderRef)?.cart_id);
	return changed;
}
//#endregion
export { markOrderPaid as a, validateCustomer as c, getOrderByGatewayId as i, createOrder as n, orderItems as o, getOrder as r, ordersForUser as s, attachGatewayOrder as t };
