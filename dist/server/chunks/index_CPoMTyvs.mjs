import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { n as all } from "./db_VNCUNG5f.mjs";
import { i as groupCardNumber, r as formatDate, s as num } from "./format_B1bSNQa_.mjs";
import { t as $$Admin } from "./Admin_DRzN_w-A.mjs";
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
	const q = Astro.url.searchParams.get("q")?.trim() ?? "";
	const status = Astro.url.searchParams.get("status") ?? "";
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
	const rows = all(`SELECT u.id, u.name, u.email, u.phone, u.created_at,
          m.card_number, m.status, m.end_date, p.name AS plan,
          COALESCE((SELECT SUM(delta) FROM coin_ledger c WHERE c.user_id = u.id), 0) AS coins
   FROM users u
   LEFT JOIN memberships m ON m.id = (
     SELECT id FROM memberships WHERE user_id = u.id
     ORDER BY CASE status WHEN 'active' THEN 0 WHEN 'pending' THEN 1 ELSE 2 END, id DESC LIMIT 1)
   LEFT JOIN plans p ON p.id = m.plan_id
   WHERE ${where.join(" AND ")}
   ORDER BY CASE m.status WHEN 'pending' THEN 0 ELSE 1 END, u.id DESC
   LIMIT 500`, ...params);
	const TABS = [
		["", "All"],
		["pending", "Awaiting activation"],
		["active", "Active"],
		["expired", "Expired"],
		["none", "No card"]
	];
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": "Members & coins",
		"active": "members"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="page-head"> <div> <h1>Members & coins</h1> <p>Issue and activate membership cards, adjust coin balances and track doorstep visits.</p> </div> <a class="btn" href="/admin/members/new">${renderComponent($$result, "Icon", $$Icon, { "name": "plus" })} Add member</a> </div> <div class="toolbar"> <form method="get" role="search"> ${status && renderTemplate`<input type="hidden" name="status"${addAttribute(status, "value")}>`} <input type="search" name="q"${addAttribute(q, "value")} placeholder="Name, phone, email or card number" aria-label="Search members"> </form> <nav class="tabs" aria-label="Filter"> ${TABS.map(([v, l]) => renderTemplate`<a${addAttribute(v ? `?status=${v}` : "?", "href")}${addAttribute(status === v ? "true" : void 0, "aria-current")}>${l}</a>`)} </nav> </div> <div class="table-wrap"> ${rows.length ? renderTemplate`<table class="tbl"> <thead> <tr> <th scope="col">Member</th> <th scope="col">Phone</th> <th scope="col">Card</th> <th scope="col">Plan</th> <th scope="col">Status</th> <th scope="col">Valid until</th> <th scope="col" class="num">Coins</th> </tr> </thead> <tbody> ${rows.map((r) => renderTemplate`<tr> <td> <a class="row-link"${addAttribute(`/admin/members/${r.id}`, "href")}>${r.name}</a> <div class="small muted">${r.email}</div> </td> <td>${r.phone}</td> <td><code class="small">${r.card_number ? groupCardNumber(r.card_number) : "—"}</code></td> <td>${r.plan ?? "—"}</td> <td>${r.status ? renderTemplate`<span${addAttribute(["pill", r.status], "class:list")}>${r.status}</span>` : renderTemplate`<span class="pill off">no card</span>`}</td> <td>${formatDate(r.end_date) || "—"}</td> <td class="num">${num(r.coins)}</td> </tr>`)} </tbody> </table>` : renderTemplate`<p class="empty-state">No members found.</p>`} </div> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/members/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/members/index.astro";
var $$url = "/admin/members.html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/members/index@_@astro
var page = () => members_exports;
//#endregion
export { page };
