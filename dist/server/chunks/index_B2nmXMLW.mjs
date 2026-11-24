import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { i as get, n as all } from "./db_CrQR8QZK.mjs";
import { i as groupCardNumber, r as formatDate, s as num } from "./format_6aaLy6w7.mjs";
import { t as $$Icon } from "./Icon_DmevXm4a.mjs";
import { t as $$Admin } from "./Admin_jHwtJnua.mjs";
import { t as $$FilterBar } from "./FilterBar_Z0B8yZID.mjs";
//#region src/pages/admin/members/index.astro
var members_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const sp = Astro.url.searchParams;
	const q = sp.get("q")?.trim() ?? "";
	const status = sp.get("status") ?? "";
	const plan = sp.get("plan") ?? "";
	const expiring = sp.get("expiring") ?? "";
	const sort = sp.get("sort") ?? "";
	const isoDate = (v) => v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "";
	const joinedFrom = isoDate(sp.get("joined_from"));
	const joinedTo = isoDate(sp.get("joined_to"));
	const validFrom = isoDate(sp.get("valid_from"));
	const validTo = isoDate(sp.get("valid_to"));
	const coinsFrom = sp.get("coins_from") ?? "";
	const coinsTo = sp.get("coins_to") ?? "";
	const COINS = "COALESCE((SELECT SUM(delta) FROM coin_ledger c WHERE c.user_id = u.id), 0)";
	const params = [];
	const where = ["u.role = 'customer'"];
	if (q) {
		where.push("(u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ? OR m.card_number LIKE ?)");
		params.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q.replace(/\s/g, "")}%`);
	}
	if (status === "none") where.push("m.id IS NULL");
	else if (status) {
		where.push("m.status = ?");
		params.push(status);
	}
	if (plan) {
		where.push("m.plan_id = ?");
		params.push(Number(plan));
	}
	if (expiring === "past") where.push("m.end_date IS NOT NULL AND date(m.end_date) < date('now')");
	else if (/^\d+$/.test(expiring)) {
		where.push("m.status = 'active' AND date(m.end_date) BETWEEN date('now') AND date('now', ?)");
		params.push(`+${expiring} days`);
	}
	if (joinedFrom) {
		where.push("date(u.created_at) >= ?");
		params.push(joinedFrom);
	}
	if (joinedTo) {
		where.push("date(u.created_at) <= ?");
		params.push(joinedTo);
	}
	if (validFrom) {
		where.push("date(m.end_date) >= ?");
		params.push(validFrom);
	}
	if (validTo) {
		where.push("date(m.end_date) <= ?");
		params.push(validTo);
	}
	if (coinsFrom !== "" && Number.isFinite(Number(coinsFrom))) {
		where.push(`${COINS} >= ?`);
		params.push(Number(coinsFrom));
	}
	if (coinsTo !== "" && Number.isFinite(Number(coinsTo))) {
		where.push(`${COINS} <= ?`);
		params.push(Number(coinsTo));
	}
	const SORTS = [
		{
			value: "",
			label: "Needs action first",
			sql: "CASE m.status WHEN 'pending' THEN 0 ELSE 1 END, u.id DESC"
		},
		{
			value: "new",
			label: "Newest members",
			sql: "u.id DESC"
		},
		{
			value: "old",
			label: "Oldest members",
			sql: "u.id ASC"
		},
		{
			value: "name",
			label: "Name A–Z",
			sql: "u.name COLLATE NOCASE"
		},
		{
			value: "expiry",
			label: "Expiring soonest",
			sql: "m.end_date IS NULL, m.end_date ASC"
		},
		{
			value: "coins",
			label: "Most coins",
			sql: "coins DESC"
		}
	];
	const orderSql = SORTS.find((x) => x.value === sort)?.sql ?? SORTS[0].sql;
	const FROM = `FROM users u
   LEFT JOIN memberships m ON m.id = (
     SELECT id FROM memberships WHERE user_id = u.id
     ORDER BY CASE status WHEN 'active' THEN 0 WHEN 'pending' THEN 1 ELSE 2 END, id DESC LIMIT 1)
   LEFT JOIN plans p ON p.id = m.plan_id
   WHERE ${where.join(" AND ")}`;
	const rows = all(`SELECT u.id, u.name, u.email, u.phone, u.created_at,
          m.card_number, m.status, m.end_date, p.name AS plan,
          ${COINS} AS coins
   ${FROM}
   ORDER BY ${orderSql}
   LIMIT 500`, ...params);
	const summary = get(`SELECT COUNT(*) AS n, COALESCE(SUM(${COINS}), 0) AS coins ${FROM}`, ...params) ?? {
		n: rows.length,
		coins: 0
	};
	const FILTERS = [
		{
			type: "select",
			name: "status",
			label: "Card status",
			tabs: true,
			resolvedOptions: [
				{
					value: "pending",
					label: "Awaiting activation"
				},
				{
					value: "active",
					label: "Active"
				},
				{
					value: "expired",
					label: "Expired"
				},
				{
					value: "cancelled",
					label: "Cancelled"
				},
				{
					value: "none",
					label: "No card"
				}
			]
		},
		{
			type: "select",
			name: "plan",
			label: "Plan",
			resolvedOptions: all("SELECT id, name FROM plans ORDER BY sort, id").map((p) => ({
				value: String(p.id),
				label: p.name
			}))
		},
		{
			type: "select",
			name: "expiring",
			label: "Renewal",
			resolvedOptions: [
				{
					value: "7",
					label: "Expiring in 7 days"
				},
				{
					value: "30",
					label: "Expiring in 30 days"
				},
				{
					value: "60",
					label: "Expiring in 60 days"
				},
				{
					value: "past",
					label: "End date passed"
				}
			]
		},
		{
			type: "daterange",
			name: "joined",
			label: "Joined"
		},
		{
			type: "daterange",
			name: "valid",
			label: "Card valid until"
		},
		{
			type: "range",
			name: "coins",
			label: "Coin balance"
		}
	];
	const values = Object.fromEntries([
		"status",
		"plan",
		"expiring",
		"joined_from",
		"joined_to",
		"valid_from",
		"valid_to",
		"coins_from",
		"coins_to"
	].map((k) => [k, sp.get(k) ?? ""]).filter(([, v]) => v));
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": "Members & coins",
		"active": "members"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="page-head"> <div> <h1>Members & coins</h1> <p>Issue and activate membership cards, adjust coin balances and track doorstep visits.</p> </div> <a class="btn" href="/admin/members/new">${renderComponent($$result, "Icon", $$Icon, { "name": "plus" })} Add member</a> </div> ${renderComponent($$result, "FilterBar", $$FilterBar, {
		"filters": FILTERS,
		"values": values,
		"q": q,
		"searchPlaceholder": "Name, phone, email or card number",
		"sorts": SORTS,
		"sort": sort,
		"count": summary.n,
		"shown": Math.min(summary.n, 500),
		"noun": "members",
		"one": "member"
	})} <p class="small muted" style="margin:-6px 0 12px">Coins held by these members: <strong>${num(summary.coins)}</strong></p> <div class="table-wrap"> ${rows.length ? renderTemplate`<table class="tbl"> <thead> <tr> <th scope="col">Member</th> <th scope="col">Phone</th> <th scope="col">Card</th> <th scope="col">Plan</th> <th scope="col">Status</th> <th scope="col">Valid until</th> <th scope="col" class="num">Coins</th> </tr> </thead> <tbody> ${rows.map((r) => renderTemplate`<tr> <td> <a class="row-link"${addAttribute(`/admin/members/${r.id}`, "href")}>${r.name}</a> <div class="small muted">${r.email}</div> </td> <td>${r.phone}</td> <td><code class="small">${r.card_number ? groupCardNumber(r.card_number) : "—"}</code></td> <td>${r.plan ?? "—"}</td> <td>${r.status ? renderTemplate`<span${addAttribute(["pill", r.status], "class:list")}>${r.status}</span>` : renderTemplate`<span class="pill off">no card</span>`}</td> <td>${formatDate(r.end_date) || "—"}</td> <td class="num">${num(r.coins)}</td> </tr>`)} </tbody> </table>` : renderTemplate`<p class="empty-state">No members match. <a href="/admin/members">Clear filters</a></p>`} </div> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/members/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/members/index.astro";
var $$url = "/admin/members.html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/members/index@_@astro
var page = () => members_exports;
//#endregion
export { page };
