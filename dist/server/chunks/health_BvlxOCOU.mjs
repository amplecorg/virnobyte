import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { i as getDbStatus, r as get } from "./db_CwXjF1zf.mjs";
//#region src/pages/api/health.ts
var health_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var proc = typeof globalThis.process !== "undefined" ? globalThis.process : void 0;
var env = proc?.env || {};
var GET = async () => {
	let dbOk = false;
	let testQueryError = null;
	try {
		dbOk = get("SELECT 1 as num")?.num === 1;
	} catch (err) {
		testQueryError = {
			name: err?.name,
			message: err?.message
		};
	}
	const dbStatus = typeof getDbStatus === "function" ? getDbStatus() : { ok: dbOk };
	return new Response(JSON.stringify({
		status: dbOk ? "healthy" : "degraded",
		nodeVersion: proc?.version || "unknown",
		platform: proc?.platform || "unknown",
		cwd: proc?.cwd ? proc.cwd() : ".",
		dataDir: dbStatus.dataDir || env.DATA_DIR || "default",
		port: env.PORT || "3000",
		host: env.HOST || "0.0.0.0",
		dbOk,
		dbStatus,
		testQueryError
	}, null, 2), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "no-store, no-cache"
		}
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/health@_@ts
var page = () => health_exports;
//#endregion
export { page };
