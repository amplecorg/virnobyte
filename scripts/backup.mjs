import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readdirSync, statSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const DATA_DIR = process.env.DATA_DIR || join(process.cwd(), 'data');
const DB_PATH = join(DATA_DIR, 'virnobyte.db');
const BACKUP_DIR = join(DATA_DIR, 'backups');
const RETENTION_DAYS = Number(process.env.BACKUP_RETENTION_DAYS || 14);

try {
  mkdirSync(BACKUP_DIR, { recursive: true });

  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:T]/g, '').slice(0, 14); // YYYYMMDDHHmmss
  const backupFileName = `virnobyte_backup_${timestamp}.db`;
  const backupFilePath = join(BACKUP_DIR, backupFileName);

  console.log(`[Backup] Connecting to ${DB_PATH}...`);
  const d = new DatabaseSync(DB_PATH);

  // Perform atomic zero-downtime snapshot using SQLite VACUUM INTO
  const normalizedDest = backupFilePath.replace(/\\/g, '/');
  d.exec(`VACUUM INTO '${normalizedDest}'`);

  const stats = statSync(backupFilePath);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`[Backup] Successfully created snapshot: ${backupFileName} (${sizeMb} MB)`);

  // Prune older backups
  const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000;
  const files = readdirSync(BACKUP_DIR);
  let prunedCount = 0;

  for (const file of files) {
    if (file.startsWith('virnobyte_backup_') && file.endsWith('.db')) {
      const filePath = join(BACKUP_DIR, file);
      const fileStat = statSync(filePath);
      if (fileStat.mtimeMs < cutoff) {
        unlinkSync(filePath);
        prunedCount++;
      }
    }
  }

  if (prunedCount > 0) {
    console.log(`[Backup] Pruned ${prunedCount} backup(s) older than ${RETENTION_DAYS} days.`);
  }

  console.log('[Backup] Completed successfully.');
} catch (err) {
  console.error('[Backup Error]', err);
  process.exit(1);
}

