import type { Metadata } from 'next';
import Link from 'next/link';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { PRODUCTS, PRODUCT_IDS, type ProductId } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Pagamento Confermato — Nello Ocean Beach',
  robots: { index: false, follow: false },
};

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string | string[] }>;
}

interface SessionDetails {
  productName: string | null;
  amountFormatted: string | null;
  email: string | null;
}

function isKnownProductId(value: unknown): value is ProductId {
  return typeof value === 'string' && (PRODUCT_IDS as string[]).includes(value);
}

async function loadSessionDetails(sessionId: string | undefined): Promise<SessionDetails | null> {
  if (!sessionId) return null;
  if (!isStripeConfigured() || !stripe) return null;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const rawProductId = session.metadata?.productId;
    const productName = isKnownProductId(rawProductId)
      ? PRODUCTS[rawProductId].name
      : null;

    const amountTotal = session.amount_total ?? 0;
    const currency = (session.currency ?? 'eur').toUpperCase();
    const amountFormatted =
      amountTotal > 0
        ? new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency,
          }).format(amountTotal / 100)
        : null;

    const email = session.customer_details?.email ?? session.customer_email ?? null;

    return { productName, amountFormatted, email };
  } catch (e) {
    console.error('[payment/success] failed to retrieve session', e);
    return null;
  }
}

export default async function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
  const sp = await searchParams;
  const rawSessionId = sp.session_id;
  const sessionId = Array.isArray(rawSessionId) ? rawSessionId[0] : rawSessionId;
  const details = await loadSessionDetails(sessionId);

  return (
    <main className="section">
      <div
        className="container"
        style={{
          maxWidth: 640,
          textAlign: 'center',
          padding: 'clamp(2rem, 6vw, 4rem) 1.5rem',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            fontSize: '4rem',
            color: '#22c55e',
            lineHeight: 1,
            marginBottom: '1.5rem',
          }}
        >
          ✓
        </div>
        <h1>Pagamento Confermato!</h1>
        {details?.productName && details?.amountFormatted ? (
          <p style={{ marginTop: '1rem', fontSize: '1.05rem' }}>
            Hai acquistato <strong>{details.productName}</strong> per{' '}
            <strong>{details.amountFormatted}</strong>.
          </p>
        ) : (
          <p style={{ marginTop: '1rem' }}>
            Il tuo pagamento è andato a buon fine.
          </p>
        )}
        {details?.email && (
          <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
            Una email di conferma è stata inviata a <strong>{details.email}</strong>.
          </p>
        )}
        <div style={{ marginTop: '2.5rem' }}>
          <Link href="/" className="btn btn-primary">
            Torna alla home
          </Link>
        </div>
      </div>
    </main>
  );
}
