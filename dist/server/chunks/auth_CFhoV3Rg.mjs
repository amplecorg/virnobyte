import { d as verifyPassword, i as get, s as run, u as hashPassword } from "./db_CrQR8QZK.mjs";
import { i as sendPasswordResetEmail, n as isProduction, t as isMailConfigured } from "./mail_DcBTvtJo.mjs";
import { createHash, randomBytes } from "node:crypto";
//#region src/lib/auth.ts
var SESSION_COOKIE = "vb_session";
var SESSION_DAYS = 14;
function createSession(cookies, userId, secure) {
	const token = randomBytes(32).toString("base64url");
	const expires = new Date(Date.now() + SESSION_DAYS * 864e5);
	run("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)", token, userId, expires.toISOString());
	run("DELETE FROM sessions WHERE expires_at < datetime('now')");
	cookies.set(SESSION_COOKIE, token, {
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		secure,
		expires
	});
}
function userFromCookies(cookies) {
	const token = cookies.get(SESSION_COOKIE)?.value;
	if (!token) return null;
	const row = get(`SELECT u.id, u.email, u.name, u.phone, u.role, u.created_at, s.expires_at
     FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ?`, token);
	if (!row || new Date(row.expires_at) < /* @__PURE__ */ new Date()) return null;
	const { expires_at: _e, ...user } = row;
	return user;
}
function destroySession(cookies) {
	const token = cookies.get(SESSION_COOKIE)?.value;
	if (token) run("DELETE FROM sessions WHERE token = ?", token);
	cookies.delete(SESSION_COOKIE, { path: "/" });
}
function authenticate(email, password) {
	const row = get("SELECT * FROM users WHERE email = ?", email.trim());
	if (!row || !verifyPassword(password, row.password_hash)) return null;
	const { password_hash: _p, ...user } = row;
	return user;
}
function registerCustomer(input) {
	const res = run("INSERT INTO users (name, email, phone, password_hash, role) VALUES (?, ?, ?, ?, 'customer')", input.name.trim(), input.email.trim(), input.phone.trim(), hashPassword(input.password));
	return Number(res.lastInsertRowid);
}
function setPassword(userId, password) {
	run("UPDATE users SET password_hash = ? WHERE id = ?", hashPassword(password), userId);
	run("DELETE FROM sessions WHERE user_id = ?", userId);
}
var hits = /* @__PURE__ */ new Map();
function rateLimit(key, max, windowMs) {
	const now = Date.now();
	const h = hits.get(key);
	if (!h || h.reset < now) {
		hits.set(key, {
			count: 1,
			reset: now + windowMs
		});
		return true;
	}
	h.count++;
	return h.count <= max;
}
async function createPasswordReset(email, origin) {
	const cleanEmail = email.trim().toLowerCase();
	if (!cleanEmail) return {
		success: false,
		error: "Email is required."
	};
	if (isProduction() && !isMailConfigured()) {
		console.error("[Auth] Password reset requested but outgoing email is not set up (Admin → Settings → Email).");
		return {
			success: false,
			error: "We cannot send emails right now. Please call or WhatsApp us and we will reset your password."
		};
	}
	const user = get("SELECT id, email, name, phone, role, created_at FROM users WHERE lower(email) = ?", cleanEmail);
	if (!user) return { success: true };
	const rawToken = randomBytes(32).toString("hex");
	const tokenHash = createHash("sha256").update(rawToken).digest("hex");
	const expiresAt = new Date(Date.now() + 36e5).toISOString();
	run("UPDATE password_resets SET used_at = datetime('now') WHERE user_id = ? AND used_at IS NULL", user.id);
	run("INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES (?, ?, ?)", user.id, tokenHash, expiresAt);
	const resetUrl = `${origin.replace(/\/+$/, "")}/account/reset-password?token=${rawToken}`;
	const mailRes = await sendPasswordResetEmail({
		to: user.email,
		name: user.name,
		resetUrl
	});
	return {
		success: mailRes.success,
		devUrl: mailRes.devMode && !isProduction() ? resetUrl : void 0,
		error: mailRes.success ? void 0 : "We could not send the email. Please try again in a few minutes or contact us."
	};
}
/**
* The public address to put in emailed links. Uses the address the request came in on when
* testing on this computer, and PUBLIC_SITE_URL (or the proxy's forwarded host) on the live site,
* so links never point at an internal address like http://localhost:3000.
*/
function siteOrigin(ctx) {
	const host = ctx.url.hostname;
	if (host === "localhost" || host === "127.0.0.1") return ctx.url.origin;
	const site = String(process.env.PUBLIC_SITE_URL || "").trim().replace(/\/+$/, "");
	if (/^https?:\/\//.test(site)) return site;
	const fwdHost = ctx.request.headers.get("x-forwarded-host") || ctx.request.headers.get("host") || ctx.url.host;
	return `${ctx.request.headers.get("x-forwarded-proto") || ctx.url.protocol.replace(":", "")}://${fwdHost}`;
}
function validateResetToken(rawToken) {
	const token = (rawToken || "").trim();
	if (!token) return {
		valid: false,
		error: "Reset token is required."
	};
	const tokenHash = createHash("sha256").update(token).digest("hex");
	const row = get("SELECT id, user_id, expires_at, used_at FROM password_resets WHERE token_hash = ?", tokenHash);
	if (!row) return {
		valid: false,
		error: "This password reset link is invalid or has expired."
	};
	if (row.used_at) return {
		valid: false,
		error: "This password reset link has already been used. Please request a new one."
	};
	if (new Date(row.expires_at).getTime() < Date.now()) return {
		valid: false,
		error: "This password reset link has expired. Please request a new one."
	};
	return {
		valid: true,
		userId: row.user_id
	};
}
function resetPasswordWithToken(rawToken, newPassword) {
	const check = validateResetToken(rawToken);
	if (!check.valid || !check.userId) return {
		success: false,
		error: check.error || "Invalid reset token."
	};
	if (newPassword.length < 8) return {
		success: false,
		error: "Password must be at least 8 characters long."
	};
	const tokenHash = createHash("sha256").update(rawToken.trim()).digest("hex");
	setPassword(check.userId, newPassword);
	run("UPDATE password_resets SET used_at = datetime('now') WHERE token_hash = ?", tokenHash);
	return { success: true };
}
//#endregion
export { rateLimit as a, setPassword as c, validateResetToken as d, destroySession as i, siteOrigin as l, createPasswordReset as n, registerCustomer as o, createSession as r, resetPasswordWithToken as s, authenticate as t, userFromCookies as u };
