import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Aide au debug si le .env n'est pas rempli
  console.warn('[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY manquants (voir .env)');
}

export const supabase = createClient(url, anonKey);
