import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
//#region src/components/Breadcrumbs.astro
createAstro("https://virnobyte.com");
var $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Breadcrumbs;
	const { items, tone = "light" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<nav aria-label="Breadcrumb"${addAttribute(["crumbs", tone], "class:list")} data-astro-cid-vx4iavld> <ol data-astro-cid-vx4iavld> ${items.map((it, i) => renderTemplate`<li data-astro-cid-vx4iavld> ${i < items.length - 1 ? renderTemplate`<a${addAttribute(it.href, "href")} data-astro-cid-vx4iavld>${it.name}</a>` : renderTemplate`<span aria-current="page" data-astro-cid-vx4iavld>${it.name}</span>`} </li>`)} </ol> </nav>`;
}, "C:/Programming section/virnobyte/src/components/Breadcrumbs.astro", void 0);
//#endregion
export { $$Breadcrumbs as t };
