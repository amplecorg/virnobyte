import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
//#region src/pages/llms.txt.ts
var llms_txt_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = ({ site }) => {
	const origin = site ? new URL(site).origin : "https://virnobyte.com";
	let body = "";
	const filePath = resolve(process.cwd(), "public/llms.txt");
	if (existsSync(filePath)) {
		body = readFileSync(filePath, "utf-8");
		body = body.replace(/https:\/\/virnobyte\.com/g, origin);
	} else body = `# Virnobyte\n> IT Services, Computer Repair & Hardware in Pune & PCMC.\nWebsite: ${origin}\n`;
	return new Response(body, { headers: {
		"Content-Type": "text/plain; charset=utf-8",
		"Cache-Control": "public, max-age=3600"
	} });
};
//#endregion
//#region \0virtual:astro:page:src/pages/llms.txt@_@ts
var page = () => llms_txt_exports;
//#endregion
export { page };
