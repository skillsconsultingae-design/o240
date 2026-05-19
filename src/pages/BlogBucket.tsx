import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function BlogBucket() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <SEO
        title="Buckets Tenders & Wings à Saint-Michel-sur-Orge – La Formule Partage chez O'240"
        description="Envie de tenders ou wings ? O'240 à Saint-Michel-sur-Orge propose des buckets à partager dès 21.90€. Livraison 7j/7 en Essonne. Commandez en ligne !"
        canonical="https://o240.fr/blog/bucket-tenders-wings-saint-michel-sur-orge"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <nav className="text-sm text-white/30 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-400 transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-brand-400 transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Buckets Tenders & Wings</span>
          </nav>

          <article className="bg-dark-900 rounded-2xl border border-white/5 overflow-hidden p-8 sm:p-10">
            <div className="flex items-center gap-4 text-sm text-white/30 mb-6">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />19 mai 2026</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase mb-8 leading-snug">
              Buckets Tenders & Wings : la formule conviviale d'O'240 à Saint-Michel-sur-Orge
            </h1>

            <div className="space-y-5 text-white/60 leading-relaxed">
              <p>
                Si vous êtes fan de poulet croustillant et de repas à partager, les
                <strong className="text-white"> buckets O'240</strong> vont devenir votre nouvelle obsession. Disponibles
                à la livraison ou à emporter depuis Saint-Michel-sur-Orge, ils sont idéaux pour
                les soirées entre amis, les repas de famille ou simplement quand l'envie d'un bon
                poulet se fait sentir.
              </p>

              <h2 className="font-display text-2xl font-bold text-white uppercase pt-4">
                Les 3 buckets O'240
              </h2>

              <h3 className="font-display text-xl font-bold text-brand-400 pt-2">
                Bucket Tenders — 21.90€
              </h3>
              <p>
                Des filets de poulet tendre et juteux, panés avec un enrobage croustillant. Les
                tenders sont l'option idéale pour ceux qui préfèrent la viande blanche sans os.
                Facilement partageables, ils se dévorent en un rien de temps.
              </p>

              <h3 className="font-display text-xl font-bold text-brand-400 pt-2">
                Bucket Wings — 22.90€
              </h3>
              <p>
                Les ailes de poulet, marinées et cuites pour une peau dorée et une chair qui se
                détache facilement. Un grand classique du comfort food américain, revisité avec la
                touche artisanale O'240.
              </p>

              <h3 className="font-display text-xl font-bold text-brand-400 pt-2">
                Bucket Mix — 25.90€
              </h3>
              <p>
                Le meilleur des deux mondes : un assortiment de tenders ET de wings pour varier
                les plaisirs. Parfait pour les indécis ou pour faire plaisir à tout le monde autour
                de la table.
              </p>

              <h2 className="font-display text-2xl font-bold text-white uppercase pt-4">
                Pourquoi les buckets O'240 font-ils la différence ?
              </h2>

              <p>
                Chez O'240, la qualité des produits est une priorité. La volaille est
                sélectionnée avec soin, et la cuisson est maîtrisée pour obtenir le parfait
                équilibre entre croustillant et fondant. Pas de sauce toute faite sortie d'un pot
                industriel — chez O'240, on travaille les saveurs.
              </p>

              <p>
                De plus, les buckets sont disponibles <strong className="text-white">en livraison</strong> sur
                Saint-Michel-sur-Orge et sa zone, <strong className="text-white">7 jours sur 7</strong>, pour que votre
                envie de poulet ne reste jamais sans réponse.
              </p>

              <h2 className="font-display text-2xl font-bold text-white uppercase pt-4">
                Commander vos buckets chez O'240
              </h2>

              <p>
                Rendez-vous sur <strong className="text-white">o240.fr</strong> ou appelez le
                <strong className="text-white"> 01.77.05.27.10</strong>. Choisissez votre bucket dans la carte, ajoutez
                une boisson ou une salade pour compléter, et profitez !
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
        "headline": "Buckets Tenders & Wings à Saint-Michel-sur-Orge – La Formule Partage chez O'240",
        "description": "Envie de tenders ou wings ? O'240 à Saint-Michel-sur-Orge propose des buckets à partager dès 21.90€. Livraison 7j/7 en Essonne.",
        "url": "https://o240.fr/blog/bucket-tenders-wings-saint-michel-sur-orge",
        "datePublished": "2026-05-19",
        "dateModified": "2026-05-19",
        "author": { "@type": "Organization", "name": "O'240", "url": "https://o240.fr" },
        "publisher": { "@type": "Organization", "name": "O'240", "logo": { "@type": "ImageObject", "url": "https://o240.fr/logo.png" } },
        "mainEntityOfPage": { "@type": "WebPage", "@id": "https://o240.fr/blog/bucket-tenders-wings-saint-michel-sur-orge" },
        "keywords": "bucket tenders saint-michel-sur-orge, wings saint-michel-sur-orge, poulet croustillant essonne, o240 bucket"
      }) }} />
    </main>
  );
}
