import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { t as contactInfo } from "./settings_Y_6jYxNr.mjs";
//#region src/components/CtaBand.astro
createAstro("https://virnobyte.com");
var $$CtaBand = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CtaBand;
	const c = contactInfo();
	const { heading = "Tell us what is wrong. We will tell you what it takes to fix it.", text = `Call, WhatsApp or book online. Walk-ins welcome at our ${c.locality} workshop.`, whatsappText } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="cta section--night" data-reveal data-astro-cid-hwvj6ntz> <div class="wrap inner" data-astro-cid-hwvj6ntz> <div class="copy" data-astro-cid-hwvj6ntz> <h2 data-astro-cid-hwvj6ntz>${heading}</h2> <p class="lede" data-astro-cid-hwvj6ntz>${text}</p> </div> <div class="btn-row" data-astro-cid-hwvj6ntz> <a class="btn" href="/contact#book" data-astro-cid-hwvj6ntz>${renderComponent($$result, "Icon", $$Icon, {
		"name": "calendar",
		"data-astro-cid-hwvj6ntz": true
	})} Book a Service</a> <a class="btn btn--light"${addAttribute(c.tel, "href")} data-astro-cid-hwvj6ntz>${renderComponent($$result, "Icon", $$Icon, {
		"name": "phone",
		"data-astro-cid-hwvj6ntz": true
	})} Call ${c.phone}</a> <a class="btn btn--light"${addAttribute(c.whatsappUrl(whatsappText), "href")} rel="noopener" target="_blank" data-astro-cid-hwvj6ntz>${renderComponent($$result, "Icon", $$Icon, {
		"name": "whatsapp",
		"data-astro-cid-hwvj6ntz": true
	})} WhatsApp</a> <a class="btn btn--light"${addAttribute(c.directions, "href")} rel="noopener" target="_blank" data-astro-cid-hwvj6ntz>${renderComponent($$result, "Icon", $$Icon, {
		"name": "directions",
		"data-astro-cid-hwvj6ntz": true
	})} Get Directions</a> </div> </div> </section>`;
}, "C:/Programming section/virnobyte/src/components/CtaBand.astro", void 0);
//#endregion
export { $$CtaBand as t };
