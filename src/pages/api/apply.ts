import type { APIRoute } from 'astro';
import { job, saveEnquiry } from '@/lib/data';
import { rateLimit } from '@/lib/auth';

const PHONE = /^[+]?[0-9 ()-]{10,16}$/;
const clip = (v: FormDataEntryValue | null, n: number) => String(v ?? '').trim().slice(0, n);

export const POST: APIRoute = async ({ request, redirect, clientAddress }) => {
  const form = await request.formData();
  const slug = clip(form.get('job'), 120);
  const role = job(slug);
  const back = role ? `/careers/${role.slug}` : '/careers';
  if (clip(form.get('website'), 200)) return redirect(`${back}?sent=1#apply`, 303);
  if (!rateLimit(`apply:${clientAddress}`, 5, 30 * 60_000)) return redirect(`${back}?error=rate#apply`, 303);

  const name = clip(form.get('name'), 120);
  const phone = clip(form.get('phone'), 30);
  if (!name || !PHONE.test(phone)) return redirect(`${back}?error=fields#apply`, 303);

  const fits = form.getAll('fits').map((v) => `✓ ${String(v).slice(0, 200)}`).join('\n');
  saveEnquiry({
    kind: 'job',
    name,
    phone,
    email: clip(form.get('email'), 160),
    topic: role ? role.title : 'General application',
    area: clip(form.get('area'), 120),
    preferred: clip(form.get('notice'), 120),
    message: [
      `Experience: ${clip(form.get('experience'), 200)}`,
      fits && `Checklist:\n${fits}`,
      clip(form.get('message'), 3000),
    ].filter(Boolean).join('\n\n'),
  });
  return redirect(`${back}?sent=1#apply`, 303);
};
