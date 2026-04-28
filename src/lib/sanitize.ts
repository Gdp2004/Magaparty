/**
 * Simple text sanitization to prevent basic XSS and injection.
 * Removes HTML tags and trims whitespace.
 */
export function sanitizeText(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
    .replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m] || m) // Escape HTML entities
    .trim();
}

/**
 * Sanitizes phone numbers to keep only digits and some allowed symbols.
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^+0-9\s-()]/g, '').trim();
}

/**
 * Sanitizes emails to prevent basic injection.
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim().replace(/[<>()[\]\\,;:\s@"]/g, '');
}
