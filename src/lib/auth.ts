import { randomBytes } from 'node:crypto';
import type { AstroCookies } from 'astro';
import { get, run } from './db';
import { hashPassword, verifyPassword } from './password';

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
