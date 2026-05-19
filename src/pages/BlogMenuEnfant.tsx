import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function BlogMenuEnfant() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <SEO
        title="Menu Enfant Burger à Saint-Michel-sur-Orge – Le Repas des Petits Gourmands chez O'240"
        description="O'240 propose des menus enfants complets à Saint-Michel-sur-Orge : cheese burger ou nuggets ou tenders, frites + Capri-Sun. Parfait pour toute la famille !"
        canonical="https://o240.fr/blog/menu-enfant-burger-saint-michel-sur-orge"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <nav className="text-sm text-white/30 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-400 transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-brand-400 transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Menu Enfant</span>
          </nav>

          <article className="bg-dark-900 rounded-2xl border border-white/5 overflow-hidden p-8 sm:p-10">
            <div className="flex items-center gap-4 text-sm text-white/30 mb-6">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />19 mai 2026</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase mb-8 leading-snug">
              Menu Enfant chez O'240 : le burger pensé pour les petits à Saint-Michel-sur-Orge
            </h1>

            <div className="space-y-5 text-white/60 leading-relaxed">
              <p>
                Trouver un restaurant fast-food qui plaise autant aux enfants qu'aux parents,
                c'est souvent un défi. Chez <strong className="text-white">O'240 à Saint-Michel-sur-Orge</strong>, les
                menus enfants ont été imaginés pour satisfaire les petits appétits avec des produits
                de qualité, dans un format fun et généreux.
              </p>

              <h2 className="font-display text-2xl font-bold text-white uppercase pt-4">
                Que contient le menu enfant O'240 ?
              </h2>

              <p>
                Le menu enfant O'240 est composé de <strong className="text-white">3 options au choix</strong> pour le
                plat principal :
              </p>

              <ul className="space-y-3 pl-1">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-2.5" />
                  <span><strong className="text-white">1 Cheese Burger</strong> — un burger moelleux avec cheddar fondant,
                  idéal pour les petits qui aiment les saveurs douces</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-2.5" />
                  <span><strong className="text-white">5 Nuggets</strong> — des nuggets de poulet dorés et croustillants,
                  un classique indétrônable</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-2.5" />
                  <span><strong className="text-white">3 Tenders</strong> — des filets de poulet pané, plus généreux, pour
                  les petits grands mangeurs</span>
                </li>
              </ul>

              <p>
                Le tout accompagné de <strong className="text-white">frites maison</strong> et d'<strong className="text-white">un
                Capri-Sun</strong>, pour une boisson adaptée aux enfants. Un menu complet, équilibré
                et savoureux, à un prix accessible.
              </p>

              <h2 className="font-display text-2xl font-bold text-white uppercase pt-4">
                Pourquoi choisir O'240 pour un repas en famille ?
              </h2>

              <p>
                Contrairement aux grandes chaînes, O'240 cultive une approche artisanale. La
                viande est cuite <strong className="text-white">au charbon</strong>, les recettes sont soignées et la carte
                est variée : burgers, crêpes, salades, tex mex... Il y en a pour tous les goûts.
              </p>

              <p>
                Les parents apprécient pouvoir commander <strong className="text-white">en livraison</strong> depuis
                Saint-Michel-sur-Orge, sans avoir à sortir avec les enfants, notamment le soir en
                semaine. Et grâce au <strong className="text-white">programme de fidélité "Note Me"</strong>, chaque
                commande peut être récompensée.
              </p>

              <h2 className="font-display text-2xl font-bold text-white uppercase pt-4">
                Comment commander le menu enfant ?
              </h2>

              <p>
                Rendez-vous directement sur <strong className="text-white">o240.fr</strong>, sélectionnez la catégorie
                "Menus Enfant" dans la carte, choisissez votre option (cheese burger, nuggets ou
                tenders) et finalisez votre commande en livraison ou à emporter.
              </p>

              <p>
                O'240 est ouvert <strong className="text-white">7j/7</strong> à Saint-Michel-sur-Orge (91240) — le midi
                de 11h à 15h et le soir de 18h à 22h45.
              </p>
            </div>
          </article>

          <div className="mt-10 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-brand-400 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour au blog
            </Link>
          </div>
        </motion.div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Menu Enfant Burger à Saint-Michel-sur-Orge – Le Repas des Petits Gourmands chez O'240",
        "description": "O'240 propose des menus enfants complets à Saint-Michel-sur-Orge : cheese burger ou nuggets ou tenders, frites + Capri-Sun. Parfait pour toute la famille !",
        "url": "https://o240.fr/blog/menu-enfant-burger-saint-michel-sur-orge",
        "datePublished": "2026-05-19",
        "dateModified": "2026-05-19",
        "author": { "@type": "Organization", "name": "O'240", "url": "https://o240.fr" },
        "publisher": { "@type": "Organization", "name": "O'240", "logo": { "@type": "ImageObject", "url": "https://o240.fr/logo.png" } },
        "mainEntityOfPage": { "@type": "WebPage", "@id": "https://o240.fr/blog/menu-enfant-burger-saint-michel-sur-orge" },
        "keywords": "menu enfant burger saint-michel-sur-orge, menu enfant 91240, nuggets tenders enfant essonne, o240 menu enfant"
      }) }} />
    </main>
  );
}
