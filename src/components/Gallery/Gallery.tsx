'use client';

import React, { useState, useEffect } from 'react';
import styles from './Gallery.module.css';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  caption: string;
}

const galleryData: GalleryItem[] = [
  { id: 1, src: '/images/hero-day.png', category: 'sun_family', caption: 'Una mattina perfetta sulla nostra spiaggia' },
  { id: 2, src: '/images/hero-night.png', category: 'music_drinks', caption: 'Il tramonto si accende di musica' },
  { id: 3, src: '/images/beach-family.png', category: 'sun_family', caption: 'Area famiglia con servizi dedicati' },
  { id: 4, src: '/images/gallery-cocktails.png', category: 'music_drinks', caption: 'I nostri cocktail signature' },
  { id: 5, src: '/images/gallery-yoga.png', category: 'sun_family', caption: 'Yoga al sorgere del sole' },
  { id: 6, src: '/images/restaurant.png', category: 'sun_family', caption: 'Pranzo vista mare' },
  { id: 7, src: '/images/events-dj.png', category: 'music_drinks', caption: 'DJ set sotto le stelle' },
  { id: 8, src: '/images/gallery-vip.png', category: 'music_drinks', caption: 'Area VIP esclusiva' },
];

export function Gallery() {
  const [filter, setFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState({ src: '', caption: '' });

  const filteredItems = galleryData.filter(item => filter === 'all' || item.category === filter);

  const openLightbox = (src: string, caption: string) => {
    setLightboxData({ src, caption });
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxOpen) closeLightbox();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <>
      <section className={`section ${styles.gallerySection}`} id="gallery">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">#NelloOceanVibes</span>
            <h2>Momenti Indimenticabili</h2>
            <p className="section-subtitle">Ogni giorno al Nello è una storia da raccontare. Scopri i nostri scatti più belli.</p>
          </div>
          
          <div className={`${styles.galleryFilters} reveal`}>
            <button className={`${styles.galleryFilter} ${filter === 'all' ? styles.active : ''}`} onClick={() => setFilter('all')}>Tutti</button>
            <button className={`${styles.galleryFilter} ${filter === 'sun_family' ? styles.active : ''}`} onClick={() => setFilter('sun_family')}>☀️ Sole &amp; Famiglia</button>
            <button className={`${styles.galleryFilter} ${filter === 'music_drinks' ? styles.active : ''}`} onClick={() => setFilter('music_drinks')}>🌙 Musica &amp; Drink</button>
          </div>
          
          <div className={`${styles.galleryGrid} reveal-scale`}>
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className={styles.galleryItem} 
                onClick={() => openLightbox(item.src, item.caption)}
              >
                <img src={item.src} alt={item.caption} loading="lazy" />
                <div className={styles.galleryItemOverlay}>
                  <p>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <div 
        className={`${styles.lightbox} ${lightboxOpen ? styles.active : ''}`} 
        onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
      >
        <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Chiudi">×</button>
        <img src={lightboxData.src} alt={lightboxData.caption} />
        <p className={styles.lightboxCaption}>{lightboxData.caption}</p>
      </div>
    </>
  );
}
