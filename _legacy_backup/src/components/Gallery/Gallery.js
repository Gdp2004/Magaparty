import './Gallery.css';

export function template() {
  return `
  <section class="section gallery-section" id="gallery">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">#NelloOceanVibes</span>
        <h2>Momenti Indimenticabili</h2>
        <p class="section-subtitle">Ogni giorno al Nello è una storia da raccontare. Scopri i nostri scatti più belli.</p>
      </div>
      <div class="gallery-filters reveal">
        <button class="gallery-filter active" data-filter="all" id="filter-all">Tutti</button>
        <button class="gallery-filter" data-filter="sun_family" id="filter-sun">☀️ Sole &amp; Famiglia</button>
        <button class="gallery-filter" data-filter="music_drinks" id="filter-night">🌙 Musica &amp; Drink</button>
      </div>
      <div class="gallery-grid reveal-scale" id="gallery-grid">
        <div class="gallery-item" data-category="sun_family" id="gallery-1"><img src="/images/hero-day.png" alt="Mattinata al Nello Ocean Beach" loading="lazy" /><div class="gallery-item-overlay"><p>Una mattina perfetta sulla nostra spiaggia</p></div></div>
        <div class="gallery-item" data-category="music_drinks" id="gallery-2"><img src="/images/hero-night.png" alt="Tramonto e musica" loading="lazy" /><div class="gallery-item-overlay"><p>Il tramonto si accende di musica</p></div></div>
        <div class="gallery-item" data-category="sun_family" id="gallery-3"><img src="/images/beach-family.png" alt="Area famiglia" loading="lazy" /><div class="gallery-item-overlay"><p>Area famiglia con servizi dedicati</p></div></div>
        <div class="gallery-item" data-category="music_drinks" id="gallery-4"><img src="/images/gallery-cocktails.png" alt="Cocktail signature" loading="lazy" /><div class="gallery-item-overlay"><p>I nostri cocktail signature</p></div></div>
        <div class="gallery-item" data-category="sun_family" id="gallery-5"><img src="/images/gallery-yoga.png" alt="Yoga in spiaggia" loading="lazy" /><div class="gallery-item-overlay"><p>Yoga al sorgere del sole</p></div></div>
        <div class="gallery-item" data-category="sun_family" id="gallery-6"><img src="/images/restaurant.png" alt="Pranzo vista mare" loading="lazy" /><div class="gallery-item-overlay"><p>Pranzo vista mare</p></div></div>
        <div class="gallery-item" data-category="music_drinks" id="gallery-7"><img src="/images/events-dj.png" alt="DJ set sotto le stelle" loading="lazy" /><div class="gallery-item-overlay"><p>DJ set sotto le stelle</p></div></div>
        <div class="gallery-item" data-category="music_drinks" id="gallery-8"><img src="/images/gallery-vip.png" alt="Area VIP esclusiva" loading="lazy" /><div class="gallery-item-overlay"><p>Area VIP esclusiva</p></div></div>
      </div>
    </div>
  </section>
  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" id="lightbox-close" aria-label="Chiudi">✕</button>
    <img src="" alt="" id="lightbox-img" />
    <p class="lightbox-caption" id="lightbox-caption"></p>
  </div>`;
}

export function init() {
  // Filter
  const filters = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('.gallery-item');
  filters.forEach(f => f.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    f.classList.add('active');
    const cat = f.getAttribute('data-filter');
    items.forEach(i => i.classList.toggle('hidden', cat !== 'all' && i.getAttribute('data-category') !== cat));
  }));

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-caption');
  const lbClose = document.getElementById('lightbox-close');
  if (!lb) return;

  const closeLb = () => { lb.classList.remove('active'); document.body.style.overflow = ''; };

  items.forEach(item => item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const cap = item.querySelector('.gallery-item-overlay p');
    if (img) { lbImg.src = img.src; lbImg.alt = img.alt; }
    if (cap) lbCap.textContent = cap.textContent;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }));

  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
}
