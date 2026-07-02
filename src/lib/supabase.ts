import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Indique si Supabase est reellement configure (variables d'env presentes)
export const supabaseConfigured = Boolean(url && anonKey);

if (!supabaseConfigured) {
  // On NE crashe PAS l'app : on avertit seulement. Les fonctionnalites qui
  // dependent de Supabase (checkout, page commandes) resteront indisponibles
  // tant que VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY ne sont pas definies
  // dans le build de production (chez l'hebergeur).
  console.warn(
    '[supabase] Variables VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY manquantes — ' +
    'paiement et page commandes desactives. A definir chez l\'hebergeur.'
  );
}

// Valeurs de repli inoffensives pour que createClient ne leve jamais d'exception
// au chargement (sinon toute l'app plante -> ecran noir).
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-anon-key',
);
