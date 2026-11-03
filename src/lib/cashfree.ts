import { getSettings } from './settings';

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

/**
 * Returns Cashfree configuration merged from admin settings and environment variables.
 */
export function getCashfreeConfig() {
  const settings = getSettings();
  const p = settings.payments || ({} as any);

  const appId = (p.cashfreeAppId || process.env.CASHFREE_APP_ID || '').trim();
  const secretKey = (p.cashfreeSecretKey || process.env.CASHFREE_SECRET_KEY || '').trim();
  const env = (p.cashfreeEnv || process.env.CASHFREE_ENV || 'TEST').toUpperCase();
  const gateway = p.gateway || 'cashfree';
  const enabled = p.enabled !== false;
  const enableCod = p.enableCod !== false;
  const enableOnline = p.enableOnline !== false;
  const deliveryFee = Number(p.deliveryFee) || 0;
  const minFreeDelivery = Number(p.minFreeDelivery) || 500;

  const isConfigured = Boolean(appId && secretKey);
  const baseUrl = env === 'PROD' ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';

  return {
    enabled,
    gateway,
    env,
    appId,
    secretKey,
    isConfigured,
    baseUrl,
    enableCod,
    enableOnline,
    deliveryFee,
    minFreeDelivery,
  };
}

/**
 * Creates an order session on Cashfree Payment Gateway.
 * If credentials are not yet entered by the admin, returns a simulated session for seamless testing.
 */
export async function createCashfreeOrder(params: CreateOrderParams): Promise<CashfreeOrderResult> {
  const cfg = getCashfreeConfig();

  // If not configured or explicitly set to test/offline mode
  if (!cfg.isConfigured || cfg.gateway === 'test' || cfg.gateway === 'offline') {
    return {
      success: true,
      orderId: params.orderId,
      cfOrderId: `SIM_${Date.now()}`,
      paymentSessionId: `sim_session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      isTestMode: true,
    };
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
      console.error('Cashfree Create Order Error:', data);
      return {
        success: false,
        orderId: params.orderId,
        error: data.message || 'Failed to initialize payment with Cashfree.',
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
  const cfg = getCashfreeConfig();

  // If in simulated/test mode
  if (!cfg.isConfigured || cfg.gateway === 'test') {
    return { isPaid: true, status: 'PAID' };
  }

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
