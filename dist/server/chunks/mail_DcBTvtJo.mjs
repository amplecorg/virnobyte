import { n as getSettings } from "./settings_C74a6Mrw.mjs";
import nodemailer from "nodemailer";
//#region src/lib/mail.ts
var env = (typeof globalThis.process !== "undefined" ? globalThis.process : void 0)?.env || {};
/** True on the live server. Development conveniences (showing links on screen) must never run there. */
var isProduction = () => env.NODE_ENV === "production";
/** Mail server settings: Admin → Settings → Email first, then SMTP_* environment variables. */
function mailConfig() {
	let s = {};
	try {
		s = getSettings().signin || {};
	} catch {}
	const pick = (v, e) => String(v ?? "").trim() || String(e ?? "").trim();
	const host = pick(s.smtpHost, env.SMTP_HOST);
	const user = pick(s.smtpUser, env.SMTP_USER);
	const pass = pick(s.smtpPass, env.SMTP_PASS);
	const port = Number(s.smtpHost ? s.smtpPort : env.SMTP_PORT) || 587;
	return {
		host,
		user,
		pass,
		port,
		secure: s.smtpHost ? !!s.smtpSecure || port === 465 : env.SMTP_SECURE === "true" || port === 465,
		from: pick(s.smtpFrom, env.SMTP_FROM || env.MAIL_FROM) || (user ? `Virnobyte <${user}>` : "Virnobyte <info@virnobyte.com>")
	};
}
function isMailConfigured() {
	const c = mailConfig();
	return Boolean(c.host && c.user && c.pass);
}
async function sendEmail({ to, subject, html, text }) {
	const { host, user, pass, port, secure, from } = mailConfig();
	if (!host || !user || !pass) {
		console.log("\n============================================================");
		console.log("[VIRNOBYTE MAIL] SMTP not configured. Email NOT sent:");
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
export { sendPasswordResetEmail as i, isProduction as n, sendEmail as r, isMailConfigured as t };
