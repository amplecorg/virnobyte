import type { APIRoute } from 'astro';
import { run, get } from '@/lib/db';
import { verifyCashfreeOrder } from '@/lib/cashfree';

export const GET: APIRoute = async ({ url, redirect }) => {
  const orderId = url.searchParams.get('order_id');

  if (!orderId) {
    return redirect('/products', 302);
  }

  try {
    const order = get<{ id: number; payment_status: string }>('SELECT id, payment_status FROM orders WHERE order_id = ?', orderId);

    if (order) {
      const verifyResult = await verifyCashfreeOrder(orderId);

      if (verifyResult.isPaid) {
        run("UPDATE orders SET payment_status = 'PAID', updated_at = CURRENT_TIMESTAMP WHERE order_id = ?", orderId);
      }
    }

    return redirect(`/order-success?order_id=${encodeURIComponent(orderId)}`, 303);
  } catch (err) {
    console.error('Verify order error:', err);
    return redirect(`/order-success?order_id=${encodeURIComponent(orderId)}`, 303);
  }
};
