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

export async function getMenuItems(category?: 'pranzo' | 'aperitivo' | 'cena' | 'drink') {
  if (!isSupabaseConfigured() || !supabase) return [];
  
  try {
    let query = supabase
      .from('menu_items')
      .select('id, category, name, description, price, is_featured, sort_order')
      .order('sort_order', { ascending: true })
      .limit(50);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await withTimeout<any>(query as any);
    if (error) {
      console.error('Error fetching menu:', error);
      return [];
    }
    return data || [];
  } catch (e) {
    console.error('Menu query failed', e);
    return [];
  }
}
