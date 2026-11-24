import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
/* empty css                    */
//#region src/components/admin/InventoryNav.astro
createAstro("https://virnobyte.com");
var $$InventoryNav = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$InventoryNav;
	const { active } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<nav class="tabs inv-tabs" aria-label="Inventory"> ${[
		{
			key: "overview",
			href: "/admin/inventory",
			label: "Overview"
		},
		{
			key: "products",
			href: "/admin/inventory/products",
			label: "Stock"
		},
		{
			key: "fulfilment",
			href: "/admin/inventory/fulfilment",
			label: "All shipments"
		},
		{
			key: "sources",
			href: "/admin/inventory/sources",
			label: "Vendors"
		},
		{
			key: "movements",
			href: "/admin/inventory/movements",
			label: "Stock history"
		}
	].map((t) => renderTemplate`<a${addAttribute(t.href, "href")}${addAttribute(t.key === active ? "true" : void 0, "aria-current")}>${t.label}</a>`)} </nav>`;
}, "C:/Programming section/virnobyte/src/components/admin/InventoryNav.astro", void 0);
//#endregion
export { $$InventoryNav as t };
