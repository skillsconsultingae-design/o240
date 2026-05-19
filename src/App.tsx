import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Blog from './pages/Blog';
import BlogBurger from './pages/BlogBurger';
import BlogMenuEnfant from './pages/BlogMenuEnfant';
import BlogBucket from './pages/BlogBucket';
import Checkout from './pages/Checkout';
import Livraison from './pages/Livraison';
import Contact from './pages/Contact';
import LegalMentions from './pages/LegalMentions';
import Loyalty from './pages/Loyalty';
import Allergenes from './pages/Allergenes';
import CharteQualite from './pages/CharteQualite';
import CGV from './pages/CGV';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/carte" element={<Menu />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/burger-saint-michel-sur-orge" element={<BlogBurger />} />
          <Route path="/blog/menu-enfant-burger-saint-michel-sur-orge" element={<BlogMenuEnfant />} />
          <Route path="/blog/bucket-tenders-wings-saint-michel-sur-orge" element={<BlogBucket />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/livraison" element={<Livraison />} />
          <Route path="/zones-de-livraison" element={<Livraison />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<LegalMentions />} />
          <Route path="/programme-fidelite" element={<Loyalty />} />
          <Route path="/allergenes" element={<Allergenes />} />
          <Route path="/charte-qualite" element={<CharteQualite />} />
          <Route path="/cgv" element={<CGV />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-dark-950 font-body">
        <Header />
        <AnimatedRoutes />
        <Footer />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: '#212529',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}
