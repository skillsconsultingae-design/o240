// Edge Function : webhook Stripe. Quand un paiement est confirme, on passe la
// commande en "payee" et on cree un job d'impression (l'agent imprime alors le ticket).
//
// Deploiement :
//   supabase functions deploy stripe-webhook --no-verify-jwt
//   supabase secrets set STRIPE_SECRET_KEY=sk_...
//   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
//
// Cote Stripe (Dashboard > Developers > Webhooks) : ajouter l'endpoint
//   https://<projet>.supabase.co/functions/v1/stripe-webhook
// et s'abonner a l'evenement : checkout.session.completed

import Stripe from 'https://esm.sh/stripe@16?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-06-20' });
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

Deno.serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature!, webhookSecret);
  } catch (e) {
    // Signature invalide -> on refuse (empeche les fausses commandes "payees")
    return new Response(`Webhook error: ${(e as Error).message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const commandeId = session.metadata?.commande_id;

    if (commandeId) {
      // 1) commande -> payee
      await supabase
        .from('commandes')
        .update({ statut: 'payee', stripe_session_id: session.id })
        .eq('id', commandeId);

      // 2) job d'impression -> l'agent imprime le ticket
      await supabase.from('impressions').insert({ commande_id: commandeId });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
