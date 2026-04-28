// Zero-dependency input sanitization helpers. Intentionally conservative —
// strip anything that looks like markup or executable URI schemes before
// validation runs. These are not a substitute for output escaping.

const HTML_TAG_RE = /<[^>]*>/g;
const JS_URI_RE = /javascript:/gi;
const DATA_HTML_URI_RE = /data:text\/html/gi;
const ON_EVENT_RE = /on\w+\s*=/gi;
const X_ESCAPE_RE = /\\x[0-9a-fA-F]{2}/g;
const WHITESPACE_RE = /\s+/g;

const PHONE_ALLOWED_RE = /[^+0-9\s\-()]/g;
// RFC-light: local@domain.tld, no whitespace, no quoted locals.
const EMAIL_RE = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;

const TEXT_MAX = 1000;
const PHONE_MAX = 20;
const EMAIL_MAX = 254;

export function sanitizeText(input: string): string {
  return input
    .replace(HTML_TAG_RE, '')
    .replace(JS_URI_RE, '')
    .replace(DATA_HTML_URI_RE, '')
    .replace(ON_EVENT_RE, '')
    .replace(X_ESCAPE_RE, '')
    .replace(WHITESPACE_RE, ' ')
    .trim()
    .slice(0, TEXT_MAX);
}

export function sanitizePhone(input: string): string {
  return input.replace(PHONE_ALLOWED_RE, '').trim().slice(0, PHONE_MAX);
}

export function sanitizeEmail(input: string): string {
  const cleaned = input.toLowerCase().trim().slice(0, EMAIL_MAX);
  if (!EMAIL_RE.test(cleaned)) {
    throw new Error('Invalid email');
  }
  return cleaned;
}

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (c) => HTML_ENTITIES[c]);
}
