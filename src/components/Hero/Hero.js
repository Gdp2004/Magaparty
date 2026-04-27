import './Hero.css';

export function template() {
  return `
  <section class="hero" id="hero">
    <div class="hero-bg">
      <div class="hero-bg-day"></div>
      <div class="hero-bg-night"></div>
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-content">
      <div class="hero-badge">
        <span>🌊</span><span>Battipaglia — Costa del Cilento</span>
      </div>
      <h1>Dove il Mare<br>Incontra l'Anima</h1>
      <p class="hero-subtitle">
        Due anime, un'unica esperienza. Relax in famiglia sotto il sole,
        aperitivi mozzafiato al tramonto e notti indimenticabili sulla sabbia.
      </p>
      <div class="hero-ctas">
        <button class="btn hero-cta-day" onclick="switchTheme('day'); smoothScrollTo('#beach')">☀️ Relax in Famiglia</button>
        <button class="btn hero-cta-night" onclick="switchTheme('night'); smoothScrollTo('#events')">🌙 Vivi la Notte</button>
      </div>
    </div>
    <div class="sunset-countdown" id="sunset-countdown">
      <span class="sunset-icon">🌅</span>
      <span id="sunset-text">Tramonto tra --:--</span>
    </div>
    <div class="scroll-indicator">
      <span>Scorri</span>
      <div class="scroll-indicator-line"></div>
    </div>
  </section>
  <div class="wave-divider">
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path class="wave-fill" d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z"></path>
    </svg>
  </div>`;
}

export function init() {
  // Sunset countdown is handled by utils/sunset.js
}
