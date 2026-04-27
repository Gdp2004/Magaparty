'use client';

import React, { useState, useEffect } from 'react';
import styles from './Events.module.css';
import { getEvents } from '@/app/actions/events';

interface EventData {
  id?: string;
  event_name: string;
  event_date: string;
  event_time?: string;
  dj_name?: string;
  genre?: string;
  description?: string;
}

const staticEvents: EventData[] = [
  { event_name: 'Tropical Night', event_date: '2026-05-02', event_time: '22:00', dj_name: 'DJ Marco', genre: 'House / Tropical', description: 'La nostra serata inaugurale della stagione estiva con ritmi tropicali e cocktail esotici.' },
  { event_name: 'Sunset Session', event_date: '2026-05-03', event_time: '19:00', dj_name: 'Resident DJ', genre: 'Chill / Deep House', description: 'Aperitivo al tramonto con musica deep house e vista mozzafiato sul mare.' },
  { event_name: 'White Party', event_date: '2026-05-09', event_time: '22:00', dj_name: 'DJ Luna', genre: 'EDM / Pop', description: 'La notte più elegante dell\'estate. Dress code: total white.' },
  { event_name: 'Acoustic Sunday', event_date: '2026-05-10', event_time: '18:00', dj_name: 'Live Band', genre: 'Acoustic / Jazz', description: 'Domenica rilassante con musica dal vivo, perfetta per tutta la famiglia.' },
  { event_name: 'Neon Nights', event_date: '2026-05-16', event_time: '22:00', dj_name: 'DJ Spark', genre: 'Tech House', description: 'Luci neon, body painting fluorescente e i migliori beat tech house.' },
  { event_name: 'Family Fun Day', event_date: '2026-05-17', event_time: '10:00', dj_name: '', genre: 'Family', description: 'Giornata dedicata alle famiglie con animazione, giochi e laboratori per bambini.' },
];

const MONTHS = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];

export function Events() {
  const [events, setEvents] = useState<EventData[]>(staticEvents);

  useEffect(() => {
    async function loadEvents() {
      try {
        const dbEvents = await getEvents({ limit: 10 });
        if (dbEvents && dbEvents.length > 0) {
          setEvents(dbEvents as EventData[]);
        }
      } catch (error) {
        console.warn('Using static events');
      }
    }
    loadEvents();
  }, []);

  return (
    <>
      <div className="wave-divider" style={{ transform: 'scaleY(-1)', marginTop: '-1px' }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="#0B1622" d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z"></path>
        </svg>
      </div>
      <section className={`section ${styles.eventsSection}`} id="events">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag" style={{ color: 'var(--sunset-coral)' }}>Eventi &amp; Club</span>
            <h2 style={{ color: '#fff' }}>Quando il Sole Tramonta,<br />la Magia Inizia</h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Ogni sera un'esperienza unica. DJ set, aperitivi esclusivi e notti sotto le stelle sulla sabbia del Cilento.
            </p>
          </div>
          
          <div className={`${styles.eventsScroll} reveal`}>
            {events.map((ev, i) => {
              const d = new Date(ev.event_date);
              const day = d.getDate().toString().padStart(2, '0');
              const month = MONTHS[d.getMonth()];
              const time = ev.event_time ? ev.event_time.substring(0, 5) : '';

              return (
                <div className={styles.eventCard} key={ev.id || i}>
                  <div className={styles.eventCardHeader}>
                    <div className={styles.eventDate}>
                      <span className={styles.eventDateDay}>{day}</span>
                      <span className={styles.eventDateMonth}>{month}</span>
                    </div>
                    {ev.genre && <span className={styles.eventGenre}>{ev.genre}</span>}
                  </div>
                  <div className={styles.eventCardBody}>
                    <h3>{ev.event_name}</h3>
                    {ev.dj_name && <p className={styles.eventDj}>{ev.dj_name}</p>}
                    <p>{ev.description}</p>
                    {time && <div className={styles.eventTime}>🕒 {time}</div>}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className={`${styles.eventsBottom} reveal`}>
            <div className={styles.vipCard}>
              <h3>🍾 Tavoli VIP</h3>
              <p>Prenota il tuo tavolo esclusivo con bottle service e vista privilegiata.</p>
              <a href="#booking" className="btn btn-primary" style={{ background: 'var(--gold-leaf)', borderColor: 'var(--gold-leaf)' }}>
                Prenota Tavolo VIP
              </a>
            </div>
            <div className={styles.privateCard}>
              <h3>🎉 Eventi Privati</h3>
              <p>Matrimoni sulla spiaggia, compleanni sotto le stelle, eventi aziendali.</p>
              <a href="https://wa.me/39XXXXXXXXXX?text=Ciao!%20Vorrei%20informazioni%20per%20un%20evento%20privato" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ color: '#F5EFE6', borderColor: 'rgba(245,239,230,0.3)' }}>
                Contattaci
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="wave-divider" style={{ marginTop: '-1px' }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="#0B1622" d="M0,60 C360,0 1080,100 1440,40 L1440,0 L0,0 Z"></path>
        </svg>
      </div>
    </>
  );
}
