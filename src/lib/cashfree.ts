import { getPaymentConfig } from './commerce/payments';

export interface CreateOrderParams {
  orderId: string;
  amount: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  returnUrl: string;
  note?: string;
}

export interface CashfreeOrderResult {
  success: boolean;
  orderId: string;
  cfOrderId?: string | number;
  paymentSessionId?: string;
  isTestMode?: boolean;
  error?: string;
}

/** Cashfree credentials come from the shared payment config (admin settings, then env). */
function cashfreeApi() {
  const { cashfree } = getPaymentConfig();
  return {
    ...cashfree,
    baseUrl: cashfree.env === 'PROD' ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg',
  };
}

/**
 * Creates an order session on Cashfree Payment Gateway.
 * Callers must check `getPaymentConfig().onlineAvailable` first; there is no simulated mode.
 */
export async function createCashfreeOrder(params: CreateOrderParams): Promise<CashfreeOrderResult> {
  const cfg = cashfreeApi();

  if (!cfg.configured) {
    return { success: false, orderId: params.orderId, error: 'Online payment is not configured.' };
  }

  // Format valid 10-digit Indian phone for Cashfree
  const rawDigits = params.customerPhone.replace(/\D/g, '');
  const cleanPhone = rawDigits.length >= 10 ? rawDigits.slice(-10) : '9999999999';
  const cleanEmail = params.customerEmail && params.customerEmail.includes('@')
    ? params.customerEmail
    : `customer_${params.orderId.toLowerCase().replace(/[^a-z0-9]/g, '')}@virnobyte.com`;

  const payload = {
    order_id: params.orderId,
    order_amount: Math.round(params.amount),
    order_currency: 'INR',
    customer_details: {
      customer_id: `cust_${cleanPhone}`,
      customer_name: params.customerName || 'Customer',
      customer_email: cleanEmail,
      customer_phone: cleanPhone,
    },
    order_meta: {
      return_url: params.returnUrl,
    },
    order_note: params.note || 'Virnobyte Order',
  };

  try {
    const res = await fetch(`${cfg.baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'x-client-id': cfg.appId,
        'x-client-secret': cfg.secretKey,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = (await res.json()) as any;

    if (!res.ok || !data.payment_session_id) {
      console.error('[Cashfree] Create Order Error:', res.status, data);
      const isAuthErr = data.type === 'authentication_error' || (typeof data.message === 'string' && data.message.toLowerCase().includes('authentication'));
      const errorMsg = isAuthErr
        ? 'Payment gateway error: Cashfree authentication failed. Please verify your Cashfree App ID, Secret Key & Environment (Test/Prod) in Admin Settings, or choose Cash on Delivery.'
        : (data.message || 'Failed to initialize payment with Cashfree.');
      return {
        success: false,
        orderId: params.orderId,
        error: errorMsg,
      };
    }

    return {
      success: true,
      orderId: data.order_id || params.orderId,
      cfOrderId: data.cf_order_id,
      paymentSessionId: data.payment_session_id,
      isTestMode: cfg.env === 'TEST',
    };
  } catch (err: any) {
    console.error('Cashfree Request Exception:', err);
    return {
      success: false,
      orderId: params.orderId,
      error: err.message || 'Network error connecting to Cashfree Payment Gateway.',
    };
  }
}

/**
 * Verifies an order's payment status with Cashfree.
 */
export async function verifyCashfreeOrder(orderId: string): Promise<{ isPaid: boolean; status: string; data?: any }> {
  const cfg = cashfreeApi();

  if (!cfg.configured) return { isPaid: false, status: 'UNCONFIGURED' };

  try {
    const res = await fetch(`${cfg.baseUrl}/orders/${encodeURIComponent(orderId)}`, {
      method: 'GET',
      headers: {
        'x-client-id': cfg.appId,
        'x-client-secret': cfg.secretKey,
        'x-api-version': '2023-08-01',
      },
    });

    if (!res.ok) {
      return { isPaid: false, status: 'UNKNOWN' };
    }

    const data = (await res.json()) as any;
    const isPaid = data.order_status === 'PAID';

    return {
      isPaid,
      status: data.order_status || 'PENDING',
      data,
    };
  } catch (err) {
    console.error('Error verifying Cashfree order:', err);
    return { isPaid: false, status: 'ERROR' };
  }
}

