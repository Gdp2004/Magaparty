import './Booking.css';
import { createBooking, isSupabaseConfigured } from '../../services/supabase.js';
import {
  sanitizeInput, validateName, validatePhone, validateDate,
  validateGuests, validateArea, validateNotes,
  RateLimiter, isBot, safeLog
} from '../../utils/security.js';

// Rate limiter: max 3 bookings per 5 minutes
const bookingLimiter = new RateLimiter(3, 5 * 60 * 1000);

// Allowed area values (whitelist)
const SUNBED_AREAS = ['prima_fila', 'gazebo', 'famiglia', 'qualsiasi'];
const TABLE_AREAS = ['cena', 'aperitivo', 'vip', 'evento'];

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
  </section>`;
}

export function init() {
  // Tab switching
  document.querySelectorAll('[data-booking-tab]').forEach(tab =>
    tab.addEventListener('click', () => activateBookingTab(tab.getAttribute('data-booking-tab')))
  );

  // Bind form submit via addEventListener (no inline handlers)
  const sunbedForm = document.getElementById('booking-form-sunbed');
  const tableForm = document.getElementById('booking-form-table');
  if (sunbedForm) sunbedForm.addEventListener('submit', (e) => handleBooking(e, 'sunbed'));
  if (tableForm) tableForm.addEventListener('submit', (e) => handleBooking(e, 'table'));

  // Set min/max dates
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxStr = maxDate.toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.setAttribute('min', today);
    input.setAttribute('max', maxStr);
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

function showError(type, message) {
  const el = document.getElementById(`${type}-error`);
  if (el) { el.textContent = message; el.style.display = 'block'; }
}

function clearError(type) {
  const el = document.getElementById(`${type}-error`);
  if (el) { el.textContent = ''; el.style.display = 'none'; }
}

async function handleBooking(e, type) {
  e.preventDefault();
  clearError(type);

  const form = e.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('.booking-submit');

  // ── Honeypot check (bot detection) ──
  if (isBot(formData)) {
    safeLog('warn', 'Bot detected via honeypot');
    return; // Silently reject — don't tell bots they were caught
  }

  // ── Rate limiting ──
  const rateCheck = bookingLimiter.check();
  if (!rateCheck.allowed) {
    showError(type, rateCheck.message);
    return;
  }

  // ── Input validation ──
  const allowedAreas = type === 'sunbed' ? SUNBED_AREAS : TABLE_AREAS;

  const nameResult = validateName(formData.get('name'));
  if (!nameResult.valid) { showError(type, nameResult.error); return; }

  const phoneResult = validatePhone(formData.get('phone'));
  if (!phoneResult.valid) { showError(type, phoneResult.error); return; }

  const dateResult = validateDate(formData.get('date'));
  if (!dateResult.valid) { showError(type, dateResult.error); return; }

  const guestsResult = validateGuests(formData.get('guests'));
  if (!guestsResult.valid) { showError(type, guestsResult.error); return; }

  const areaResult = validateArea(formData.get('area'), allowedAreas);
  if (!areaResult.valid) { showError(type, areaResult.error); return; }

  const notesResult = validateNotes(formData.get('notes'), 500);

  // ── Build safe data ──
  const name = nameResult.cleaned;
  const phone = phoneResult.cleaned;
  const date = dateResult.cleaned;
  const guests = guestsResult.cleaned;
  const area = areaResult.cleaned;
  const notes = notesResult.cleaned;

  // ── Disable button (prevent double-submit) ──
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = '⏳ Invio...'; }

  try {
    const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const areaLabels = { prima_fila: 'Prima Fila - Vista Mare', gazebo: 'Gazebo Privato', famiglia: 'Area Famiglia', qualsiasi: 'Qualsiasi Zona', cena: 'Cena - Ristorante', aperitivo: 'Aperitivo al Tramonto', vip: 'Tavolo VIP - Bottle Service', evento: 'Per Evento/Serata' };
    const typeLabel = type === 'sunbed' ? '☀️ LETTINO & OMBRELLONE' : '🌙 TAVOLO / VIP';

    const message = [`🏖️ *PRENOTAZIONE NELLO OCEAN BEACH*`, '', typeLabel, `👤 Nome: ${name}`, `📞 Telefono: ${phone}`, `📅 Data: ${formattedDate}`, `👥 Persone: ${guests}`, `📍 Zona: ${areaLabels[area] || area}`, notes ? `📝 Note: ${notes}` : '', '', `Grazie! Attendo conferma 🙏`].filter(Boolean).join('\n');
    const whatsappUrl = `https://wa.me/39XXXXXXXXXX?text=${encodeURIComponent(message)}`;

    // Save to Supabase
    if (isSupabaseConfigured()) {
      try {
        await createBooking({
          booking_type: type,
          guest_name: sanitizeInput(name, 100),
          guest_phone: phone,
          booking_date: date,
          num_guests: guests,
          preferred_area: area,
          notes: sanitizeInput(notes, 500)
        });
      } catch (err) { safeLog('warn', 'DB save failed'); }
    }

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  } finally {
    // Re-enable button
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = type === 'sunbed' ? '☀️ Prenota via WhatsApp' : '🌙 Prenota via WhatsApp';
    }
  }
}

// Expose to global scope for events section VIP button
window.activateBookingTab = activateBookingTab;
