import { r as db } from "./db_CrQR8QZK.mjs";
import { createHash, randomBytes } from "node:crypto";
//#region src/lib/inventory/vendor.ts
/**
* Vendor portal access. Each vendor gets a private sign-in link (a long random token);
* only its SHA-256 hash is stored. Opening the link sets an httpOnly cookie and drops the
* token from the address bar. Issuing a new link signs out every device using the old one.
*/
var VENDOR_COOKIE = "vb_vendor";
var COOKIE_DAYS = 180;
var hash = (t) => createHash("sha256").update(t).digest("hex");
function issuePortalToken(sourceId) {
	const token = randomBytes(32).toString("base64url");
	db()?.prepare("UPDATE inv_sources SET portal_token_hash = ? WHERE id = ? AND kind = 'vendor'").run(hash(token), sourceId);
	return token;
}
function revokePortal(sourceId) {
	db()?.prepare("UPDATE inv_sources SET portal_token_hash = '' WHERE id = ?").run(sourceId);
}
function vendorByToken(token) {
	if (!token || token.length < 30 || token.length > 100) return void 0;
	const d = db();
	if (!d) return void 0;
	return d.prepare("SELECT id, name, email, update_method FROM inv_sources WHERE portal_token_hash = ? AND portal_token_hash != '' AND kind = 'vendor' AND active = 1").get(hash(token));
}
function signInVendor(cookies, token, secure) {
	const v = vendorByToken(token);
	if (!v) return void 0;
	cookies.set(VENDOR_COOKIE, token, {
		path: "/vendor",
		httpOnly: true,
		sameSite: "lax",
		secure,
		maxAge: COOKIE_DAYS * 86400
	});
	return v;
}
function vendorFromCookies(cookies) {
	const v = vendorByToken(cookies.get(VENDOR_COOKIE)?.value);
	if (v) db()?.prepare("UPDATE inv_sources SET portal_last_seen = datetime('now') WHERE id = ?").run(v.id);
	return v;
}
function signOutVendor(cookies) {
	cookies.delete(VENDOR_COOKIE, { path: "/vendor" });
}
//#endregion
export { vendorFromCookies as a, signOutVendor as i, revokePortal as n, signInVendor as r, issuePortalToken as t };
