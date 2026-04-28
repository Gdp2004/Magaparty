'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { PRODUCTS, PRODUCT_IDS, type ProductId } from '@/lib/products';

// Rate limiting state (in-memory, per worker). Keyed by client IP.
// Mirrors the approach used in src/app/actions/booking.ts.
const rateLimiter = new Map<string, number[]>();
const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS = 5;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const userRequests = rateLimiter.get(key) || [];
  const validRequests = userRequests.filter((t) => now - t < WINDOW_MS);

  if (validRequests.length >= MAX_REQUESTS) {
    return false;
  }

  validRequests.push(now);
  rateLimiter.set(key, validRequests);
  return true;
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  const real = h.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}

const productIdSchema = z.enum(PRODUCT_IDS as [ProductId, ...ProductId[]]);

export type CreateCheckoutResult =
  | { success: true; url: string }
  | { success: false; error: string };

export async function createCheckoutSession(
  productId: ProductId
): Promise<CreateCheckoutResult> {
  // 1. Validate product id
  const parsed = productIdSchema.safeParse(productId);
  if (!parsed.success) {
    return { success: false, error: 'Prodotto non valido' };
  }
  const product = PRODUCTS[parsed.data];

  // 2. Rate limit by IP
  const ip = await getClientIp();
  if (!checkRateLimit(ip)) {
    return {
      success: false,
      error: 'Troppe richieste. Riprova tra qualche minuto.',
    };
  }

  // 3. Stripe configured?
  if (!isStripeConfigured() || !stripe) {
    return { success: false, error: 'Pagamenti non disponibili' };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency,
            unit_amount: product.amountCents,
            product_data: {
              name: product.name,
              description: product.description,
            },
          },
        },
      ],
      success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/payment/cancel`,
      metadata: { productId: product.id },
      payment_intent_data: {
        metadata: { productId: product.id },
      },
      automatic_tax: { enabled: false },
      customer_creation: 'if_required',
    });

    if (!session.url) {
      return { success: false, error: 'Sessione di pagamento non disponibile' };
    }

    return { success: true, url: session.url };
  } catch (e) {
    console.error('[payment] Failed to create checkout session', e);
    return {
      success: false,
      error: 'Errore durante la creazione del pagamento. Riprova.',
    };
  }
}
