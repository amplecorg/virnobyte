import { getSettings } from '../settings';

/**
 * Single source of truth for how the store takes money.
 *
 * Credentials are read from /admin/settings first, then from environment
 * variables, so keys can live outside the database on the server.
 * There is no simulated "paid" mode: without gateway keys, online payment
 * is simply not offered and the store runs Cash on Delivery only.
 */
export type Gateway = 'razorpay' | 'cashfree' | 'offline';

export interface PaymentConfig {
  enabled: boolean;
  gateway: Gateway;
  /** True when the selected gateway has working credentials and online payment is switched on. */
  onlineAvailable: boolean;
  codAvailable: boolean;
  deliveryFee: number;
  minFreeDelivery: number;
  razorpay: { keyId: string; keySecret: string; webhookSecret: string; configured: boolean; testMode: boolean };
  cashfree: { appId: string; secretKey: string; env: 'TEST' | 'PROD'; configured: boolean };
}

const env = (name: string) => (process.env[name] || '').trim();

export function getPaymentConfig(): PaymentConfig {
  const p = (getSettings().payments || {}) as Record<string, any>;
  const pick = (setting: unknown, envName: string) => String(setting || '').trim() || env(envName);

  const razorpay = {
    keyId: pick(p.razorpayKeyId, 'RAZORPAY_KEY_ID'),
    keySecret: pick(p.razorpayKeySecret, 'RAZORPAY_KEY_SECRET'),
    webhookSecret: pick(p.razorpayWebhookSecret, 'RAZORPAY_WEBHOOK_SECRET'),
    configured: false,
    testMode: false,
  };
  razorpay.configured = Boolean(razorpay.keyId && razorpay.keySecret);
  razorpay.testMode = razorpay.keyId.startsWith('rzp_test_');

  const cashfree = {
    appId: pick(p.cashfreeAppId, 'CASHFREE_APP_ID'),
    secretKey: pick(p.cashfreeSecretKey, 'CASHFREE_SECRET_KEY'),
    env: (String(p.cashfreeEnv || env('CASHFREE_ENV') || 'TEST').toUpperCase() === 'PROD' ? 'PROD' : 'TEST') as 'TEST' | 'PROD',
    configured: false,
  };
  cashfree.configured = Boolean(cashfree.appId && cashfree.secretKey);

  // Legacy values ('test' = simulated payments) fall back to COD-only.
  const gateway: Gateway = p.gateway === 'razorpay' || p.gateway === 'cashfree' ? p.gateway : 'offline';
  const enabled = p.enabled !== false;
  const gatewayReady = gateway === 'razorpay' ? razorpay.configured : gateway === 'cashfree' ? cashfree.configured : false;

  return {
    enabled,
    gateway,
    onlineAvailable: enabled && p.enableOnline !== false && gatewayReady,
    codAvailable: enabled && p.enableCod !== false,
    deliveryFee: Math.max(0, Math.round(Number(p.deliveryFee) || 0)),
    minFreeDelivery: Math.max(0, Math.round(Number(p.minFreeDelivery) || 0)),
    razorpay,
    cashfree,
  };
}
