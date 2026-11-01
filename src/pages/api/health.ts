import type { APIRoute } from 'astro';
import process from 'node:process';
import { getDbStatus, get } from '../../lib/db';

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
        nodeVersion: process.version,
        platform: process.platform,
        cwd: process.cwd(),
        dataDir: (dbStatus as any).dataDir || process.env.DATA_DIR || 'default',
        port: process.env.PORT || '3000',
        host: process.env.HOST || '0.0.0.0',
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
