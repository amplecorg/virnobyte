import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
//#region src/pages/.well-known/mcp/server-card.json.ts
var server_card_json_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = ({ site, url }) => {
	const origin = site ? new URL(site).origin : url.origin;
	const filePath = resolve(process.cwd(), "public/.well-known/mcp/server-card.json");
	let card;
	if (existsSync(filePath)) try {
		card = JSON.parse(readFileSync(filePath, "utf-8"));
		card.endpoint = `${origin}/api/mcp`;
		card.contact.url = origin;
	} catch {
		card = {
			name: "virnobyte",
			version: "1.0.0",
			endpoint: `${origin}/api/mcp`
		};
	}
	else card = {
		name: "virnobyte",
		version: "1.0.0",
		endpoint: `${origin}/api/mcp`
	};
	return new Response(JSON.stringify(card, null, 2), { headers: {
		"Content-Type": "application/json; charset=utf-8",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, OPTIONS",
		"Cache-Control": "public, max-age=3600"
	} });
};
//#endregion
//#region \0virtual:astro:page:src/pages/.well-known/mcp/server-card.json@_@ts
var page = () => server_card_json_exports;
//#endregion
export { page };
