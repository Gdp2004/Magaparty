/* ============================================================
   NELLO OCEAN BEACH — App Orchestrator
   Component-Based Module Pattern
   ============================================================ */

// ── Global Styles ──
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/animations.css';

// ── Components ──
import * as Navbar from './components/Navbar/Navbar.js';
import * as Hero from './components/Hero/Hero.js';
import * as Beach from './components/Beach/Beach.js';
import * as Restaurant from './components/Restaurant/Restaurant.js';
import * as Events from './components/Events/Events.js';
import * as Gallery from './components/Gallery/Gallery.js';
import * as Booking from './components/Booking/Booking.js';
import * as Info from './components/Info/Info.js';
import * as Footer from './components/Footer/Footer.js';

// ── Utils ──
import { initThemeToggle } from './utils/theme.js';
import { initScrollReveal } from './utils/scroll.js';
import { initSunsetCountdown } from './utils/sunset.js';

// ── Component Registry ──
const components = [
  { module: Navbar, target: 'beforeMain' },
  { module: Hero,   target: 'main' },
  { module: Beach,  target: 'main' },
  { module: Restaurant, target: 'main' },
  { module: Events, target: 'main' },
  { module: Gallery, target: 'main' },
  { module: Booking, target: 'main' },
  { module: Info,   target: 'main' },
  { module: Footer, target: 'afterMain' },
];

// ── Mount & Initialize ──
function mount() {
  const app = document.getElementById('app');
  if (!app) return;

  let navbarHTML = '';
  let mainHTML = '';
  let footerHTML = '';

  components.forEach(({ module, target }) => {
    const html = module.template();
    if (target === 'beforeMain') navbarHTML += html;
    else if (target === 'afterMain') footerHTML += html;
    else mainHTML += html;
  });

  app.innerHTML = navbarHTML + '<main>' + mainHTML + '</main>' + footerHTML;

  // Initialize all components
  components.forEach(({ module }) => module.init());

  // Initialize global utils
  initThemeToggle();
  initScrollReveal();
  initSunsetCountdown();
}

// Handle both cases: DOM already loaded, or not yet
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
