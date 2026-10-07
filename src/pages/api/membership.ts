import type { APIRoute } from 'astro';
import { planById, requestMembership } from '@/lib/data';

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const form = await request.formData();
  const planId = Number(form.get('plan_id'));
  const plan = planById(planId);
  if (!plan || !plan.active) return redirect('/membership', 303);
  if (!locals.user) return redirect(`/account/register?plan=${plan.id}`, 303);
  requestMembership(locals.user.id, plan.id);
  return redirect('/account?requested=1', 303);
};
