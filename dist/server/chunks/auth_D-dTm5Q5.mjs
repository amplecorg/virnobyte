import { c as hashPassword, l as verifyPassword, o as run, r as get } from "./db_CG0-C7Y2.mjs";
import { createHash, randomBytes } from "node:crypto";
import nodemailer from "nodemailer";
//#region src/lib/mail.ts
var env = (typeof globalThis.process !== "undefined" ? globalThis.process : void 0)?.env || {};
async function sendEmail({ to, subject, html, text }) {
	const host = env.SMTP_HOST;
	const user = env.SMTP_USER;
	const pass = env.SMTP_PASS;
	const port = Number(env.SMTP_PORT || 587);
	const secure = env.SMTP_SECURE === "true" || port === 465;
	const from = env.SMTP_FROM || env.MAIL_FROM || (user ? `Virnobyte <${user}>` : "Virnobyte <info@virnobyte.com>");
	if (!host || !user || !pass) {
		console.log("\n============================================================");
		console.log("[VIRNOBYTE MAIL] SMTP not configured. Simulating email dispatch:");
		console.log(`To: ${to}`);
		console.log(`From: ${from}`);
		console.log(`Subject: ${subject}`);
		console.log(`Plain text body:\n${text}`);
		console.log("============================================================\n");
		return {
			success: true,
			devMode: true
		};
	}
	try {
		await nodemailer.createTransport({
			host,
			port,
			secure,
			auth: {
				user,
				pass
			}
		}).sendMail({
			from,
			to,
			subject,
			text,
			html
		});
		return { success: true };
	} catch (err) {
		console.error("[VIRNOBYTE MAIL ERROR] Failed to send email to %s:", to, err);
		return {
			success: false,
			error: err?.message || "Failed to send email"
		};
	}
}
async function sendPasswordResetEmail({ to, name, resetUrl }) {
	const displayName = name ? name.trim() : "there";
	const subject = "Reset your Virnobyte password";
	return sendEmail({
		to,
		subject,
		text: `Hello ${displayName},

We received a request to reset the password for your Virnobyte account (${to}).

To reset your password, visit the following link:
${resetUrl}

This link is valid for 60 minutes.

If you did not request a password reset, you can safely ignore this email. Your password will not change.

Need help? Contact us at info@virnobyte.com or +91 86698 83332.

Regards,
Virnobyte Team
https://virnobyte.com
`,
		html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f6f9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);" cellspacing="0" cellpadding="0" border="0">
          <!-- Header -->
          <tr>
            <td style="background-color: #0b2545; padding: 28px 32px; text-align: left;">
              <span style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; text-decoration: none;">
                VIRNO<span style="color: #38bdf8;">BYTE</span>
              </span>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px 28px 32px;">
              <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #0f172a;">
                Password Reset Request
              </h1>
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155;">
                Hello <strong>${displayName}</strong>,
              </p>
              <p style="margin: 0 0 24px 0; font-size: 15px; color: #334155;">
                We received a request to reset the password for your Virnobyte account (<code>${to}</code>). Click the button below to choose a new password:
              </p>
              <!-- Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 28px 0;">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #0b2545;">
                    <a href="${resetUrl}" target="_blank" style="font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; display: inline-block; background-color: #0b2545;">
                      Reset My Password &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 24px 0 12px 0; font-size: 14px; color: #64748b;">
                If the button above doesn't work, copy and paste this link into your browser:
              </p>
              <p style="margin: 0 0 24px 0; font-size: 13px; word-break: break-all; color: #0284c7;">
                <a href="${resetUrl}" style="color: #0284c7; text-decoration: underline;">${resetUrl}</a>
              </p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 20px 0;" />
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">
                <strong>Security notice:</strong> This link is only valid for <strong>60 minutes</strong>. If you did not request a password reset, you can safely ignore this email — your account and password remain secure.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
              <p style="margin: 0 0 6px 0;">Virnobyte Pvt. Ltd. &bull; Chikhali, Pimpri-Chinchwad, Pune 411062</p>
              <p style="margin: 0;">Support: <a href="mailto:info@virnobyte.com" style="color: #64748b;">info@virnobyte.com</a> | +91 86698 83332</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
	});
}
//#endregion
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
		devUrl: mailRes.devMode ? resetUrl : void 0,
		error: mailRes.error
	};
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
export { rateLimit as a, setPassword as c, destroySession as i, userFromCookies as l, createPasswordReset as n, registerCustomer as o, createSession as r, resetPasswordWithToken as s, authenticate as t, validateResetToken as u };
