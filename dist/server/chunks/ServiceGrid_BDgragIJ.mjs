import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { t as $$Photo } from "./Photo_DaKSvGuY.mjs";
//#region src/components/ServiceGrid.astro
createAstro("https://virnobyte.com");
var $$ServiceGrid = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ServiceGrid;
	const { items, headingLevel = "h3" } = Astro.props;
	const H = headingLevel;
	return renderTemplate`${maybeRenderHead($$result)}<ul class="svc-grid" data-astro-cid-2rgb55cq> ${items.map((s) => renderTemplate`<li data-reveal data-astro-cid-2rgb55cq> <a${addAttribute(`/services/${s.slug}`, "href")} class="svc" data-astro-cid-2rgb55cq> ${renderComponent($$result, "Photo", $$Photo, {
		"image": s.image,
		"alt": `${s.name} service by Virnobyte`,
		"sizes": "(min-width: 1400px) 22vw, (min-width: 700px) 45vw, 100vw",
		"widths": [
			480,
			768,
			1080
		],
		"data-astro-cid-2rgb55cq": true
	})} <div class="body" data-astro-cid-2rgb55cq> ${renderComponent($$result, "H", H, { "data-astro-cid-2rgb55cq": true }, { "default": ($$result) => renderTemplate`${s.name}` })} <p data-astro-cid-2rgb55cq>${s.short}</p> <span class="more" data-astro-cid-2rgb55cq> ${s.name} details ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"data-astro-cid-2rgb55cq": true
	})} </span> </div> </a> </li>`)} </ul>`;
}, "C:/Programming section/virnobyte/src/components/ServiceGrid.astro", void 0);
//#endregion
export { $$ServiceGrid as t };
