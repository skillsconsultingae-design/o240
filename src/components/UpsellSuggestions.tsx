import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Coffee, Cake, Sparkles } from 'lucide-react';
import { useCartStore, type CartItem } from '../store/cart';
import { findProduit, type ProduitFormule } from '../data/catalogue';

interface Suggestion {
  key: string;
  type: 'upgrade-menu' | 'add-dessert' | 'add-drink';
  label: string;
  description: string;
  priceLabel: string;
  action: () => void;
}

function buildSuggestions(
  items: CartItem[],
  addItem: (item: Omit<CartItem, 'prix_unitaire' | 'quantite' | 'cartKey'>) => void,
  removeItem: (cartKey: string) => void,
): Suggestion[] {
  const suggestions: Suggestion[] = [];

  const upgradeable = items.filter((i) => i.formule === 'seul');
  for (const item of upgradeable) {
    const produit = findProduit(item.id);
    if (!produit || produit.type !== 'formule') continue;
    const p = produit as ProduitFormule;
    const diff = p.prix_menu - p.prix_seul;
    suggestions.push({
      key: `upgrade-${item.cartKey}`,
      type: 'upgrade-menu',
      label: `Passer ${item.nom} en Menu`,
      description: 'Frites + boisson inclus',
      priceLabel: `+${diff.toFixed(2)}€`,
      action: () => {
        removeItem(item.cartKey);
        addItem({
          id: item.id,
          nom: item.nom,
          categorie: item.categorie,
          formule: 'menu',
          sauces: item.sauces,
        });
      },
    });
  }

  const hasDessert = items.some((i) => i.categorie === 'desserts');
  if (!hasDessert && items.length > 0) {
    suggestions.push({
      key: 'add-tiramisu',
      type: 'add-dessert',
      label: 'Ajouter un Tiramisu',
      description: 'Terminez en beaute',
      priceLabel: '3.00€',
      action: () => {
        addItem({ id: 'tiramisu', nom: 'TIRAMISU', categorie: 'desserts' });
      },
    });
  }

  const hasDrink = items.some((i) => i.categorie === 'boissons' || i.formule === 'menu');
  if (!hasDrink && items.length > 0) {
    suggestions.push({
      key: 'add-coca',
      type: 'add-drink',
      label: 'Ajouter un Coca-Cola',
      description: 'Boisson 33cl',
      priceLabel: '1.50€',
      action: () => {
        addItem({ id: 'coca_33', nom: 'COCA COLA 33CL', categorie: 'boissons' });
      },
    });
  }

  return suggestions.slice(0, 3);
}

const ICONS = {
  'upgrade-menu': ArrowUpRight,
  'add-dessert': Cake,
  'add-drink': Coffee,
};

export default function UpsellSuggestions() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const suggestions = buildSuggestions(items, addItem, removeItem).filter(
    (s) => !dismissed.has(s.key)
  );

  if (suggestions.length === 0) return null;

  function handleAccept(suggestion: Suggestion) {
    suggestion.action();
    setDismissed((prev) => new Set(prev).add(suggestion.key));
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-3.5 h-3.5 text-brand-400" />
        <span className="text-xs font-medium text-brand-400 uppercase tracking-wider">
          Suggestions
        </span>
      </div>
      <AnimatePresence>
        {suggestions.map((suggestion) => {
          const Icon = ICONS[suggestion.type];
          return (
            <motion.div
              key={suggestion.key}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-brand-500/5 border border-brand-500/15 rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-brand-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{suggestion.label}</p>
                  <p className="text-xs text-white/30">{suggestion.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-brand-400">{suggestion.priceLabel}</span>
                  <button
                    onClick={() => handleAccept(suggestion)}
                    className="px-3 py-1.5 rounded-lg bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
