/* Theme toggle & smooth scroll utilities */

export function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('toggle-icon');
  if (!toggle) return;

  const saved = localStorage.getItem('nello-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    if (icon) icon.textContent = saved === 'night' ? '🌙' : '☀️';
  }

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'night' ? 'day' : 'night';
    switchTheme(next);
  });

  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle.click();
    }
  });
}

export function switchTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('nello-theme', theme);
  const icon = document.getElementById('toggle-icon');
  if (icon) icon.textContent = theme === 'night' ? '🌙' : '☀️';
}

export function smoothScrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Expose to global scope for inline onclick handlers
window.switchTheme = switchTheme;
window.smoothScrollTo = smoothScrollTo;
