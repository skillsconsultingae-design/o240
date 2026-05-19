import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function BlogBurger() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <SEO
        title="Pourquoi O'240 est LE burger incontournable à Saint-Michel-sur-Orge"
        description="Découvrez O'240, le restaurant burger artisanal de Saint-Michel-sur-Orge. Cuisson au charbon, ingrédients frais, livraison 7j/7 en Essonne. Commandez maintenant !"
        canonical="https://o240.fr/blog/burger-saint-michel-sur-orge"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <nav className="text-sm text-white/30 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-400 transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-brand-400 transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Burger Saint-Michel-sur-Orge</span>
          </nav>

          <article className="bg-dark-900 rounded-2xl border border-white/5 overflow-hidden p-8 sm:p-10">
            <div className="flex items-center gap-4 text-sm text-white/30 mb-6">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />19 mai 2026</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase mb-8 leading-snug">
              Pourquoi O'240 est LE burger incontournable à Saint-Michel-sur-Orge
            </h1>

            <div className="space-y-5 text-white/60 leading-relaxed">
              <p>
                Vous habitez Saint-Michel-sur-Orge ou ses environs et vous cherchez un burger
                vraiment bon, cuit comme il faut, avec de vraies saveurs ? <strong className="text-white">O'240</strong> est
                exactement ce qu'il vous faut.
              </p>

              <p>
                Installé au 5 Rue Boieldieu, en plein coeur du 91240, O'240 s'est imposé comme
                la référence locale du burger artisanal en Essonne. Pas de chaîne industrielle ici :
                juste de la passion, du charbon et des produits de qualité.
              </p>

              <h2 className="font-display text-2xl font-bold text-white uppercase pt-4">
                La cuisson au charbon : la différence qui change tout
              </h2>

              <p>
                Chez O'240, la viande est cuite <strong className="text-white">au charbon de bois</strong>. Ce mode de
                cuisson ancestral permet d'obtenir une croûte légèrement caramélisée en surface et
                un coeur juteux, fondant en bouche. C'est cette technique qui donne aux burgers leur
                goût unique — impossible à reproduire avec une simple plancha électrique.
              </p>

              <p>
                Que vous choisissiez le <strong className="text-white">Cheese Burger</strong> (dès 5.50€), le classique
                <strong className="text-white"> Chicken</strong>, le généreux <strong className="text-white">180GR</strong> ou l'impressionnant
                <strong className="text-white"> Tower</strong>, chaque bouchée témoigne du soin apporté à la préparation.
              </p>

              <h2 className="font-display text-2xl font-bold text-white uppercase pt-4">
                Une carte pour toute la famille
              </h2>

              <p>
                O'240 a pensé à tout le monde, y compris aux plus petits avec des
                <strong className="text-white"> menus enfants complets</strong> incluant un cheese burger ou des nuggets,
                des frites et un Capri-Sun. Idéal pour un repas en famille sans se ruiner.
              </p>

              <p>
                Les amateurs de poulet apprécieront les <strong className="text-white">buckets</strong> (tenders, wings
                ou mix), parfaits pour partager. Et pour finir en douceur, la carte de crêpes
                sucrées — avec des toppings Kinder et fruits frais — ravira les gourmands de tous
                âges.
              </p>

              <h2 className="font-display text-2xl font-bold text-white uppercase pt-4">
                Livraison et à emporter à Saint-Michel-sur-Orge
              </h2>

              <p>
                Pas le temps de vous déplacer ? O'240 propose la <strong className="text-white">livraison à
                domicile</strong> sur Saint-Michel-sur-Orge et les communes alentour, ainsi qu'un
                service <strong className="text-white">à emporter</strong> pour récupérer votre commande directement sur
                place.
              </p>

              <p>
                Ouvert <strong className="text-white">7 jours sur 7</strong>, de 11h à 15h et de 18h à 22h45 (le
                vendredi et dimanche uniquement le soir), vous pouvez commander à la pause déjeuner
                comme le soir pour le dîner.
              </p>

              <p>
                Pour passer commande : <strong className="text-white">01.77.05.27.10</strong> ou directement en ligne
                sur <strong className="text-white">o240.fr</strong>.
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
        "headline": "Pourquoi O'240 est LE burger incontournable à Saint-Michel-sur-Orge",
        "description": "Découvrez O'240, le restaurant burger artisanal de Saint-Michel-sur-Orge. Cuisson au charbon, ingrédients frais, livraison 7j/7 en Essonne.",
        "url": "https://o240.fr/blog/burger-saint-michel-sur-orge",
        "datePublished": "2026-05-19",
        "dateModified": "2026-05-19",
        "author": { "@type": "Organization", "name": "O'240", "url": "https://o240.fr" },
        "publisher": { "@type": "Organization", "name": "O'240", "logo": { "@type": "ImageObject", "url": "https://o240.fr/logo.png" } },
        "mainEntityOfPage": { "@type": "WebPage", "@id": "https://o240.fr/blog/burger-saint-michel-sur-orge" },
        "keywords": "burger saint-michel-sur-orge, o240 burger, livraison burger 91240, restaurant burger essonne"
      }) }} />
    </main>
  );
}
