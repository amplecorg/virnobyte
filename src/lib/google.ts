import { randomBytes } from 'node:crypto';
import { get, run } from './db';
import { hashPassword } from './password';
import { getSettings } from './settings';
import type { User } from './auth';

/**
 * "Continue with Google" (OAuth 2.0 authorization-code flow, server side).
 * Credentials: Admin → Settings → Email, Google Sign-in & OTP, or GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET.
 * The button is hidden until both are set.
 */
export function googleConfig() {
  let s: Record<string, any> = {};
  try {
    s = (getSettings() as any).signin || {};
  } catch {}
  const clientId = String(s.googleClientId || process.env.GOOGLE_CLIENT_ID || '').trim();
  const clientSecret = String(s.googleClientSecret || process.env.GOOGLE_CLIENT_SECRET || '').trim();
  return { clientId, clientSecret, enabled: Boolean(clientId && clientSecret) };
}

export const GOOGLE_STATE_COOKIE = 'vb_g_state';

export function googleAuthUrl(redirectUri: string, state: string) {
  const { clientId } = googleConfig();
  const p = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    prompt: 'select_account',
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${p}`;
}

export interface GoogleProfile {
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
}

/** Trades the one-time code for the user's Google profile (server-to-Google, with our client secret). */
export async function googleProfile(code: string, redirectUri: string): Promise<GoogleProfile> {
  const { clientId, clientSecret } = googleConfig();
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: 'authorization_code' }),
    signal: AbortSignal.timeout(15_000),
  });
  const token = (await tokenRes.json().catch(() => ({}))) as { access_token?: string; error_description?: string };
  if (!tokenRes.ok || !token.access_token) throw new Error(token.error_description || 'Google did not accept the sign-in.');
  const infoRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: { Authorization: `Bearer ${token.access_token}` },
    signal: AbortSignal.timeout(15_000),
  });
  const info = (await infoRes.json().catch(() => ({}))) as Partial<GoogleProfile>;
  if (!infoRes.ok || !info.sub || !info.email) throw new Error('Google did not share your email address.');
  return { sub: String(info.sub), email: String(info.email).toLowerCase(), email_verified: info.email_verified === true, name: String(info.name || '').trim() };
}

/**
 * Finds or creates the customer for a Google profile. Links an existing account with the same
 * (Google-verified) email. Admin accounts must keep signing in with their password.
 */
export function userForGoogle(p: GoogleProfile): User {
  const cols = 'id, email, name, phone, role, created_at';
  let user = get<User>(`SELECT ${cols} FROM users WHERE google_sub = ?`, p.sub);
  if (!user) {
    if (!p.email_verified) throw new Error('Your Google email is not verified. Please sign in with email and password.');
    user = get<User>(`SELECT ${cols} FROM users WHERE lower(email) = ?`, p.email);
    if (user) {
      if (user.role === 'admin') throw new Error('Admin accounts sign in with email and password.');
      run('UPDATE users SET google_sub = ? WHERE id = ?', p.sub, user.id);
    } else {
      // A random password nobody knows; the customer can set one later with "Forgot password".
      const res = run(
        "INSERT INTO users (name, email, phone, password_hash, role, google_sub) VALUES (?, ?, '', ?, 'customer', ?)",
        p.name || p.email.split('@')[0],
        p.email,
        hashPassword(randomBytes(24).toString('base64url')),
        p.sub,
      );
      user = get<User>(`SELECT ${cols} FROM users WHERE id = ?`, Number(res.lastInsertRowid));
    }
  }
  if (!user) throw new Error('Could not sign you in. Please try again.');
  if (user.role === 'admin') throw new Error('Admin accounts sign in with email and password.');
  return user;
}
