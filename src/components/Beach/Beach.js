import './Beach.css';

export function template() {
  return `
  <section class="section beach-section" id="beach">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">La Nostra Spiaggia</span>
        <h2>Il Tuo Angolo di Paradiso</h2>
        <p class="section-subtitle">Un'esperienza balneare esclusiva pensata per il comfort di tutta la famiglia, con servizi premium e la sicurezza al primo posto.</p>
      </div>
      <div class="beach-grid">
        <div class="beach-card reveal delay-1">
          <div class="beach-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent)"><path d="M17.5 21H6.5c-.4 0-.7-.2-.8-.5L3 12.5c-.1-.3 0-.7.3-.9l8-5.5a1 1 0 0 1 1.4 0l8 5.5c.3.2.4.6.3.9l-2.7 8c-.1.3-.4.5-.8.5z"/><path d="M12 2v4"/><path d="M4.5 13.5h15"/></svg>
          </div>
          <h3>Lettini &amp; Ombrelloni</h3>
          <p>Lettini premium in prima fila con vista mare cristallina. Gazebo privati per un'esperienza esclusiva e riservata.</p>
        </div>
        <div class="beach-card reveal delay-2">
          <div class="beach-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent)"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </div>
          <h3>Area Famiglia</h3>
          <p>Parco giochi dedicato, servizio nursery e bagnini sempre presenti. La sicurezza dei vostri bambini è la nostra priorità.</p>
        </div>
        <div class="beach-card reveal delay-3">
          <div class="beach-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent)"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
          </div>
          <h3>Wellness &amp; Relax</h3>
          <p>Yoga all'alba sulla spiaggia, massaggi rilassanti e area benessere. Rigenera corpo e mente con vista mare.</p>
        </div>
      </div>
      <div class="beach-feature-img reveal-scale">
        <img src="/images/beach-family.png" alt="Area famiglia Nello Ocean Beach" loading="lazy" />
      </div>
    </div>
  </section>`;
}

export function init() {
  // No special init needed — static content with scroll reveal
}
