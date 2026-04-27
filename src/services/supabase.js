import { createClient } from '@supabase/supabase-js';

// ============================================================
// Supabase Configuration
// ============================================================
// Replace these with your actual Supabase project credentials.
// You can find them in: Supabase Dashboard → Settings → API
//
// For production, use environment variables:
//   VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// ============================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase = null;
try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (e) {
  console.warn('Supabase init skipped:', e.message);
}
export { supabase };

// ============================================================
// Database Helper Functions
// ============================================================

/**
 * Fetch upcoming events, optionally filtered by featured status
 */
export async function getEvents({ featured = false, limit = 10 } = {}) {
  let query = supabase
    .from('events')
    .select('*')
    .gte('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: true })
    .limit(limit);

  if (featured) {
    query = query.eq('is_featured', true);
  }

  const { data, error } = await query;
  if (error) {
    console.warn('Error fetching events:', error.message);
    return [];
  }
  return data;
}

/**
 * Fetch gallery items, optionally filtered by category
 */
export async function getGalleryItems(category = null) {
  let query = supabase
    .from('gallery_items')
    .select('*')
    .order('sort_order', { ascending: true });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) {
    console.warn('Error fetching gallery:', error.message);
    return [];
  }
  return data;
}

/**
 * Fetch menu items by category
 */
export async function getMenuItems(category = null) {
  let query = supabase
    .from('menu_items')
    .select('*')
    .order('sort_order', { ascending: true });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) {
    console.warn('Error fetching menu:', error.message);
    return [];
  }
  return data;
}

/**
 * Submit a booking (sunbed or table)
 */
export async function createBooking(bookingData) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select();

  if (error) {
    console.error('Error creating booking:', error.message);
    throw error;
  }
  return data[0];
}

/**
 * Submit a contact message
 */
export async function sendContactMessage(messageData) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([messageData])
    .select();

  if (error) {
    console.error('Error sending message:', error.message);
    throw error;
  }
  return data[0];
}

/**
 * Submit a private event request
 */
export async function createPrivateEventRequest(requestData) {
  const { data, error } = await supabase
    .from('private_event_requests')
    .insert([requestData])
    .select();

  if (error) {
    console.error('Error creating event request:', error.message);
    throw error;
  }
  return data[0];
}

/**
 * Check if Supabase is properly configured
 */
export function isSupabaseConfigured() {
  return supabase !== null && supabaseUrl !== '' && supabaseAnonKey !== '';
}
