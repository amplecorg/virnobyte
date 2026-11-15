/**
 * Browser side of the payment step, shared by checkout and the "Complete payment" button.
 * Takes the `payment` intent returned by /api/checkout/create or /retry and opens the gateway.
 * The gateway script is loaded only when a shopper actually pays online.
 */
interface StartedPayment {
  orderId: string;
  redirectUrl: string;
  payment: Record<string, any>;
}

const loaded = new Map<string, Promise<void>>();
function loadScript(src: string): Promise<void> {
  if (!loaded.has(src)) {
    loaded.set(
      src,
      new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => {
          loaded.delete(src);
          reject(new Error('Could not load the payment window. Check your connection and try again.'));
        };
        document.head.appendChild(s);
      }),
    );
  }
  return loaded.get(src)!;
}

export async function openPayment(started: StartedPayment): Promise<void> {
  const p = started.payment;
  const w = window as any;

  if (p.gateway === 'razorpay') {
    await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    const rzp = new w.Razorpay({
      key: p.key,
      order_id: p.razorpayOrderId,
      amount: p.amount,
      currency: p.currency,
      name: p.name,
      description: p.description,
      prefill: p.prefill,
      theme: { color: '#2874f0' },
      handler: async (r: { razorpay_payment_id: string; razorpay_signature: string }) => {
        // The server verifies the signature; this page only reports what Razorpay returned.
        try {
          await fetch('/api/checkout/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: started.orderId,
              razorpay_payment_id: r.razorpay_payment_id,
              razorpay_signature: r.razorpay_signature,
            }),
          });
        } catch {
          /* The order page re-checks with the gateway, and the webhook confirms independently. */
        }
        window.location.href = started.redirectUrl;
      },
      modal: {
        // Closed without paying: the order waits on its own page with a "Complete payment" button.
        ondismiss: () => {
          window.location.href = started.redirectUrl;
        },
      },
    });
    rzp.open();
    return;
  }

  if (p.gateway === 'cashfree') {
    await loadScript('https://sdk.cashfree.com/js/v3/cashfree.js');
    w.Cashfree({ mode: p.mode }).checkout({ paymentSessionId: p.paymentSessionId, redirectTarget: '_self' });
    return;
  }

  window.location.href = started.redirectUrl;
}
