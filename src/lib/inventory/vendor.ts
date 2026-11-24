import { createHash, randomBytes } from 'node:crypto';
import type { AstroCookies } from 'astro';
import { db } from '../db';

/**
 * Vendor portal access. Each vendor gets a private sign-in link (a long random token);
 * only its SHA-256 hash is stored. Opening the link sets an httpOnly cookie and drops the
 * token from the address bar. Issuing a new link signs out every device using the old one.
 */
export const VENDOR_COOKIE = 'vb_vendor';
const COOKIE_DAYS = 180;

const hash = (t: string) => createHash('sha256').update(t).digest('hex');

export interface VendorSession {
  id: number;
  name: string;
  email: string;
  update_method: string;
}

export function issuePortalToken(sourceId: number): string {
  const token = randomBytes(32).toString('base64url');
  db()?.prepare("UPDATE inv_sources SET portal_token_hash = ? WHERE id = ? AND kind = 'vendor'").run(hash(token), sourceId);
  return token;
}

export function revokePortal(sourceId: number) {
  db()?.prepare("UPDATE inv_sources SET portal_token_hash = '' WHERE id = ?").run(sourceId);
}

export function vendorByToken(token: string | undefined | null): VendorSession | undefined {
  if (!token || token.length < 30 || token.length > 100) return undefined;
  const d = db();
  if (!d) return undefined;
  return d
    .prepare("SELECT id, name, email, update_method FROM inv_sources WHERE portal_token_hash = ? AND portal_token_hash != '' AND kind = 'vendor' AND active = 1")
    .get(hash(token)) as VendorSession | undefined;
}

export function signInVendor(cookies: AstroCookies, token: string, secure: boolean): VendorSession | undefined {
  const v = vendorByToken(token);
  if (!v) return undefined;
  cookies.set(VENDOR_COOKIE, token, { path: '/vendor', httpOnly: true, sameSite: 'lax', secure, maxAge: COOKIE_DAYS * 86400 });
  return v;
}

export function vendorFromCookies(cookies: AstroCookies): VendorSession | undefined {
  const v = vendorByToken(cookies.get(VENDOR_COOKIE)?.value);
  if (v) db()?.prepare("UPDATE inv_sources SET portal_last_seen = datetime('now') WHERE id = ?").run(v.id);
  return v;
}

export function signOutVendor(cookies: AstroCookies) {
  cookies.delete(VENDOR_COOKIE, { path: '/vendor' });
}
