import { supabase } from './supabase';
import type { CartItem } from '../store/cart';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  instructions: string;
}

// Libelle lisible d'un article pour le ticket / Stripe (nom + formule)
function itemLabel(item: CartItem): string {
  if (item.formule === 'menu') return `${item.nom} (Menu)`;
  if (item.formule === 'seul') return `${item.nom} (Seul)`;
  return item.nom;
}

/**
 * Cree la commande cote Supabase + une session Stripe Checkout,
 * puis redirige le navigateur vers la page de paiement Stripe.
 * Au retour, Stripe renvoie sur /checkout?success=1 (ou ?canceled=1).
 */
export async function startCheckout(params: {
  items: CartItem[];
  customer: CustomerInfo;
  deliveryMode: 'delivery' | 'pickup' | null;
}): Promise<void> {
  const { items, customer, deliveryMode } = params;

  if (items.length === 0) throw new Error('Votre panier est vide');

  const panier = items.map((i) => ({
    nom: itemLabel(i),
    quantite: i.quantite,
    prix_centimes: Math.round(i.prix_unitaire * 100),
  }));

  const origin = window.location.origin;

  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: {
      panier,
      client_nom: `${customer.firstName} ${customer.lastName}`.trim(),
      client_email: customer.email || undefined,
      client_tel: customer.phone || undefined,
      mode: deliveryMode,                                  // 'delivery' | 'pickup'
      adresse: deliveryMode === 'delivery' ? customer.address : undefined,
      notes: customer.instructions || undefined,
      success_url: `${origin}/checkout?success=1`,
      cancel_url: `${origin}/checkout?canceled=1`,
    },
  });

  if (error) throw new Error(error.message);
  if (!data?.url) throw new Error(data?.error || 'Impossible de démarrer le paiement');

  window.location.href = data.url; // redirection vers Stripe
}
