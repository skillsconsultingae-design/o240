import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

interface Article {
  id: string;
  title: string;
  date: string;
  readTime: string;
  content: string[];
}

const articles: Article[] = [
  {
    id: 'meilleur-burger-saint-michel-sur-orge',
    title: "Pourquoi O'240 est le meilleur burger a Saint-Michel-sur-Orge",
    date: '2026-04-15',
    readTime: '4 min',
    content: [
      "Quand on parle de burger a Saint-Michel-sur-Orge, un nom revient systematiquement : O'240. Installe au 5 Rue Boieldieu dans le 91240, notre restaurant a su imposer sa patte dans l'univers du fast food de qualite en Essonne.",
      "La difference O'240, c'est avant tout la cuisson au charbon de bois. Contrairement aux chaines classiques qui utilisent des plaques de cuisson ou des grills electriques, nous avons fait le choix d'une cuisson traditionnelle qui apporte une saveur fumee incomparable a chaque burger. Du Cheese a 5.50 euros au Tower genereux a 7.50 euros, en passant par notre 180GR a 8.50 euros, chaque bouchee revele ce gout authentique.",
      "Nos ingredients sont selectionnes avec soin : pain brioches frais, viande de qualite, fromage fondant, legumes croquants. Nous recevons plusieurs livraisons par semaine pour garantir la fraicheur de chaque produit. Notre charte qualite repose sur trois piliers : la selection des produits, la tracabilite et le respect de la chaine du froid.",
      "Au-dela des burgers, notre carte propose des buckets a partager (tenders, wings, mix), des crepes salees et sucrees, des sandwichs varies et des menus enfants a 5.50 euros. De quoi satisfaire toute la famille.",
      "Ouvert 7 jours sur 7, O'240 propose la livraison a domicile dans tout Saint-Michel-sur-Orge et les communes avoisinantes, ainsi que le retrait sur place. Le programme de fidelite Note Me vous permet de cumuler des points a chaque commande et de beneficier de reductions allant de 5% a 15%.",
      "Que vous soyez resident de Saint-Michel-sur-Orge, de Bretigny-sur-Orge ou de Sainte-Genevieve-des-Bois, n'hesitez pas a decouvrir ce qui fait notre reputation : le meilleur burger du 91240, cuit au charbon.",
    ],
  },
  {
    id: 'livraison-burger-91240',
    title: 'Livraison de burger a domicile dans le 91240 : comment ca marche ?',
    date: '2026-03-20',
    readTime: '3 min',
    content: [
      "Vous habitez a Saint-Michel-sur-Orge et vous avez envie d'un burger sans bouger de chez vous ? O'240 livre directement a votre porte, 7 jours sur 7. Voici comment profiter de notre service de livraison burger dans le 91240.",
      "La commande se fait directement sur notre site o240.fr. Parcourez notre carte complete (burgers, buckets, crepes, sandwichs, menus enfants), ajoutez vos articles au panier, et validez votre commande. C'est simple, rapide et securise.",
      "Nos zones de livraison couvrent un large perimetre autour de Saint-Michel-sur-Orge. Pour les habitants du 91240, le minimum de commande est de 10 euros seulement. Les communes voisines comme Bretigny-sur-Orge et Sainte-Genevieve-des-Bois ont un minimum de 15 euros. Pour Bondoufle, Fleury-Merogis ou Longpont-sur-Orge, comptez 20 euros minimum.",
      "Le delai de livraison moyen est d'environ 40 minutes. Nos livreurs veillent a vous apporter votre commande chaude et en parfait etat. Et bonne nouvelle : les frais de livraison sont offerts pour toutes les commandes respectant le montant minimum !",
      "Nos horaires de livraison correspondent a nos horaires d'ouverture : du lundi au jeudi et le samedi de 11h a 15h et de 18h a 22h45, le vendredi et le dimanche de 18h a 22h45.",
      "Astuce : pensez a nos buckets pour les soirees entre amis ou en famille. Le Bucket Tenders a 21.90 euros, le Bucket Wings a 22.90 euros ou le Bucket Mix a 25.90 euros sont parfaits pour partager. Chaque bucket est accompagne de frites et d'une boisson 1.25L.",
    ],
  },
  {
    id: 'menu-enfant-burger-essonne',
    title: "Menu enfant burger dans l'Essonne : le choix malin chez O'240",
    date: '2026-02-28',
    readTime: '3 min',
    content: [
      "Trouver un menu enfant de qualite dans un fast food, c'est pas toujours evident. Chez O'240 a Saint-Michel-sur-Orge, nous avons concu des menus enfants complets et gourmands a un prix accessible : 5.50 euros seulement.",
      "Nos menus enfants comprennent au choix un burger Cheese ou un burger Tex Mex, accompagne de frites maison et d'une boisson. Le tout dans un format adapte aux petits appetits, sans compromis sur la qualite des ingredients.",
      "Pourquoi choisir O'240 pour le repas de vos enfants ? D'abord, parce que nos burgers sont prepares a la commande avec des produits frais. Ensuite, parce que notre cuisson au charbon donne un gout unique que les enfants adorent. Enfin, parce que notre restaurant est un lieu chaleureux et familial, concu pour accueillir toute la famille.",
      "Le menu enfant est disponible aussi bien sur place qu'en livraison. Si vous commandez depuis Saint-Michel-sur-Orge (91240), le minimum de commande pour la livraison n'est que de 10 euros. Combinez un menu enfant avec un burger ou un bucket pour atteindre facilement le minimum.",
      "Pour les familles de l'Essonne, O'240 represente une alternative de qualite aux grandes chaines. Nos produits sont traces, nos fournisseurs selectionnes, et notre charte qualite garantit la fraicheur de chaque repas.",
      "Et n'oubliez pas : avec notre programme de fidelite Note Me, chaque euro depense vous rapporte des points. Les menus enfants comptent aussi ! Cumulez vos points et profitez de reductions de 5% a 15% sur vos prochaines commandes.",
    ],
  },
];

export default function Blog() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <SEO
        title="Blog O'240 - Burger, Livraison & Menus a Saint-Michel-sur-Orge"
        description="Decouvrez nos articles sur les burgers au charbon, la livraison dans le 91240, les menus enfants et l'actualite d'O'240 a Saint-Michel-sur-Orge."
        canonical="https://o240.fr/blog"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <nav className="text-sm text-white/30 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-400 transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Blog</span>
          </nav>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase">Blog O'240</h1>
          <p className="text-white/40 mt-3">Actualites, conseils et coulisses de votre restaurant burger prefere</p>
        </motion.div>

        <div className="space-y-16">
          {articles.map((article, i) => (
            <motion.article
              key={article.id}
              id={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-dark-900 rounded-2xl border border-white/5 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-white/30 mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime} de lecture</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase mb-6 leading-snug">
                  {article.title}
                </h2>
                <div className="space-y-4">
                  {article.content.map((p, j) => (
                    <p key={j} className="text-white/50 leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-brand-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour a l'accueil
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
