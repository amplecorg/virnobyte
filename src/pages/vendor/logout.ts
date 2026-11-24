import type { APIRoute } from 'astro';
import { signOutVendor } from '@/lib/inventory/vendor';

export const POST: APIRoute = (ctx) => {
  signOutVendor(ctx.cookies);
  return ctx.redirect('/vendor', 303);
};
