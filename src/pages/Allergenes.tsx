import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const allergens = [
  'Arachides', 'Celeri', 'Crustaces', 'Fruits a coques', 'Gluten',
  'Lait', 'Lupin', 'Mollusques', 'Moutarde', 'Oeufs',
  'Poissons', 'Sesame', 'Soja', 'Sulfites',
];

interface ProductAllergens {
  name: string;
  values: boolean[];
}

const products: ProductAllergens[] = [
  { name: 'Cheese',       values: [false, false, false, false, true,  true,  false, false, true,  true,  false, true,  false, false] },
  { name: 'Double Cheese', values: [false, false, false, false, true,  true,  false, false, true,  true,  false, true,  false, false] },
  { name: 'Fish',         values: [false, false, false, false, true,  true,  false, false, true,  true,  true,  true,  false, false] },
  { name: 'Chicken',      values: [false, true,  false, false, true,  true,  false, false, true,  true,  false, true,  true,  false] },
  { name: 'Le 180',       values: [false, false, false, false, true,  true,  false, false, true,  true,  false, true,  false, false] },
  { name: 'Tower',        values: [false, true,  false, false, true,  true,  false, false, true,  true,  false, true,  true,  false] },
  { name: 'Le 360',       values: [false, false, false, false, true,  true,  false, false, true,  true,  false, true,  false, false] },
  { name: 'Le 540',       values: [false, false, false, false, true,  true,  false, false, true,  true,  false, true,  false, false] },
  { name: 'Le Big M',     values: [false, false, false, false, true,  true,  false, false, true,  true,  false, true,  true,  false] },
  { name: 'Chik N Steak', values: [false, true,  false, false, true,  true,  false, false, true,  true,  false, true,  true,  false] },
];

export default function Allergenes() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mt-2 mb-3">
            Allergenes
          </h1>
          <p className="text-brand-400 font-medium text-sm uppercase tracking-widest mb-2">
            Allergenes dans les produits O 240 — Carte 2026 (France)
          </p>
          <p className="text-white/40 text-sm">
            <span className="text-brand-500 font-bold">X</span> = Presence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-start gap-3 p-4 bg-warning-500/10 border border-warning-500/20 rounded-xl mb-8"
        >
          <AlertTriangle className="w-5 h-5 text-warning-500 shrink-0 mt-0.5" />
          <p className="text-sm text-white/50 leading-relaxed">
            Ces informations ont ete etablies sur la base des declarations de nos fournisseurs a propos
            de la composition de leurs produits. Outre les presences signalees dans le tableau, nous ne
            pouvons pas exclure une presence accidentelle d'autres ingredients allergenes qui serait
            apparue lors de la fabrication des produits chez nos fournisseurs ou lors de leur
            manipulation dans nos restaurants.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-900 rounded-2xl border border-white/5 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-white font-semibold sticky left-0 bg-dark-900 z-10 min-w-[140px]">
                    Produit
                  </th>
                  {allergens.map((a) => (
                    <th
                      key={a}
                      className="py-4 px-2 text-center min-w-[70px]"
                    >
                      <span className="text-white/50 text-xs font-medium uppercase tracking-wide whitespace-nowrap writing-mode-vertical"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', display: 'inline-block', transform: 'rotate(180deg)', maxHeight: '100px' }}
                      >
                        {a}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr
                    key={product.name}
                    className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${
                      i % 2 === 0 ? 'bg-dark-900' : 'bg-dark-950/50'
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-white sticky left-0 bg-inherit z-10">
                      {product.name}
                    </td>
                    {product.values.map((val, j) => (
                      <td key={j} className="py-3 px-2 text-center">
                        {val ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-brand-500/15 text-brand-400 font-bold text-xs">
                            X
                          </span>
                        ) : (
                          <span className="text-white/10">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
