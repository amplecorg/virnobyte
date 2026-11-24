import { A as renderTemplate, N as addAttribute, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { r as googleConfig } from "./google_CvESN5mz.mjs";
//#region src/components/GoogleButton.astro
createAstro("https://virnobyte.com");
var $$GoogleButton = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$GoogleButton;
	const { next } = Astro.props;
	const enabled = googleConfig().enabled;
	const href = `/account/google${next ? `?next=${encodeURIComponent(next)}` : ""}`;
	return renderTemplate`${enabled && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<a class="g-btn"${addAttribute(href, "href")} data-astro-cid-ttvmtn47> <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" data-astro-cid-ttvmtn47> <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" data-astro-cid-ttvmtn47></path> <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z" data-astro-cid-ttvmtn47></path> <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C1 16.4 0 20.1 0 24s1 7.6 2.6 10.8l7.9-6.1z" data-astro-cid-ttvmtn47></path> <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.6 42.6 14.6 48 24 48z" data-astro-cid-ttvmtn47></path> </svg>
Continue with Google
</a> <div class="g-or" data-astro-cid-ttvmtn47><span data-astro-cid-ttvmtn47>or use your email</span></div> ` })}`}`;
}, "C:/Programming section/virnobyte/src/components/GoogleButton.astro", void 0);
//#endregion
export { $$GoogleButton as t };
