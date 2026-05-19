import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ShoppingBag, Settings2 } from 'lucide-react';
import { type Produit, needsConfigurator, getPrixAffichage } from '../data/catalogue';
import { useCartStore } from '../store/cart';
import ConfigurateurModal from './ConfigurateurModal';

interface ProductCardProps {
  produit: Produit;
  index: number;
}

export default function ProductCard({ produit, index }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [animating, setAnimating] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const showConfigurator = needsConfigurator(produit);
  const displayPrice = getPrixAffichage(produit);

  const handleAdd = () => {
    if (showConfigurator) {
      setShowConfig(true);
      return;
    }
    if (produit.type === 'simple') {
      addItem({
        id: produit.id,
        nom: produit.nom,
        categorie: produit.categorie,
      });
      setAnimating(true);
      setTimeout(() => setAnimating(false), 500);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="bg-dark-900 rounded-2xl border border-white/5 overflow-hidden card-hover group"
      >
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg font-semibold text-white uppercase truncate">
                {produit.nom}
              </h3>
              {produit.description && (
                <p className="text-xs text-white/30 mt-0.5">{produit.description}</p>
              )}
              {produit.note && (
                <p className="text-xs text-white/25 mt-0.5 italic">{produit.note}</p>
              )}
              {produit.type === 'formule' && (
                <p className="text-xs text-white/30 mt-0.5">Menu avec frites & boisson</p>
              )}
            </div>
            <div className="text-right shrink-0 ml-3">
              {produit.type === 'formule' ? (
                <div className="flex flex-col items-end">
                  <span className="font-display text-xl font-bold text-brand-400">
                    {produit.prix_seul.toFixed(2)}€
                  </span>
                  <span className="text-xs text-white/30">
                    Menu {produit.prix_menu.toFixed(2)}€
                  </span>
                </div>
              ) : (
                <span className="font-display text-xl font-bold text-brand-400">
                  {displayPrice.toFixed(2)}€
                </span>
              )}
            </div>
          </div>

          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.95 }}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
              animating
                ? 'bg-success-500 text-white'
                : 'bg-dark-800 text-white/70 hover:bg-brand-500 hover:text-white'
            }`}
          >
            {animating ? (
              <ShoppingBag className="w-4 h-4" />
            ) : showConfigurator ? (
              <Settings2 className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            {animating ? 'Ajoute !' : showConfigurator ? 'Personnaliser' : 'Ajouter au panier'}
          </motion.button>
        </div>
      </motion.div>

      {showConfig && (
        <ConfigurateurModal
          produit={produit}
          onClose={() => setShowConfig(false)}
        />
      )}
    </>
  );
}
