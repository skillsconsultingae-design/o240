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
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

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
