'use client';

import { useEffect } from 'react';

/**
 * Hook that observes elements with reveal classes and triggers visibility animations.
 * Ported from the legacy scroll.js utility to a React hook using IntersectionObserver.
 */
export function useScrollReveal() {
  useEffect(() => {
    const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';

    function checkReveal() {
      const elements = document.querySelectorAll(selectors);
      const windowHeight = window.innerHeight;

      elements.forEach((el) => {
        if (el.classList.contains('visible')) return;
        const rect = el.getBoundingClientRect();
        const triggerPoint = windowHeight * 0.92;
        if (rect.top < triggerPoint) {
          el.classList.add('visible');
        }
      });
    }

    // Initial check
    checkReveal();

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkReveal();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkReveal, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkReveal);
    };
  }, []);
}
