import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cart';
import { Logo } from './Logo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { setCartOpen } = useCartStore();
  const count = useCartStore((s) => s.getItemCount());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/menu', label: 'La Carte' },
    { to: '/livraison', label: 'Livraison' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/95 backdrop-blur-lg shadow-lg shadow-black/20 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <nav className="hidden md:flex items-center gap-6" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-brand-500'
                    : 'text-white/80 hover:text-brand-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link to="/" className="flex items-center" aria-label="O'240 - Accueil">
            <span className="hidden sm:block"><Logo /></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="140" height="43" viewBox="0 0 210 64" aria-label="O'240" className="block sm:hidden">
              <defs>
                <linearGradient id="logoGradM" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFB347"/>
                  <stop offset="100%" stopColor="#E87722"/>
                </linearGradient>
                <filter id="logoGlowM" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="1.5" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <circle cx="28" cy="34" r="24" fill="none" stroke="#FFFFFF" strokeWidth="8"/>
              <circle cx="43" cy="17" r="13" fill="#141414"/>
              <circle cx="50" cy="8" r="3" fill="url(#logoGradM)" filter="url(#logoGlowM)"/>
              <circle cx="55" cy="15" r="1.8" fill="#FFB347"/>
              <circle cx="48" cy="4" r="2" fill="url(#logoGradM)" filter="url(#logoGlowM)"/>
              <path d="M 54 20 C 53 15 59 14 58 19 C 58 22 55 24 54 20 Z" fill="url(#logoGradM)"/>
              <text x="62" y="55" fontFamily="Oswald, Impact, sans-serif" fontWeight="700" fontSize="50" fill="#FFFFFF" letterSpacing="-2">240</text>
              <path d="M 61 59 Q 130 70 202 55" stroke="url(#logoGradM)" strokeWidth="2.2" fill="none" strokeLinecap="round" filter="url(#logoGlowM)"/>
              <path d="M 195 52 L 204 56 L 194 60 Z" fill="#E87722"/>
            </svg>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-sm text-white/60">
              <a href="tel:+33177052710" className="flex items-center gap-1 hover:text-brand-400 transition-colors" aria-label="Appeler O'240">
                <Phone className="w-4 h-4" />
              </a>
              <Link to="/livraison" className="flex items-center gap-1 hover:text-brand-400 transition-colors" aria-label="Zones de livraison">
                <MapPin className="w-4 h-4" />
              </Link>
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={`Panier (${count} articles)`}
            >
              <ShoppingBag className="w-6 h-6 text-white" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-900/95 backdrop-blur-lg border-t border-white/10"
          >
            <nav className="px-4 py-6 flex flex-col gap-4" aria-label="Navigation mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-lg font-display uppercase tracking-wide py-2 ${
                    location.pathname === link.to
                      ? 'text-brand-500'
                      : 'text-white/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a href="tel:+33177052710" className="text-lg font-display uppercase tracking-wide py-2 text-brand-400">
                01.77.05.27.10
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
