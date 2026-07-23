// Edge Function : cree la commande (en_attente_paiement) + une session Stripe Checkout.
// Le site appelle cette fonction avec le panier ; elle renvoie l'URL de paiement Stripe.
//
// Deploiement :
//   supabase functions deploy create-checkout --no-verify-jwt
//   supabase secrets set STRIPE_SECRET_KEY=sk_...
//
// (SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont fournis automatiquement.)

import Stripe from 'https://esm.sh/stripe@16?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// ── Minimums de commande par zone de livraison ──
// Miroir de src/data/catalogue.ts (ZONES_LIVRAISON) : toute modification
// doit etre reportee des deux cotes.
const ZONES_LIVRAISON = [
  { minimum: 10, villes: ['saint michel sur orge', 'st michel sur orge'], codesPostaux: ['91240'] },
  { minimum: 15, villes: ['bretigny sur orge', 'sainte genevieve des bois', 'ste genevieve des bois'], codesPostaux: [] },
  { minimum: 20, villes: ['bondoufle', 'fleury merogis', 'plessis pate', 'linas', 'longpont sur orge', 'montlhery', 'villiers sur orge'], codesPostaux: ['91070'] },
  { minimum: 25, villes: ['arpajon', 'ballainvilliers', 'la ville du bois', 'marcoussis', 'nozay', 'saint germain les arpajon', 'st germain les arpajon', 'villemoisson sur orge'], codesPostaux: ['91290', '91160', '91620', '91460', '91180', '91360'] },
];

function normaliserAdresse(texte: string): string {
  return texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[-',.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function trouverZoneLivraison(adresse: string) {
  const addr = ` ${normaliserAdresse(adresse)} `;
  for (const zone of ZONES_LIVRAISON) {
    if (zone.villes.some((v) => addr.includes(` ${v} `))) return zone;
  }
  const cp = adresse.match(/\b(91\d{3})\b/)?.[1];
  if (cp) {
    for (const zone of ZONES_LIVRAISON) {
      if (zone.codesPostaux.includes(cp)) return zone;
    }
    // 91220 / 91700 partages entre deux zones : on retient le minimum le plus bas
    if (cp === '91220' || cp === '91700') return ZONES_LIVRAISON[1];
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const {
      panier, table_num, client_nom, client_email, client_tel,
      mode, adresse, notes, success_url, cancel_url,
    } = await req.json();

    if (!Array.isArray(panier) || panier.length === 0) {
      throw new Error('panier vide');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // 1) On enregistre la commande AVANT le paiement (source de verite chez nous)
    const total = panier.reduce(
      (s: number, i: any) => s + Number(i.prix_centimes) * Number(i.quantite), 0,
    );

    // Controle du minimum de commande pour la livraison (le front fait le meme
    // controle, celui-ci garantit qu'il n'est pas contournable)
    if (mode === 'delivery') {
      const zone = trouverZoneLivraison(String(adresse || ''));
      if (!zone) throw new Error('Adresse hors de nos zones de livraison');
      if (total < zone.minimum * 100) {
        throw new Error(`Minimum de commande de ${zone.minimum}€ non atteint pour votre zone`);
      }
    }

    const { data: commande, error } = await supabase
      .from('commandes')
      .insert({
        statut: 'en_attente_paiement',
        total_centimes: total,
        table_num, client_nom, client_email, client_tel,
        mode, adresse, notes,
      })
      .select()
      .single();
    if (error) throw error;

    await supabase.from('commande_lignes').insert(
      panier.map((i: any) => ({
        commande_id: commande.id,
        nom: i.nom,
        quantite: Number(i.quantite),
        prix_centimes: Number(i.prix_centimes),
      })),
    );

    // 2) Session Stripe Checkout — on garde le lien via metadata.commande_id
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-06-20' });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: panier.map((i: any) => ({
        price_data: {
          currency: 'eur',
          product_data: { name: i.nom },
          unit_amount: Number(i.prix_centimes),
        },
        quantity: Number(i.quantite),
      })),
      metadata: { commande_id: commande.id },
      customer_email: client_email || undefined,
      success_url: success_url || 'https://exemple.com/merci',
      cancel_url: cancel_url || 'https://exemple.com/panier',
    });

    return new Response(JSON.stringify({ url: session.url, commande_id: commande.id }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }
});
