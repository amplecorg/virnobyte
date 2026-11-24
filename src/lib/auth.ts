import { randomBytes, createHash } from 'node:crypto';
import type { AstroCookies } from 'astro';
import { get, run } from './db';
import { hashPassword, verifyPassword } from './password';
import { isMailConfigured, isProduction, sendPasswordResetEmail } from './mail';

export const SESSION_COOKIE = 'vb_session';
const SESSION_DAYS = 14;

export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: 'admin' | 'customer';
  created_at: string;
}

export function createSession(cookies: AstroCookies, userId: number, secure: boolean) {
  const token = randomBytes(32).toString('base64url');
  const expires = new Date(Date.now() + SESSION_DAYS * 864e5);
  run('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)', token, userId, expires.toISOString());
  run("DELETE FROM sessions WHERE expires_at < datetime('now')");
  cookies.set(SESSION_COOKIE, token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure,
    expires,
  });
}

export function userFromCookies(cookies: AstroCookies): User | null {
  const token = cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const row = get<User & { expires_at: string }>(
    `SELECT u.id, u.email, u.name, u.phone, u.role, u.created_at, s.expires_at
     FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ?`,
    token,
  );
  if (!row || new Date(row.expires_at) < new Date()) return null;
  const { expires_at: _e, ...user } = row;
  return user;
}

export function destroySession(cookies: AstroCookies) {
  const token = cookies.get(SESSION_COOKIE)?.value;
  if (token) run('DELETE FROM sessions WHERE token = ?', token);
  cookies.delete(SESSION_COOKIE, { path: '/' });
}

export function authenticate(email: string, password: string): User | null {
  const row = get<User & { password_hash: string }>('SELECT * FROM users WHERE email = ?', email.trim());
  if (!row || !verifyPassword(password, row.password_hash)) return null;
  const { password_hash: _p, ...user } = row;
  return user;
}

export function registerCustomer(input: { name: string; email: string; phone: string; password: string }) {
  const res = run(
    "INSERT INTO users (name, email, phone, password_hash, role) VALUES (?, ?, ?, ?, 'customer')",
    input.name.trim(),
    input.email.trim(),
    input.phone.trim(),
    hashPassword(input.password),
  );
  return Number(res.lastInsertRowid);
}

export function setPassword(userId: number, password: string) {
  run('UPDATE users SET password_hash = ? WHERE id = ?', hashPassword(password), userId);
  run('DELETE FROM sessions WHERE user_id = ?', userId);
}

// Small in-memory limiter for login, registration and public forms.
const hits = new Map<string, { count: number; reset: number }>();
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const h = hits.get(key);
  if (!h || h.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  h.count++;
  return h.count <= max;
}

export async function createPasswordReset(
  email: string,
  origin: string,
): Promise<{ success: boolean; devUrl?: string; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) return { success: false, error: 'Email is required.' };

  // Checked before looking the account up, so the answer is the same whether or not the email exists.
  if (isProduction() && !isMailConfigured()) {
    console.error('[Auth] Password reset requested but outgoing email is not set up (Admin → Settings → Email).');
    return { success: false, error: 'We cannot send emails right now. Please call or WhatsApp us and we will reset your password.' };
  }

  const user = get<User>('SELECT id, email, name, phone, role, created_at FROM users WHERE lower(email) = ?', cleanEmail);
  if (!user) {
    // Return success to prevent email enumeration / account snooping
    return { success: true };
  }

  // Token is 32 random bytes in hex (64 chars)
  const rawToken = randomBytes(32).toString('hex');
  const tokenHash = createHash('sha256').update(rawToken).digest('hex');
  // 1 hour expiry
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

  // Invalidate any existing unused reset tokens for this user
  run("UPDATE password_resets SET used_at = datetime('now') WHERE user_id = ? AND used_at IS NULL", user.id);

  // Store new token hash
  run(
    'INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
    user.id,
    tokenHash,
    expiresAt,
  );

  const cleanOrigin = origin.replace(/\/+$/, '');
  const resetUrl = `${cleanOrigin}/account/reset-password?token=${rawToken}`;

  // On the live site the link is only ever emailed, never shown on screen (see devUrl below):
  // showing it would let anyone reset any account just by typing its email address.
  const mailRes = await sendPasswordResetEmail({
    to: user.email,
    name: user.name,
    resetUrl,
  });

  return {
    success: mailRes.success,
    devUrl: mailRes.devMode && !isProduction() ? resetUrl : undefined,
    error: mailRes.success ? undefined : 'We could not send the email. Please try again in a few minutes or contact us.',
  };
}

/**
 * The public address to put in emailed links. Uses the address the request came in on when
 * testing on this computer, and PUBLIC_SITE_URL (or the proxy's forwarded host) on the live site,
 * so links never point at an internal address like http://localhost:3000.
 */
export function siteOrigin(ctx: { url: URL; request: Request }): string {
  const host = ctx.url.hostname;
  if (host === 'localhost' || host === '127.0.0.1') return ctx.url.origin;
  const site = String(process.env.PUBLIC_SITE_URL || '').trim().replace(/\/+$/, '');
  if (/^https?:\/\//.test(site)) return site;
  const fwdHost = ctx.request.headers.get('x-forwarded-host') || ctx.request.headers.get('host') || ctx.url.host;
  const proto = ctx.request.headers.get('x-forwarded-proto') || ctx.url.protocol.replace(':', '');
  return `${proto}://${fwdHost}`;
}

export function validateResetToken(rawToken: string): { valid: boolean; userId?: number; error?: string } {
  const token = (rawToken || '').trim();
  if (!token) {
    return { valid: false, error: 'Reset token is required.' };
  }

  const tokenHash = createHash('sha256').update(token).digest('hex');
  const row = get<{ id: number; user_id: number; expires_at: string; used_at: string | null }>(
    'SELECT id, user_id, expires_at, used_at FROM password_resets WHERE token_hash = ?',
    tokenHash,
  );

  if (!row) {
    return { valid: false, error: 'This password reset link is invalid or has expired.' };
  }

  if (row.used_at) {
    return { valid: false, error: 'This password reset link has already been used. Please request a new one.' };
  }

  if (new Date(row.expires_at).getTime() < Date.now()) {
    return { valid: false, error: 'This password reset link has expired. Please request a new one.' };
  }

  return { valid: true, userId: row.user_id };
}

export function resetPasswordWithToken(
  rawToken: string,
  newPassword: string,
): { success: boolean; error?: string } {
  const check = validateResetToken(rawToken);
  if (!check.valid || !check.userId) {
    return { success: false, error: check.error || 'Invalid reset token.' };
  }

  if (newPassword.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters long.' };
  }

  const tokenHash = createHash('sha256').update(rawToken.trim()).digest('hex');

  // Update password and invalidate all active sessions
  setPassword(check.userId, newPassword);

  // Mark token as used
  run("UPDATE password_resets SET used_at = datetime('now') WHERE token_hash = ?", tokenHash);

  return { success: true };
}
