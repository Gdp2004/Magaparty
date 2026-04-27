import { createClient } from '@supabase/supabase-js';
import { sanitizeInput, safeLog } from '../utils/security.js';

// ============================================================
// Supabase Configuration (Hardened)
// ============================================================
// Use environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// ============================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase = null;
try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      // Security: Limit global headers, disable realtime if not needed
      auth: {
        persistSession: false, // No auth needed for public site
        autoRefreshToken: false,
      },
      global: {
        headers: {
          'X-Client-Info': 'nello-ocean-beach',
        },
      },
    });
  }
} catch (e) {
  safeLog('warn', 'Supabase init skipped');
}
export { supabase };

// ============================================================
// Query timeout wrapper
// ============================================================
const QUERY_TIMEOUT_MS = 10000; // 10 seconds max per query

function withTimeout(promise, ms = QUERY_TIMEOUT_MS) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Query timeout')), ms)
    ),
  ]);
}

// ============================================================
// Database Helper Functions (Hardened)
// ============================================================

/**
 * Fetch upcoming events — SELECT only needed columns (no *)
 */
export async function getEvents({ featured = false, limit = 10 } = {}) {
  if (!supabase) return [];
  try {
    // Security: select only needed columns, not *
    let query = supabase
      .from('events')
      .select('id, event_name, event_date, event_time, dj_name, genre, description, is_featured')
      .gte('event_date', new Date().toISOString().split('T')[0])
      .order('event_date', { ascending: true })
      .limit(Math.min(limit, 50)); // Cap max results

    if (featured) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await withTimeout(query);
    if (error) {
      safeLog('warn', 'Error fetching events');
      return [];
    }
    return data || [];
  } catch (e) {
    safeLog('warn', 'Events query failed');
    return [];
  }
}

/**
 * Fetch gallery items — SELECT only needed columns
 */
export async function getGalleryItems(category = null) {
  if (!supabase) return [];
  try {
    let query = supabase
      .from('gallery_items')
      .select('id, image_url, category, caption, sort_order')
      .order('sort_order', { ascending: true })
      .limit(50);

    if (category) {
      // Validate category whitelist
      const allowedCategories = ['sun_family', 'music_drinks'];
      if (!allowedCategories.includes(category)) return [];
      query = query.eq('category', category);
    }

    const { data, error } = await withTimeout(query);
    if (error) {
      safeLog('warn', 'Error fetching gallery');
      return [];
    }
    return data || [];
  } catch (e) {
    safeLog('warn', 'Gallery query failed');
    return [];
  }
}

/**
 * Fetch menu items — SELECT only needed columns, validate category
 */
export async function getMenuItems(category = null) {
  if (!supabase) return [];
  try {
    let query = supabase
      .from('menu_items')
      .select('id, category, name, description, price, is_featured, sort_order')
      .order('sort_order', { ascending: true })
      .limit(50);

    if (category) {
      const allowedCategories = ['pranzo', 'aperitivo', 'cena', 'drink'];
      if (!allowedCategories.includes(category)) return [];
      query = query.eq('category', category);
    }

    const { data, error } = await withTimeout(query);
    if (error) {
      safeLog('warn', 'Error fetching menu');
      return [];
    }
    return data || [];
  } catch (e) {
    safeLog('warn', 'Menu query failed');
    return [];
  }
}

/**
 * Submit a booking — validates and sanitizes before insert
 */
export async function createBooking(bookingData) {
  if (!supabase) throw new Error('Database not configured');

  // Server-side sanitization (defense in depth — client already validates)
  const sanitized = {
    booking_type: bookingData.booking_type,
    guest_name: sanitizeInput(bookingData.guest_name, 100),
    guest_phone: sanitizeInput(bookingData.guest_phone, 20),
    booking_date: bookingData.booking_date,
    num_guests: Math.max(1, Math.min(50, parseInt(bookingData.num_guests, 10) || 1)),
    preferred_area: bookingData.preferred_area || null,
    notes: bookingData.notes ? sanitizeInput(bookingData.notes, 500) : null,
    status: 'pending', // Force pending status — never trust client
  };

  try {
    const { data, error } = await withTimeout(
      supabase.from('bookings').insert([sanitized]).select('id')
    );

    if (error) {
      safeLog('error', 'Booking failed');
      throw new Error('Booking submission failed');
    }
    return data?.[0];
  } catch (e) {
    safeLog('error', 'Booking error');
    throw new Error('Booking submission failed');
  }
}

/**
 * Submit a contact message — sanitized
 */
export async function sendContactMessage(messageData) {
  if (!supabase) throw new Error('Database not configured');

  const sanitized = {
    name: sanitizeInput(messageData.name, 100),
    email: messageData.email || null,
    phone: messageData.phone ? sanitizeInput(messageData.phone, 20) : null,
    subject: messageData.subject ? sanitizeInput(messageData.subject, 200) : null,
    message: sanitizeInput(messageData.message, 2000),
    is_read: false, // Force unread — never trust client
  };

  try {
    const { data, error } = await withTimeout(
      supabase.from('contact_messages').insert([sanitized]).select('id')
    );

    if (error) {
      safeLog('error', 'Contact message failed');
      throw new Error('Message submission failed');
    }
    return data?.[0];
  } catch (e) {
    safeLog('error', 'Contact error');
    throw new Error('Message submission failed');
  }
}

/**
 * Submit a private event request — sanitized
 */
export async function createPrivateEventRequest(requestData) {
  if (!supabase) throw new Error('Database not configured');

  const allowedTypes = ['wedding', 'birthday', 'corporate', 'other'];
  const eventType = allowedTypes.includes(requestData.event_type)
    ? requestData.event_type
    : 'other';

  const sanitized = {
    event_type: eventType,
    contact_name: sanitizeInput(requestData.contact_name, 100),
    contact_phone: sanitizeInput(requestData.contact_phone, 20),
    contact_email: requestData.contact_email || null,
    event_date: requestData.event_date || null,
    num_guests: requestData.num_guests
      ? Math.max(1, Math.min(1000, parseInt(requestData.num_guests, 10) || 1))
      : null,
    description: requestData.description ? sanitizeInput(requestData.description, 2000) : null,
    budget_range: requestData.budget_range ? sanitizeInput(requestData.budget_range, 50) : null,
    status: 'new', // Force new status — never trust client
  };

  try {
    const { data, error } = await withTimeout(
      supabase.from('private_event_requests').insert([sanitized]).select('id')
    );

    if (error) {
      safeLog('error', 'Event request failed');
      throw new Error('Event request submission failed');
    }
    return data?.[0];
  } catch (e) {
    safeLog('error', 'Event request error');
    throw new Error('Event request submission failed');
  }
}

/**
 * Check if Supabase is properly configured
 */
export function isSupabaseConfigured() {
  return supabase !== null && supabaseUrl !== '' && supabaseAnonKey !== '';
}
