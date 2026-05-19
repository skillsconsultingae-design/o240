import { motion } from 'framer-motion';
import { ShieldCheck, PackageSearch, Thermometer, Award } from 'lucide-react';

const sections = [
  {
    icon: PackageSearch,
    number: 1,
    title: 'La selection des produits',
    text: "La qualite des produits servis faisant la force de son concept, O 240 a toujours eu pour principe de selectionner les meilleurs produits. Plusieurs livraisons par semaine assurent une qualite constante et permettent a O 240 de vous apporter des produits savoureux chez vous.",
  },
  {
    icon: ShieldCheck,
    number: 2,
    title: 'Tracabilite des produits',
    text: "O 240 verifie scrupuleusement tous ses produits a chaque livraison et entretient des relations regulieres avec des fournisseurs selectionnes pour la qualite des produits.",
  },
  {
    icon: Thermometer,
    number: 3,
    title: 'Respect de la chaine du froid',
    text: "O 240 exerce un controle minutieux sur ses produits. Ainsi, tous les produits frais et surgeles qu'utilise O 240 sont des produits livres par camion frigorifique, et respectant la chaine du froid.",
  },
];

export default function CharteQualite() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mt-2 mb-4">
            Charte Qualite
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Award className="w-6 h-6 text-brand-500" />
            <p className="text-white/50 max-w-xl">
              Toujours soucieux de la qualite de ses produits, O 240 a mis en place une charte
              qualite repondant a 3 criteres :
            </p>
          </div>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-dark-900 rounded-2xl p-8 border border-white/5"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center relative">
                    <section.icon className="w-7 h-7 text-brand-500" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {section.number}
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-white uppercase mb-3">
                    {section.title}
                  </h2>
                  <p className="text-white/50 leading-relaxed">{section.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
