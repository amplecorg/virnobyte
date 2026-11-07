import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { _ as posts, w as services, y as products } from "./data_Bq_0n-xJ.mjs";
import { t as generatePageMarkdown } from "./agent-markdown_CXZuCac-.mjs";
//#region src/pages/llms-full.txt.ts
var llms_full_txt_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = ({ site }) => {
	const origin = site ? new URL(site).origin : "https://virnobyte.com";
	const parts = [];
	const homeMd = generatePageMarkdown("/", origin);
	if (homeMd) parts.push(homeMd);
	const svcs = services();
	parts.push(`\n# All IT Services (${svcs.length} Services)\n`);
	for (const s of svcs) {
		const sMd = generatePageMarkdown(`/services/${s.slug}`, origin);
		if (sMd) parts.push(sMd);
	}
	const prods = products();
	parts.push(`\n# Hardware Store Catalog (${prods.length} Products)\n`);
	for (const p of prods) {
		const pMd = generatePageMarkdown(`/products/${p.slug}`, origin);
		if (pMd) parts.push(pMd);
	}
	const allPosts = posts(10);
	parts.push(`\n# Knowledge Base & Troubleshooting Guides\n`);
	for (const p of allPosts) {
		const bMd = generatePageMarkdown(`/blog/${p.slug}`, origin);
		if (bMd) parts.push(bMd);
	}
	const fullText = parts.join("\n\n---\n\n");
	return new Response(fullText, { headers: {
		"Content-Type": "text/plain; charset=utf-8",
		"Cache-Control": "public, max-age=3600"
	} });
};
//#endregion
//#region \0virtual:astro:page:src/pages/llms-full.txt@_@ts
var page = () => llms_full_txt_exports;
//#endregion
export { page };
