'use client';

import React, { useState, useTransition } from 'react';
import styles from './Payment.module.css';
import { createCheckoutSession } from '@/app/actions/payment';
import { PRODUCT_LIST, type ProductId } from '@/lib/products';

const priceFormatter = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
});

function formatPrice(amountCents: number): string {
  return priceFormatter.format(amountCents / 100);
}

export function Payment() {
  const [pendingId, setPendingId] = useState<ProductId | null>(null);
  const [errors, setErrors] = useState<Partial<Record<ProductId, string>>>({});
  const [isPending, startTransition] = useTransition();

  const handleBuy = (productId: ProductId) => {
    setErrors((prev) => ({ ...prev, [productId]: undefined }));
    setPendingId(productId);

    startTransition(async () => {
      try {
        const result = await createCheckoutSession(productId);
        if (!result.success) {
          setErrors((prev) => ({ ...prev, [productId]: result.error }));
          setPendingId(null);
          return;
        }
        // Hand off to Stripe Checkout. We do not navigate via Next router because
        // the URL is on a different origin (checkout.stripe.com).
        window.location.href = result.url;
      } catch {
        setErrors((prev) => ({
          ...prev,
          [productId]: 'Errore imprevisto. Riprova.',
        }));
        setPendingId(null);
      }
    });
  };

  return (
    <section className={`section ${styles.paymentSection}`} id="pagamenti">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Acquista Online</span>
          <h2>Pacchetti Online</h2>
          <p className="section-subtitle">
            Pagamento sicuro tramite Stripe. Conferma immediata via email.
          </p>
        </div>

        <div className={styles.grid}>
          {PRODUCT_LIST.map((product) => {
            const isLoading = pendingId === product.id && isPending;
            const errorMessage = errors[product.id];
            return (
              <article
                key={product.id}
                className={`${styles.card} reveal`}
                aria-labelledby={`product-${product.id}-name`}
              >
                <span className={styles.emoji} aria-hidden="true">
                  {product.emoji}
                </span>
                <h3 id={`product-${product.id}-name`} className={styles.name}>
                  {product.name}
                </h3>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.price}>
                  {formatPrice(product.amountCents)}
                </div>
                <div className={styles.cardBadges}>
                  <span className={styles.cardBadge}>SSL</span>
                  <span className={styles.cardBadge}>Stripe</span>
                </div>
                {errorMessage && (
                  <div className={styles.cardError} role="alert">
                    {errorMessage}
                  </div>
                )}
                <button
                  type="button"
                  className={`btn btn-primary ${styles.buyButton}`}
                  onClick={() => handleBuy(product.id)}
                  disabled={isLoading || (isPending && pendingId !== null)}
                  aria-busy={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className={styles.spinner}
                        aria-hidden="true"
                      />
                      Reindirizzamento...
                    </>
                  ) : (
                    <>Acquista Ora</>
                  )}
                </button>
              </article>
            );
          })}
        </div>

        <div className={styles.trustRow} aria-label="Garanzie di sicurezza">
          <span>🔒 SSL</span>
          <span>💳 Stripe</span>
          <span>🇪🇺 GDPR Compliant</span>
          <span>✓ PCI DSS Level 1</span>
        </div>
      </div>
    </section>
  );
}
