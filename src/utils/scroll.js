/* Scroll reveal system using getBoundingClientRect */

export function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!reveals.length) return;

  function checkReveal() {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      if (el.classList.contains('visible')) return;
      const rect = el.getBoundingClientRect();
      const triggerPoint = windowHeight * 0.92;
      if (rect.top < triggerPoint) {
        el.classList.add('visible');
      }
    });
  }

  checkReveal();

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkReveal();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', checkReveal, { passive: true });
  window.addEventListener('load', checkReveal);
}
