import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Baby, UtensilsCrossed, Sandwich, ChefHat, Flame, Beef, Pizza,
  Star, Drumstick, List, Users, Salad, CircleDot, Cookie, Cake, GlassWater,
} from 'lucide-react';
import { CATALOGUE } from '../data/catalogue';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

const iconMap: Record<string, React.ElementType> = {
  Baby, UtensilsCrossed, Sandwich, ChefHat, Flame, Beef, Pizza,
  Star, Drumstick, List, Users, Salad, CircleDot, Cookie, Cake, GlassWater,
};

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || CATALOGUE[0].id;
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATALOGUE.some((c) => c.id === cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    setSearchParams({ category: id });
  };

  const category = CATALOGUE.find((c) => c.id === activeCategory) || CATALOGUE[0];

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <SEO
        title="Menu O'240 - Burgers, Buckets, Menus Enfants a Saint-Michel-sur-Orge"
        description="Decouvrez la carte complete d'O'240 : burgers au charbon, buckets tenders et wings, crepes, menus enfants, sandwichs et bien plus. Livraison a Saint-Michel-sur-Orge."
        canonical="https://o240.fr/menu"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <nav className="text-sm text-white/30 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-400 transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Menu</span>
          </nav>
          <span className="text-brand-400 font-medium text-sm uppercase tracking-widest">
            Decouvrez
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mt-2">
            Notre Carte
          </h1>
        </motion.div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide -mx-4 px-4">
          {CATALOGUE.map((cat) => {
            const Icon = iconMap[cat.icone] || Star;
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                    : 'bg-dark-800 text-white/50 hover:text-white/70 hover:bg-dark-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.nom}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-white uppercase">
              {category.nom}
            </h2>
            {category.soustitre && (
              <p className="text-sm text-white/40 mt-1">{category.soustitre}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {category.produits.map((produit, i) => (
              <ProductCard key={produit.id} produit={produit} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
