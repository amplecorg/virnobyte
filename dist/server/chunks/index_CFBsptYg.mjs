import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as all, r as get } from "./db_DQxgWG_z.mjs";
import { n as getSettings } from "./settings_C_iTiq7V.mjs";
import { r as formatDate, s as num } from "./format_B1bSNQa_.mjs";
import { t as $$Admin } from "./Admin_CdVwoBhd.mjs";
//#region src/pages/admin/index.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const s = getSettings();
	const n = (sql) => get(sql).n;
	const stats = {
		active: n("SELECT COUNT(*) AS n FROM memberships WHERE status = 'active'"),
		pending: n("SELECT COUNT(*) AS n FROM memberships WHERE status = 'pending'"),
		coins: n("SELECT COALESCE(SUM(delta), 0) AS n FROM coin_ledger"),
		newEnq: n("SELECT COUNT(*) AS n FROM enquiries WHERE status = 'new'"),
		enq30: n("SELECT COUNT(*) AS n FROM enquiries WHERE created_at >= datetime('now', '-30 days')"),
		expiring: n("SELECT COUNT(*) AS n FROM memberships WHERE status = 'active' AND end_date <= date('now', '+30 days')")
	};
	const pending = all(`SELECT m.id, m.card_number, m.created_at, u.id AS uid, u.name, u.phone, p.name AS plan, p.price
   FROM memberships m JOIN users u ON u.id = m.user_id JOIN plans p ON p.id = m.plan_id
   WHERE m.status = 'pending' ORDER BY m.id DESC LIMIT 10`);
	const enquiries = all("SELECT * FROM enquiries ORDER BY id DESC LIMIT 8");
	const expiring = all(`SELECT u.id AS uid, u.name, u.phone, m.end_date, p.name AS plan FROM memberships m JOIN users u ON u.id = m.user_id JOIN plans p ON p.id = m.plan_id
   WHERE m.status = 'active' AND m.end_date <= date('now', '+30 days') ORDER BY m.end_date LIMIT 10`);
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": "Dashboard",
		"active": "dashboard"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="page-head"> <div> <h1>Dashboard</h1> <p>Everything that needs a response today.</p> </div> </div> <div class="kpis"> <a class="kpi" href="/admin/members?status=pending"><span>Cards awaiting activation</span><b>${stats.pending}</b></a> <a class="kpi" href="/admin/r/enquiries?status=new"><span>New enquiries</span><b>${stats.newEnq}</b></a> <a class="kpi" href="/admin/members?status=active"><span>Active members</span><b>${stats.active}</b></a> <div class="kpi"><span>${s.coins.name} outstanding</span><b>${num(stats.coins)}</b></div> <div class="kpi"><span>Enquiries, last 30 days</span><b>${stats.enq30}</b></div> <div class="kpi"><span>Cards expiring in 30 days</span><b>${stats.expiring}</b></div> </div> <div class="split-2"> <section class="panel"> <div class="panel-head"><h2>Recent enquiries</h2><a href="/admin/r/enquiries" class="small">All enquiries</a></div> ${enquiries.length ? renderTemplate`<table class="tbl"> <thead><tr><th scope="col">Received</th><th scope="col">Name</th><th scope="col">About</th><th scope="col">Status</th></tr></thead> <tbody> ${enquiries.map((e) => renderTemplate`<tr> <td>${formatDate(e.created_at)}</td> <td><a class="row-link"${addAttribute(`/admin/r/enquiries/${e.id}`, "href")}>${e.name}</a><div class="small muted">${e.phone}</div></td> <td>${e.topic}${e.kind === "job" && renderTemplate`<span class="pill" style="margin-left:6px">job</span>`}</td> <td><span${addAttribute(["pill", e.status], "class:list")}>${e.status}</span></td> </tr>`)} </tbody> </table>` : renderTemplate`<p class="muted">No enquiries yet. Booking-form submissions appear here.</p>`} </section> <div> <section class="panel"> <div class="panel-head"><h2>Cards to activate</h2></div> ${pending.length ? renderTemplate`<table class="tbl"> <tbody> ${pending.map((p) => renderTemplate`<tr> <td><a class="row-link"${addAttribute(`/admin/members/${p.uid}`, "href")}>${p.name}</a><div class="small muted">${p.phone}</div></td> <td>${p.plan}<div class="small muted">₹${num(p.price)}</div></td> </tr>`)} </tbody> </table>` : renderTemplate`<p class="muted">No pending card requests.</p>`} </section> <section class="panel"> <div class="panel-head"><h2>Renewals due</h2></div> ${expiring.length ? renderTemplate`<table class="tbl"> <tbody> ${expiring.map((p) => renderTemplate`<tr> <td><a class="row-link"${addAttribute(`/admin/members/${p.uid}`, "href")}>${p.name}</a><div class="small muted">${p.phone}</div></td> <td>${p.plan}<div class="small muted">ends ${formatDate(p.end_date)}</div></td> </tr>`)} </tbody> </table>` : renderTemplate`<p class="muted">No cards expire in the next 30 days.</p>`} </section> </div> </div> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/index.astro";
var $$url = "/admin.html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/index@_@astro
var page = () => admin_exports;
//#endregion
export { page };
