import './Restaurant.css';
import { getMenuItems, isSupabaseConfigured } from '../../services/supabase.js';
import { escapeHtml, safeLog } from '../../utils/security.js';

const menuData = {
  pranzo: { title: 'Pranzo', desc: 'Piatti freschi e leggeri, perfetti per una pausa gourmet vista mare', items: [
    { name: 'Spaghetti alle Vongole', desc: 'Pasta fresca con vongole veraci del Golfo di Salerno', price: 16, featured: true },
    { name: 'Insalata Mediterranea', desc: 'Mix di verdure fresche, feta, olive e pomodorini', price: 12, featured: false },
    { name: 'Frittura di Paranza', desc: 'Pesce fresco del giorno in leggera panatura dorata', price: 18, featured: true },
    { name: 'Poke Bowl del Mare', desc: 'Riso, tonno fresco, avocado, edamame e salsa teriyaki', price: 15, featured: false },
  ]},
  aperitivo: { title: 'Aperitivo', desc: "Cocktail signature e stuzzichini per l'ora più bella del giorno", items: [
    { name: 'Spritz Nello', desc: 'Il nostro signature spritz con Aperol, prosecco e un tocco di passion fruit', price: 10, featured: true },
    { name: 'Sunset Margarita', desc: 'Tequila premium, lime fresco, sciroppo di mango e sale rosa', price: 12, featured: true },
    { name: 'Virgin Mojito', desc: 'Analcolico rinfrescante con lime, menta e zucchero di canna', price: 8, featured: false },
    { name: 'Tagliere Mare & Monti', desc: 'Selezione di salumi, formaggi DOP e bruschette', price: 18, featured: false },
  ]},
  cena: { title: 'Cena', desc: 'Cena romantica sotto le stelle con i sapori autentici del mediterraneo', items: [
    { name: 'Branzino alla Griglia', desc: 'Branzino fresco con contorno di verdure grigliate e salsa al limone', price: 24, featured: true },
    { name: 'Risotto ai Frutti di Mare', desc: 'Cremoso risotto con gamberi, cozze, calamari e vongole', price: 22, featured: true },
    { name: 'Tagliata di Manzo', desc: 'Manzo selezionato con rucola, pomodorini e scaglie di parmigiano', price: 26, featured: false },
  ]},
  drink: { title: 'Drink & Bollicine', desc: 'Selezione premium di cocktail, vini e champagne per ogni momento', items: [
    { name: 'Gin Tonic Premium', desc: 'Gin artigianale, tonica fever-tree e botaniche selezionate', price: 12, featured: false },
    { name: 'Champagne Moët', desc: 'Bottiglia di Moët & Chandon Impérial', price: 90, featured: true },
    { name: 'Birra Artigianale', desc: 'Selezione di birre artigianali campane', price: 7, featured: false },
  ]}
};

function renderMenu(category) {
  const data = menuData[category];
  if (!data) return;
  const titleEl = document.getElementById('menu-category-title');
  const descEl = document.getElementById('menu-category-desc');
  const listEl = document.getElementById('menu-items-list');
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  if (listEl) {
    listEl.innerHTML = data.items.map(item => {
      // XSS Prevention: escape DB-sourced values
      const name = escapeHtml(item.name);
      const desc = escapeHtml(item.desc);
      const price = Number.isFinite(item.price) ? item.price : 0;
      return `
      <div class="menu-item ${item.featured ? 'featured' : ''}">
        <div class="menu-item-info"><h4>${name}</h4><p>${desc}</p></div>
        <span class="menu-item-price">€${price}</span>
      </div>`;
    }).join('');
  }
}

export function template() {
  return `
  <section class="section restaurant-section" id="restaurant">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">Ristorante &amp; Bar</span>
        <h2>Sapori del Mediterraneo</h2>
        <p class="section-subtitle">Dal pranzo leggero vista mare all'aperitivo al tramonto, fino alla cena elegante sotto le stelle.</p>
      </div>
      <div class="menu-tabs reveal">
        <button class="menu-tab active" data-menu-tab="pranzo" id="tab-pranzo">🍝 Pranzo</button>
        <button class="menu-tab" data-menu-tab="aperitivo" id="tab-aperitivo">🍹 Aperitivo</button>
        <button class="menu-tab" data-menu-tab="cena" id="tab-cena">🥂 Cena</button>
        <button class="menu-tab" data-menu-tab="drink" id="tab-drink">🍸 Drink</button>
      </div>
      <div class="menu-content reveal">
        <div class="menu-image">
          <img src="/images/restaurant.png" alt="Cucina mediterranea Nello Ocean Beach" id="menu-image" loading="lazy" />
          <div class="menu-image-overlay">
            <h3 id="menu-category-title">Pranzo</h3>
            <p id="menu-category-desc">Piatti freschi e leggeri, perfetti per una pausa gourmet vista mare</p>
          </div>
        </div>
        <div class="menu-items-list" id="menu-items-list"></div>
      </div>
    </div>
  </section>`;
}

export function init() {
  // Render initial menu
  renderMenu('pranzo');

  // Tab switching
  document.querySelectorAll('[data-menu-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-menu-tab]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderMenu(tab.getAttribute('data-menu-tab'));
    });
  });

  // Try loading from Supabase
  if (isSupabaseConfigured()) {
    loadMenuFromDB('pranzo');
  }
}

async function loadMenuFromDB(category) {
  try {
    const items = await getMenuItems(category);
    if (items && items.length > 0) {
      menuData[category].items = items.map(i => ({ name: i.name, desc: i.description || '', price: i.price, featured: i.is_featured }));
      renderMenu(category);
    }
  } catch (e) { safeLog('log', 'Using static menu data'); }
}
