import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.footerWave}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path fill="var(--bg-secondary)" d="M0,30 C480,80 960,0 1440,50 L1440,0 L0,0 Z"></path>
        </svg>
      </div>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <h3>Nello <span style={{ color: 'var(--mediterranean-azure)' }}>Ocean</span> Beach</h3>
            <p>Dove il mare incontra l'anima. Il beach club premium della costa del Cilento, per chi cerca relax, gusto e divertimento senza compromessi.</p>
            <div className={styles.footerSocial}>
              <a href="#" aria-label="Instagram" title="Instagram">📸</a>
              <a href="#" aria-label="Facebook" title="Facebook">📘</a>
              <a href="#" aria-label="TikTok" title="TikTok">🎵</a>
              <a href="https://wa.me/39XXXXXXXXXX" aria-label="WhatsApp" title="WhatsApp">💬</a>
            </div>
          </div>
          
          <div className={styles.footerCol}>
            <h4>Esplora</h4>
            <ul>
              <li><Link href="#beach">Spiaggia</Link></li>
              <li><Link href="#restaurant">Ristorante</Link></li>
              <li><Link href="#events">Eventi</Link></li>
              <li><Link href="#gallery">Gallery</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerCol}>
            <h4>Servizi</h4>
            <ul>
              <li><Link href="#booking">Prenota Lettino</Link></li>
              <li><Link href="#booking">Prenota Tavolo</Link></li>
              <li><Link href="#events">Eventi Privati</Link></li>
              <li><Link href="#info">Come Arrivare</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerCol}>
            <h4>Resta Aggiornato</h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(245,239,230,0.5)', marginBottom: '1rem' }}>
              Iscriviti per ricevere offerte esclusive e aggiornamenti sugli eventi.
            </p>
            <div className={styles.footerNewsletter}>
              <input type="email" placeholder="La tua email" id="newsletter-email" aria-label="Newsletter email" />
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Iscriviti
              </button>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <span>© 2026 Nello Ocean Beach. Tutti i diritti riservati.</span>
          <div className={styles.footerBottomLinks}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Cookie Policy</Link>
            <Link href="#">Termini e Condizioni</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
