import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Next 16: this file replaces the legacy `middleware.ts` convention.
// See: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isDev = process.env.NODE_ENV === 'development';

  // CSP. 'unsafe-inline' on style-src is required because Next.js / React inject
  // small inline <style> tags for streaming + CSS-in-JS hydration; using a nonce
  // alone breaks first paint without significant rewiring of the layout.
  // 'unsafe-eval' is only enabled in dev (React debugging). See content-security-policy.md.
  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://js.stripe.com${isDev ? " 'unsafe-eval'" : ''}`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://*.googleapis.com https://*.gstatic.com https://maps.google.com`,
    `font-src 'self' https://fonts.gstatic.com data:`,
    `connect-src 'self' https://*.supabase.co https://api.stripe.com https://*.googleapis.com`,
    `frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.google.com https://maps.google.com https://*.google.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `upgrade-insecure-requests`,
  ].join('; ');

  // TODO: leggere nonce in layout via headers() per script inline
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  return response;
}

export const config = {
  matcher: [
    // Skip _next/static, _next/image, favicon.ico and the Stripe webhook
    // (the webhook needs the raw body untouched for signature verification).
    '/((?!_next/static|_next/image|favicon.ico|api/webhooks/stripe).*)',
  ],
};
