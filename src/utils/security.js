/* ============================================================
   SECURITY UTILITIES
   XSS prevention, input validation, rate limiting, sanitization
   ============================================================ */

// ── XSS Prevention ──

const HTML_ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#96;',
};

/**
 * Escape HTML special characters to prevent XSS in innerHTML
 * @param {string} str — Raw string (potentially from DB)
 * @returns {string} — Safe string for innerHTML injection
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'`/]/g, char => HTML_ESCAPE_MAP[char]);
}

/**
 * Sanitize input — strip HTML tags, trim, collapse whitespace
 * @param {string} str — User input
 * @param {number} maxLength — Max allowed length
 * @returns {string}
 */
export function sanitizeInput(str, maxLength = 500) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '')       // Strip HTML tags
    .replace(/[<>'"`;(){}]/g, '')  // Strip dangerous chars
    .replace(/\s+/g, ' ')          // Collapse whitespace
    .trim()
    .slice(0, maxLength);
}

// ── Input Validators ──

/**
 * Validate Italian phone number
 * Accepts: +39 333 1234567, 333-1234567, 3331234567, etc.
 */
export function validatePhone(phone) {
  if (typeof phone !== 'string') return { valid: false, error: 'Telefono richiesto' };
  const cleaned = phone.replace(/[\s\-().]/g, '');
  // Italian numbers: optionally +39, then 3xx (mobile) or 0xx (landline), 6-10 digits
  const pattern = /^(\+?39)?[03]\d{6,10}$/;
  if (!pattern.test(cleaned)) {
    return { valid: false, error: 'Formato telefono non valido (es. +39 333 1234567)' };
  }
  return { valid: true, cleaned };
}

/**
 * Validate a person's name
 * Only letters (including accented), spaces, apostrophes, hyphens
 */
export function validateName(name) {
  if (typeof name !== 'string') return { valid: false, error: 'Nome richiesto' };
  const trimmed = name.trim();
  if (trimmed.length < 2) return { valid: false, error: 'Nome troppo corto (min 2 caratteri)' };
  if (trimmed.length > 100) return { valid: false, error: 'Nome troppo lungo (max 100 caratteri)' };
  // Allow unicode letters, spaces, apostrophes, hyphens
  const pattern = /^[\p{L}\s''\-]+$/u;
  if (!pattern.test(trimmed)) {
    return { valid: false, error: 'Nome contiene caratteri non validi' };
  }
  return { valid: true, cleaned: trimmed };
}

/**
 * Validate a booking date
 * Must be today or in the future, max 1 year ahead
 */
export function validateDate(dateStr) {
  if (typeof dateStr !== 'string' || !dateStr) {
    return { valid: false, error: 'Data richiesta' };
  }
  const date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date.getTime())) {
    return { valid: false, error: 'Data non valida' };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) {
    return { valid: false, error: 'La data non può essere nel passato' };
  }
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  if (date > maxDate) {
    return { valid: false, error: 'Data troppo lontana (max 1 anno)' };
  }
  return { valid: true, cleaned: dateStr };
}

/**
 * Validate number of guests
 */
export function validateGuests(guests) {
  const n = parseInt(guests, 10);
  if (isNaN(n) || n < 1 || n > 50) {
    return { valid: false, error: 'Numero persone non valido (1-50)' };
  }
  return { valid: true, cleaned: n };
}

/**
 * Validate area against a whitelist of allowed values
 */
export function validateArea(area, allowedValues) {
  if (!allowedValues.includes(area)) {
    return { valid: false, error: 'Zona non valida' };
  }
  return { valid: true, cleaned: area };
}

/**
 * Validate notes/text field
 */
export function validateNotes(notes, maxLength = 500) {
  if (!notes || typeof notes !== 'string') return { valid: true, cleaned: '' };
  const sanitized = sanitizeInput(notes, maxLength);
  return { valid: true, cleaned: sanitized };
}

// ── Rate Limiter (Token Bucket) ──

export class RateLimiter {
  /**
   * @param {number} maxTokens — Max requests allowed in the window
   * @param {number} windowMs — Time window in milliseconds
   */
  constructor(maxTokens = 3, windowMs = 5 * 60 * 1000) {
    this.maxTokens = maxTokens;
    this.windowMs = windowMs;
    this.timestamps = [];
  }

  /**
   * Check if a request is allowed
   * @returns {{ allowed: boolean, retryAfterMs?: number }}
   */
  check() {
    const now = Date.now();
    // Remove expired timestamps
    this.timestamps = this.timestamps.filter(t => now - t < this.windowMs);

    if (this.timestamps.length >= this.maxTokens) {
      const oldestValid = this.timestamps[0];
      const retryAfterMs = this.windowMs - (now - oldestValid);
      return {
        allowed: false,
        retryAfterMs,
        message: `Troppe richieste. Riprova tra ${Math.ceil(retryAfterMs / 60000)} minuti.`
      };
    }

    this.timestamps.push(now);
    return { allowed: true };
  }

  /** Reset the limiter */
  reset() {
    this.timestamps = [];
  }
}

// ── Honeypot Checker ──

/**
 * Check if a honeypot field was filled (bot detection)
 * @param {FormData} formData
 * @param {string} fieldName — Name of the honeypot field
 * @returns {boolean} — true if bot detected
 */
export function isBot(formData, fieldName = 'website') {
  const value = formData.get(fieldName);
  return value !== null && value !== '';
}

// ── Safe Logging ──

const IS_PRODUCTION = import.meta.env.PROD;

/**
 * Log errors safely — no sensitive details in production
 */
export function safeLog(level, message, detail = null) {
  if (IS_PRODUCTION) {
    // In production, log only generic messages
    if (level === 'error') console.error(`[Nello] ${message}`);
    return;
  }
  // In development, log full details
  if (detail) {
    console[level](`[Nello] ${message}`, detail);
  } else {
    console[level](`[Nello] ${message}`);
  }
}
