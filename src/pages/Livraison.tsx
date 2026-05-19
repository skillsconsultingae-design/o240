import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Truck, Clock, ArrowRight, Phone, ShoppingBag } from 'lucide-react';
import { ZONES_LIVRAISON as deliveryZones } from '../data/catalogue';
import SEO from '../components/SEO';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
};

export default function Livraison() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <SEO
        title="Livraison Burger Saint-Michel-sur-Orge | O'240"
        description="Livraison de burgers au charbon, buckets et crepes a Saint-Michel-sur-Orge et communes voisines. Livraison gratuite en 40 min. Commandez en ligne sur o240.fr."
        canonical="https://o240.fr/livraison"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <nav className="text-sm text-white/30 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-400 transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Livraison</span>
          </nav>
          <span className="text-brand-400 font-medium text-sm uppercase tracking-widest">
            Livraison a domicile
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mt-2 mb-4">
            Livraison Burger Saint-Michel-sur-Orge
          </h1>
          <p className="text-white/40 max-w-lg mx-auto">
            Recevez vos burgers au charbon, buckets et crepes directement chez vous.
            Livraison gratuite dans toutes nos zones.
          </p>
        </motion.div>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            { icon: ShoppingBag, step: '1', title: 'Commandez en ligne', desc: 'Choisissez vos plats sur o240.fr et validez votre panier' },
            { icon: Clock, step: '2', title: 'Preparation en ~20 min', desc: 'Nos equipes preparent votre commande avec des produits frais' },
            { icon: Truck, step: '3', title: 'Livraison en ~40 min', desc: 'Votre commande arrive chaude et en parfait etat chez vous' },
          ].map((s, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
              className="bg-dark-900 rounded-2xl border border-white/5 p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mx-auto mb-3">
                <s.icon className="w-6 h-6 text-brand-500" />
              </div>
              <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-sm">
                {s.step}
              </div>
              <h3 className="font-display text-lg font-bold text-white uppercase mb-1">{s.title}</h3>
              <p className="text-sm text-white/40">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Zones */}
        <motion.div {...fadeUp} className="mb-4">
          <h2 className="font-display text-2xl font-bold text-white uppercase mb-6 text-center">
            Zones de Livraison
          </h2>
        </motion.div>

        <div className="space-y-4 mb-10">
          {deliveryZones.map((zone, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
              className="bg-dark-900 rounded-2xl p-6 border border-white/5 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-brand-500" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium leading-relaxed">{zone.zone}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-display text-2xl font-bold text-brand-400">{zone.minimum}€</span>
                <p className="text-xs text-white/30 mt-1">minimum</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp}
          className="bg-brand-500/10 border border-brand-500/20 rounded-2xl p-6 flex items-start gap-4 mb-16"
        >
          <Truck className="w-6 h-6 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-white mb-1">Livraison gratuite</h3>
            <p className="text-sm text-white/40">
              Les frais de livraison sont offerts pour toutes les commandes
              respectant le montant minimum de la zone.
            </p>
          </div>
        </motion.div>

        {/* Horaires de livraison */}
        <motion.div {...fadeUp} className="bg-dark-900 rounded-2xl border border-white/5 p-8 mb-16">
          <h2 className="font-display text-xl font-bold text-white uppercase mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-brand-500" />
            Horaires de livraison
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-dark-800 rounded-xl">
              <p className="text-white font-medium mb-1">Lundi, Mardi, Mercredi, Jeudi, Samedi</p>
              <p className="text-white/40 text-sm">11h00 - 15h00 / 18h00 - 22h45</p>
            </div>
            <div className="p-4 bg-dark-800 rounded-xl">
              <p className="text-white font-medium mb-1">Vendredi, Dimanche</p>
              <p className="text-white/40 text-sm">18h00 - 22h45</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeUp} className="text-center">
          <h2 className="font-display text-3xl font-bold text-white uppercase mb-4">Pret a commander ?</h2>
          <p className="text-white/40 mb-6">Composez votre commande en quelques clics et faites-vous livrer chez vous.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu" className="btn-primary inline-flex items-center justify-center gap-2 text-lg">
              Voir la Carte <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+33177052710" className="btn-outline inline-flex items-center justify-center gap-2 text-lg">
              <Phone className="w-5 h-5" /> 01.77.05.27.10
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
