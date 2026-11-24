import { getSettings } from './settings';

/**
 * Optional free SMS for OTP codes through textbee.dev: an open-source app on any Android phone
 * sends the SMS from that phone's own SIM (no DLT registration, no per-message fee beyond the
 * SIM plan). Free plan is roughly 50 SMS/day — email OTP always goes out as well.
 * Set the API key and device ID in Admin → Settings → Email, Google Sign-in & OTP
 * (or TEXTBEE_API_KEY / TEXTBEE_DEVICE_ID). Without them, OTPs go by email only.
 */
function smsConfig() {
  let s: Record<string, any> = {};
  try {
    s = (getSettings() as any).signin || {};
  } catch {}
  const apiKey = String(s.textbeeApiKey || process.env.TEXTBEE_API_KEY || '').trim();
  const deviceId = String(s.textbeeDeviceId || process.env.TEXTBEE_DEVICE_ID || '').trim();
  return { apiKey, deviceId, enabled: Boolean(apiKey && deviceId) };
}

export const isSmsConfigured = () => smsConfig().enabled;

/** Sends a one-time code to a 10-digit Indian mobile. Returns false when SMS is off or the send failed. */
export async function sendOtpSms(phone10: string, code: string): Promise<boolean> {
  const cfg = smsConfig();
  const digits = String(phone10).replace(/\D/g, '').slice(-10);
  if (!cfg.enabled || digits.length !== 10) return false;
  const biz = getSettings().business.name;
  try {
    const res = await fetch('https://api.textbee.dev/api/v1/gateway/send-sms', {
      method: 'POST',
      headers: { 'x-api-key': cfg.apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deviceId: cfg.deviceId,
        recipients: [`+91${digits}`],
        message: `${code} is your ${biz} order confirmation code. Valid 10 minutes. Do not share it.`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      // 429 = the free plan's daily/monthly limit was reached; the email code still works.
      console.warn('[SMS] textbee refused the OTP:', res.status, (await res.text().catch(() => '')).slice(0, 200));
      return false;
    }
    return true;
  } catch (e: any) {
    console.warn('[SMS] textbee request failed:', e?.message);
    return false;
  }
}
