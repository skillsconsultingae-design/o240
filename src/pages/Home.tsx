import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Truck, Clock, MapPin, Star, ArrowRight, Phone, Flame,
  Users, ChevronRight, BookOpen,
} from 'lucide-react';
import SEO from '../components/SEO';
import CategoryGrid from '../components/CategoryGrid';
import { CATALOGUE, type ProduitFormule, type ProduitSimple } from '../data/catalogue';

const burgersCat = CATALOGUE.find((c) => c.id === 'burgers')!;
const burgers = burgersCat.produits.map((p) => {
  const f = p as ProduitFormule;
  return { name: f.nom, solo: f.prix_seul, menu: f.prix_menu };
});

const bucketsCat = CATALOGUE.find((c) => c.id === 'buckets')!;
const buckets = bucketsCat.produits.map((p) => {
  const s = p as ProduitSimple;
  return { name: s.nom, price: s.prix, desc: '' };
});

const crepesData = [
  {
    type: 'Salees',
    items: CATALOGUE.find((c) => c.id === 'crepes_salees')!.produits.map(
      (p) => `${p.nom} ${(p as ProduitSimple).prix.toFixed(2)}€`
    ),
  },
  {
    type: 'Sucrees',
    items: ['Composez votre crepe 3.50€'],
  },
];

const faq = [
  { q: 'Quels sont les horaires d\'O\'240 ?', a: 'Nous sommes ouverts 7j/7. Du lundi au jeudi et samedi : 11h-15h et 18h-22h45. Le vendredi et dimanche : 18h-22h45 uniquement.' },
  { q: 'Livrez-vous a Saint-Michel-sur-Orge ?', a: 'Oui ! Nous livrons a Saint-Michel-sur-Orge et dans les communes voisines. Minimum de commande 10€ pour Saint-Michel-sur-Orge.' },
  { q: 'Vos burgers sont-ils cuits au charbon ?', a: 'Absolument. Tous nos burgers sont cuits au charbon de bois pour une saveur authentique et un gout inimitable.' },
  { q: 'Proposez-vous des menus enfants ?', a: 'Oui, nous avons des menus enfants a 5.50€ comprenant un burger (Cheese ou Tex Mex) avec frites et boisson.' },
  { q: 'Comment fonctionne le programme de fidelite ?', a: 'Avec Note Me, cumulez 1 point par euro depense. Echangez vos points contre des reductions allant de 5% a 15%.' },
];

