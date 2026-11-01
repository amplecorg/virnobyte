import { A as renderTemplate, D as renderSlot, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Base } from "./Base_OysXX2EZ.mjs";
//#region src/layouts/Auth.astro
createAstro("https://virnobyte.com");
var $$Auth = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Auth;
	const { title, heading, lede } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": title,
		"description": lede ?? heading,
		"noindex": true,
		"data-astro-cid-znuz4gjs": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<section class="section auth" data-astro-cid-znuz4gjs> <div class="wrap" data-astro-cid-znuz4gjs> <div class="card box" data-astro-cid-znuz4gjs> <h1 data-astro-cid-znuz4gjs>${heading}</h1> ${lede && renderTemplate`<p class="muted" data-astro-cid-znuz4gjs>${lede}</p>`} ${renderSlot($$result, $$slots["default"])} </div> </div> </section> ` })}`;
}, "C:/Programming section/virnobyte/src/layouts/Auth.astro", void 0);
//#endregion
export { $$Auth as t };
