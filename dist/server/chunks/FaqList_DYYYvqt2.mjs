import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
//#region src/components/FaqList.astro
createAstro("https://virnobyte.com");
var $$FaqList = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FaqList;
	const { faqs } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="faqs" data-astro-cid-bppbuphv> ${faqs.map((f, i) => renderTemplate`<details${addAttribute(i === 0, "open")} data-astro-cid-bppbuphv> <summary data-astro-cid-bppbuphv> <span class="q" data-astro-cid-bppbuphv>${f.q}</span> <span class="pm" aria-hidden="true" data-astro-cid-bppbuphv></span> </summary> <p data-astro-cid-bppbuphv>${f.a}</p> </details>`)} </div>`;
}, "C:/Programming section/virnobyte/src/components/FaqList.astro", void 0);
//#endregion
export { $$FaqList as t };