const blogPreviews = [
  {
    slug: 'burger-saint-michel-sur-orge',
    title: 'Pourquoi O\'240 est LE burger incontournable a Saint-Michel-sur-Orge',
    excerpt: 'Decouvrez O\'240, le restaurant burger artisanal de Saint-Michel-sur-Orge. Cuisson au charbon, ingredients frais, livraison 7j/7.',
  },
  {
    slug: 'menu-enfant-burger-saint-michel-sur-orge',
    title: 'Menu Enfant Burger a Saint-Michel-sur-Orge',
    excerpt: 'O\'240 propose des menus enfants complets : cheese burger ou nuggets ou tenders, frites + Capri-Sun. Parfait pour toute la famille !',
  },
  {
    slug: 'bucket-tenders-wings-saint-michel-sur-orge',
    title: 'Buckets Tenders & Wings a Saint-Michel-sur-Orge',
    excerpt: 'Envie de tenders ou wings ? O\'240 propose des buckets a partager des 21.90€. Livraison 7j/7 en Essonne.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Home() {
  return (
    <main>
      <SEO
        title="Burger Saint-Michel-sur-Orge | O'240 - Livraison & A Emporter"
        description="O'240, le burger artisanal a Saint-Michel-sur-Orge. Commandez en livraison ou a emporter : burgers au charbon, buckets, menus enfants. Ouvert 7j/7."
        canonical="https://o240.fr/"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["Restaurant", "LocalBusiness", "FoodEstablishment"],
        "@id": "https://o240.fr/#restaurant",
        "name": "O'240",
        "description": "Restaurant burger artisanal à Saint-Michel-sur-Orge. Burgers cuits au charbon, buckets, menus enfants, crêpes. Livraison et à emporter 7j/7.",
        "url": "https://o240.fr",
        "telephone": "+33177052710",
        "email": "contact@o240.fr",
        "currenciesAccepted": "EUR",
        "paymentAccepted": "Cash, Credit Card",
        "priceRange": "€€",
        "servesCuisine": ["Burgers", "Fast Food", "Poulet", "Crêpes"],
        "hasMenu": "https://o240.fr/burgers_maison",
        "menu": "https://o240.fr/burgers_maison",
        "acceptsReservations": "False",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "5 Rue Boieldieu",
          "addressLocality": "Saint-Michel-sur-Orge",
          "postalCode": "91240",
          "addressRegion": "Essonne",
          "addressCountry": "FR"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 48.6333, "longitude": 2.3167 },
        "openingHoursSpecification": [
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"], "opens": "11:00", "closes": "15:00" },
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"], "opens": "18:00", "closes": "22:45" },
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday", "Sunday"], "opens": "18:00", "closes": "22:45" }
        ],
        "image": ["https://o240.fr/images/o240-restaurant-burger-saint-michel-sur-orge.jpg"],
        "logo": { "@type": "ImageObject", "url": "https://o240.fr/logo.png", "width": 400, "height": 400 },
        "sameAs": ["https://www.facebook.com/o240burger", "https://www.instagram.com/o240burger"],
        "areaServed": { "@type": "City", "name": "Saint-Michel-sur-Orge" },
        "potentialAction": {
          "@type": "OrderAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://o240.fr/burgers_maison",
            "inLanguage": "fr",
            "actionPlatform": ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"]
          },
          "deliveryMethod": ["https://schema.org/DeliveryModeDirectDownload", "https://schema.org/DeliveryModeMail"]
        }
      }) }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Menu",
        "@id": "https://o240.fr/#menu-enfants",
        "name": "Menus Enfants O'240",
        "description": "Menus enfants complets servis avec frites et Capri-Sun, idéaux pour les petits gourmands de Saint-Michel-sur-Orge.",
        "url": "https://o240.fr/menus_enfants--saint-michel-sur-orge",
        "inLanguage": "fr",
        "hasMenuSection": [
          {
            "@type": "MenuSection", "@id": "https://o240.fr/#menu-section-enfants",
            "name": "Menus Enfants", "description": "Menus complets pour enfants : plat + frites + Capri-Sun",
            "hasMenuItem": [
              {
                "@type": "MenuItem", "@id": "https://o240.fr/#menuitem-enfant-cheese",
                "name": "Menu Enfant Cheese",
                "description": "1 Cheese Burger + frites + 1 Capri-Sun. Menu complet pour enfant, idéal pour les petits fans de burgers classiques.",
                "url": "https://o240.fr/menus_enfants--saint-michel-sur-orge",
                "image": "https://o240.fr/images/menu-enfant-cheese-o240.jpg",
                "offers": { "@type": "Offer", "price": "5.50", "priceCurrency": "EUR", "availability": "https://schema.org/InStock", "url": "https://o240.fr/menus_enfants--saint-michel-sur-orge" },
                "suitableForDiet": "https://schema.org/HalalDiet",
                "nutrition": { "@type": "NutritionInformation", "servingSize": "1 menu" }
              },
              {
                "@type": "MenuItem", "@id": "https://o240.fr/#menuitem-enfant-texmex",
                "name": "Menu Enfant Tex Mex",
                "description": "Tenders de poulet (ou nuggets) + frites + 1 Capri-Sun. Menu enfant gourmand avec du poulet croustillant.",
                "url": "https://o240.fr/menus_enfants--saint-michel-sur-orge",
                "image": "https://o240.fr/images/menu-enfant-texmex-o240.jpg",
                "offers": { "@type": "Offer", "price": "5.50", "priceCurrency": "EUR", "availability": "https://schema.org/InStock", "url": "https://o240.fr/menus_enfants--saint-michel-sur-orge" },
                "nutrition": { "@type": "NutritionInformation", "servingSize": "1 menu" }
              }
            ]
          },
          {
            "@type": "MenuSection", "@id": "https://o240.fr/#menu-section-burgers",
            "name": "Burgers", "description": "Burgers artisanaux cuits au charbon de bois",
            "hasMenuItem": [
              {
                "@type": "MenuItem", "@id": "https://o240.fr/#menuitem-burger-cheese", "name": "Cheese Burger",
                "description": "Burger au cheddar fondant, cuit au charbon. Disponible seul ou en menu avec frites et boisson.",
                "url": "https://o240.fr/burgers_maison",
                "offers": [
                  { "@type": "Offer", "name": "Seul", "price": "5.50", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" },
                  { "@type": "Offer", "name": "Menu (avec frites + boisson)", "price": "6.50", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
                ]
              },
              {
                "@type": "MenuItem", "@id": "https://o240.fr/#menuitem-burger-chicken", "name": "Chicken Burger",
                "description": "Burger au poulet croustillant, cuit au charbon.",
                "url": "https://o240.fr/burgers_maison",
                "offers": [
                  { "@type": "Offer", "name": "Seul", "price": "6.50", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" },
                  { "@type": "Offer", "name": "Menu", "price": "7.50", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
                ]
              },
              {
                "@type": "MenuItem", "@id": "https://o240.fr/#menuitem-burger-180gr", "name": "Burger 180GR",
                "description": "Burger généreux 180 grammes de viande cuite au charbon.",
                "url": "https://o240.fr/burgers_maison",
                "offers": [
                  { "@type": "Offer", "name": "Seul", "price": "8.50", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" },
                  { "@type": "Offer", "name": "Menu", "price": "9.50", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
                ]
              },
              {
                "@type": "MenuItem", "@id": "https://o240.fr/#menuitem-burger-tower", "name": "Tower Burger",
                "description": "Burger imposant multicouches, cuit au charbon.",
                "url": "https://o240.fr/burgers_maison",
                "offers": [
                  { "@type": "Offer", "name": "Seul", "price": "7.50", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" },
                  { "@type": "Offer", "name": "Menu", "price": "8.50", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
                ]
              }
            ]
          },
          {
            "@type": "MenuSection", "@id": "https://o240.fr/#menu-section-buckets",
            "name": "Buckets", "description": "Formules poulet à partager",
            "hasMenuItem": [
              {
                "@type": "MenuItem", "@id": "https://o240.fr/#menuitem-bucket-tenders", "name": "Bucket Tenders",
                "description": "Bucket de tenders de poulet croustillants à partager.",
                "url": "https://o240.fr/buckets--saint-michel-sur-orge",
                "offers": { "@type": "Offer", "price": "21.90", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
              },
              {
                "@type": "MenuItem", "@id": "https://o240.fr/#menuitem-bucket-wings", "name": "Bucket Wings",
                "description": "Bucket d'ailes de poulet marinées et dorées à partager.",
                "url": "https://o240.fr/buckets--saint-michel-sur-orge",
                "offers": { "@type": "Offer", "price": "22.90", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
              },
              {
                "@type": "MenuItem", "@id": "https://o240.fr/#menuitem-bucket-mix", "name": "Bucket Mix",
                "description": "Assortiment de tenders et wings de poulet à partager.",
                "url": "https://o240.fr/buckets--saint-michel-sur-orge",
                "offers": { "@type": "Offer", "price": "25.90", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
              }
            ]
          },
          {
            "@type": "MenuSection", "@id": "https://o240.fr/#menu-section-desserts",
            "name": "Desserts", "description": "Desserts gourmands O'240",
            "hasMenuItem": [
              {
                "@type": "MenuItem", "@id": "https://o240.fr/#menuitem-tarte-daims", "name": "Tarte aux Daims",
                "description": "Tarte aux Daims — à consommer immédiatement après décongélation.",
                "url": "https://o240.fr/desserts--saint-michel-sur-orge",
                "offers": { "@type": "Offer", "price": "2.50", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
              },
              {
                "@type": "MenuItem", "@id": "https://o240.fr/#menuitem-tiramisu", "name": "Tiramisu",
                "description": "Tiramisu artisanal, onctueux et généreux.",
                "url": "https://o240.fr/desserts--saint-michel-sur-orge",
                "offers": { "@type": "Offer", "price": "3.50", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
              }
            ]
          }
        ]
      }) }} />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 via-dark-950/70 to-dark-950/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-brand-400 font-medium text-sm uppercase tracking-widest mb-4">
              Restaurant Burger - Saint-Michel-sur-Orge
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white uppercase leading-[1.05] mb-6">
              Le Meilleur Burger a Saint-Michel-sur-Orge
            </h1>
            <p className="text-white/60 text-lg sm:text-xl max-w-lg mb-8 leading-relaxed">
              Burgers artisanaux cuits au charbon, buckets genereux, crepes gourmandes.
              Livraison a domicile ou a emporter, 7 jours sur 7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/menu" className="btn-primary inline-flex items-center justify-center gap-2 text-lg">
                Commander <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/menu" className="btn-outline inline-flex items-center justify-center gap-2 text-lg">
                Voir la Carte
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="bg-brand-500 py-4" aria-label="Informations rapides">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Clock, text: '7j/7 - 11h-15h / 18h-22h45' },
              { icon: MapPin, text: '5 Rue Boieldieu, 91240' },
              { icon: Phone, text: '01.77.05.27.10', href: 'tel:+33177052710' },
              { icon: Truck, text: 'Livraison & A emporter' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 justify-center text-white">
                <item.icon className="w-5 h-5 shrink-0" />
                {item.href ? (
                  <a href={item.href} className="text-sm font-medium hover:underline">{item.text}</a>
                ) : (
                  <span className="text-sm font-medium">{item.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Flame, title: 'Cuisson au charbon', desc: 'Tous nos burgers sont grilles au charbon de bois pour un gout unique' },
              { icon: Truck, title: 'Livraison rapide', desc: 'Livraison en 40 min dans toutes nos zones de livraison' },
              { icon: Clock, title: 'Ouvert 7j/7', desc: '11h-15h / 18h-22h45. Ven & Dim : 18h-22h45' },
              { icon: Star, title: 'Programme fidelite', desc: 'Cumulez des points et beneficiez de reductions exclusives' },
            ].map((f, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 bg-dark-900 rounded-2xl border border-white/5"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-6 h-6 text-brand-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NOS BURGERS */}
      <section className="py-20 bg-dark-950" id="burgers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-brand-400 font-medium text-sm uppercase tracking-widest">Cuisson au charbon</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mt-2">Nos Burgers</h2>
            <p className="text-white/40 mt-3 max-w-lg mx-auto">Grilles au charbon de bois pour une saveur incomparable</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {burgers.map((b, i) => (
              <motion.div key={b.name} {...fadeUp} transition={{ delay: i * 0.1 }}
                className="bg-dark-900 rounded-2xl border border-white/5 p-6 text-center card-hover"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-8 h-8 text-brand-500" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white uppercase mb-3">{b.name}</h3>
                <div className="flex justify-center gap-4 mb-4">
                  <div>
                    <p className="text-xs text-white/30 uppercase">Seul</p>
                    <p className="font-display text-xl font-bold text-brand-400">{b.solo.toFixed(2)}€</p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <p className="text-xs text-white/30 uppercase">Menu</p>
                    <p className="font-display text-xl font-bold text-white">{b.menu.toFixed(2)}€</p>
                  </div>
                </div>
                <Link to={`/menu?category=burgers`}
                  className="inline-flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 transition-colors"
                >
                  Commander <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MENUS ENFANTS */}
      <section id="menus-enfants" aria-label="Menus Enfants O'240" className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#E87722] uppercase tracking-wide text-center mb-6">
              Menus Enfants — Un Repas Complet pour les Petits Gourmands
            </h2>
            <p className="text-lg text-[#1a1a1a] text-center max-w-2xl mx-auto mb-10">
              Parce que les enfants méritent eux aussi un vrai bon repas, O'240 propose des
              <strong> menus enfants complets</strong> pensés pour les petits appétits. Votre
              enfant choisit ce qu'il préfère parmi trois options : un
              <strong> cheese burger</strong>, <strong>5 nuggets</strong> ou
              <strong> 3 tenders</strong> — le tout accompagné de
              <strong> frites croustillantes</strong> et d'<strong>un Capri-Sun</strong> pour la boisson.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            {[
              { emoji: '\uD83C\uDF54', name: 'Cheese Burger', desc: 'Un burger moelleux au cheddar fondant, pour les petits fans de classiques' },
              { emoji: '\uD83C\uDF57', name: '5 Nuggets', desc: 'Des nuggets de poulet dorés et croustillants, le choix indétrônable des enfants' },
              { emoji: '\uD83E\uDD69', name: '3 Tenders', desc: 'Des filets de poulet pané, plus généreux, pour les petits grands appétits' },
            ].map((item, i) => (
              <motion.div key={item.name} {...fadeUp} transition={{ delay: i * 0.1 }}
                className="bg-[#1a1a1a] rounded-2xl p-6 text-center shadow-lg"
              >
                <span className="text-5xl block mb-3">{item.emoji}</span>
                <h3 className="text-xl font-bold text-[#E87722] uppercase mb-2">{item.name}</h3>
                <p className="text-sm text-white">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-lg font-bold text-[#E87722] mb-6">
            Toujours accompagné de frites + 1 Capri-Sun — 5.50€
          </p>

          <Link
            to="/menu?category=menus_enfant"
            className="block w-full md:w-auto md:mx-auto md:px-10 py-4 bg-[#E87722] text-white font-extrabold text-lg uppercase rounded-full text-center hover:bg-orange-600 transition mb-8"
          >
            Commander le menu enfant →
          </Link>

          <p className="text-xs text-gray-400 text-center max-w-2xl mx-auto">
            O'240 est le restaurant fast-food familial de Saint-Michel-sur-Orge (91240) qui
            met un point d'honneur à proposer des menus enfants de qualité, à un prix
            accessible. Nos menus enfants sont disponibles en livraison à domicile et à
            emporter, 7 jours sur 7.
          </p>
        </div>
      </section>

      {/* BUCKETS */}
      <section className="py-20 bg-dark-950" id="buckets">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-brand-400 font-medium text-sm uppercase tracking-widest">Format familial</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mt-2">Nos Buckets</h2>
            <p className="text-white/40 mt-3 max-w-lg mx-auto">A partager entre amis ou en famille</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {buckets.map((b, i) => (
              <motion.div key={b.name} {...fadeUp} transition={{ delay: i * 0.1 }}
                className="bg-dark-900 rounded-2xl border border-white/5 p-8 text-center card-hover"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-brand-500" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white uppercase mb-2">Bucket {b.name}</h3>
                <p className="text-sm text-white/40 mb-4">{b.desc}</p>
                <span className="font-display text-3xl font-bold text-brand-400">{b.price.toFixed(2)}€</span>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/menu?category=buckets" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 transition-colors font-medium">
              Voir tous les buckets <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CREPES */}
      <section className="py-20 bg-dark-900/50" id="crepes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-brand-400 font-medium text-sm uppercase tracking-widest">Fait maison</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mt-2">Nos Crepes</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {crepesData.map((cat, i) => (
              <motion.div key={cat.type} {...fadeUp} transition={{ delay: i * 0.15 }}
                className="bg-dark-900 rounded-2xl border border-white/5 p-8"
              >
                <h3 className="font-display text-2xl font-bold text-white uppercase mb-4">Crepes {cat.type}</h3>
                <ul className="space-y-3">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/menu?category=crepes-${cat.type.toLowerCase()}`}
                  className="inline-flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 transition-colors mt-6"
                >
                  Voir les crepes {cat.type.toLowerCase()} <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <CategoryGrid />

      {/* PROGRAMME FIDELITE */}
      <section className="py-20 bg-dark-900/50" id="fidelite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <span className="text-brand-400 font-medium text-sm uppercase tracking-widest">Note Me</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mt-2 mb-4">Programme Fidelite</h2>
            <p className="text-white/40 max-w-lg mx-auto mb-10">
              Gagnez des points a chaque commande et profitez de reductions exclusives.
              1€ depense = 1 point gagne.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              { step: '1', title: 'Commandez', desc: 'En ligne ou au restaurant' },
              { step: '2', title: 'Cumulez', desc: '1 euro = 1 point' },
              { step: '3', title: 'Profitez', desc: 'Reductions de 5% a 15%' },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                className="bg-dark-900 rounded-2xl border border-white/5 p-6"
              >
                <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  {s.step}
                </div>
                <h3 className="font-display text-lg font-bold text-white uppercase mb-1">{s.title}</h3>
                <p className="text-sm text-white/40">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <Link to="/programme-fidelite" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 transition-colors font-medium">
            En savoir plus <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* BLOG PREVIEWS */}
      <section className="py-20 bg-dark-950" id="blog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-brand-400 font-medium text-sm uppercase tracking-widest">Actualites</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mt-2">Notre Blog</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPreviews.map((post, i) => (
              <motion.div key={post.slug} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="block bg-dark-900 rounded-2xl border border-white/5 p-6 card-hover h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4">
                    <BookOpen className="w-5 h-5 text-brand-500" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white uppercase mb-2 leading-snug">{post.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-brand-400 mt-4">
                    Lire l'article <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-dark-900/50" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase">Questions Frequentes</h2>
          </motion.div>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <motion.details key={i} {...fadeUp} transition={{ delay: i * 0.05 }}
                className="bg-dark-900 rounded-2xl border border-white/5 group"
              >
                <summary className="cursor-pointer p-6 font-semibold text-white list-none flex items-center justify-between">
                  {item.q}
                  <ChevronRight className="w-5 h-5 text-white/30 transition-transform group-open:rotate-90 shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-white/50 leading-relaxed -mt-2">{item.a}</div>
              </motion.details>
            ))}
          </div>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': faq.map((f) => ({
              '@type': 'Question',
              'name': f.q,
              'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
            })),
          }) }} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mb-4">
              Pret a commander ?
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
              Parcourez notre carte, composez votre commande et faites-vous livrer
              ou passez recuperer au restaurant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu" className="btn-primary inline-flex items-center justify-center gap-2 text-lg">
                Voir la Carte <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+33177052710" className="btn-outline inline-flex items-center justify-center gap-2 text-lg">
                <Phone className="w-5 h-5" /> Appeler
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
