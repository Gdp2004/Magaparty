'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { sanitizeText, sanitizePhone } from '@/lib/sanitize';

// Rate limiting state (in-memory, per worker)
const rateLimiter = new Map<string, number[]>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes
  const maxRequests = 3;

  const userRequests = rateLimiter.get(identifier) || [];
  const validRequests = userRequests.filter(time => now - time < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return false;
  }
  
  validRequests.push(now);
  rateLimiter.set(identifier, validRequests);
  return true;
}

const bookingSchema = z.object({
  booking_type: z.enum(['sunbed', 'table']),
  guest_name: z.string().min(2, 'Nome troppo corto').max(100, 'Nome troppo lungo'),
  guest_phone: z.string().regex(/^[+0-9\s-()]{6,20}$/, 'Numero di telefono non valido'),
  booking_date: z.string().refine(val => {
    const d = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d >= today;
  }, 'La data non può essere nel passato'),
  num_guests: z.number().min(1).max(50),
  preferred_area: z.string().optional(),
  notes: z.string().max(500).optional(),
  website: z.string().max(0).optional(), // Honeypot
});

export async function submitBooking(formData: FormData) {
  // 1. Honeypot check
  if (formData.get('website')) {
    return { success: false, error: 'Bot detected' };
  }

  // 2. Rate limiting (Using IP from headers)
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || 'unknown';
  const phone = formData.get('phone') as string;
  
  if (!checkRateLimit(ip) || !checkRateLimit(phone || 'unknown')) {
    return { success: false, error: 'Troppe richieste. Riprova tra 5 minuti.' };
  }

  // 3. Validation & Sanitization
  const result = bookingSchema.safeParse({
    booking_type: formData.get('type'),
    guest_name: sanitizeText(formData.get('name') as string),
    guest_phone: sanitizePhone(phone),
    booking_date: formData.get('date'),
    num_guests: parseInt(formData.get('guests') as string, 10),
    preferred_area: formData.get('area'),
    notes: sanitizeText(formData.get('notes') as string),
  });

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  // 4. Save to DB
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('bookings').insert([{
        ...result.data,
        status: 'pending'
      }]);
      
      if (error) throw error;
    } catch (e) {
      console.error('Failed to save booking', e);
      // We don't fail the user request if DB is down, just WhatsApp
    }
  }

  return { success: true, data: result.data };
}
