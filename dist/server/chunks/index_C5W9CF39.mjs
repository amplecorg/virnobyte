import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { i as get, n as all } from "./db_CrQR8QZK.mjs";
import { r as formatDate, s as num } from "./format_6aaLy6w7.mjs";
import { i as USABLE_SQL, l as expireHolds, t as ALLOCATION_SELECT, x as syncProducts } from "./stock_CkuKY_dx.mjs";
import { t as $$Admin } from "./Admin_jHwtJnua.mjs";
import { t as $$InventoryNav } from "./InventoryNav_B758Thv_.mjs";
import { t as ago } from "./format_DKM6ep4K.mjs";
//#region src/pages/admin/inventory/index.astro
var inventory_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	let flash = "";
	if (Astro.request.method === "POST") {
		if ((await Astro.request.formData()).get("_action") === "resync") {
			expireHolds();
			const flipped = syncProducts();
			flash = `Stock refreshed. ${flipped} product${flipped === 1 ? "" : "s"} switched between in stock and out of stock.`;
		}
	}
	const n = (sql) => get(sql)?.n ?? 0;
	const stats = {
		tracked: n("SELECT COUNT(*) AS n FROM inv_products WHERE tracked = 1"),
		out: n("SELECT COUNT(*) AS n FROM inv_products ip JOIN products p ON p.id = ip.product_id WHERE ip.tracked = 1 AND ip.available = 0"),
		low: n("SELECT COUNT(*) AS n FROM inv_products WHERE tracked = 1 AND available > 0 AND available <= low_level"),
		unassigned: n("SELECT COUNT(DISTINCT order_id) AS n FROM inv_allocations WHERE status = 'UNASSIGNED'"),
		waiting: n("SELECT COUNT(DISTINCT order_id) AS n FROM inv_allocations WHERE status IN ('ASSIGNED','ACCEPTED')"),
		late: n(`SELECT COUNT(DISTINCT order_id) AS n FROM inv_allocations WHERE status IN ('ASSIGNED','ACCEPTED') AND assigned_at <= datetime('now', '-48 hours')`),
		stale: n(`SELECT COUNT(*) AS n FROM inv_sources s WHERE s.kind = 'vendor' AND s.active = 1 AND NOT (${USABLE_SQL})`)
	};
	const attention = all(`${ALLOCATION_SELECT}
   WHERE a.status = 'UNASSIGNED'
      OR (a.status IN ('ASSIGNED','ACCEPTED') AND a.assigned_at <= datetime('now', '-48 hours'))
   ORDER BY a.id LIMIT 30`);
	const lowList = all(`SELECT p.id, p.name, p.published, ip.available, ip.low_level FROM inv_products ip JOIN products p ON p.id = ip.product_id
   WHERE ip.tracked = 1 AND ip.available <= ip.low_level ORDER BY ip.available, p.name LIMIT 30`);
	const sources = all(`SELECT s.*, CASE WHEN ${USABLE_SQL} THEN 1 ELSE 0 END AS usable,
     (SELECT COUNT(*) FROM inv_stock st WHERE st.source_id = s.id) AS products,
     (SELECT COALESCE(SUM(qty), 0) FROM inv_stock st WHERE st.source_id = s.id) AS units,
     (SELECT COUNT(*) FROM inv_allocations a WHERE a.source_id = s.id AND a.status IN ('ASSIGNED','ACCEPTED')) AS open_lines
   FROM inv_sources s ORDER BY CASE s.kind WHEN 'own' THEN 0 ELSE 1 END, s.active DESC, s.priority, s.name`);
	const METHOD = {
		manual: "You",
		portal: "Vendor (Seller Hub)"
	};
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": "Inventory",
		"active": "inventory",
		"data-astro-cid-2a7qrqma": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="inv" data-astro-cid-2a7qrqma> <div class="page-head" data-astro-cid-2a7qrqma> <div data-astro-cid-2a7qrqma> <h1 data-astro-cid-2a7qrqma>Inventory</h1> <p data-astro-cid-2a7qrqma>Stock on your own shelf and at every vendor. Products go out of stock on the site by themselves.</p> </div> <form method="post" data-astro-cid-2a7qrqma> <input type="hidden" name="_action" value="resync" data-astro-cid-2a7qrqma> <button class="btn btn--ghost" type="submit" title="Recalculate what is in stock right now" data-astro-cid-2a7qrqma>Refresh stock</button> </form> </div> ${renderComponent($$result, "InventoryNav", $$InventoryNav, {
		"active": "overview",
		"data-astro-cid-2a7qrqma": true
	})} ${flash && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px" data-astro-cid-2a7qrqma>${flash}</p>`} <div class="kpis" data-astro-cid-2a7qrqma> <a${addAttribute(["kpi", stats.unassigned && "kpi-bad"], "class:list")} href="/admin/inventory/fulfilment?status=UNASSIGNED" data-astro-cid-2a7qrqma><span data-astro-cid-2a7qrqma>Orders with no vendor</span><b data-astro-cid-2a7qrqma>${stats.unassigned}</b></a> <a${addAttribute(["kpi", stats.late && "kpi-bad"], "class:list")} href="/admin/inventory/fulfilment?status=open" data-astro-cid-2a7qrqma><span data-astro-cid-2a7qrqma>Late (not shipped in 48 h)</span><b data-astro-cid-2a7qrqma>${stats.late}</b></a> <a class="kpi" href="/admin/inventory/fulfilment?status=open" data-astro-cid-2a7qrqma><span data-astro-cid-2a7qrqma>Waiting to ship</span><b data-astro-cid-2a7qrqma>${stats.waiting}</b></a> <a class="kpi" href="/admin/inventory/products?view=out" data-astro-cid-2a7qrqma><span data-astro-cid-2a7qrqma>Products out of stock</span><b data-astro-cid-2a7qrqma>${stats.out}</b></a> </div> ${stats.tracked === 0 && renderTemplate`<section class="panel" data-astro-cid-2a7qrqma> <h2 style="margin-bottom:8px" data-astro-cid-2a7qrqma>Getting started</h2> <ol style="margin:0;padding-left:20px;line-height:1.8" data-astro-cid-2a7qrqma> <li data-astro-cid-2a7qrqma><a href="/admin/inventory/sources/new" data-astro-cid-2a7qrqma>Add a vendor</a> (name and WhatsApp number).</li> <li data-astro-cid-2a7qrqma>Press <b data-astro-cid-2a7qrqma>Create Seller Hub link</b>, then <b data-astro-cid-2a7qrqma>Send on WhatsApp</b>. The vendor adds the products they sell and their stock.</li> <li data-astro-cid-2a7qrqma>Done. New orders go to the vendor, they ship from their Seller Hub, and you see the courier and tracking in <a href="/admin/r/orders" data-astro-cid-2a7qrqma>Customer Orders</a>. Stock on your own shelf goes in <a href="/admin/inventory/products" data-astro-cid-2a7qrqma>Stock</a>.</li> </ol> </section>`} <div class="split-2" data-astro-cid-2a7qrqma> <section class="panel" data-astro-cid-2a7qrqma> <div class="panel-head" data-astro-cid-2a7qrqma><h2 data-astro-cid-2a7qrqma>Needs attention</h2><a class="small" href="/admin/inventory/fulfilment" data-astro-cid-2a7qrqma>All shipments</a></div> ${attention.length ? renderTemplate`<table class="tbl" data-astro-cid-2a7qrqma> <thead data-astro-cid-2a7qrqma><tr data-astro-cid-2a7qrqma><th scope="col" data-astro-cid-2a7qrqma>Order</th><th scope="col" data-astro-cid-2a7qrqma>Item</th><th scope="col" data-astro-cid-2a7qrqma>Vendor</th><th scope="col" data-astro-cid-2a7qrqma>Problem</th></tr></thead> <tbody data-astro-cid-2a7qrqma> ${attention.map((a) => renderTemplate`<tr data-astro-cid-2a7qrqma> <td data-astro-cid-2a7qrqma><a class="row-link"${addAttribute(`/admin/r/orders/${a.order_id}#shipping`, "href")} data-astro-cid-2a7qrqma>${a.order_ref}</a><div class="small muted" data-astro-cid-2a7qrqma>${formatDate(a.created_at)}</div></td> <td data-astro-cid-2a7qrqma>${a.product_name} × ${a.qty}</td> <td data-astro-cid-2a7qrqma>${a.source_name ?? "—"}</td> <td data-astro-cid-2a7qrqma><span class="pill bad" data-astro-cid-2a7qrqma>${a.status === "UNASSIGNED" ? "No vendor yet" : "Late — not shipped"}</span></td> </tr>`)} </tbody> </table>` : renderTemplate`<p class="muted" data-astro-cid-2a7qrqma>Nothing needs you. Every order has a vendor and nothing is late.</p>`} </section> <section class="panel" data-astro-cid-2a7qrqma> <div class="panel-head" data-astro-cid-2a7qrqma><h2 data-astro-cid-2a7qrqma>Out of stock &amp; running low</h2><a class="small" href="/admin/inventory/products?view=low" data-astro-cid-2a7qrqma>All</a></div> ${lowList.length ? renderTemplate`<table class="tbl" data-astro-cid-2a7qrqma> <tbody data-astro-cid-2a7qrqma> ${lowList.map((p) => renderTemplate`<tr data-astro-cid-2a7qrqma> <td data-astro-cid-2a7qrqma><a class="row-link"${addAttribute(`/admin/inventory/products/${p.id}`, "href")} data-astro-cid-2a7qrqma>${p.name}</a>${!p.published && renderTemplate`<span class="pill" style="margin-left:6px" data-astro-cid-2a7qrqma>hidden</span>`}</td> <td class="num" data-astro-cid-2a7qrqma>${p.available ? renderTemplate`<span class="pill warn" data-astro-cid-2a7qrqma>${p.available} left</span>` : renderTemplate`<span class="pill bad" data-astro-cid-2a7qrqma>Out of stock</span>`}</td> </tr>`)} </tbody> </table>` : renderTemplate`<p class="muted" data-astro-cid-2a7qrqma>Nothing is out of stock or running low.</p>`} </section> </div> <section class="panel" data-astro-cid-2a7qrqma> <div class="panel-head" data-astro-cid-2a7qrqma><h2 data-astro-cid-2a7qrqma>Vendors</h2><a class="btn btn--sm" href="/admin/inventory/sources/new" data-astro-cid-2a7qrqma>Add vendor</a></div> <div class="table-wrap" style="border:0" data-astro-cid-2a7qrqma> <table class="tbl" data-astro-cid-2a7qrqma> <thead data-astro-cid-2a7qrqma><tr data-astro-cid-2a7qrqma><th scope="col" data-astro-cid-2a7qrqma>Vendor</th><th scope="col" data-astro-cid-2a7qrqma>Stock updated by</th><th scope="col" data-astro-cid-2a7qrqma>Stock checked</th><th scope="col" class="num" data-astro-cid-2a7qrqma>Products</th><th scope="col" class="num" data-astro-cid-2a7qrqma>Units</th><th scope="col" class="num" data-astro-cid-2a7qrqma>Waiting to ship</th></tr></thead> <tbody data-astro-cid-2a7qrqma> ${sources.map((s) => renderTemplate`<tr data-astro-cid-2a7qrqma> <td data-astro-cid-2a7qrqma> <a class="row-link"${addAttribute(`/admin/inventory/sources/${s.id}`, "href")} data-astro-cid-2a7qrqma>${s.name}</a> ${!s.active ? renderTemplate`<span class="pill" style="margin-left:6px" data-astro-cid-2a7qrqma>off</span>` : !s.usable && s.products > 0 ? renderTemplate`<span class="pill bad" style="margin-left:6px" data-astro-cid-2a7qrqma>paused — stock not confirmed</span>` : null} </td> <td data-astro-cid-2a7qrqma>${s.kind === "own" ? "You" : METHOD[s.update_method]}</td> <td data-astro-cid-2a7qrqma>${s.kind === "own" ? "—" : ago(s.stock_updated_at)}</td> <td class="num" data-astro-cid-2a7qrqma>${num(s.products)}</td> <td class="num" data-astro-cid-2a7qrqma>${num(s.units)}</td> <td class="num" data-astro-cid-2a7qrqma>${s.open_lines ? num(s.open_lines) : ""}</td> </tr>`)} </tbody> </table> </div> </section> </div> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/inventory/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/inventory/index.astro";
var $$url = "/admin/inventory.html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/inventory/index@_@astro
var page = () => inventory_exports;
//#endregion
export { page };
