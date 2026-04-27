/* Sunset countdown calculator for Battipaglia (40.6°N, 14.98°E) */

export function initSunsetCountdown() {
  const el = document.getElementById('sunset-text');
  if (!el) return;

  function calcSunset() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now - start) / 86400000) + 1;

    const baseMinutes = 17 * 60 + 45;
    const amplitude = 2.5 * 60;
    const offset = 10;
    const sunsetMinutes = baseMinutes + amplitude * Math.sin(2 * Math.PI * (dayOfYear - 80 - offset) / 365);

    const sunsetHour = Math.floor(sunsetMinutes / 60);
    const sunsetMin = Math.floor(sunsetMinutes % 60);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const diffMin = sunsetMinutes - nowMinutes;

    if (diffMin > 0) {
      const h = Math.floor(diffMin / 60);
      const m = Math.floor(diffMin % 60);
      el.textContent = `Tramonto tra ${h}h ${m.toString().padStart(2, '0')}m`;
    } else if (diffMin > -90) {
      el.textContent = `🌅 Golden Hour in corso!`;
    } else {
      el.textContent = `Prossimo tramonto: ~${sunsetHour}:${sunsetMin.toString().padStart(2, '0')}`;
    }
  }

  calcSunset();
  setInterval(calcSunset, 60000);
}
