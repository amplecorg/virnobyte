import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, M as renderHead, V as createAstro } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
//#region src/pages/500.astro
var _500_exports = /* @__PURE__ */ __exportAll({
	default: () => $$500,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$500 = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$500;
	const { error } = Astro.props;
	Astro.response.status = 500;
	const message = error instanceof Error ? error.message : String(error || "Internal Server Error");
	const stack = error instanceof Error ? error.stack : "";
	return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>500 - Server Error | Virnobyte</title>${renderHead($$result)}</head> <body style="font-family:system-ui,-apple-system,sans-serif;margin:0;padding:2rem;background:#0b1724;color:#f0f4f8;"> <div style="max-width:800px;margin:0 auto;background:#132238;padding:2rem;border-radius:12px;border:1px solid #1f3554;"> <h1 style="color:#ef4444;margin-top:0;">500 Internal Server Error</h1> <p style="color:#94a3b8;font-size:1.1rem;">A server-side error occurred during rendering.</p> <div style="background:#070e17;padding:1rem;border-radius:8px;overflow-x:auto;margin:1.5rem 0;"> <code style="color:#38bdf8;font-size:0.9rem;white-space:pre-wrap;">${message}</code> ${stack && renderTemplate`<pre style="color:#64748b;font-size:0.8rem;margin-top:0.75rem;white-space:pre-wrap;">${stack}</pre>`} </div> <p><a href="/" style="color:#38bdf8;text-decoration:none;font-weight:600;">&larr; Try Reloading Home</a></p> </div> </body> </html>`;
}, "C:/Programming section/virnobyte/src/pages/500.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/500.astro";
var $$url = "/500.html";
//#endregion
//#region \0virtual:astro:page:src/pages/500@_@astro
var page = () => _500_exports;
//#endregion
export { page };
