import type { APIRoute } from 'astro';
import { run, get } from '@/lib/db';
import { product, type Product } from '@/lib/data';
import { createCashfreeOrder, getCashfreeConfig } from '@/lib/cashfree';

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const data = await request.json();
    const {
      slug,
      quantity = 1,
      customerName,
      customerPhone,
      customerEmail = '',
      addressLine1,
      addressLine2 = '',
      pincode,
      city = 'Pune',
      state = 'Maharashtra',
      addressType = 'Home',
      paymentMethod = 'cashfree',
      notes = '',
    } = data;

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Product slug is required.' }), { status: 400 });
    }
    if (!customerName || !customerPhone || !addressLine1 || !pincode) {
      return new Response(JSON.stringify({ error: 'Please fill in all required delivery address fields.' }), { status: 400 });
    }

    // Fetch product details
    const p = product(slug) as Product | undefined;
    if (!p) {
      return new Response(JSON.stringify({ error: 'Product not found or currently unavailable.' }), { status: 404 });
    }

    const qty = Math.max(1, Number(quantity) || 1);
    const unitPrice = p.price || 0;
    const mrp = p.mrp || unitPrice;
    const discount = mrp > unitPrice ? (mrp - unitPrice) * qty : 0;
    const itemsTotal = unitPrice * qty;

    const cfg = getCashfreeConfig();
    const deliveryFee = itemsTotal >= cfg.minFreeDelivery ? 0 : cfg.deliveryFee;
    const totalAmount = itemsTotal + deliveryFee;

    // Generate unique human-readable Order ID
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderId = `VB-ORD-${Date.now().toString().slice(-6)}-${randomSuffix}`;

    const isCod = paymentMethod === 'cod';
    const initialPaymentStatus = isCod ? 'COD_PENDING' : 'PENDING';

    // Insert order into SQLite database
    run(
      `INSERT INTO orders (
        order_id, product_id, product_name, product_slug, quantity,
        unit_price, mrp, discount, delivery_fee, total_amount,
        customer_name, customer_phone, customer_email,
        address_line1, address_line2, pincode, city, state, address_type,
        payment_method, payment_status, order_status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      orderId,
      p.id,
      p.name,
      p.slug,
      qty,
      unitPrice,
      mrp,
      discount,
      deliveryFee,
      totalAmount,
      customerName.trim(),
      customerPhone.trim(),
      customerEmail.trim(),
      addressLine1.trim(),
      addressLine2.trim(),
      pincode.trim(),
      city.trim(),
      state.trim(),
      addressType,
      paymentMethod,
      initialPaymentStatus,
      'CONFIRMED',
      notes.trim()
    );

    // If Cash on Delivery, complete order directly
    if (isCod) {
      return new Response(
        JSON.stringify({
          ok: true,
          orderId,
          paymentMethod: 'cod',
          redirectUrl: `/order-success?order_id=${orderId}`,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Cashfree Online Payment Gateway
    const origin = url.origin;
    const returnUrl = `${origin}/api/checkout/verify?order_id={order_id}`;

    const cfResult = await createCashfreeOrder({
      orderId,
      amount: totalAmount,
      customerName,
      customerPhone,
      customerEmail,
      returnUrl,
      note: `Virnobyte Order: ${p.name.slice(0, 50)}`,
    });

    if (!cfResult.success) {
      return new Response(JSON.stringify({ error: cfResult.error || 'Failed to initialize Cashfree session.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Save Cashfree order and session IDs to database
    run(
      `UPDATE orders SET cashfree_order_id = ?, cashfree_session_id = ? WHERE order_id = ?`,
      String(cfResult.cfOrderId || ''),
      String(cfResult.paymentSessionId || ''),
      orderId
    );

    return new Response(
      JSON.stringify({
        ok: true,
        orderId,
        paymentSessionId: cfResult.paymentSessionId,
        isTestMode: cfResult.isTestMode,
        env: cfg.env,
        paymentMethod: 'cashfree',
        redirectUrl: `/order-success?order_id=${orderId}`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Checkout error:', err);
    return new Response(JSON.stringify({ error: err.message || 'An unexpected error occurred during checkout.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
