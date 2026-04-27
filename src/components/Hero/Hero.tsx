'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import styles from './Hero.module.css';

export function Hero() {
  const { toggleTheme, theme } = useTheme();
  const [sunsetText, setSunsetText] = useState('Tramonto tra --:--');

  useEffect(() => {
    // Ported from sunset.js
    const calculateSunset = () => {
      const now = new Date();
      // Sunset at 19:45
      const sunset = new Date();
      sunset.setHours(19, 45, 0);

      // If it's already past sunset, show next day's sunset
      if (now > sunset) {
        sunset.setDate(sunset.getDate() + 1);
      }

      const diff = sunset.getTime() - now.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setSunsetText(`Tramonto tra ${h}h ${m}m`);
    };

    calculateSunset();
    const interval = setInterval(calculateSunset, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleThemeSwitchAndScroll = (targetTheme: 'day' | 'night', targetId: string) => {
    if (theme !== targetTheme) {
      toggleTheme();
    }
    const element = document.querySelector(targetId);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <section className={styles.hero} id="home">
        <div className={styles.heroBg}>
          <div className={styles.heroBgDay}></div>
          <div className={styles.heroBgNight}></div>
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span>🌊</span><span>Battipaglia — Costa del Cilento</span>
          </div>
          <h1>Dove il Mare<br />Incontra l'Anima</h1>
          <p className={styles.heroSubtitle}>
            Due anime, un'unica esperienza. Relax in famiglia sotto il sole,
            aperitivi mozzafiato al tramonto e notti indimenticabili sulla sabbia.
          </p>
          <div className={styles.heroCtas}>
            <button 
              className={`btn ${styles.heroCtaDay}`}
              onClick={() => handleThemeSwitchAndScroll('day', '#beach')}
            >
              ☀️ Relax in Famiglia
            </button>
            <button 
              className={`btn ${styles.heroCtaNight}`}
              onClick={() => handleThemeSwitchAndScroll('night', '#events')}
            >
              🌙 Vivi la Notte
            </button>
          </div>
        </div>
        <div className={styles.sunsetCountdown}>
          <span className={styles.sunsetIcon}>🌅</span>
          <span>{sunsetText}</span>
        </div>
        <div className={styles.scrollIndicator}>
          <span>Scorri</span>
          <div className={styles.scrollIndicatorLine}></div>
        </div>
      </section>
      <div className="wave-divider">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path className="wave-fill" d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z"></path>
        </svg>
      </div>
    </>
  );
}
