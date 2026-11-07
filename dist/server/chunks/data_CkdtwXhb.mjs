import { a as json, n as all, o as run, r as get, s as tx } from "./db_CG0-C7Y2.mjs";
import { n as getSettings } from "./settings_AhSsv2yB.mjs";
//#region src/lib/data.ts
var hydrateService = (r) => ({
	...r,
	problems: json(r.problems, []),
	includes: json(r.includes, []),
	benefits: json(r.benefits, []),
	faqs: json(r.faqs, [])
});
var services = () => all("SELECT * FROM services WHERE published = 1 ORDER BY sort, id").map(hydrateService);
var service = (slug) => {
	const r = get("SELECT * FROM services WHERE slug = ? AND published = 1", slug);
	return r ? hydrateService(r) : void 0;
};
var hydratePlan = (r) => ({
	...r,
	benefits: json(r.benefits, [])
});
var plans = (includeInactive = false) => all(`SELECT * FROM plans ${includeInactive ? "" : "WHERE active = 1"} ORDER BY sort, id`).map(hydratePlan);
var planById = (id) => {
	const r = get("SELECT * FROM plans WHERE id = ?", id);
	return r ? hydratePlan(r) : void 0;
};
/** Latest membership for a user, with expiry applied on read. */
function currentMembership(userId) {
	const m = get(`SELECT * FROM memberships WHERE user_id = ?
     ORDER BY CASE status WHEN 'active' THEN 0 WHEN 'pending' THEN 1 ELSE 2 END, id DESC LIMIT 1`, userId);
	if (!m) return void 0;
	if (m.status === "active" && m.end_date && m.end_date < (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)) {
		run("UPDATE memberships SET status = 'expired' WHERE id = ?", m.id);
		m.status = "expired";
	}
	const plan = planById(m.plan_id);
	return {
		...m,
		plan
	};
}
function coinBalance(userId) {
	return get("SELECT COALESCE(SUM(delta), 0) AS b FROM coin_ledger WHERE user_id = ?", userId).b;
}
function coinHistory(userId, limit = 50) {
	return all("SELECT id, delta, reason, created_at FROM coin_ledger WHERE user_id = ? ORDER BY id DESC LIMIT ?", userId, limit);
}
function addCoins(userId, delta, reason, by) {
	if (!Number.isInteger(delta) || delta === 0) throw new Error("Enter a whole number of coins other than zero.");
	if (delta < 0 && coinBalance(userId) + delta < 0) throw new Error("That would take the balance below zero.");
	run("INSERT INTO coin_ledger (user_id, delta, reason, created_by) VALUES (?, ?, ?, ?)", userId, delta, reason, by);
}
/** Card numbers: PREFIX + year + 8 digits, e.g. VB26 0000 0042 → "VB2600000042". */
function nextCardNumber() {
	const prefix = getSettings().card.prefix.toUpperCase().replace(/[^A-Z0-9]/g, "") || "VB";
	const yy = String((/* @__PURE__ */ new Date()).getFullYear()).slice(2);
	const { n } = get("SELECT COALESCE(MAX(id), 0) + 1 AS n FROM memberships");
	let candidate = `${prefix}${yy}${String(n).padStart(8, "0")}`;
	while (get("SELECT 1 FROM memberships WHERE card_number = ?", candidate)) candidate = `${prefix}${yy}${String(Math.floor(Math.random() * 1e8)).padStart(8, "0")}`;
	return candidate;
}
function requestMembership(userId, planId) {
	const existing = currentMembership(userId);
	if (existing && (existing.status === "pending" || existing.status === "active")) return existing.id;
	const res = run("INSERT INTO memberships (user_id, plan_id, card_number, status) VALUES (?, ?, ?, 'pending')", userId, planId, nextCardNumber());
	return Number(res.lastInsertRowid);
}
/** Activates a card, sets validity and credits the plan's welcome coins exactly once. */
function activateMembership(id, adminId, startDate) {
	tx(() => {
		const m = get("SELECT * FROM memberships WHERE id = ?", id);
		if (!m) throw new Error("Membership not found.");
		const plan = planById(m.plan_id);
		const start = startDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		const end = new Date((/* @__PURE__ */ new Date(start + "T00:00:00Z")).getTime() + plan.validity_days * 864e5).toISOString().slice(0, 10);
		run("UPDATE memberships SET status = 'active', start_date = ?, end_date = ? WHERE id = ?", start, end, id);
		const reason = `Welcome coins — ${plan.name} card ${m.card_number}`;
		if (!get("SELECT 1 FROM coin_ledger WHERE user_id = ? AND reason = ?", m.user_id, reason) && plan.coins > 0) run("INSERT INTO coin_ledger (user_id, delta, reason, created_by) VALUES (?, ?, ?, ?)", m.user_id, plan.coins, reason, adminId);
	});
}
var homeFaqs = () => all("SELECT question, answer FROM faqs WHERE published = 1 AND home = 1 ORDER BY sort, id");
var allFaqs = () => all("SELECT question, answer, topic FROM faqs WHERE published = 1 ORDER BY sort, id");
var testimonials = () => all("SELECT name, role, quote FROM testimonials WHERE published = 1 ORDER BY sort, id");
var hydratePost = (r) => ({
	...r,
	related: json(r.related, [])
});
var posts = (limit = 100) => all("SELECT * FROM posts WHERE published = 1 AND published_at <= date('now') ORDER BY published_at DESC, id DESC LIMIT ?", limit).map(hydratePost);
var post = (slug) => {
	const r = get("SELECT * FROM posts WHERE slug = ? AND published = 1 AND published_at <= date('now')", slug);
	return r ? hydratePost(r) : void 0;
};
var hydrateProduct = (r) => {
	let images = json(r.images, []);
	if (!images.length && r.image) images = [r.image];
	return {
		...r,
		image: images[0] || r.image || "",
		images,
		rating: r.rating || "4.5",
		rating_count: r.rating_count || "128 Ratings & 42 Reviews",
		badge: r.badge || "Assured",
		offer_tag: r.offer_tag || "Extra ₹1,000 off with Virnobyte Card",
		warranty: r.warranty || "1 Year Virnobyte Warranty",
		replacement_policy: r.replacement_policy || "7-Day Replacement Guarantee",
		diagnostic_setup: r.diagnostic_setup || "Free On-Site Diagnostic Setup",
		delivery_text: r.delivery_text || "Free Delivery by Tomorrow",
		delivery_sub: r.delivery_sub || "Doorstep setup & testing in PCMC & Pune",
		wow_deal: r.wow_deal || "Exchange Old Laptop / PC & save up to ₹15,000"
	};
};
var products = () => all("SELECT * FROM products WHERE published = 1 ORDER BY sort, id").map(hydrateProduct);
var product = (slug) => {
	const r = get("SELECT * FROM products WHERE slug = ? AND published = 1", slug);
	return r ? hydrateProduct(r) : void 0;
};
var PORTFOLIO_CATEGORIES = {
	"cctv-projects": {
		name: "CCTV Projects",
		service: "cctv-installation",
		blurb: "Camera installations for homes, shops, offices and industrial sites."
	},
	"networking-projects": {
		name: "Networking Projects",
		service: "networking",
		blurb: "Office LANs, Wi-Fi coverage and structured cabling."
	},
	"office-it-setup": {
		name: "Office IT Setup",
		service: "it-consulting",
		blurb: "Complete IT for new and expanding offices."
	},
	"hardware-installations": {
		name: "Hardware Installations",
		service: "hardware-solutions",
		blurb: "Systems, servers, UPS and peripherals supplied and installed."
	}
};
var projects = (category) => (category ? all("SELECT * FROM projects WHERE published = 1 AND category = ? ORDER BY sort, id DESC", category) : all("SELECT * FROM projects WHERE published = 1 ORDER BY sort, id DESC")).map((r) => ({
	...r,
	scope: json(r.scope, [])
}));
var gallery = () => all("SELECT image, caption FROM gallery WHERE published = 1 ORDER BY sort, id DESC");
var hydrateJob = (r) => ({
	...r,
	duties: json(r.duties, []),
	growth: json(r.growth, []),
	fits: json(r.fits, [])
});
var jobs = () => all("SELECT * FROM jobs WHERE published = 1 AND salary_max > 0 AND (valid_through = '' OR valid_through >= date('now')) ORDER BY posted_at DESC").map(hydrateJob);
var job = (slug) => {
	const r = get("SELECT * FROM jobs WHERE slug = ? AND published = 1 AND salary_max > 0", slug);
	return r ? hydrateJob(r) : void 0;
};
var page = (slug) => get("SELECT * FROM pages WHERE slug = ?", slug);
function saveEnquiry(e) {
	run("INSERT INTO enquiries (kind, name, phone, email, topic, message, area, preferred) VALUES (?,?,?,?,?,?,?,?)", e.kind, e.name, e.phone, e.email ?? "", e.topic ?? "", e.message ?? "", e.area ?? "", e.preferred ?? "");
}
//#endregion
export { service as C, saveEnquiry as S, testimonials as T, posts as _, coinBalance as a, projects as b, gallery as c, jobs as d, nextCardNumber as f, post as g, plans as h, allFaqs as i, homeFaqs as l, planById as m, activateMembership as n, coinHistory as o, page as p, addCoins as r, currentMembership as s, PORTFOLIO_CATEGORIES as t, job as u, product as v, services as w, requestMembership as x, products as y };
