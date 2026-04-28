import 'server-only';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('[stripe] STRIPE_SECRET_KEY not set — payments disabled');
}

// apiVersion locked to the latest pinned version supported by the installed
// stripe SDK (see node_modules/stripe/types/lib.d.ts → LatestApiVersion).
export const stripe: Stripe | null = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    })
  : null;

export function isStripeConfigured(): boolean {
  return stripe !== null;
}
