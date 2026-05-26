import { create } from 'zustand';
import toast from 'react-hot-toast';
import {
  findProduit,
  BOISSONS_SUPP_ASSIETTE,
  PAINS_SANDWICHS,
  type Produit,
  type ProduitSimple,
  type ProduitFormule,
  type ProduitAssiette,
  type ProduitCrepe,
} from '../data/catalogue';

// ── Cart item types ──

export interface ViandeSelection {
  id: string;
  nom: string;
  quantite: number;
}

export interface CartItem {
  id: string;
  nom: string;
  categorie: string;
  formule?: 'seul' | 'menu';
  boisson_menu?: string;
  pain?: string;
  viandes?: ViandeSelection[];
  boissons_supp?: string[];
  toppings_gourmandises?: string[];
  toppings_fruits?: string[];
  sauces?: string[];
  prix_unitaire: number;
  quantite: number;
  cartKey: string;
}

// ── Price calculation engine ──

export function calculateItemPrice(item: Omit<CartItem, 'prix_unitaire' | 'quantite' | 'cartKey'>): number {
  const produit = findProduit(item.id);
  if (!produit) throw new Error(`Produit inconnu : ${item.id}`);

  let total = 0;

  if (produit.type === 'assiette') {
    const p = produit as ProduitAssiette;
    total = p.prix_base;
    if (item.boissons_supp && item.boissons_supp.length > 0) {
      item.boissons_supp.forEach((bId) => {
        const boisson = BOISSONS_SUPP_ASSIETTE.find((b) => b.id === bId);
        total += boisson ? boisson.prix : p.supp_boisson;
      });
    }
  } else if (produit.type === 'formule') {
    const p = produit as ProduitFormule;
    total = item.formule === 'menu' ? p.prix_menu : p.prix_seul;
    if (item.pain) {
      const painOption = PAINS_SANDWICHS.find((pa) => pa.id === item.pain);
      if (painOption) total += painOption.supplement;
    }
  } else if (produit.type === 'crepe_sucree') {
    const p = produit as ProduitCrepe;
    total = p.prix_base;
    if (item.toppings_gourmandises) {
      item.toppings_gourmandises.forEach((tId) => {
        const t = p.toppings_gourmandises.find((g) => g.id === tId);
        total += t ? t.prix : 1.00;
      });
    }
    if (item.toppings_fruits) {
      item.toppings_fruits.forEach((tId) => {
        const t = p.toppings_fruits.find((f) => f.id === tId);
        total += t ? t.prix : 1.50;
      });
    }
  } else {
    const p = produit as ProduitSimple;
    total = p.prix;
  }

  const prix_minimum = getPrixMinimum(produit);
  if (total < prix_minimum - 0.001) {
    throw new Error(`ERREUR PRIX : ${item.nom} — calcule ${total}€ < minimum attendu ${prix_minimum}€`);
  }

  return Math.round(total * 100) / 100;
}

function getPrixMinimum(produit: Produit): number {
  switch (produit.type) {
    case 'assiette': return produit.prix_base;
    case 'formule': return produit.prix_seul;
    case 'crepe_sucree': return produit.prix_base;
    case 'simple': return produit.prix;
  }
}

function buildCartKey(item: Omit<CartItem, 'prix_unitaire' | 'quantite' | 'cartKey'>): string {
  const parts = [item.id, item.formule || 'default'];
  if (item.pain) {
    parts.push('p:' + item.pain);
  }
  if (item.viandes?.length) {
    parts.push('v:' + item.viandes.map((v) => `${v.id}x${v.quantite}`).sort().join(','));
  }
  if (item.boissons_supp?.length) {
    parts.push('bs:' + [...item.boissons_supp].sort().join(','));
  }
  if (item.boisson_menu) {
    parts.push('bm:' + item.boisson_menu);
  }
  if (item.toppings_gourmandises?.length) {
    parts.push('tg:' + [...item.toppings_gourmandises].sort().join(','));
  }
  if (item.toppings_fruits?.length) {
    parts.push('tf:' + [...item.toppings_fruits].sort().join(','));
  }
  if (item.sauces?.length) {
    parts.push('s:' + [...item.sauces].sort().join(','));
  }
  return parts.join('|');
}

// ── Store ──

interface CartState {
  items: CartItem[];
  deliveryMode: 'delivery' | 'pickup' | null;
  orderStep: number;
  isCartOpen: boolean;
  addItem: (item: Omit<CartItem, 'prix_unitaire' | 'quantite' | 'cartKey'>) => void;
  removeItem: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantite: number) => void;
  getTotal: () => number;
  getItemCount: () => number;
  clearCart: () => void;
  hasCategorie: (categorie: string) => boolean;
  setDeliveryMode: (mode: 'delivery' | 'pickup') => void;
  setOrderStep: (step: number) => void;
  setCartOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  deliveryMode: null,
  orderStep: 1,
  isCartOpen: false,

  addItem: (itemData) => {
    const prix_unitaire = calculateItemPrice(itemData);
    const cartKey = buildCartKey(itemData);

    set((state) => {
      const existing = state.items.find((i) => i.cartKey === cartKey);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.cartKey === cartKey ? { ...i, quantite: i.quantite + 1 } : i
          ),
        };
      }
      return {
        items: [...state.items, { ...itemData, prix_unitaire, quantite: 1, cartKey }],
      };
    });
    toast.success('Ajoute au panier !');
  },

  removeItem: (cartKey) => {
    set((state) => ({
      items: state.items.filter((i) => i.cartKey !== cartKey),
    }));
  },

  updateQuantity: (cartKey, quantite) => {
    if (quantite <= 0) {
      get().removeItem(cartKey);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.cartKey === cartKey ? { ...i, quantite } : i
      ),
    }));
  },

  getTotal: () =>
    get().items.reduce((sum, item) => sum + item.prix_unitaire * item.quantite, 0),

  getItemCount: () =>
    get().items.reduce((sum, item) => sum + item.quantite, 0),

  clearCart: () => set({ items: [], orderStep: 1, deliveryMode: null }),

  hasCategorie: (categorie) =>
    get().items.some((i) => i.categorie === categorie),

  setDeliveryMode: (mode) => set({ deliveryMode: mode }),
  setOrderStep: (step) => set({ orderStep: step }),
  setCartOpen: (open) => set({ isCartOpen: open }),
}));
