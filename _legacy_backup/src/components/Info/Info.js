import './Info.css';

export function template() {
  return `
  <section class="section info-section" id="info">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">Dove Trovarci</span>
        <h2>Info &amp; Posizione</h2>
        <p class="section-subtitle">Raggiungerci è semplice. Ecco tutto quello che ti serve sapere.</p>
      </div>
      <div class="info-grid">
        <div class="info-map reveal-left">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12000!2d14.98!3d40.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDM2JzAwLjAiTiAxNMKwNTgnNDguMCJF!5e0!3m2!1sit!2sit!4v1!" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mappa Nello Ocean Beach"></iframe>
        </div>
        <div class="info-details reveal-right">
          <div class="info-card"><div class="info-card-icon">📍</div><div><h4>Indirizzo</h4><p>Lungomare di Battipaglia, 84091<br>Battipaglia (SA), Italia</p></div></div>
          <div class="info-card"><div class="info-card-icon">🕐</div><div><h4>Orari di Apertura</h4><p>Spiaggia: 08:00 — 19:00<br>Ristorante: 12:00 — 23:30<br>Club: Ven-Sab 21:00 — 03:00</p></div></div>
          <div class="info-card"><div class="info-card-icon">📞</div><div><h4>Contatti</h4><p>Tel: +39 XXX XXX XXXX<br>Email: info@nellooceanbeach.it</p></div></div>
          <div class="info-card"><div class="info-card-icon">🅿️</div><div><h4>Parcheggio</h4><p>Ampio parcheggio gratuito disponibile.<br>Servizio navetta nei weekend estivi.</p></div></div>
          <div class="accordion">
            <div class="accordion-item"><button class="accordion-trigger" id="accordion-rules"><span>📋 Regole della Casa</span><span class="accordion-icon">+</span></button><div class="accordion-content"><div class="accordion-content-inner">• Divieto di portare cibo e bevande dall'esterno<br>• Costume da bagno obbligatorio nell'area spiaggia<br>• Minori accompagnati dopo le 18:00<br>• No fumo nell'area ristorante<br>• Rispettare gli altri ospiti e il volume della musica nelle aree relax<br>• Il dress code serale è smart casual</div></div></div>
            <div class="accordion-item"><button class="accordion-trigger" id="accordion-faq"><span>❓ Domande Frequenti</span><span class="accordion-icon">+</span></button><div class="accordion-content"><div class="accordion-content-inner"><strong>Posso portare il mio animale?</strong><br>Sì, i cani di piccola taglia sono benvenuti nell'area dedicata.<br><br><strong>È necessaria la prenotazione?</strong><br>Consigliata nei weekend e durante gli eventi. Accesso libero nei giorni feriali.<br><br><strong>C'è il Wi-Fi?</strong><br>Sì, Wi-Fi gratuito in tutto lo stabilimento.</div></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

export function init() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const inner = content.querySelector('.accordion-content-inner');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => { i.classList.remove('open'); i.querySelector('.accordion-content').style.maxHeight = '0'; });
      if (!isOpen) { item.classList.add('open'); content.style.maxHeight = inner.scrollHeight + 'px'; }
    });
  });
}
