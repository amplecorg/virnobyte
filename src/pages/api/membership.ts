import type { APIRoute } from 'astro';
import { planById, requestMembership } from '@/lib/data';
import { getPaymentConfig } from '@/lib/commerce/payments';

/**
 * "Get the card" button on /membership. With online payment set up, buyers go to the card
 * checkout and pay; otherwise the old flow records a request and payment is taken at the counter.
 */
export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const form = await request.formData();
  const planId = Number(form.get('plan_id'));
  const plan = planById(planId);
  if (!plan || !plan.active) return redirect('/membership', 303);
  if (!locals.user) return redirect(`/account/register?plan=${plan.id}`, 303);
  const viaCheckout = form.get('request') !== '1' && getPaymentConfig().onlineAvailable;
  if (viaCheckout) return redirect(`/membership/checkout/${plan.id}`, 303);
  requestMembership(locals.user.id, plan.id);
  return redirect('/account?requested=1', 303);
};
