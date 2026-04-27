import './Footer.css';

export function template() {
  return `
  <footer class="footer" id="footer">
    <div class="footer-wave"><svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path fill="var(--bg-secondary)" d="M0,30 C480,80 960,0 1440,50 L1440,0 L0,0 Z"></path></svg></div>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>Nello <span style="color: var(--mediterranean-azure);">Ocean</span> Beach</h3>
          <p>Dove il mare incontra l'anima. Il beach club premium della costa del Cilento, per chi cerca relax, gusto e divertimento senza compromessi.</p>
          <div class="footer-social">
            <a href="#" aria-label="Instagram" title="Instagram">📷</a>
            <a href="#" aria-label="Facebook" title="Facebook">📘</a>
            <a href="#" aria-label="TikTok" title="TikTok">🎵</a>
            <a href="https://wa.me/39XXXXXXXXXX" aria-label="WhatsApp" title="WhatsApp">💬</a>
          </div>
        </div>
        <div class="footer-col"><h4>Esplora</h4><ul><li><a href="#beach">Spiaggia</a></li><li><a href="#restaurant">Ristorante</a></li><li><a href="#events">Eventi</a></li><li><a href="#gallery">Gallery</a></li></ul></div>
        <div class="footer-col"><h4>Servizi</h4><ul><li><a href="#booking">Prenota Lettino</a></li><li><a href="#booking">Prenota Tavolo</a></li><li><a href="#events">Eventi Privati</a></li><li><a href="#info">Come Arrivare</a></li></ul></div>
        <div class="footer-col"><h4>Resta Aggiornato</h4><p style="font-size:0.85rem;color:rgba(245,239,230,0.5);margin-bottom:1rem;">Iscriviti per ricevere offerte esclusive e aggiornamenti sugli eventi.</p><div class="footer-newsletter"><input type="email" placeholder="La tua email" id="newsletter-email" /><button class="btn btn-primary" style="width:100%;justify-content:center;" id="newsletter-submit">Iscriviti</button></div></div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Nello Ocean Beach. Tutti i diritti riservati.</span>
        <div class="footer-bottom-links"><a href="#">Privacy Policy</a><a href="#">Cookie Policy</a><a href="#">Termini e Condizioni</a></div>
      </div>
    </div>
  </footer>`;
}

export function init() {
  // Newsletter placeholder — can hook into Supabase later
}
