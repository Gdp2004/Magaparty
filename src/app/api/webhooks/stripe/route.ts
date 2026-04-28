// Stripe webhook receiver.
//
// IMPORTANT (Next 16): we read the raw body via `request.text()` because the
// signature check must run on the exact bytes Stripe sent — JSON.parse would
// destroy whitespace and break verification. Do NOT log the raw body.
//
// This route is excluded from src/proxy.ts (see matcher) so the security
// headers and any header rewrites cannot interfere with the signature.
//
// Runtime: default Node (do NOT set `export const runtime = 'edge'`).

import type Stripe from 'stripe';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { supabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabase-admin';
import { PRODUCT_IDS, type ProductId } from '@/lib/products';

export const dynamic = 'force-dynamic';

function isKnownProductId(value: unknown): value is ProductId {
  return typeof value === 'string' && (PRODUCT_IDS as string[]).includes(value);
}

async function recordCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  if (!isSupabaseAdminConfigured() || !supabaseAdmin) {
    console.warn('[stripe-webhook] supabaseAdmin not configured — skipping persistence');
    return;
  }

  const rawProductId = session.metadata?.productId;
  if (!isKnownProductId(rawProductId)) {
    console.error('[stripe-webhook] checkout.session.completed without valid productId metadata');
    return;
  }

  const paymentIntentId =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  const amountCents = session.amount_total ?? 0;
  if (amountCents <= 0) {
    console.error('[stripe-webhook] checkout.session.completed missing amount_total');
    return;
  }

  const currency = (session.currency ?? 'eur').toLowerCase();
  const customerEmail =
    session.customer_details?.email ?? session.customer_email ?? null;
  const customerName = session.customer_details?.name ?? null;

  const { error } = await supabaseAdmin.from('payments').upsert(
    [
      {
        stripe_session_id: session.id,
        stripe_payment_intent: paymentIntentId,
        product_type: rawProductId,
        amount_cents: amountCents,
        currency,
        customer_email: customerEmail,
        customer_name: customerName,
        status: 'succeeded',
        updated_at: new Date().toISOString(),
      },
    ],
    { onConflict: 'stripe_session_id' }
  );

  if (error) {
    console.error('[stripe-webhook] failed to persist payment', error.message);
  }
}

export async function POST(request: Request): Promise<Response> {
  if (!isStripeConfigured() || !stripe) {
    // Stripe not set up locally — return 200 so Stripe doesn't retry forever.
    console.warn('[stripe-webhook] received event but Stripe is not configured');
    return new Response(null, { status: 200 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[stripe-webhook] STRIPE_WEBHOOK_SECRET missing');
    return new Response('Webhook secret not configured', { status: 500 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  // Read raw body — DO NOT use request.json() (it parses and re-serializes,
  // which invalidates the HMAC signature).
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[stripe-webhook] signature verification failed:', message);
    return new Response('Invalid signature', { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await recordCheckoutCompleted(session);
        break;
      }
      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent;
        console.warn(
          '[stripe-webhook] payment_intent.payment_failed',
          intent.id,
          intent.last_payment_error?.code ?? 'unknown_error'
        );
        break;
      }
      default:
        // Unhandled event types are fine — Stripe sends many we don't care about.
        break;
    }
  } catch (err) {
    console.error('[stripe-webhook] handler error:', err);
    // Return 200 to avoid retry storms for non-recoverable handler bugs.
    return new Response(null, { status: 200 });
  }

  return new Response(null, { status: 200 });
}
