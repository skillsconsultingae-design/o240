import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: 'Burgers Maison',
    subtitle: 'Signatures de la maison',
    description: 'Decouvrez nos burgers gourmet, prepares avec des ingredients frais et cuits au charbon.',
    cta: 'Voir les Burgers',
    category: 'burgers-maison',
    gradient: 'from-amber-900/90 via-dark-950/70 to-dark-950/90',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&q=80',
  },
  {
    title: 'Croque Monsieur',
    subtitle: 'Le classique revisité',
    description: 'Du croque traditionnel au croque special, faites-vous plaisir.',
    cta: 'Voir les Croques',
    category: 'croque-mr',
    gradient: 'from-orange-900/90 via-dark-950/70 to-dark-950/90',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1920&q=80',
  },
  {
    title: 'Tex Mex',
    subtitle: 'Tenders, Wings, Nuggets',
    description: 'Nos pieces croustillantes et genereux pour un moment de partage.',
    cta: 'Voir le Tex Mex',
    category: 'tex-mex',
    gradient: 'from-red-900/90 via-dark-950/70 to-dark-950/90',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=1920&q=80',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-block text-brand-400 font-medium text-sm uppercase tracking-widest mb-4"
              >
                {slide.subtitle}
              </motion.span>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white uppercase leading-none mb-6">
                {slide.title}
              </h1>
              <p className="text-white/60 text-lg sm:text-xl max-w-lg mb-8 leading-relaxed">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/menu?category=${slide.category}`}
                  className="btn-primary inline-flex items-center justify-center gap-2 text-lg"
                >
                  {slide.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/menu"
                  className="btn-outline inline-flex items-center justify-center gap-2 text-lg"
                >
                  Toute la Carte
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
        <button
          onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-brand-500' : 'w-4 bg-white/30'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrent((c) => (c + 1) % slides.length)}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </section>
  );
}
