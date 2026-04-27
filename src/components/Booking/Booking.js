import './Booking.css';
import { createBooking, isSupabaseConfigured } from '../../services/supabase.js';

export function template() {
  return `
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
        <form class="booking-form active" id="booking-form-sunbed" onsubmit="handleBooking(event, 'sunbed')">
          <div class="form-row"><div class="form-group"><label class="form-label" for="sunbed-name">Nome e Cognome</label><input type="text" class="form-input" id="sunbed-name" name="name" placeholder="Mario Rossi" required /></div><div class="form-group"><label class="form-label" for="sunbed-phone">Telefono</label><input type="tel" class="form-input" id="sunbed-phone" name="phone" placeholder="+39 333 1234567" required /></div></div>
          <div class="form-row"><div class="form-group"><label class="form-label" for="sunbed-date">Data</label><input type="date" class="form-input" id="sunbed-date" name="date" required /></div><div class="form-group"><label class="form-label" for="sunbed-guests">Numero Persone</label><select class="form-select" id="sunbed-guests" name="guests"><option value="1">1 persona</option><option value="2" selected>2 persone</option><option value="3">3 persone</option><option value="4">4 persone</option><option value="5">5+ persone</option></select></div></div>
          <div class="form-row"><div class="form-group full-width"><label class="form-label" for="sunbed-area">Zona Preferita</label><select class="form-select" id="sunbed-area" name="area"><option value="prima_fila">Prima Fila — Vista Mare</option><option value="gazebo">Gazebo Privato</option><option value="famiglia">Area Famiglia</option><option value="qualsiasi">Qualsiasi Zona</option></select></div></div>
          <div class="form-row"><div class="form-group full-width"><label class="form-label" for="sunbed-notes">Note</label><textarea class="form-textarea" id="sunbed-notes" name="notes" placeholder="Esigenze particolari, bambini, ecc..." rows="3"></textarea></div></div>
          <button type="submit" class="btn btn-primary booking-submit" id="booking-submit-sunbed">☀️ Prenota via WhatsApp</button>
          <p class="booking-whatsapp-note"><span>💬</span> La prenotazione verrà inviata direttamente su WhatsApp</p>
        </form>
        <form class="booking-form" id="booking-form-table" onsubmit="handleBooking(event, 'table')">
          <div class="form-row"><div class="form-group"><label class="form-label" for="table-name">Nome e Cognome</label><input type="text" class="form-input" id="table-name" name="name" placeholder="Mario Rossi" required /></div><div class="form-group"><label class="form-label" for="table-phone">Telefono</label><input type="tel" class="form-input" id="table-phone" name="phone" placeholder="+39 333 1234567" required /></div></div>
          <div class="form-row"><div class="form-group"><label class="form-label" for="table-date">Data</label><input type="date" class="form-input" id="table-date" name="date" required /></div><div class="form-group"><label class="form-label" for="table-guests">Numero Persone</label><select class="form-select" id="table-guests" name="guests"><option value="2">2 persone</option><option value="4" selected>4 persone</option><option value="6">6 persone</option><option value="8">8 persone</option><option value="10">10+ persone</option></select></div></div>
          <div class="form-row"><div class="form-group full-width"><label class="form-label" for="table-area">Tipo Tavolo</label><select class="form-select" id="table-area" name="area"><option value="cena">Cena — Ristorante</option><option value="aperitivo">Aperitivo al Tramonto</option><option value="vip">Tavolo VIP — Bottle Service</option><option value="evento">Per Evento/Serata</option></select></div></div>
          <div class="form-row"><div class="form-group full-width"><label class="form-label" for="table-notes">Note</label><textarea class="form-textarea" id="table-notes" name="notes" placeholder="Occasione speciale, allergie, richieste particolari..." rows="3"></textarea></div></div>
          <button type="submit" class="btn btn-primary booking-submit" id="booking-submit-table">🌙 Prenota via WhatsApp</button>
          <p class="booking-whatsapp-note"><span>💬</span> La prenotazione verrà inviata direttamente su WhatsApp</p>
        </form>
      </div>
    </div>
  </section>`;
}

export function init() {
  // Tab switching
  const tabs = document.querySelectorAll('[data-booking-tab]');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    activateBookingTab(tab.getAttribute('data-booking-tab'));
  }));

  // Set min dates
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.setAttribute('min', today);
    if (!input.value) input.value = today;
  });
}

function activateBookingTab(type) {
  document.querySelectorAll('[data-booking-tab]').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.booking-form').forEach(f => f.classList.remove('active'));
  const activeTab = document.querySelector(`[data-booking-tab="${type}"]`);
  const activeForm = document.getElementById(`booking-form-${type}`);
  if (activeTab) activeTab.classList.add('active');
  if (activeForm) activeForm.classList.add('active');
}

async function handleBooking(e, type) {
  e.preventDefault();
  const data = new FormData(e.target);
  const name = data.get('name'), phone = data.get('phone'), date = data.get('date');
  const guests = data.get('guests'), area = data.get('area'), notes = data.get('notes') || '';

  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const areaLabels = { prima_fila: 'Prima Fila - Vista Mare', gazebo: 'Gazebo Privato', famiglia: 'Area Famiglia', qualsiasi: 'Qualsiasi Zona', cena: 'Cena - Ristorante', aperitivo: 'Aperitivo al Tramonto', vip: 'Tavolo VIP - Bottle Service', evento: 'Per Evento/Serata' };
  const typeLabel = type === 'sunbed' ? '☀️ LETTINO & OMBRELLONE' : '🌙 TAVOLO / VIP';

  const message = [`🏖️ *PRENOTAZIONE NELLO OCEAN BEACH*`, '', `${typeLabel}`, `👤 Nome: ${name}`, `📞 Telefono: ${phone}`, `📅 Data: ${formattedDate}`, `👥 Persone: ${guests}`, `📍 Zona: ${areaLabels[area] || area}`, notes ? `📝 Note: ${notes}` : '', '', `Grazie! Attendo conferma 🙏`].filter(Boolean).join('\n');
  const whatsappUrl = `https://wa.me/39XXXXXXXXXX?text=${encodeURIComponent(message)}`;

  if (isSupabaseConfigured()) {
    try { await createBooking({ booking_type: type, guest_name: name, guest_phone: phone, booking_date: date, num_guests: parseInt(guests), preferred_area: area, notes }); } catch (err) { console.warn('DB save failed:', err); }
  }
  window.open(whatsappUrl, '_blank');
}

// Expose to global scope for inline handlers
window.activateBookingTab = activateBookingTab;
window.handleBooking = handleBooking;
