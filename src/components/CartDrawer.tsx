import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cart';
import {
  BOISSONS_SUPP_ASSIETTE,
  SAUCES_OFFERTES,
  findProduit,
} from '../data/catalogue';
import UpsellSuggestions from './UpsellSuggestions';

function getOptionLabel(item: ReturnType<typeof useCartStore.getState>['items'][0]): string[] {
  const labels: string[] = [];
  if (item.formule) labels.push(item.formule === 'menu' ? 'Menu' : 'Seul');
  if (item.viandes?.length) {
    item.viandes.forEach((v) => {
      labels.push(v.quantite > 1 ? `${v.quantite}x ${v.nom}` : v.nom);
    });
  }
  if (item.boisson_menu) labels.push(item.boisson_menu);
  if (item.boissons_supp?.length) {
    item.boissons_supp.forEach((bId) => {
      const b = BOISSONS_SUPP_ASSIETTE.find((x) => x.id === bId);
      labels.push(b ? `${b.nom} +${b.prix.toFixed(2)}€` : bId);
    });
  }
  if (item.toppings_gourmandises?.length) {
    const produit = findProduit(item.id);
    if (produit?.type === 'crepe_sucree') {
      item.toppings_gourmandises.forEach((tId) => {
        const t = produit.toppings_gourmandises.find((g) => g.id === tId);
        labels.push(t ? `${t.nom} +${t.prix.toFixed(2)}€` : tId);
      });
    }
  }
  if (item.toppings_fruits?.length) {
    const produit = findProduit(item.id);
    if (produit?.type === 'crepe_sucree') {
      item.toppings_fruits.forEach((tId) => {
        const t = produit.toppings_fruits.find((f) => f.id === tId);
        labels.push(t ? `${t.nom} +${t.prix.toFixed(2)}€` : tId);
      });
    }
  }
  if (item.sauces?.length) {
    item.sauces.forEach((sId) => {
      const s = SAUCES_OFFERTES.find((x) => x.id === sId);
      labels.push(s ? s.nom : sId);
    });
  }
  return labels;
}

export default function CartDrawer() {
  const navigate = useNavigate();
  const { items, isCartOpen, setCartOpen, updateQuantity, removeItem, getTotal, getItemCount } =
    useCartStore();

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-dark-900 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-brand-500" />
                <h2 className="font-display text-xl font-bold text-white uppercase">
                  Votre Panier
                </h2>
                {getItemCount() > 0 && (
                  <span className="bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {getItemCount()}
                  </span>
                )}
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag className="w-12 h-12 text-white/20" />
                </div>
                <p className="text-lg font-medium text-white/60 mb-2">
                  Votre panier est vide
                </p>
                <p className="text-sm text-white/40">
                  Ajoutez vos favoris depuis la carte !
                </p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate('/menu');
                  }}
                  className="mt-6 btn-primary"
                >
                  Voir la carte
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.map((item) => {
                    const optionLabels = getOptionLabel(item);
                    return (
                      <motion.div
                        key={item.cartKey}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-dark-800 rounded-xl p-4 border border-white/5"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-white">{item.nom}</h3>
                          </div>
                          <button
                            onClick={() => removeItem(item.cartKey)}
                            className="p-1.5 rounded-lg hover:bg-error-500/20 transition-colors shrink-0"
                          >
                            <Trash2 className="w-4 h-4 text-error-400" />
                          </button>
                        </div>

                        {optionLabels.length > 0 && (
                          <div className="mb-3 space-y-0.5">
                            {optionLabels.map((label, i) => (
                              <p key={i} className="text-xs text-white/30">{label}</p>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.cartKey, item.quantite - 1)}
                              className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center hover:bg-dark-600 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-white/60" />
                            </button>
                            <span className="text-white font-semibold w-6 text-center">
                              {item.quantite}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartKey, item.quantite + 1)}
                              className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center hover:bg-dark-600 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-white/60" />
                            </button>
                          </div>
                          <span className="text-brand-400 font-bold">
                            {(item.prix_unitaire * item.quantite).toFixed(2)}€
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="border-t border-white/10 p-6 space-y-4">
                  <UpsellSuggestions />
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-white/60">Total</span>
                    <span className="font-display text-2xl font-bold text-white">
                      {getTotal().toFixed(2)}€
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full btn-primary text-center text-lg"
                  >
                    Commander
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
