import './Navbar.css';

export function template() {
  return `
  <nav class="navbar" id="navbar">
    <div class="navbar-inner">
      <a href="#hero" class="navbar-logo">Nello <span class="logo-accent">Ocean</span> Beach</a>
      <div class="nav-links" id="nav-links">
        <a href="#hero" class="nav-link">Home</a>
        <a href="#beach" class="nav-link">Spiaggia</a>
        <a href="#restaurant" class="nav-link">Ristorante</a>
        <a href="#events" class="nav-link">Eventi</a>
        <a href="#gallery" class="nav-link">Gallery</a>
        <a href="#info" class="nav-link">Info</a>
      </div>
      <div class="nav-right">
        <div class="theme-toggle" id="theme-toggle" role="button" aria-label="Cambia tema giorno/notte" tabindex="0">
          <div class="theme-toggle-knob" id="theme-toggle-knob">
            <span id="toggle-icon">☀️</span>
          </div>
        </div>
        <a href="#booking" class="btn btn-primary btn-book-nav" id="btn-book-nav">Prenota</a>
        <div class="hamburger" id="hamburger" aria-label="Menu" tabindex="0">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  </nav>
  <div class="mobile-menu" id="mobile-menu">
    <a href="#hero" class="nav-link" data-mobile-link>Home</a>
    <a href="#beach" class="nav-link" data-mobile-link>Spiaggia</a>
    <a href="#restaurant" class="nav-link" data-mobile-link>Ristorante</a>
    <a href="#events" class="nav-link" data-mobile-link>Eventi</a>
    <a href="#gallery" class="nav-link" data-mobile-link>Gallery</a>
    <a href="#info" class="nav-link" data-mobile-link>Info</a>
    <a href="#booking" class="btn btn-primary" data-mobile-link>Prenota Ora</a>
  </div>`;
}

export function init() {
  // Glass effect on scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('[data-mobile-link]').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}
