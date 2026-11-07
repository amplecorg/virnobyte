import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { t as UPLOAD_DIR } from "./db_CG0-C7Y2.mjs";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join, resolve, sep } from "node:path";
//#region src/pages/uploads/[...path].ts
var ____path__exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var TYPES = {
	webp: "image/webp",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	png: "image/png",
	avif: "image/avif"
};
var GET = ({ params }) => {
	const root = resolve(UPLOAD_DIR);
	const file = resolve(join(root, params.path ?? ""));
	if (!file.startsWith(root + sep) || !existsSync(file) || !statSync(file).isFile()) return new Response("Not found", { status: 404 });
	const type = TYPES[file.split(".").pop().toLowerCase()];
	if (!type) return new Response("Not found", { status: 404 });
	return new Response(readFileSync(file), { headers: {
		"Content-Type": type,
		"Cache-Control": "public, max-age=31536000, immutable"
	} });
};
//#endregion
//#region \0virtual:astro:page:src/pages/uploads/[...path]@_@ts
var page = () => ____path__exports;
//#endregion
export { page };
