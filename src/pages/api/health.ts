import type { APIRoute } from 'astro';
import { getDbStatus, get } from '../../lib/db';

const proc = typeof globalThis.process !== 'undefined' ? globalThis.process : undefined;
const env = proc?.env || {};

export const GET: APIRoute = async () => {
  let dbOk = false;
  let testQueryError: any = null;

  try {
    const res = get('SELECT 1 as num');
    dbOk = res?.num === 1;
  } catch (err: any) {
    testQueryError = {
      name: err?.name,
      message: err?.message,
    };
  }

  const dbStatus = typeof getDbStatus === 'function' ? getDbStatus() : { ok: dbOk };

  return new Response(
    JSON.stringify(
      {
        status: dbOk ? 'healthy' : 'degraded',
        nodeVersion: proc?.version || 'unknown',
        platform: proc?.platform || 'unknown',
        cwd: proc?.cwd ? proc.cwd() : '.',
        dataDir: (dbStatus as any).dataDir || env.DATA_DIR || 'default',
        port: env.PORT || '3000',
        host: env.HOST || '0.0.0.0',
        dbOk,
        dbStatus,
        testQueryError,
      },
      null,
      2
    ),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache',
      },
    }
  );
};
