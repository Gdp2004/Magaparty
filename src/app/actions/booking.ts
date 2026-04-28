'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { sanitizeText, sanitizePhone } from '@/lib/sanitize';

// Rate limiting state (in-memory, per worker). Keyed by client IP when
// available, fallback to phone. In a multi-instance deployment this should
// be moved to a shared store (Redis / Upstash).
const rateLimiter = new Map<string, number[]>();
const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS = 3;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const userRequests = rateLimiter.get(key) || [];
  const validRequests = userRequests.filter((time) => now - time < WINDOW_MS);

  if (validRequests.length >= MAX_REQUESTS) {
    return false;
  }

  validRequests.push(now);
  rateLimiter.set(key, validRequests);
  return true;
}

async function getClientIp(): Promise<string | null> {
  const h = await headers();
  const forwarded = h.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  const real = h.get('x-real-ip');
  if (real) return real.trim();
  return null;
}

const INJECTION_RE = /<script|javascript:|onerror=/i;

const bookingSchema = z.object({
  booking_type: z.enum(['sunbed', 'table']),
  guest_name: z
    .string()
    .min(2, 'Nome troppo corto')
    .max(100, 'Nome troppo lungo')
    .regex(/^[\p{L}\p{M}\s\-'.]+$/u, 'Nome contiene caratteri non validi'),
  guest_phone: z
    .string()
    .regex(/^[+0-9\s\-()]{6,20}$/, 'Numero di telefono non valido'),
  booking_date: z.string().refine((val) => {
    const d = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d >= today;
  }, 'La data non può essere nel passato'),
  num_guests: z.number().min(1).max(50),
  preferred_area: z.string().optional(),
  notes: z
    .string()
    .max(500)
    .optional()
    .refine(
      (val) => !val || !INJECTION_RE.test(val),
      'Note contengono contenuto non consentito'
    ),
  website: z.string().max(0).optional(), // Honeypot
});

export async function submitBooking(formData: FormData) {
  // 1. Honeypot check
  if (formData.get('website')) {
    return { success: false, error: 'Bot detected' };
  }

  // 2. Sanitize raw inputs before anything else touches them
  const rawName = (formData.get('name') as string | null) ?? '';
  const rawPhone = (formData.get('phone') as string | null) ?? '';
  const rawNotes = (formData.get('notes') as string | null) ?? '';

  const guestName = sanitizeText(rawName);
  const guestPhone = sanitizePhone(rawPhone);
  const notes = sanitizeText(rawNotes);

  // 3. Rate limiting — prefer real client IP, fall back to phone
  const ip = await getClientIp();
  const rateKey = ip ?? guestPhone ?? 'unknown';
  if (!checkRateLimit(rateKey)) {
    return { success: false, error: 'Troppe richieste. Riprova tra 5 minuti.' };
  }

  // 4. Validation
  const result = bookingSchema.safeParse({
    booking_type: formData.get('type'),
    guest_name: guestName,
    guest_phone: guestPhone,
    booking_date: formData.get('date'),
    num_guests: parseInt(formData.get('guests') as string, 10),
    preferred_area: formData.get('area'),
    notes: notes || undefined,
  });

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  // 5. Save to DB
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('bookings').insert([
        {
          ...result.data,
          status: 'pending',
        },
      ]);

      if (error) throw error;
    } catch (e) {
      console.error('Failed to save booking', e);
      // We don't fail the user request if DB is down, just WhatsApp
    }
  }

  return { success: true, data: result.data };
}
