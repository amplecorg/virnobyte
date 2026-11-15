import { i as get, n as all, s as run } from "./db_DdeOHGNv.mjs";
import { n as getSettings } from "./settings_D-p7f3sg.mjs";
import { u as hydrateProduct } from "./data_DdRaT7LY.mjs";
import { i as resolveImage } from "./images_4iK9SaiJ.mjs";
import { randomBytes } from "node:crypto";
//#region src/lib/commerce/payments.ts
var env = (name) => (process.env[name] || "").trim();
function getPaymentConfig() {
	const p = getSettings().payments || {};
	const pick = (setting, envName) => String(setting || "").trim() || env(envName);
	const razorpay = {
		keyId: pick(p.razorpayKeyId, "RAZORPAY_KEY_ID"),
		keySecret: pick(p.razorpayKeySecret, "RAZORPAY_KEY_SECRET"),
		webhookSecret: pick(p.razorpayWebhookSecret, "RAZORPAY_WEBHOOK_SECRET"),
		configured: false,
		testMode: false
	};
	razorpay.configured = Boolean(razorpay.keyId && razorpay.keySecret);
	razorpay.testMode = razorpay.keyId.startsWith("rzp_test_");
	const cashfree = {
		appId: pick(p.cashfreeAppId, "CASHFREE_APP_ID"),
		secretKey: pick(p.cashfreeSecretKey, "CASHFREE_SECRET_KEY"),
		env: String(p.cashfreeEnv || env("CASHFREE_ENV") || "TEST").toUpperCase() === "PROD" ? "PROD" : "TEST",
		configured: false
	};
	cashfree.configured = Boolean(cashfree.appId && cashfree.secretKey);
	const gateway = p.gateway === "razorpay" || p.gateway === "cashfree" ? p.gateway : "offline";
	const enabled = p.enabled !== false;
	const gatewayReady = gateway === "razorpay" ? razorpay.configured : gateway === "cashfree" ? cashfree.configured : false;
	return {
		enabled,
		gateway,
		onlineAvailable: enabled && p.enableOnline !== false && gatewayReady,
		codAvailable: enabled && p.enableCod !== false,
		deliveryFee: Math.max(0, Math.round(Number(p.deliveryFee) || 0)),
		minFreeDelivery: Math.max(0, Math.round(Number(p.minFreeDelivery) || 0)),
		razorpay,
		cashfree
	};
}
var clampQty = (n) => Math.min(10, Math.max(1, Math.floor(Number(n)) || 1));
function computeTotals(lines, rules) {
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
		total: subtotal + deliveryFee
	};
}
//#endregion
//#region src/lib/commerce/cart.ts
/**
* Server-side cart.
*
* - The browser holds only an opaque, httpOnly token (`vb_cart`); contents live in SQLite.
* - `vb_cart_n` is a readable unit count used by the header badge. Public pages are
*   CDN-cached, so cart state is never rendered into shared HTML.
* - Lines store product + quantity only. Prices are read from `products` on every view,
*   so a shopper can never check out at a stale or tampered price.
*/
var CART_COOKIE = "vb_cart";
var CART_COUNT_COOKIE = "vb_cart_n";
var CART_DAYS = 30;
var CartError = class extends Error {
	status;
	constructor(message, status = 400) {
		super(message);
		this.status = status;
	}
};
function productImageUrl(p) {
	const key = Array.isArray(p.images) && p.images[0] || p.image || "";
	const res = resolveImage(key);
	return res.kind === "upload" ? res.src : res.meta.src;
}
function buildLine(p, quantity) {
	const unitPrice = Math.max(0, Math.round(Number(p.price) || 0));
	const mrp = Math.max(unitPrice, Math.round(Number(p.mrp) || 0));
	const qty = clampQty(quantity);
	const unavailableReason = !unitPrice ? "Price on request — contact us to order" : !p.in_stock ? "Currently out of stock" : "";
	return {
		productId: p.id,
		slug: p.slug,
		name: p.name,
		category: p.category,
		image: productImageUrl(p),
		quantity: qty,
		unitPrice,
		mrp,
		lineTotal: unitPrice * qty,
		available: !unavailableReason,
		unavailableReason
	};
}
function viewOf(cartId, lines) {
	return {
		cartId,
		lines,
		totals: computeTotals(lines, getPaymentConfig()),
		count: lines.reduce((n, l) => n + l.quantity, 0),
		hasUnavailable: lines.some((l) => !l.available)
	};
}
function setCartCookie(cookies, token, secure) {
	cookies.set(CART_COOKIE, token, {
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		secure,
		maxAge: CART_DAYS * 86400
	});
}
function syncCountCookie(cookies, count, secure) {
	if (count > 0) cookies.set(CART_COUNT_COOKIE, String(count), {
		path: "/",
		sameSite: "lax",
		secure,
		maxAge: CART_DAYS * 86400
	});
	else if (cookies.has("vb_cart_n")) cookies.delete(CART_COUNT_COOKIE, { path: "/" });
}
/** Folds every other cart owned by this user into `target` (e.g. phone cart + laptop cart). */
function mergeUserCarts(target, userId) {
	const others = all("SELECT id, token, user_id FROM carts WHERE user_id = ? AND id != ?", userId, target.id);
	for (const o of others) {
		run(`INSERT INTO cart_items (cart_id, product_id, quantity)
       SELECT ?, product_id, quantity FROM cart_items WHERE cart_id = ?
       ON CONFLICT(cart_id, product_id) DO UPDATE SET quantity = MIN(?, quantity + excluded.quantity)`, target.id, o.id, 10);
		run("DELETE FROM carts WHERE id = ?", o.id);
	}
}
/** Finds the caller's cart without creating one. Claims a guest cart on sign-in. */
function findCart(cookies, user, secure) {
	const token = cookies.get(CART_COOKIE)?.value;
	let cart = token ? get("SELECT id, token, user_id FROM carts WHERE token = ?", token) : void 0;
	if (cart && cart.user_id != null && cart.user_id !== user?.id) cart = void 0;
	if (user) {
		if (cart && cart.user_id == null) {
			run("UPDATE carts SET user_id = ? WHERE id = ?", user.id, cart.id);
			cart.user_id = user.id;
		}
		if (cart) mergeUserCarts(cart, user.id);
		else {
			cart = get("SELECT id, token, user_id FROM carts WHERE user_id = ? ORDER BY updated_at DESC, id DESC LIMIT 1", user.id);
			if (cart) setCartCookie(cookies, cart.token, secure);
		}
	}
	return cart;
}
function ensureCart(cookies, user, secure) {
	const existing = findCart(cookies, user, secure);
	if (existing) return existing;
	const token = randomBytes(24).toString("base64url");
	const res = run("INSERT INTO carts (token, user_id) VALUES (?, ?)", token, user?.id ?? null);
	const id = Number(res.lastInsertRowid);
	if (!id) throw new CartError("The cart is unavailable right now. Please try again.", 503);
	setCartCookie(cookies, token, secure);
	run(`DELETE FROM carts WHERE user_id IS NULL AND updated_at < datetime('now', '-${CART_DAYS} days')`);
	return {
		id,
		token,
		user_id: user?.id ?? null
	};
}
function loadLines(cartId) {
	run("DELETE FROM cart_items WHERE cart_id = ? AND product_id NOT IN (SELECT id FROM products WHERE published = 1)", cartId);
	return all(`SELECT p.*, ci.quantity AS cart_qty FROM cart_items ci
     JOIN products p ON p.id = ci.product_id
     WHERE ci.cart_id = ? ORDER BY ci.id`, cartId).map((r) => buildLine(hydrateProduct(r), r.cart_qty));
}
var touch = (cartId) => run("UPDATE carts SET updated_at = datetime('now') WHERE id = ?", cartId);
function getCart(cookies, user, secure) {
	const cart = findCart(cookies, user, secure);
	const view = viewOf(cart?.id ?? null, cart ? loadLines(cart.id) : []);
	syncCountCookie(cookies, view.count, secure);
	return view;
}
function addToCart(cookies, user, secure, slug, quantity = 1) {
	const row = get("SELECT * FROM products WHERE slug = ? AND published = 1", String(slug || ""));
	if (!row) throw new CartError("This product is no longer available.", 404);
	const line = buildLine(hydrateProduct(row), 1);
	if (!line.available) throw new CartError(line.unavailableReason);
	const cart = ensureCart(cookies, user, secure);
	run(`INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)
     ON CONFLICT(cart_id, product_id) DO UPDATE SET quantity = MIN(?, quantity + excluded.quantity)`, cart.id, row.id, clampQty(quantity), 10);
	touch(cart.id);
	return getCart(cookies, user, secure);
}
function setCartQuantity(cookies, user, secure, productId, quantity) {
	const cart = findCart(cookies, user, secure);
	if (cart) {
		if (Math.floor(Number(quantity)) <= 0) run("DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?", cart.id, productId);
		else run("UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?", clampQty(quantity), cart.id, productId);
		touch(cart.id);
	}
	return getCart(cookies, user, secure);
}
function removeFromCart(cookies, user, secure, productId) {
	return setCartQuantity(cookies, user, secure, productId, 0);
}
function clearCart(cookies, user, secure) {
	const cart = findCart(cookies, user, secure);
	if (cart) run("DELETE FROM cart_items WHERE cart_id = ?", cart.id);
	return getCart(cookies, user, secure);
}
/** Used after an order is placed or paid, where no browser cookies are in reach (e.g. a webhook). */
function emptyCartById(cartId) {
	if (cartId) run("DELETE FROM cart_items WHERE cart_id = ?", cartId);
}
//#endregion
export { emptyCartById as a, setCartQuantity as c, clearCart as i, viewOf as l, addToCart as n, getCart as o, buildLine as r, removeFromCart as s, CartError as t, getPaymentConfig as u };
