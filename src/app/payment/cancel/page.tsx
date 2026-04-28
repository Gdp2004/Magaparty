import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pagamento Annullato — Nello Ocean Beach',
  robots: { index: false, follow: false },
};

export default function PaymentCancelPage() {
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
            color: '#eab308',
            lineHeight: 1,
            marginBottom: '1.5rem',
          }}
        >
          ⚠
        </div>
        <h1>Pagamento Annullato</h1>
        <p style={{ marginTop: '1rem' }}>
          Nessun importo è stato addebitato. Puoi riprovare quando vuoi.
        </p>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '2.5rem',
          }}
        >
          <Link href="/#pagamenti" className="btn btn-primary">
            Torna ai pacchetti
          </Link>
          <Link href="/" className="btn btn-secondary">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
