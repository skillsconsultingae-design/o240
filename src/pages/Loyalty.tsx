import { motion } from 'framer-motion';
import { Star, Gift, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { icon: Star, title: 'Commandez', desc: 'Passez commande en ligne ou au restaurant' },
  { icon: TrendingUp, title: 'Cumulez', desc: '1 euro depense = 1 point gagne' },
  { icon: Gift, title: 'Profitez', desc: 'Echangez vos points contre des reductions' },
];

const tiers = [
  { name: 'Bronze', points: '0 - 99', reward: '5% de reduction', color: 'from-amber-700 to-amber-900' },
  { name: 'Argent', points: '100 - 299', reward: '10% de reduction', color: 'from-gray-400 to-gray-600' },
  { name: 'Or', points: '300+', reward: '15% de reduction + livraison prioritaire', color: 'from-yellow-400 to-amber-600' },
];

export default function Loyalty() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-brand-400 font-medium text-sm uppercase tracking-widest">
            Note Me
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mt-2 mb-4">
            Programme Fidelite
          </h1>
          <p className="text-white/40 max-w-lg mx-auto">
            Gagnez des points a chaque commande et profitez de reductions exclusives.
            Plus vous commandez, plus vous etes recompenses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-dark-900 rounded-2xl p-8 border border-white/5 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-brand-500" />
              </div>
              <div className="w-8 h-8 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                {i + 1}
              </div>
              <h3 className="font-display text-xl font-bold text-white uppercase mb-2">
                {step.title}
              </h3>
              <p className="text-white/40 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="font-display text-2xl font-bold text-white uppercase text-center mb-8">
            Niveaux de fidelite
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className="bg-dark-900 rounded-2xl border border-white/5 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${tier.color}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-brand-400" />
                    <h3 className="font-display text-lg font-bold text-white uppercase">
                      {tier.name}
                    </h3>
                  </div>
                  <p className="text-white/40 text-sm mb-2">
                    <span className="text-white font-medium">{tier.points}</span> points
                  </p>
                  <p className="text-brand-400 font-medium text-sm">{tier.reward}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link
            to="/menu"
            className="btn-primary inline-flex items-center gap-2 text-lg"
          >
            Commander maintenant
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
