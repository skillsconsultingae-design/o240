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

export interface CheckoutResult {
  /** true si la commande "paiement sur place" est enregistree (pas de redirection Stripe) */
  confirmed: boolean;
  numero?: number | null;
}

/**
 * Cree la commande cote Supabase.
 * - Paiement en ligne : cree une session Stripe Checkout et redirige le
 *   navigateur vers la page de paiement (retour sur /checkout?success=1 ou ?canceled=1).
 * - Paiement sur place : la commande est enregistree et part directement en
 *   impression au restaurant ; la fonction resout avec { confirmed: true }.
 */
export async function startCheckout(params: {
  items: CartItem[];
  customer: CustomerInfo;
  deliveryMode: 'delivery' | 'pickup' | null;
  paymentMethod: 'online' | 'onsite';
}): Promise<CheckoutResult> {
  const { items, customer, deliveryMode, paymentMethod } = params;

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
      paiement: paymentMethod === 'onsite' ? 'sur_place' : 'en_ligne',
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

  // Paiement sur place : pas de Stripe, la commande est deja enregistree
  if (data?.ok) return { confirmed: true, numero: data.numero ?? null };

  if (!data?.url) throw new Error(data?.error || 'Impossible de démarrer le paiement');

  window.location.href = data.url; // redirection vers Stripe
  return { confirmed: false };
}
