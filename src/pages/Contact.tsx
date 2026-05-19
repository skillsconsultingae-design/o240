import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', subject: '', message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <SEO
        title="Contact O'240 - Burger Saint-Michel-sur-Orge | 01.77.05.27.10"
        description="Contactez O'240, restaurant burger a Saint-Michel-sur-Orge. Adresse : 5 Rue Boieldieu, 91240. Telephone : 01.77.05.27.10. Ouvert 7j/7."
        canonical="https://o240.fr/contact"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <nav className="text-sm text-white/30 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-400 transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Contact</span>
          </nav>
          <span className="text-brand-400 font-medium text-sm uppercase tracking-widest">
            Contactez-nous
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase mt-2">
            Contact
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-dark-900 rounded-2xl p-12 border border-white/5 text-center"
              >
                <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white uppercase mb-2">
                  Message envoye
                </h3>
                <p className="text-white/40">Nous vous repondrons dans les plus brefs delais.</p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSubmit}
                className="bg-dark-900 rounded-2xl p-8 border border-white/5 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Prenom</label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-brand-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Nom</label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-brand-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Telephone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Objet</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-brand-500 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Envoyer le message
                </button>
              </motion.form>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {[
              { icon: MapPin, title: 'Adresse', text: '5 Rue Boieldieu, 91240 Saint-Michel-sur-Orge' },
              { icon: Phone, title: 'Telephone', text: '01.77.05.27.10', href: 'tel:+33177052710' },
              { icon: Mail, title: 'Email', text: 'contact@o240.fr', href: 'mailto:contact@o240.fr' },
              { icon: Clock, title: 'Horaires', text: 'Lun-Jeu, Sam : 11h-15h / 18h-22h45 | Ven, Dim : 18h-22h45' },
            ].map((info, i) => (
              <div
                key={i}
                className="bg-dark-900 rounded-2xl p-6 border border-white/5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                  <info.icon className="w-5 h-5 text-brand-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1">{info.title}</h3>
                  {info.href ? (
                    <a href={info.href} className="text-white/40 text-sm hover:text-brand-400 transition-colors">{info.text}</a>
                  ) : (
                    <p className="text-white/40 text-sm">{info.text}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl overflow-hidden border border-white/5"
        >
          <iframe
            title="O'240 - 5 Rue Boieldieu, Saint-Michel-sur-Orge"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2637.5!2d2.3067!3d48.6345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5d9a6b0f0c5e7%3A0x0!2s5+Rue+Boieldieu%2C+91240+Saint-Michel-sur-Orge!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Schema LocalBusiness */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': 'https://o240.fr/#business',
          name: "O'240",
          description: 'Restaurant burger fast-food a Saint-Michel-sur-Orge. Burgers cuits au charbon, buckets, crepes, menus enfants.',
          url: 'https://o240.fr',
          telephone: '+33177052710',
          priceRange: '$$',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '5 Rue Boieldieu',
            addressLocality: 'Saint-Michel-sur-Orge',
            postalCode: '91240',
            addressCountry: 'FR',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 48.6345,
            longitude: 2.3067,
          },
          openingHoursSpecification: [
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'], opens: '11:00', closes: '15:00' },
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'], opens: '18:00', closes: '22:45' },
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Sunday'], opens: '18:00', closes: '22:45' },
          ],
        }) }} />
      </div>
    </main>
  );
}
