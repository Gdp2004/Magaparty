'use client';

import React, { useState } from 'react';
import styles from './Booking.module.css';
import { submitBooking } from '@/app/actions/booking';

type Tab = 'sunbed' | 'table';

export function Booking() {
  const [activeTab, setActiveTab] = useState<Tab>('sunbed');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTodayStr = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  const getMaxDateStr = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add type manually
    formData.append('type', activeTab);

    try {
      const result = await submitBooking(formData);
      
      if (!result.success) {
        setError(result.error || 'Errore durante la prenotazione');
        return;
      }

      // Format for WhatsApp
      const data = result.data!;
      const formattedDate = new Date(data.booking_date + 'T00:00:00').toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      
      const areaLabels: Record<string, string> = { 
        prima_fila: 'Prima Fila - Vista Mare', 
        gazebo: 'Gazebo Privato', 
        famiglia: 'Area Famiglia', 
        qualsiasi: 'Qualsiasi Zona', 
        cena: 'Cena - Ristorante', 
        aperitivo: 'Aperitivo al Tramonto', 
        vip: 'Tavolo VIP - Bottle Service', 
        evento: 'Per Evento/Serata' 
      };

      const typeLabel = activeTab === 'sunbed' ? '🏖️ LETTINO & OMBRELLONE' : '🍾 TAVOLO / VIP';
      const area = data.preferred_area ? areaLabels[data.preferred_area] || data.preferred_area : 'Non specificata';

      const message = [
        `🛎️ *PRENOTAZIONE NELLO OCEAN BEACH*`,
        '',
        typeLabel,
        `👤 Nome: ${data.guest_name}`,
        `📱 Telefono: ${data.guest_phone}`,
        `📅 Data: ${formattedDate}`,
        `👥 Persone: ${data.num_guests}`,
        `📍 Zona: ${area}`,
        data.notes ? `📝 Note: ${data.notes}` : '',
        '',
        `Grazie! Attendo conferma 🌊`
      ].filter(Boolean).join('\n');

      const whatsappUrl = `https://wa.me/39XXXXXXXXXX?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      form.reset();
    } catch (err) {
      setError('Si è verificato un errore imprevisto. Riprova più tardi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`section ${styles.bookingSection}`} id="booking">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Riserva il tuo posto</span>
          <h2>Prenota la tua Esperienza</h2>
          <p className="section-subtitle">Garantisciti il miglior posto al sole o il tavolo più esclusivo per la serata.</p>
        </div>

        <div className={`${styles.bookingContainer} reveal-scale`}>
          <div className={styles.bookingTabs}>
            <button 
              className={`${styles.bookingTab} ${activeTab === 'sunbed' ? styles.active : ''}`}
              onClick={() => setActiveTab('sunbed')}
            >
              🏖️ Lettini &amp; Ombrelloni
            </button>
            <button 
              className={`${styles.bookingTab} ${activeTab === 'table' ? styles.active : ''}`}
              onClick={() => setActiveTab('table')}
            >
              🍽️ Ristorante &amp; VIP
            </button>
          </div>

          <div className={styles.bookingFormContainer}>
            {error && <div className={styles.formError} role="alert">{error}</div>}

            {/* Form Lettini */}
            <form 
              className={`${styles.bookingForm} ${activeTab === 'sunbed' ? styles.active : ''}`} 
              onSubmit={handleSubmit}
            >
              <div className={styles.hpField} aria-hidden="true" tabIndex={-1}>
                <label htmlFor="sunbed-website">Non compilare</label>
                <input type="text" id="sunbed-website" name="website" autoComplete="off" tabIndex={-1} />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="sunbed-name">Nome e Cognome</label>
                  <input type="text" className={styles.formInput} id="sunbed-name" name="name" placeholder="Mario Rossi" required maxLength={100} autoComplete="name" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="sunbed-phone">Telefono</label>
                  <input type="tel" className={styles.formInput} id="sunbed-phone" name="phone" placeholder="+39 333 1234567" required maxLength={20} autoComplete="tel" pattern="[+0-9\s\-()]{6,20}" />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="sunbed-date">Data</label>
                  <input type="date" className={styles.formInput} id="sunbed-date" name="date" min={getTodayStr()} max={getMaxDateStr()} defaultValue={getTodayStr()} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="sunbed-guests">Numero Lettini</label>
                  <select className={styles.formSelect} id="sunbed-guests" name="guests" defaultValue="2">
                    <option value="1">1 lettino</option>
                    <option value="2">2 lettini + Ombrellone</option>
                    <option value="3">3 lettini</option>
                    <option value="4">4 lettini (2 Ombrelloni)</option>
                    <option value="5">5+ lettini</option>
                  </select>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.formLabel} htmlFor="sunbed-area">Zona Preferita</label>
                  <select className={styles.formSelect} id="sunbed-area" name="area" defaultValue="qualsiasi">
                    <option value="qualsiasi">Qualsiasi zona disponibile</option>
                    <option value="prima_fila">Prima Fila (Vista Mare)</option>
                    <option value="gazebo">Gazebo Privato</option>
                    <option value="famiglia">Area Famiglia (Vicino Giochi)</option>
                  </select>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.formLabel} htmlFor="sunbed-notes">Note</label>
                  <textarea className={styles.formTextarea} id="sunbed-notes" name="notes" placeholder="Necessità particolari, cani di piccola taglia..." rows={3} maxLength={500}></textarea>
                </div>
              </div>
              
              <button type="submit" className={`btn btn-primary ${styles.bookingSubmit}`} disabled={loading}>
                {loading ? '⏳ Invio in corso...' : '🏖️ Prenota via WhatsApp'}
              </button>
              <p className={styles.bookingWhatsappNote}><span>💬</span> La prenotazione verrà inviata direttamente su WhatsApp</p>
            </form>

            {/* Form Tavoli */}
            <form 
              className={`${styles.bookingForm} ${activeTab === 'table' ? styles.active : ''}`} 
              onSubmit={handleSubmit}
            >
              <div className={styles.hpField} aria-hidden="true" tabIndex={-1}>
                <label htmlFor="table-website">Non compilare</label>
                <input type="text" id="table-website" name="website" autoComplete="off" tabIndex={-1} />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="table-name">Nome e Cognome</label>
                  <input type="text" className={styles.formInput} id="table-name" name="name" placeholder="Mario Rossi" required maxLength={100} autoComplete="name" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="table-phone">Telefono</label>
                  <input type="tel" className={styles.formInput} id="table-phone" name="phone" placeholder="+39 333 1234567" required maxLength={20} autoComplete="tel" pattern="[+0-9\s\-()]{6,20}" />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="table-date">Data</label>
                  <input type="date" className={styles.formInput} id="table-date" name="date" min={getTodayStr()} max={getMaxDateStr()} defaultValue={getTodayStr()} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="table-guests">Numero Persone</label>
                  <select className={styles.formSelect} id="table-guests" name="guests" defaultValue="4">
                    <option value="2">2 persone</option>
                    <option value="4">4 persone</option>
                    <option value="6">6 persone</option>
                    <option value="8">8 persone</option>
                    <option value="10">10+ persone</option>
                  </select>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.formLabel} htmlFor="table-area">Tipo Tavolo</label>
                  <select className={styles.formSelect} id="table-area" name="area" defaultValue="cena">
                    <option value="cena">Cena - Ristorante</option>
                    <option value="aperitivo">Aperitivo al Tramonto</option>
                    <option value="vip">Tavolo VIP - Bottle Service</option>
                    <option value="evento">Per Evento/Serata</option>
                  </select>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.formLabel} htmlFor="table-notes">Note</label>
                  <textarea className={styles.formTextarea} id="table-notes" name="notes" placeholder="Occasione speciale, allergie, richieste particolari..." rows={3} maxLength={500}></textarea>
                </div>
              </div>
              
              <button type="submit" className={`btn btn-primary ${styles.bookingSubmit}`} disabled={loading}>
                {loading ? '⏳ Invio in corso...' : '🍾 Prenota via WhatsApp'}
              </button>
              <p className={styles.bookingWhatsappNote}><span>💬</span> La prenotazione verrà inviata direttamente su WhatsApp</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
