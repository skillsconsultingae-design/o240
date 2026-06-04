import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-white/5" itemScope itemType="https://schema.org/Restaurant">
      <meta itemProp="name" content="O'240" />
      <meta itemProp="telephone" content="+33177052710" />
      <meta itemProp="priceRange" content="$$" />
      <link itemProp="url" href="https://o240.fr" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="inline-block mb-6" aria-label="O'240 - Accueil">
              <img src="/logo240.png" alt="O'240" className="h-20 w-auto object-contain" />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Les meilleurs cheese naan a Saint-Michel-sur-Orge,
              specialite Cheese Naan. Livraison a domicile et a emporter, 7j/7.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white/60" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white/60" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-white uppercase mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/menu', label: 'La Carte' },
                { to: '/livraison', label: 'Livraison' },
                { to: '/blog', label: 'Blog' },
                { to: '/contact', label: 'Contact' },
                { to: '/programme-fidelite', label: 'Programme Fidelite' },
                { to: '/allergenes', label: 'Allergenes' },
                { to: '/charte-qualite', label: 'Charte Qualite' },
                { to: '/cgv', label: 'C.G.V' },
                { to: '/mentions-legales', label: 'Mentions Legales' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/40 hover:text-brand-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-white uppercase mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" />
                <span className="text-white/40 text-sm" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="streetAddress">5 Rue Boieldieu</span>,{' '}
                  <span itemProp="postalCode">91240</span>{' '}
                  <span itemProp="addressLocality">Saint-Michel-sur-Orge</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <a href="tel:+33177052710" className="text-white/40 text-sm hover:text-brand-400 transition-colors">
                  01.77.05.27.10
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <a href="mailto:contact@o240.fr" className="text-white/40 text-sm hover:text-brand-400 transition-colors">
                  contact@o240.fr
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-white uppercase mb-6">
              Horaires
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-white/60 font-medium">Lun, Mar, Mer, Jeu, Sam</p>
                  <p className="text-white/40">11h00 - 15h00 / 18h00 - 22h45</p>
                  <meta itemProp="openingHours" content="Mo-Th,Sa 11:00-15:00" />
                  <meta itemProp="openingHours" content="Mo-Th,Sa 18:00-22:45" />
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-white/60 font-medium">Vendredi, Dimanche</p>
                  <p className="text-white/40">18h00 - 22h45</p>
                  <meta itemProp="openingHours" content="Fr,Su 18:00-22:45" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            2026 O'240 - MH FOOD FACTORY. Tous droits reserves.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/mentions-legales" className="text-white/30 hover:text-white/60 transition-colors">
              Mentions Legales
            </Link>
            <Link to="/cgv" className="text-white/30 hover:text-white/60 transition-colors">
              C.G.V
            </Link>
            <a
              href="https://lelaboia.fr/formule"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
            >
              <span>Composé par</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span className="font-medium">Le Labo IA</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
