var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=t({init:()=>i,template:()=>r});function r(){return`
  <nav class="navbar" id="navbar">
    <div class="navbar-inner">
      <a href="#hero" class="navbar-logo">Nello <span class="logo-accent">Ocean</span> Beach</a>
      <div class="nav-links" id="nav-links">
        <a href="#hero" class="nav-link">Home</a>
        <a href="#beach" class="nav-link">Spiaggia</a>
        <a href="#restaurant" class="nav-link">Ristorante</a>
        <a href="#events" class="nav-link">Eventi</a>
        <a href="#gallery" class="nav-link">Gallery</a>
        <a href="#info" class="nav-link">Info</a>
      </div>
      <div class="nav-right">
        <div class="theme-toggle" id="theme-toggle" role="button" aria-label="Cambia tema giorno/notte" tabindex="0">
          <div class="theme-toggle-knob" id="theme-toggle-knob">
            <span id="toggle-icon">☀️</span>
          </div>
        </div>
        <a href="#booking" class="btn btn-primary btn-book-nav" id="btn-book-nav">Prenota</a>
        <div class="hamburger" id="hamburger" aria-label="Menu" tabindex="0">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  </nav>
  <div class="mobile-menu" id="mobile-menu">
    <a href="#hero" class="nav-link" data-mobile-link>Home</a>
    <a href="#beach" class="nav-link" data-mobile-link>Spiaggia</a>
    <a href="#restaurant" class="nav-link" data-mobile-link>Ristorante</a>
    <a href="#events" class="nav-link" data-mobile-link>Eventi</a>
    <a href="#gallery" class="nav-link" data-mobile-link>Gallery</a>
    <a href="#info" class="nav-link" data-mobile-link>Info</a>
    <a href="#booking" class="btn btn-primary" data-mobile-link>Prenota Ora</a>
  </div>`}function i(){let e=document.getElementById(`navbar`);if(e){let t=()=>{e.classList.toggle(`scrolled`,window.scrollY>80)};window.addEventListener(`scroll`,t,{passive:!0}),t()}let t=document.getElementById(`hamburger`),n=document.getElementById(`mobile-menu`);t&&n&&(t.addEventListener(`click`,()=>{t.classList.toggle(`active`),n.classList.toggle(`active`),document.body.style.overflow=n.classList.contains(`active`)?`hidden`:``}),n.querySelectorAll(`[data-mobile-link]`).forEach(e=>{e.addEventListener(`click`,()=>{t.classList.remove(`active`),n.classList.remove(`active`),document.body.style.overflow=``})}))}var a=t({init:()=>s,template:()=>o});function o(){return`
  <section class="hero" id="hero">
    <div class="hero-bg">
      <div class="hero-bg-day"></div>
      <div class="hero-bg-night"></div>
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-content">
      <div class="hero-badge">
        <span>🌊</span><span>Battipaglia — Costa del Cilento</span>
      </div>
      <h1>Dove il Mare<br>Incontra l'Anima</h1>
      <p class="hero-subtitle">
        Due anime, un'unica esperienza. Relax in famiglia sotto il sole,
        aperitivi mozzafiato al tramonto e notti indimenticabili sulla sabbia.
      </p>
      <div class="hero-ctas">
        <button class="btn hero-cta-day" onclick="switchTheme('day'); smoothScrollTo('#beach')">☀️ Relax in Famiglia</button>
        <button class="btn hero-cta-night" onclick="switchTheme('night'); smoothScrollTo('#events')">🌙 Vivi la Notte</button>
      </div>
    </div>
    <div class="sunset-countdown" id="sunset-countdown">
      <span class="sunset-icon">🌅</span>
      <span id="sunset-text">Tramonto tra --:--</span>
    </div>
    <div class="scroll-indicator">
      <span>Scorri</span>
      <div class="scroll-indicator-line"></div>
    </div>
  </section>
  <div class="wave-divider">
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path class="wave-fill" d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z"></path>
    </svg>
  </div>`}function s(){}var c=t({init:()=>u,template:()=>l});function l(){return`
  <section class="section beach-section" id="beach">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">La Nostra Spiaggia</span>
        <h2>Il Tuo Angolo di Paradiso</h2>
        <p class="section-subtitle">Un'esperienza balneare esclusiva pensata per il comfort di tutta la famiglia, con servizi premium e la sicurezza al primo posto.</p>
      </div>
      <div class="beach-grid">
        <div class="beach-card reveal delay-1">
          <div class="beach-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent)"><path d="M17.5 21H6.5c-.4 0-.7-.2-.8-.5L3 12.5c-.1-.3 0-.7.3-.9l8-5.5a1 1 0 0 1 1.4 0l8 5.5c.3.2.4.6.3.9l-2.7 8c-.1.3-.4.5-.8.5z"/><path d="M12 2v4"/><path d="M4.5 13.5h15"/></svg>
          </div>
          <h3>Lettini &amp; Ombrelloni</h3>
          <p>Lettini premium in prima fila con vista mare cristallina. Gazebo privati per un'esperienza esclusiva e riservata.</p>
        </div>
        <div class="beach-card reveal delay-2">
          <div class="beach-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent)"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </div>
          <h3>Area Famiglia</h3>
          <p>Parco giochi dedicato, servizio nursery e bagnini sempre presenti. La sicurezza dei vostri bambini è la nostra priorità.</p>
        </div>
        <div class="beach-card reveal delay-3">
          <div class="beach-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent)"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
          </div>
          <h3>Wellness &amp; Relax</h3>
          <p>Yoga all'alba sulla spiaggia, massaggi rilassanti e area benessere. Rigenera corpo e mente con vista mare.</p>
        </div>
      </div>
      <div class="beach-feature-img reveal-scale">
        <img src="/images/beach-family.png" alt="Area famiglia Nello Ocean Beach" loading="lazy" />
      </div>
    </div>
  </section>`}function u(){}var d={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#x27;`,"/":`&#x2F;`,"`":`&#96;`};function f(e){return typeof e==`string`?e.replace(/[&<>"'`/]/g,e=>d[e]):``}function p(e,t=500){return typeof e==`string`?e.replace(/<[^>]*>/g,``).replace(/[<>'"`;(){}]/g,``).replace(/\s+/g,` `).trim().slice(0,t):``}function m(e){if(typeof e!=`string`)return{valid:!1,error:`Telefono richiesto`};let t=e.replace(/[\s\-().]/g,``);return/^(\+?39)?[03]\d{6,10}$/.test(t)?{valid:!0,cleaned:t}:{valid:!1,error:`Formato telefono non valido (es. +39 333 1234567)`}}function ee(e){if(typeof e!=`string`)return{valid:!1,error:`Nome richiesto`};let t=e.trim();return t.length<2?{valid:!1,error:`Nome troppo corto (min 2 caratteri)`}:t.length>100?{valid:!1,error:`Nome troppo lungo (max 100 caratteri)`}:/^[\p{L}\s''\-]+$/u.test(t)?{valid:!0,cleaned:t}:{valid:!1,error:`Nome contiene caratteri non validi`}}function te(e){if(typeof e!=`string`||!e)return{valid:!1,error:`Data richiesta`};let t=new Date(e+`T00:00:00`);if(isNaN(t.getTime()))return{valid:!1,error:`Data non valida`};let n=new Date;if(n.setHours(0,0,0,0),t<n)return{valid:!1,error:`La data non può essere nel passato`};let r=new Date;return r.setFullYear(r.getFullYear()+1),t>r?{valid:!1,error:`Data troppo lontana (max 1 anno)`}:{valid:!0,cleaned:e}}function ne(e){let t=parseInt(e,10);return isNaN(t)||t<1||t>50?{valid:!1,error:`Numero persone non valido (1-50)`}:{valid:!0,cleaned:t}}function h(e,t){return t.includes(e)?{valid:!0,cleaned:e}:{valid:!1,error:`Zona non valida`}}function re(e,t=500){return!e||typeof e!=`string`?{valid:!0,cleaned:``}:{valid:!0,cleaned:p(e,t)}}var g=class{constructor(e=3,t=300*1e3){this.maxTokens=e,this.windowMs=t,this.timestamps=[]}check(){let e=Date.now();if(this.timestamps=this.timestamps.filter(t=>e-t<this.windowMs),this.timestamps.length>=this.maxTokens){let t=this.timestamps[0],n=this.windowMs-(e-t);return{allowed:!1,retryAfterMs:n,message:`Troppe richieste. Riprova tra ${Math.ceil(n/6e4)} minuti.`}}return this.timestamps.push(e),{allowed:!0}}reset(){this.timestamps=[]}};function ie(e,t=`website`){let n=e.get(t);return n!==null&&n!==``}function _(e,t,n=null){e===`error`&&console.error(`[Nello] ${t}`)}async function v({featured:e=!1,limit:t=10}={}){return[]}async function y(e=null){return[]}async function b(e){throw Error(`Database not configured`)}function x(){return!1}var S=t({init:()=>E,template:()=>T}),C={pranzo:{title:`Pranzo`,desc:`Piatti freschi e leggeri, perfetti per una pausa gourmet vista mare`,items:[{name:`Spaghetti alle Vongole`,desc:`Pasta fresca con vongole veraci del Golfo di Salerno`,price:16,featured:!0},{name:`Insalata Mediterranea`,desc:`Mix di verdure fresche, feta, olive e pomodorini`,price:12,featured:!1},{name:`Frittura di Paranza`,desc:`Pesce fresco del giorno in leggera panatura dorata`,price:18,featured:!0},{name:`Poke Bowl del Mare`,desc:`Riso, tonno fresco, avocado, edamame e salsa teriyaki`,price:15,featured:!1}]},aperitivo:{title:`Aperitivo`,desc:`Cocktail signature e stuzzichini per l'ora più bella del giorno`,items:[{name:`Spritz Nello`,desc:`Il nostro signature spritz con Aperol, prosecco e un tocco di passion fruit`,price:10,featured:!0},{name:`Sunset Margarita`,desc:`Tequila premium, lime fresco, sciroppo di mango e sale rosa`,price:12,featured:!0},{name:`Virgin Mojito`,desc:`Analcolico rinfrescante con lime, menta e zucchero di canna`,price:8,featured:!1},{name:`Tagliere Mare & Monti`,desc:`Selezione di salumi, formaggi DOP e bruschette`,price:18,featured:!1}]},cena:{title:`Cena`,desc:`Cena romantica sotto le stelle con i sapori autentici del mediterraneo`,items:[{name:`Branzino alla Griglia`,desc:`Branzino fresco con contorno di verdure grigliate e salsa al limone`,price:24,featured:!0},{name:`Risotto ai Frutti di Mare`,desc:`Cremoso risotto con gamberi, cozze, calamari e vongole`,price:22,featured:!0},{name:`Tagliata di Manzo`,desc:`Manzo selezionato con rucola, pomodorini e scaglie di parmigiano`,price:26,featured:!1}]},drink:{title:`Drink & Bollicine`,desc:`Selezione premium di cocktail, vini e champagne per ogni momento`,items:[{name:`Gin Tonic Premium`,desc:`Gin artigianale, tonica fever-tree e botaniche selezionate`,price:12,featured:!1},{name:`Champagne Moët`,desc:`Bottiglia di Moët & Chandon Impérial`,price:90,featured:!0},{name:`Birra Artigianale`,desc:`Selezione di birre artigianali campane`,price:7,featured:!1}]}};function w(e){let t=C[e];if(!t)return;let n=document.getElementById(`menu-category-title`),r=document.getElementById(`menu-category-desc`),i=document.getElementById(`menu-items-list`);n&&(n.textContent=t.title),r&&(r.textContent=t.desc),i&&(i.innerHTML=t.items.map(e=>{let t=f(e.name),n=f(e.desc),r=Number.isFinite(e.price)?e.price:0;return`
      <div class="menu-item ${e.featured?`featured`:``}">
        <div class="menu-item-info"><h4>${t}</h4><p>${n}</p></div>
        <span class="menu-item-price">€${r}</span>
      </div>`}).join(``))}function T(){return`
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
  </section>`}function E(){w(`pranzo`),document.querySelectorAll(`[data-menu-tab]`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`[data-menu-tab]`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),w(e.getAttribute(`data-menu-tab`))})}),x()&&D(`pranzo`)}async function D(e){try{let t=await y(e);t&&t.length>0&&(C[e].items=t.map(e=>({name:e.name,desc:e.description||``,price:e.price,featured:e.is_featured})),w(e))}catch{_(`log`,`Using static menu data`)}}var O=t({init:()=>A,template:()=>k});function k(){return`
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
  <div class="wave-divider" style="margin-top:-1px;"><svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path fill="#0B1622" d="M0,60 C360,0 1080,100 1440,40 L1440,0 L0,0 Z"></path></svg></div>`}function A(){x()&&v({limit:10}).then(e=>{if(!e||!e.length)return;let t=document.getElementById(`events-scroll`);if(!t)return;let n=[`Gen`,`Feb`,`Mar`,`Apr`,`Mag`,`Giu`,`Lug`,`Ago`,`Set`,`Ott`,`Nov`,`Dic`];t.innerHTML=e.map(e=>{let t=new Date(e.event_date),r=t.getDate().toString().padStart(2,`0`),i=n[t.getMonth()]||``,a=f(e.event_name),o=e.genre?f(e.genre):``,s=e.dj_name?f(e.dj_name):`&nbsp;`,c=f(e.description||``),l=e.event_time?f(e.event_time.substring(0,5)):``;return`<div class="event-card"><div class="event-card-header"><div class="event-date"><span class="event-date-day">${r}</span><span class="event-date-month">${i}</span></div>${o?`<span class="event-genre">${o}</span>`:``}</div><div class="event-card-body"><h3>${a}</h3><p class="event-dj">${s}</p><p>${c}</p>${l?`<div class="event-time">🕐 ${l}</div>`:``}</div></div>`}).join(``)}).catch(()=>_(`log`,`Using static events`))}var j=t({init:()=>N,template:()=>M});function M(){return`
  <section class="section gallery-section" id="gallery">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">#NelloOceanVibes</span>
        <h2>Momenti Indimenticabili</h2>
        <p class="section-subtitle">Ogni giorno al Nello è una storia da raccontare. Scopri i nostri scatti più belli.</p>
      </div>
      <div class="gallery-filters reveal">
        <button class="gallery-filter active" data-filter="all" id="filter-all">Tutti</button>
        <button class="gallery-filter" data-filter="sun_family" id="filter-sun">☀️ Sole &amp; Famiglia</button>
        <button class="gallery-filter" data-filter="music_drinks" id="filter-night">🌙 Musica &amp; Drink</button>
      </div>
      <div class="gallery-grid reveal-scale" id="gallery-grid">
        <div class="gallery-item" data-category="sun_family" id="gallery-1"><img src="/images/hero-day.png" alt="Mattinata al Nello Ocean Beach" loading="lazy" /><div class="gallery-item-overlay"><p>Una mattina perfetta sulla nostra spiaggia</p></div></div>
        <div class="gallery-item" data-category="music_drinks" id="gallery-2"><img src="/images/hero-night.png" alt="Tramonto e musica" loading="lazy" /><div class="gallery-item-overlay"><p>Il tramonto si accende di musica</p></div></div>
        <div class="gallery-item" data-category="sun_family" id="gallery-3"><img src="/images/beach-family.png" alt="Area famiglia" loading="lazy" /><div class="gallery-item-overlay"><p>Area famiglia con servizi dedicati</p></div></div>
        <div class="gallery-item" data-category="music_drinks" id="gallery-4"><img src="/images/gallery-cocktails.png" alt="Cocktail signature" loading="lazy" /><div class="gallery-item-overlay"><p>I nostri cocktail signature</p></div></div>
        <div class="gallery-item" data-category="sun_family" id="gallery-5"><img src="/images/gallery-yoga.png" alt="Yoga in spiaggia" loading="lazy" /><div class="gallery-item-overlay"><p>Yoga al sorgere del sole</p></div></div>
        <div class="gallery-item" data-category="sun_family" id="gallery-6"><img src="/images/restaurant.png" alt="Pranzo vista mare" loading="lazy" /><div class="gallery-item-overlay"><p>Pranzo vista mare</p></div></div>
        <div class="gallery-item" data-category="music_drinks" id="gallery-7"><img src="/images/events-dj.png" alt="DJ set sotto le stelle" loading="lazy" /><div class="gallery-item-overlay"><p>DJ set sotto le stelle</p></div></div>
        <div class="gallery-item" data-category="music_drinks" id="gallery-8"><img src="/images/gallery-vip.png" alt="Area VIP esclusiva" loading="lazy" /><div class="gallery-item-overlay"><p>Area VIP esclusiva</p></div></div>
      </div>
    </div>
  </section>
  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" id="lightbox-close" aria-label="Chiudi">✕</button>
    <img src="" alt="" id="lightbox-img" />
    <p class="lightbox-caption" id="lightbox-caption"></p>
  </div>`}function N(){let e=document.querySelectorAll(`[data-filter]`),t=document.querySelectorAll(`.gallery-item`);e.forEach(n=>n.addEventListener(`click`,()=>{e.forEach(e=>e.classList.remove(`active`)),n.classList.add(`active`);let r=n.getAttribute(`data-filter`);t.forEach(e=>e.classList.toggle(`hidden`,r!==`all`&&e.getAttribute(`data-category`)!==r))}));let n=document.getElementById(`lightbox`),r=document.getElementById(`lightbox-img`),i=document.getElementById(`lightbox-caption`),a=document.getElementById(`lightbox-close`);if(!n)return;let o=()=>{n.classList.remove(`active`),document.body.style.overflow=``};t.forEach(e=>e.addEventListener(`click`,()=>{let t=e.querySelector(`img`),a=e.querySelector(`.gallery-item-overlay p`);t&&(r.src=t.src,r.alt=t.alt),a&&(i.textContent=a.textContent),n.classList.add(`active`),document.body.style.overflow=`hidden`})),a.addEventListener(`click`,o),n.addEventListener(`click`,e=>{e.target===n&&o()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&o()})}var P=t({init:()=>z,template:()=>R}),F=new g(3,300*1e3),I=[`prima_fila`,`gazebo`,`famiglia`,`qualsiasi`],L=[`cena`,`aperitivo`,`vip`,`evento`];function R(){return`
  <section class="section booking-section" id="booking">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">Prenota</span>
        <h2>Riserva il Tuo Posto</h2>
        <p class="section-subtitle">Scegli la tua esperienza e prenota in pochi click. Ti aspettiamo!</p>
      </div>
      <div class="booking-container reveal-scale">
        <div class="booking-tabs">
          <button class="booking-tab active" data-booking-tab="sunbed" id="booking-tab-sunbed">☀️ Lettino &amp; Ombrellone</button>
          <button class="booking-tab" data-booking-tab="table" id="booking-tab-table">🌙 Tavolo &amp; VIP</button>
        </div>
        <form class="booking-form active" id="booking-form-sunbed">
          <div class="hp-field" aria-hidden="true" tabindex="-1"><label for="sunbed-website">Non compilare</label><input type="text" id="sunbed-website" name="website" autocomplete="off" tabindex="-1" /></div>
          <div class="form-row"><div class="form-group"><label class="form-label" for="sunbed-name">Nome e Cognome</label><input type="text" class="form-input" id="sunbed-name" name="name" placeholder="Mario Rossi" required maxlength="100" autocomplete="name" /></div><div class="form-group"><label class="form-label" for="sunbed-phone">Telefono</label><input type="tel" class="form-input" id="sunbed-phone" name="phone" placeholder="+39 333 1234567" required maxlength="20" autocomplete="tel" pattern="[+0-9\\s\\-()]{6,20}" /></div></div>
          <div class="form-row"><div class="form-group"><label class="form-label" for="sunbed-date">Data</label><input type="date" class="form-input" id="sunbed-date" name="date" required /></div><div class="form-group"><label class="form-label" for="sunbed-guests">Numero Persone</label><select class="form-select" id="sunbed-guests" name="guests"><option value="1">1 persona</option><option value="2" selected>2 persone</option><option value="3">3 persone</option><option value="4">4 persone</option><option value="5">5+ persone</option></select></div></div>
          <div class="form-row"><div class="form-group full-width"><label class="form-label" for="sunbed-area">Zona Preferita</label><select class="form-select" id="sunbed-area" name="area"><option value="prima_fila">Prima Fila — Vista Mare</option><option value="gazebo">Gazebo Privato</option><option value="famiglia">Area Famiglia</option><option value="qualsiasi">Qualsiasi Zona</option></select></div></div>
          <div class="form-row"><div class="form-group full-width"><label class="form-label" for="sunbed-notes">Note</label><textarea class="form-textarea" id="sunbed-notes" name="notes" placeholder="Esigenze particolari, bambini, ecc..." rows="3" maxlength="500"></textarea></div></div>
          <div class="form-error" id="sunbed-error" role="alert"></div>
          <button type="submit" class="btn btn-primary booking-submit" id="booking-submit-sunbed">☀️ Prenota via WhatsApp</button>
          <p class="booking-whatsapp-note"><span>💬</span> La prenotazione verrà inviata direttamente su WhatsApp</p>
        </form>
        <form class="booking-form" id="booking-form-table">
          <div class="hp-field" aria-hidden="true" tabindex="-1"><label for="table-website">Non compilare</label><input type="text" id="table-website" name="website" autocomplete="off" tabindex="-1" /></div>
          <div class="form-row"><div class="form-group"><label class="form-label" for="table-name">Nome e Cognome</label><input type="text" class="form-input" id="table-name" name="name" placeholder="Mario Rossi" required maxlength="100" autocomplete="name" /></div><div class="form-group"><label class="form-label" for="table-phone">Telefono</label><input type="tel" class="form-input" id="table-phone" name="phone" placeholder="+39 333 1234567" required maxlength="20" autocomplete="tel" pattern="[+0-9\\s\\-()]{6,20}" /></div></div>
          <div class="form-row"><div class="form-group"><label class="form-label" for="table-date">Data</label><input type="date" class="form-input" id="table-date" name="date" required /></div><div class="form-group"><label class="form-label" for="table-guests">Numero Persone</label><select class="form-select" id="table-guests" name="guests"><option value="2">2 persone</option><option value="4" selected>4 persone</option><option value="6">6 persone</option><option value="8">8 persone</option><option value="10">10+ persone</option></select></div></div>
          <div class="form-row"><div class="form-group full-width"><label class="form-label" for="table-area">Tipo Tavolo</label><select class="form-select" id="table-area" name="area"><option value="cena">Cena — Ristorante</option><option value="aperitivo">Aperitivo al Tramonto</option><option value="vip">Tavolo VIP — Bottle Service</option><option value="evento">Per Evento/Serata</option></select></div></div>
          <div class="form-row"><div class="form-group full-width"><label class="form-label" for="table-notes">Note</label><textarea class="form-textarea" id="table-notes" name="notes" placeholder="Occasione speciale, allergie, richieste particolari..." rows="3" maxlength="500"></textarea></div></div>
          <div class="form-error" id="table-error" role="alert"></div>
          <button type="submit" class="btn btn-primary booking-submit" id="booking-submit-table">🌙 Prenota via WhatsApp</button>
          <p class="booking-whatsapp-note"><span>💬</span> La prenotazione verrà inviata direttamente su WhatsApp</p>
        </form>
      </div>
    </div>
  </section>`}function z(){document.querySelectorAll(`[data-booking-tab]`).forEach(e=>e.addEventListener(`click`,()=>B(e.getAttribute(`data-booking-tab`))));let e=document.getElementById(`booking-form-sunbed`),t=document.getElementById(`booking-form-table`);e&&e.addEventListener(`submit`,e=>U(e,`sunbed`)),t&&t.addEventListener(`submit`,e=>U(e,`table`));let n=new Date().toISOString().split(`T`)[0],r=new Date;r.setFullYear(r.getFullYear()+1);let i=r.toISOString().split(`T`)[0];document.querySelectorAll(`input[type="date"]`).forEach(e=>{e.setAttribute(`min`,n),e.setAttribute(`max`,i),e.value||=n})}function B(e){document.querySelectorAll(`[data-booking-tab]`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`.booking-form`).forEach(e=>e.classList.remove(`active`));let t=document.querySelector(`[data-booking-tab="${e}"]`),n=document.getElementById(`booking-form-${e}`);t&&t.classList.add(`active`),n&&n.classList.add(`active`)}function V(e,t){let n=document.getElementById(`${e}-error`);n&&(n.textContent=t,n.style.display=`block`)}function H(e){let t=document.getElementById(`${e}-error`);t&&(t.textContent=``,t.style.display=`none`)}async function U(e,t){e.preventDefault(),H(t);let n=e.target,r=new FormData(n),i=n.querySelector(`.booking-submit`);if(ie(r)){_(`warn`,`Bot detected via honeypot`);return}let a=F.check();if(!a.allowed){V(t,a.message);return}let o=t===`sunbed`?I:L,s=ee(r.get(`name`));if(!s.valid){V(t,s.error);return}let c=m(r.get(`phone`));if(!c.valid){V(t,c.error);return}let l=te(r.get(`date`));if(!l.valid){V(t,l.error);return}let u=ne(r.get(`guests`));if(!u.valid){V(t,u.error);return}let d=h(r.get(`area`),o);if(!d.valid){V(t,d.error);return}let f=re(r.get(`notes`),500),g=s.cleaned,v=c.cleaned,y=l.cleaned,S=u.cleaned,C=d.cleaned,w=f.cleaned;i&&(i.disabled=!0,i.textContent=`⏳ Invio...`);try{let e=new Date(y+`T00:00:00`).toLocaleDateString(`it-IT`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}),n=[`🏖️ *PRENOTAZIONE NELLO OCEAN BEACH*`,``,t===`sunbed`?`☀️ LETTINO & OMBRELLONE`:`🌙 TAVOLO / VIP`,`👤 Nome: ${g}`,`📞 Telefono: ${v}`,`📅 Data: ${e}`,`👥 Persone: ${S}`,`📍 Zona: ${{prima_fila:`Prima Fila - Vista Mare`,gazebo:`Gazebo Privato`,famiglia:`Area Famiglia`,qualsiasi:`Qualsiasi Zona`,cena:`Cena - Ristorante`,aperitivo:`Aperitivo al Tramonto`,vip:`Tavolo VIP - Bottle Service`,evento:`Per Evento/Serata`}[C]||C}`,w?`📝 Note: ${w}`:``,``,`Grazie! Attendo conferma 🙏`].filter(Boolean).join(`
`),r=`https://wa.me/39XXXXXXXXXX?text=${encodeURIComponent(n)}`;if(x())try{await b({booking_type:t,guest_name:p(g,100),guest_phone:v,booking_date:y,num_guests:S,preferred_area:C,notes:p(w,500)})}catch{_(`warn`,`DB save failed`)}window.open(r,`_blank`)}finally{i&&(i.disabled=!1,i.textContent=t===`sunbed`?`☀️ Prenota via WhatsApp`:`🌙 Prenota via WhatsApp`)}}window.activateBookingTab=B;var W=t({init:()=>K,template:()=>G});function G(){return`
  <section class="section info-section" id="info">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">Dove Trovarci</span>
        <h2>Info &amp; Posizione</h2>
        <p class="section-subtitle">Raggiungerci è semplice. Ecco tutto quello che ti serve sapere.</p>
      </div>
      <div class="info-grid">
        <div class="info-map reveal-left">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12000!2d14.98!3d40.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDM2JzAwLjAiTiAxNMKwNTgnNDguMCJF!5e0!3m2!1sit!2sit!4v1!" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mappa Nello Ocean Beach"></iframe>
        </div>
        <div class="info-details reveal-right">
          <div class="info-card"><div class="info-card-icon">📍</div><div><h4>Indirizzo</h4><p>Lungomare di Battipaglia, 84091<br>Battipaglia (SA), Italia</p></div></div>
          <div class="info-card"><div class="info-card-icon">🕐</div><div><h4>Orari di Apertura</h4><p>Spiaggia: 08:00 — 19:00<br>Ristorante: 12:00 — 23:30<br>Club: Ven-Sab 21:00 — 03:00</p></div></div>
          <div class="info-card"><div class="info-card-icon">📞</div><div><h4>Contatti</h4><p>Tel: +39 XXX XXX XXXX<br>Email: info@nellooceanbeach.it</p></div></div>
          <div class="info-card"><div class="info-card-icon">🅿️</div><div><h4>Parcheggio</h4><p>Ampio parcheggio gratuito disponibile.<br>Servizio navetta nei weekend estivi.</p></div></div>
          <div class="accordion">
            <div class="accordion-item"><button class="accordion-trigger" id="accordion-rules"><span>📋 Regole della Casa</span><span class="accordion-icon">+</span></button><div class="accordion-content"><div class="accordion-content-inner">• Divieto di portare cibo e bevande dall'esterno<br>• Costume da bagno obbligatorio nell'area spiaggia<br>• Minori accompagnati dopo le 18:00<br>• No fumo nell'area ristorante<br>• Rispettare gli altri ospiti e il volume della musica nelle aree relax<br>• Il dress code serale è smart casual</div></div></div>
            <div class="accordion-item"><button class="accordion-trigger" id="accordion-faq"><span>❓ Domande Frequenti</span><span class="accordion-icon">+</span></button><div class="accordion-content"><div class="accordion-content-inner"><strong>Posso portare il mio animale?</strong><br>Sì, i cani di piccola taglia sono benvenuti nell'area dedicata.<br><br><strong>È necessaria la prenotazione?</strong><br>Consigliata nei weekend e durante gli eventi. Accesso libero nei giorni feriali.<br><br><strong>C'è il Wi-Fi?</strong><br>Sì, Wi-Fi gratuito in tutto lo stabilimento.</div></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>`}function K(){document.querySelectorAll(`.accordion-trigger`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`.accordion-item`),n=t.querySelector(`.accordion-content`),r=n.querySelector(`.accordion-content-inner`),i=t.classList.contains(`open`);document.querySelectorAll(`.accordion-item`).forEach(e=>{e.classList.remove(`open`),e.querySelector(`.accordion-content`).style.maxHeight=`0`}),i||(t.classList.add(`open`),n.style.maxHeight=r.scrollHeight+`px`)})})}var q=t({init:()=>Y,template:()=>J});function J(){return`
  <footer class="footer" id="footer">
    <div class="footer-wave"><svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path fill="var(--bg-secondary)" d="M0,30 C480,80 960,0 1440,50 L1440,0 L0,0 Z"></path></svg></div>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>Nello <span style="color: var(--mediterranean-azure);">Ocean</span> Beach</h3>
          <p>Dove il mare incontra l'anima. Il beach club premium della costa del Cilento, per chi cerca relax, gusto e divertimento senza compromessi.</p>
          <div class="footer-social">
            <a href="#" aria-label="Instagram" title="Instagram">📷</a>
            <a href="#" aria-label="Facebook" title="Facebook">📘</a>
            <a href="#" aria-label="TikTok" title="TikTok">🎵</a>
            <a href="https://wa.me/39XXXXXXXXXX" aria-label="WhatsApp" title="WhatsApp">💬</a>
          </div>
        </div>
        <div class="footer-col"><h4>Esplora</h4><ul><li><a href="#beach">Spiaggia</a></li><li><a href="#restaurant">Ristorante</a></li><li><a href="#events">Eventi</a></li><li><a href="#gallery">Gallery</a></li></ul></div>
        <div class="footer-col"><h4>Servizi</h4><ul><li><a href="#booking">Prenota Lettino</a></li><li><a href="#booking">Prenota Tavolo</a></li><li><a href="#events">Eventi Privati</a></li><li><a href="#info">Come Arrivare</a></li></ul></div>
        <div class="footer-col"><h4>Resta Aggiornato</h4><p style="font-size:0.85rem;color:rgba(245,239,230,0.5);margin-bottom:1rem;">Iscriviti per ricevere offerte esclusive e aggiornamenti sugli eventi.</p><div class="footer-newsletter"><input type="email" placeholder="La tua email" id="newsletter-email" /><button class="btn btn-primary" style="width:100%;justify-content:center;" id="newsletter-submit">Iscriviti</button></div></div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Nello Ocean Beach. Tutti i diritti riservati.</span>
        <div class="footer-bottom-links"><a href="#">Privacy Policy</a><a href="#">Cookie Policy</a><a href="#">Termini e Condizioni</a></div>
      </div>
    </div>
  </footer>`}function Y(){}function X(){let e=document.getElementById(`theme-toggle`),t=document.getElementById(`toggle-icon`);if(!e)return;let n=localStorage.getItem(`nello-theme`);n&&(document.documentElement.setAttribute(`data-theme`,n),t&&(t.textContent=n===`night`?`🌙`:`☀️`)),e.addEventListener(`click`,()=>{Z(document.documentElement.getAttribute(`data-theme`)===`night`?`day`:`night`)}),e.addEventListener(`keydown`,t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e.click())})}function Z(e){document.documentElement.setAttribute(`data-theme`,e),localStorage.setItem(`nello-theme`,e);let t=document.getElementById(`toggle-icon`);t&&(t.textContent=e===`night`?`🌙`:`☀️`)}function ae(e){let t=document.querySelector(e);t&&t.scrollIntoView({behavior:`smooth`})}window.switchTheme=Z,window.smoothScrollTo=ae;function oe(){let e=document.querySelectorAll(`.reveal, .reveal-left, .reveal-right, .reveal-scale`);if(!e.length)return;function t(){let t=window.innerHeight;e.forEach(e=>{if(e.classList.contains(`visible`))return;let n=e.getBoundingClientRect(),r=t*.92;n.top<r&&e.classList.add(`visible`)})}t();let n=!1;window.addEventListener(`scroll`,()=>{n||=(requestAnimationFrame(()=>{t(),n=!1}),!0)},{passive:!0}),window.addEventListener(`resize`,t,{passive:!0}),window.addEventListener(`load`,t)}function se(){let e=document.getElementById(`sunset-text`);if(!e)return;function t(){let t=new Date,n=new Date(t.getFullYear(),0,1),r=Math.floor((t-n)/864e5)+1,i=1065+2.5*60*Math.sin(2*Math.PI*(r-80-10)/365),a=Math.floor(i/60),o=Math.floor(i%60),s=i-(t.getHours()*60+t.getMinutes());s>0?e.textContent=`Tramonto tra ${Math.floor(s/60)}h ${Math.floor(s%60).toString().padStart(2,`0`)}m`:s>-90?e.textContent=`🌅 Golden Hour in corso!`:e.textContent=`Prossimo tramonto: ~${a}:${o.toString().padStart(2,`0`)}`}t(),setInterval(t,6e4)}var Q=[{module:n,target:`beforeMain`},{module:a,target:`main`},{module:c,target:`main`},{module:S,target:`main`},{module:O,target:`main`},{module:j,target:`main`},{module:P,target:`main`},{module:W,target:`main`},{module:q,target:`afterMain`}];function $(){let e=document.getElementById(`app`);if(!e)return;let t=``,n=``,r=``;Q.forEach(({module:e,target:i})=>{let a=e.template();i===`beforeMain`?t+=a:i===`afterMain`?r+=a:n+=a}),e.innerHTML=t+`<main>`+n+`</main>`+r,Q.forEach(({module:e})=>e.init()),X(),oe(),se()}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,$):$();