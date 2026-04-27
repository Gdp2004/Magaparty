'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import styles from './Navbar.module.css';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navbarInner}>
          <Link href="/" className={styles.navbarLogo} onClick={closeMobileMenu}>
            Nello <span className={styles.logoAccent}>Ocean</span> Beach
          </Link>

          <div className={styles.navLinks}>
            <Link href="#home" className={styles.navLink}>Home</Link>
            <Link href="#beach" className={styles.navLink}>Spiaggia</Link>
            <Link href="#restaurant" className={styles.navLink}>Ristorante</Link>
            <Link href="#events" className={styles.navLink}>Eventi</Link>
            <Link href="#gallery" className={styles.navLink}>Gallery</Link>
            <Link href="#info" className={styles.navLink}>Info</Link>
          </div>

          <div className={styles.navRight}>
            <button 
              className={styles.themeToggle} 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <div className={styles.themeToggleKnob}>
                {theme === 'day' ? '☀️' : '🌙'}
              </div>
            </button>
            <Link href="#booking" className="btn btn-primary hidden md-block">
              Prenota
            </Link>
            <button 
              className={`${styles.hamburger} ${mobileMenuOpen ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.active : ''}`}>
        <Link href="#home" className={styles.navLink} onClick={closeMobileMenu}>Home</Link>
        <Link href="#beach" className={styles.navLink} onClick={closeMobileMenu}>Spiaggia</Link>
        <Link href="#restaurant" className={styles.navLink} onClick={closeMobileMenu}>Ristorante</Link>
        <Link href="#events" className={styles.navLink} onClick={closeMobileMenu}>Eventi</Link>
        <Link href="#gallery" className={styles.navLink} onClick={closeMobileMenu}>Gallery</Link>
        <Link href="#info" className={styles.navLink} onClick={closeMobileMenu}>Info</Link>
        <Link href="#booking" className="btn btn-primary" onClick={closeMobileMenu}>Prenota Ora</Link>
      </div>
    </>
  );
}
