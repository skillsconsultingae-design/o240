import { motion } from 'framer-motion';
import { FileText, Building2 } from 'lucide-react';

export default function CGV() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mt-2">
            C.G.V
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="bg-dark-900 rounded-2xl p-8 border border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-brand-500" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-white uppercase mb-3">
                  O 240 gere par MH FOOD FACTORY
                </h2>
                <ul className="space-y-2 text-white/50 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-white/30">SIRET :</span>
                    <span className="text-white/70 font-medium">91845765600026</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-white/30">Adresse :</span>
                    <span className="text-white/70 font-medium">5 Rue Boieldieu, 91240 Saint-Michel-sur-Orge</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-dark-900 rounded-2xl p-8 border border-white/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-brand-500" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-white uppercase mb-4">
                  Activite
                </h2>
                <p className="text-white/50 leading-relaxed mb-6">
                  O 240 a pour principale activite la vente de repas de specialite Sandwicherie et
                  autres accompagnements, En Livraison, A Emporter.
                </p>

                <h2 className="font-display text-xl font-bold text-white uppercase mb-4">
                  Conditions Generales de Vente
                </h2>
                <p className="text-white/50 leading-relaxed">
                  Les presentes Conditions Generales de Vente s'appliquent a toute commande passee
                  sur le site Internet o240.fr. Le Client declare avoir pris connaissance et accepte
                  les presentes Conditions generales de vente avant la passation de sa commande. La
                  validation de la commande vaut donc acceptation de ces Conditions Generales de Vente.
                  MH FOOD FACTORY se reserve a tout moment la possibilite d'adapter ou de modifier ces
                  Conditions Generales de Vente. En cas de modification, il sera applique a chaque
                  commande les conditions generales de vente en vigueur au jour de la commande. Aussi,
                  le Client est invite a consulter regulierement les conditions generales de vente afin
                  de se tenir informe des evolutions les plus recentes.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
