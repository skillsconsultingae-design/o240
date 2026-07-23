import { supabase } from './supabase';
import type { CartItem } from '../store/cart';
import {
  findProduit,
  PAINS_SANDWICHS,
  SAUCES_OFFERTES,
  BOISSONS_SUPP_ASSIETTE,
  SODIPS_LEGUMES,
  SODIPS_VIANDES,
  SODIPS_FROMAGES,
} from '../data/catalogue';

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

// Detail des options choisies (pain, viandes, sauces, boisson...) : transmis
// au restaurant pour que la cuisine sache exactement quoi preparer.
function itemDetails(item: CartItem): string[] {
  const details: string[] = [];

  if (item.pain) {
    const pain = PAINS_SANDWICHS.find((p) => p.id === item.pain);
    if (pain) details.push(`Pain : ${pain.nom}`);
  }
  if (item.viandes?.length) {
    for (const v of item.viandes) {
      details.push(v.quantite > 1 ? `${v.quantite}x ${v.nom}` : v.nom);
    }
  }
  if (item.sauces?.length) {
    const noms = item.sauces.map((id) => SAUCES_OFFERTES.find((s) => s.id === id)?.nom ?? id);
    details.push(`Sauces : ${noms.join(', ')}`);
  }
  if (item.boisson_menu) {
    details.push(`Boisson : ${item.boisson_menu}`);
  }
  if (item.boissons_supp?.length) {
    for (const id of item.boissons_supp) {
      const b = BOISSONS_SUPP_ASSIETTE.find((x) => x.id === id);
      details.push(`Boisson : ${b?.nom ?? id}`);
    }
  }
  // Toppings crepes sucrees (definis par produit)
  const produit = findProduit(item.id);
  if (produit?.type === 'crepe_sucree') {
    for (const id of item.toppings_gourmandises ?? []) {
      const t = produit.toppings_gourmandises.find((g) => g.id === id);
      details.push(t?.nom ?? id);
    }
    for (const id of item.toppings_fruits ?? []) {
      const t = produit.toppings_fruits.find((f) => f.id === id);
      details.push(t?.nom ?? id);
    }
  }
  // Ingredients Sodip's compose
  for (const id of item.sodips_legumes ?? []) {
    details.push(SODIPS_LEGUMES.find((x) => x.id === id)?.nom ?? id);
  }
  for (const id of item.sodips_viandes ?? []) {
    details.push(SODIPS_VIANDES.find((x) => x.id === id)?.nom ?? id);
  }
  for (const id of item.sodips_fromages ?? []) {
    details.push(SODIPS_FROMAGES.find((x) => x.id === id)?.nom ?? id);
  }

  return details;
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
    details: itemDetails(i),
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
