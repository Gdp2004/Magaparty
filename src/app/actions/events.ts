'use server';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const QUERY_TIMEOUT_MS = 10000;

function withTimeout<T>(promise: Promise<T>, ms = QUERY_TIMEOUT_MS): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Query timeout')), ms)
    ),
  ]);
}

export async function getEvents({ featured = false, limit = 10 }: { featured?: boolean; limit?: number } = {}) {
  if (!isSupabaseConfigured() || !supabase) return [];
  
  try {
    let query = supabase
      .from('events')
      .select('id, event_name, event_date, event_time, dj_name, genre, description, is_featured')
      .gte('event_date', new Date().toISOString().split('T')[0])
      .order('event_date', { ascending: true })
      .limit(Math.min(limit, 50));

    if (featured) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await withTimeout<any>(query as any);
    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }
    return data || [];
  } catch (e) {
    console.error('Events query failed', e);
    return [];
  }
}
