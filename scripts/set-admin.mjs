import { DatabaseSync } from 'node:sqlite';
import { randomBytes, scryptSync } from 'node:crypto';
import { join } from 'node:path';
import process from 'node:process';

const KEYLEN = 64;
function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, KEYLEN, { N: 16384, r: 8, p: 1 });
  return `scrypt$${salt.toString('base64')}$${hash.toString('base64')}`;
}

const DATA_DIR = process.env.DATA_DIR || join(process.cwd(), 'data');
const DB_PATH = join(DATA_DIR, 'virnobyte.db');

const args = process.argv.slice(2);
const newEmail = args[0]?.trim();
const newPassword = args[1]?.trim();

if (!newEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(newEmail)) {
  console.log('\n--- Virnobyte Admin User Management ---');
  console.log('Usage: node scripts/set-admin.mjs <new-email> [new-password]');
  console.log('Example: node scripts/set-admin.mjs newadmin@virnobyte.com\n');
  process.exit(1);
}

try {
  const d = new DatabaseSync(DB_PATH);
  const admin = d.prepare("SELECT id, email, name, role FROM users WHERE role = 'admin' LIMIT 1").get();

  if (!admin) {
    const passwordToUse = newPassword || 'Demo@123456';
    d.prepare("INSERT INTO users (email, name, password_hash, role) VALUES (?, 'Administrator', ?, 'admin')").run(
      newEmail.toLowerCase(),
      hashPassword(passwordToUse),
    );
    console.log(`[Success] Created new admin user: ${newEmail}`);
    if (!newPassword) {
      console.log(`[Notice] Default password set to: ${passwordToUse}`);
    }
  } else {
    const existing = d.prepare('SELECT id FROM users WHERE lower(email) = ? AND id != ?').get(newEmail.toLowerCase(), admin.id);
    if (existing) {
      console.error(`[Error] Another user account already uses email: ${newEmail}`);
      process.exit(1);
    }

    if (newPassword) {
      if (newPassword.length < 8) {
        console.error('[Error] Password must be at least 8 characters long.');
        process.exit(1);
      }
      d.prepare('UPDATE users SET email = ?, password_hash = ? WHERE id = ?').run(
        newEmail.toLowerCase(),
        hashPassword(newPassword),
        admin.id,
      );
      d.prepare('DELETE FROM sessions WHERE user_id = ?').run(admin.id);
      console.log(`[Success] Updated admin email to: ${newEmail} and updated password.`);
    } else {
      d.prepare('UPDATE users SET email = ? WHERE id = ?').run(newEmail.toLowerCase(), admin.id);
      console.log(`[Success] Updated admin email from '${admin.email}' to '${newEmail}'. Password was not changed.`);
    }
  }
} catch (err) {
  console.error('[Error updating admin account]:', err);
  process.exit(1);
}
