'use client';

import React, { useState, useEffect } from 'react';
import styles from './Restaurant.module.css';
import { getMenuItems } from '@/app/actions/menu';

type Category = 'pranzo' | 'aperitivo' | 'cena' | 'drink';

interface MenuItem {
  name: string;
  desc: string;
  price: number;
  featured: boolean;
}

interface CategoryData {
  title: string;
  desc: string;
  items: MenuItem[];
}

const initialMenuData: Record<Category, CategoryData> = {
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

export function Restaurant() {
  const [activeTab, setActiveTab] = useState<Category>('pranzo');
  const [menuData, setMenuData] = useState(initialMenuData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadFromDB() {
      setLoading(true);
      try {
        const items = await getMenuItems(activeTab);
        if (items && items.length > 0) {
          const mappedItems: MenuItem[] = items.map((i: any) => ({
            name: i.name,
            desc: i.description || '',
            price: i.price,
            featured: i.is_featured
          }));
          setMenuData(prev => ({
            ...prev,
            [activeTab]: {
              ...prev[activeTab],
              items: mappedItems
            }
          }));
        }
      } catch (e) {
        console.warn('Using static menu data');
      } finally {
        setLoading(false);
      }
    }
    loadFromDB();
  }, [activeTab]);

  const activeData = menuData[activeTab];

  return (
    <section className={`section ${styles.restaurantSection}`} id="restaurant">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Ristorante &amp; Bar</span>
          <h2>Sapori del Mediterraneo</h2>
          <p className="section-subtitle">Dal pranzo leggero vista mare all'aperitivo al tramonto, fino alla cena elegante sotto le stelle.</p>
        </div>
        
        <div className={`${styles.menuTabs} reveal`}>
          <button 
            className={`${styles.menuTab} ${activeTab === 'pranzo' ? styles.active : ''}`}
            onClick={() => setActiveTab('pranzo')}
          >
            🍽️ Pranzo
          </button>
          <button 
            className={`${styles.menuTab} ${activeTab === 'aperitivo' ? styles.active : ''}`}
            onClick={() => setActiveTab('aperitivo')}
          >
            🍹 Aperitivo
          </button>
          <button 
            className={`${styles.menuTab} ${activeTab === 'cena' ? styles.active : ''}`}
            onClick={() => setActiveTab('cena')}
          >
            🌙 Cena
          </button>
          <button 
            className={`${styles.menuTab} ${activeTab === 'drink' ? styles.active : ''}`}
            onClick={() => setActiveTab('drink')}
          >
            🥂 Drink
          </button>
        </div>
        
        <div className={`${styles.menuContent} reveal`}>
          <div className={styles.menuImage}>
            <img src="/images/restaurant.png" alt="Cucina mediterranea Nello Ocean Beach" loading="lazy" />
            <div className={styles.menuImageOverlay}>
              <h3>{activeData.title}</h3>
              <p>{activeData.desc}</p>
            </div>
          </div>
          
          <div className={`${styles.menuItemsList} ${loading ? 'opacity-50' : ''}`}>
            {activeData.items.map((item, index) => (
              <div key={index} className={`${styles.menuItem} ${item.featured ? styles.featured : ''}`}>
                <div className={styles.menuItemInfo}>
                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>
                </div>
                <span className={styles.menuItemPrice}>€{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
