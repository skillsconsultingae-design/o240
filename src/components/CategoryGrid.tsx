import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Baby, UtensilsCrossed, Sandwich, Flame, Beef, Pizza,
  Star, Drumstick, Salad, CircleDot, Cake, GlassWater,
} from 'lucide-react';
import { CATALOGUE } from '../data/catalogue';

const iconMap: Record<string, React.ElementType> = {
  Baby, UtensilsCrossed, Sandwich, Flame, Beef, Pizza,
  Star, Drumstick, Salad, CircleDot, Cake, GlassWater,
};

const categoryImages: Record<string, string> = {
  'burgers': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
  'sandwichs': 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&q=80',
  'tex_mex': 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80',
  'menus_enfant': 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600&q=80',
  'paninis': 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=600&q=80',
  'assiettes': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
  'sodips': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80',
  'salades': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
  'crepes_salees': '/crepes-salees.webp',
  'desserts': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80',
  'boissons': 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=600&q=80',
};

export default function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-brand-400 font-medium text-sm uppercase tracking-widest">
            Nos categories
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mt-2">
            La Carte
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATALOGUE.map((cat, i) => {
            const Icon = iconMap[cat.icone] || Star;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/menu?category=${cat.id}`)}
                className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${categoryImages[cat.id] || ''})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-brand-500/40 transition-colors">
                    <Icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-semibold text-white uppercase text-center">
                    {cat.nom}
                  </h3>
                  <span className="text-xs text-white/40 mt-1">
                    {cat.produits.length} {cat.produits.length > 1 ? 'articles' : 'article'}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
