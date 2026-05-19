import { motion } from 'framer-motion';

export default function LegalMentions() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mt-2">
            Mentions Legales
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-900 rounded-2xl p-8 border border-white/5 space-y-8"
        >
          {[
            {
              title: 'Editeur du site',
              content: "Sodip's - Restaurant de street food\nSaint-Michel-sur-Orge, 91240\nTelephone : 01 23 45 67 89\nEmail : contact@sodips.fr",
            },
            {
              title: 'Hebergement',
              content: 'Ce site est heberge par Vercel Inc.\n340 S Lemon Ave #4133\nWalnut, CA 91789, USA',
            },
            {
              title: 'Propriete intellectuelle',
              content: "L'ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriete exclusive de Sodip's. Toute reproduction, representation, modification ou exploitation de tout ou partie du contenu est interdite sans autorisation prealable.",
            },
            {
              title: 'Donnees personnelles',
              content: "Les informations recueillies lors de la commande sont necessaires au traitement de votre commande. Conformement au RGPD, vous disposez d'un droit d'acces, de rectification et de suppression de vos donnees personnelles. Pour exercer ces droits, contactez-nous a contact@sodips.fr.",
            },
            {
              title: 'Cookies',
              content: "Ce site utilise des cookies techniques necessaires au bon fonctionnement du site. Aucun cookie publicitaire n'est utilise.",
            },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="font-display text-xl font-bold text-white uppercase mb-3">
                {section.title}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
