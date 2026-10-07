import type { APIRoute } from 'astro';
import { saveEnquiry } from '@/lib/data';
import { rateLimit } from '@/lib/auth';

const PHONE = /^[+]?[0-9 ()-]{10,16}$/;
const clip = (v: FormDataEntryValue | null, n: number) => String(v ?? '').trim().slice(0, n);

export const POST: APIRoute = async ({ request, redirect, clientAddress }) => {
  const form = await request.formData();
  const back = clip(form.get('source'), 200);
  const safeBack = back.startsWith('/') && !back.startsWith('//') ? back : '/contact';

  // Honeypot: bots fill hidden fields; pretend success.
  if (clip(form.get('website'), 200)) return redirect(`${safeBack}?sent=1#book`, 303);
  if (!rateLimit(`enq:${clientAddress}`, 8, 10 * 60_000)) return redirect(`${safeBack}?error=rate#book`, 303);

  const name = clip(form.get('name'), 120);
  const phone = clip(form.get('phone'), 30);
  if (!name || !PHONE.test(phone)) return redirect(`${safeBack}?error=fields#book`, 303);

  saveEnquiry({
    kind: 'service',
    name,
    phone,
    email: clip(form.get('email'), 160),
    topic: clip(form.get('topic'), 120),
    message: clip(form.get('message'), 3000),
    area: clip(form.get('area'), 120),
    preferred: clip(form.get('preferred'), 120),
  });
  return redirect(`${safeBack}?sent=1#book`, 303);
};
