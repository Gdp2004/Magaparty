import './Events.css';
import { getEvents, isSupabaseConfigured } from '../../services/supabase.js';

export function template() {
  return `
  <div class="wave-divider" style="transform: scaleY(-1); margin-top: -1px;"><svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path fill="#0B1622" d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z"></path></svg></div>
  <section class="section events-section" id="events">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">Eventi &amp; Club</span>
        <h2>Quando il Sole Tramonta,<br>la Magia Inizia</h2>
        <p class="section-subtitle">Ogni sera un'esperienza unica. DJ set, aperitivi esclusivi e notti sotto le stelle sulla sabbia del Cilento.</p>
      </div>
      <div class="events-scroll reveal" id="events-scroll">
        <div class="event-card"><div class="event-card-header"><div class="event-date"><span class="event-date-day">02</span><span class="event-date-month">Mag</span></div><span class="event-genre">House / Tropical</span></div><div class="event-card-body"><h3>Tropical Night</h3><p class="event-dj">DJ Marco</p><p>La nostra serata inaugurale della stagione estiva con ritmi tropicali e cocktail esotici.</p><div class="event-time">🕐 22:00</div></div></div>
        <div class="event-card"><div class="event-card-header"><div class="event-date"><span class="event-date-day">03</span><span class="event-date-month">Mag</span></div><span class="event-genre">Chill / Deep House</span></div><div class="event-card-body"><h3>Sunset Session</h3><p class="event-dj">Resident DJ</p><p>Aperitivo al tramonto con musica deep house e vista mozzafiato sul mare.</p><div class="event-time">🕐 19:00</div></div></div>
        <div class="event-card"><div class="event-card-header"><div class="event-date"><span class="event-date-day">09</span><span class="event-date-month">Mag</span></div><span class="event-genre">EDM / Pop</span></div><div class="event-card-body"><h3>White Party</h3><p class="event-dj">DJ Luna</p><p>La notte più elegante dell'estate. Dress code: total white.</p><div class="event-time">🕐 22:00</div></div></div>
        <div class="event-card"><div class="event-card-header"><div class="event-date"><span class="event-date-day">10</span><span class="event-date-month">Mag</span></div><span class="event-genre">Acoustic / Jazz</span></div><div class="event-card-body"><h3>Acoustic Sunday</h3><p class="event-dj">Live Band</p><p>Domenica rilassante con musica dal vivo, perfetta per tutta la famiglia.</p><div class="event-time">🕐 18:00</div></div></div>
        <div class="event-card"><div class="event-card-header"><div class="event-date"><span class="event-date-day">16</span><span class="event-date-month">Mag</span></div><span class="event-genre">Tech House</span></div><div class="event-card-body"><h3>Neon Nights</h3><p class="event-dj">DJ Spark</p><p>Luci neon, body painting fluorescente e i migliori beat tech house.</p><div class="event-time">🕐 22:00</div></div></div>
        <div class="event-card"><div class="event-card-header"><div class="event-date"><span class="event-date-day">17</span><span class="event-date-month">Mag</span></div><span class="event-genre">Family</span></div><div class="event-card-body"><h3>Family Fun Day</h3><p class="event-dj">&nbsp;</p><p>Giornata dedicata alle famiglie con animazione, giochi e laboratori per bambini.</p><div class="event-time">🕐 10:00</div></div></div>
      </div>
      <div class="events-bottom reveal">
        <div class="vip-card"><h3>🥂 Tavoli VIP</h3><p>Prenota il tuo tavolo esclusivo con bottle service e vista privilegiata.</p><a href="#booking" class="btn btn-primary" onclick="activateBookingTab('table')">Prenota Tavolo VIP</a></div>
        <div class="private-card"><h3>🎉 Eventi Privati</h3><p>Matrimoni sulla spiaggia, compleanni sotto le stelle, eventi aziendali.</p><a href="https://wa.me/39XXXXXXXXXX?text=Ciao!%20Vorrei%20informazioni%20per%20un%20evento%20privato" target="_blank" class="btn btn-secondary" style="color:#F5EFE6;border-color:rgba(245,239,230,0.3);">Contattaci</a></div>
      </div>
    </div>
  </section>
  <div class="wave-divider" style="margin-top:-1px;"><svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path fill="#0B1622" d="M0,60 C360,0 1080,100 1440,40 L1440,0 L0,0 Z"></path></svg></div>`;
}

export function init() {
  if (isSupabaseConfigured()) {
    getEvents({ limit: 10 }).then(events => {
      if (!events || !events.length) return;
      const c = document.getElementById('events-scroll');
      if (!c) return;
      const m = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
      c.innerHTML = events.map(ev => {
        const d = new Date(ev.event_date);
        return `<div class="event-card"><div class="event-card-header"><div class="event-date"><span class="event-date-day">${d.getDate().toString().padStart(2,'0')}</span><span class="event-date-month">${m[d.getMonth()]}</span></div>${ev.genre?`<span class="event-genre">${ev.genre}</span>`:''}</div><div class="event-card-body"><h3>${ev.event_name}</h3><p class="event-dj">${ev.dj_name||'&nbsp;'}</p><p>${ev.description||''}</p>${ev.event_time?`<div class="event-time">🕐 ${ev.event_time.substring(0,5)}</div>`:''}</div></div>`;
      }).join('');
    }).catch(() => console.log('Using static events'));
  }
}
