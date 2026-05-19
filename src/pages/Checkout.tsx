import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck, ShoppingBag, Minus, Plus, MapPin, Check, Lock,
  CreditCard, ArrowLeft, ArrowRight, ChevronRight, Phone, AlertCircle, Trash2,
} from 'lucide-react';
import { useCartStore } from '../store/cart';
import { ZONES_LIVRAISON } from '../data/catalogue';
import AddressAutocomplete from '../components/AddressAutocomplete';
import UpsellSuggestions from '../components/UpsellSuggestions';

const steps = [
  { id: 1, label: 'Mode' },
  { id: 2, label: 'Panier' },
  { id: 3, label: 'Infos' },
  { id: 4, label: 'Paiement' },
  { id: 5, label: 'Confirmation' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const {
    items, deliveryMode, orderStep, setDeliveryMode, setOrderStep,
    updateQuantity, removeItem, getTotal, clearCart,
  } = useCartStore();

  const [customerInfo, setCustomerInfo] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', instructions: '',
  });

  const [showZones, setShowZones] = useState(false);
  const [triedSubmitStep3, setTriedSubmitStep3] = useState(false);

  const step3Errors = {
    firstName: !customerInfo.firstName.trim(),
    lastName: !customerInfo.lastName.trim(),
    phone: !customerInfo.phone.trim(),
    address: deliveryMode === 'delivery' && !customerInfo.address.trim(),
  };

  const canProceed = () => {
    switch (orderStep) {
      case 1: return deliveryMode !== null;
      case 2: return items.length > 0;
      case 3: return !step3Errors.firstName && !step3Errors.lastName && !step3Errors.phone && !step3Errors.address;
      case 4: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (orderStep === 3) {
      setTriedSubmitStep3(true);
      if (!canProceed()) return;
    }
    if (orderStep === 4) {
      setOrderStep(5);
      return;
    }
    if (canProceed()) {
      setOrderStep(orderStep + 1);
    }
  };

  const handleBack = () => {
    if (orderStep > 1) setOrderStep(orderStep - 1);
    else navigate('/menu');
  };

  const total = getTotal();

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {orderStep < 5 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              {steps.slice(0, 4).map((step) => (
                <div key={step.id} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      orderStep >= step.id
                        ? 'bg-brand-500 text-white'
                        : 'bg-dark-800 text-white/30'
                    }`}
                  >
                    {orderStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span className={`hidden sm:block text-sm font-medium ${
                    orderStep >= step.id ? 'text-white' : 'text-white/30'
                  }`}>
                    {step.label}
                  </span>
                  {step.id < 4 && (
                    <ChevronRight className="w-4 h-4 text-white/20 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
            <div className="h-1 bg-dark-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brand-500 rounded-full"
                animate={{ width: `${(orderStep / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {orderStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="font-display text-3xl font-bold text-white uppercase mb-8 text-center">
                Choix du mode
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button
                  onClick={() => setDeliveryMode('delivery')}
                  className={`relative p-8 rounded-2xl border-2 transition-all text-left ${
                    deliveryMode === 'delivery'
                      ? 'border-brand-500 bg-brand-500/10'
                      : 'border-white/10 bg-dark-900 hover:border-white/20'
                  }`}
                >
                  <Truck className={`w-12 h-12 mb-4 ${deliveryMode === 'delivery' ? 'text-brand-500' : 'text-white/40'}`} />
                  <h3 className="font-display text-xl font-bold text-white uppercase mb-2">
                    Livraison a domicile
                  </h3>
                  <p className="text-sm text-white/40">Recevez votre commande directement chez vous</p>
                  {deliveryMode === 'delivery' && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setDeliveryMode('pickup')}
                  className={`relative p-8 rounded-2xl border-2 transition-all text-left ${
                    deliveryMode === 'pickup'
                      ? 'border-brand-500 bg-brand-500/10'
                      : 'border-white/10 bg-dark-900 hover:border-white/20'
                  }`}
                >
                  <ShoppingBag className={`w-12 h-12 mb-4 ${deliveryMode === 'pickup' ? 'text-brand-500' : 'text-white/40'}`} />
                  <h3 className="font-display text-xl font-bold text-white uppercase mb-2">
                    A emporter
                  </h3>
                  <p className="text-sm text-white/40">Pret en 20 min, venez recuperer au restaurant</p>
                  {deliveryMode === 'pickup' && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              </div>

              {deliveryMode === 'delivery' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6"
                >
                  <button
                    onClick={() => setShowZones(!showZones)}
                    className="flex items-center gap-2 text-brand-400 text-sm hover:text-brand-300 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Voir les zones de livraison et minimums
                  </button>
                  {showZones && (
                    <div className="mt-4 bg-dark-900 rounded-xl p-6 border border-white/5">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-2 text-white/60 font-medium">Zone</th>
                            <th className="text-right py-2 text-white/60 font-medium">Minimum</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ZONES_LIVRAISON.map((z, i) => (
                            <tr key={i} className="border-b border-white/5">
                              <td className="py-3 text-white/80">{z.zone}</td>
                              <td className="py-3 text-right text-brand-400 font-semibold">{z.minimum}€</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}

              {deliveryMode === 'pickup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 bg-dark-900 rounded-xl p-6 border border-white/5"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white font-medium">O'240 - Saint-Michel-sur-Orge</p>
                      <p className="text-white/40 text-sm mt-1">91240 Saint-Michel-sur-Orge</p>
                      <p className="text-brand-400 text-sm mt-2">Pret en environ 20 minutes</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {orderStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="font-display text-3xl font-bold text-white uppercase mb-8 text-center">
                Recapitulatif
              </h2>
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40">Votre panier est vide</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.cartKey}
                      className="bg-dark-900 rounded-xl p-4 border border-white/5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white truncate">{item.nom}</h3>
                          {item.formule && (
                            <span className="text-xs text-white/40 uppercase tracking-wide">
                              {item.formule === 'menu' ? 'Menu' : 'Seul'}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.cartKey, item.quantite - 1)}
                            className="w-8 h-8 rounded-lg bg-dark-800 flex items-center justify-center hover:bg-dark-700 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-white/60" />
                          </button>
                          <span className="text-white font-semibold w-6 text-center">{item.quantite}</span>
                          <button
                            onClick={() => updateQuantity(item.cartKey, item.quantite + 1)}
                            className="w-8 h-8 rounded-lg bg-dark-800 flex items-center justify-center hover:bg-dark-700 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-white/60" />
                          </button>
                        </div>
                        <span className="text-brand-400 font-bold w-20 text-right">
                          {(item.prix_unitaire * item.quantite).toFixed(2)}€
                        </span>
                        <button
                          onClick={() => removeItem(item.cartKey)}
                          className="p-1.5 rounded-lg hover:bg-error-500/20 transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4 text-error-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <UpsellSuggestions />
                  </div>
                  <div className="bg-dark-900 rounded-xl p-6 border border-white/5 mt-6">
                    <div className="flex justify-between text-sm text-white/40 mb-2">
                      <span>Sous-total</span>
                      <span>{total.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-sm text-white/40 mb-4">
                      <span>Frais de livraison</span>
                      <span className="text-success-400">Gratuit</span>
                    </div>
                    <div className="border-t border-white/10 pt-4 flex justify-between">
                      <span className="font-semibold text-white">Total</span>
                      <span className="font-display text-2xl font-bold text-white">
                        {total.toFixed(2)}€
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {orderStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="font-display text-3xl font-bold text-white uppercase mb-2 text-center">
                Vos informations
              </h2>
              <p className="text-center text-sm text-white/30 mb-8">
                Les champs marques d'un <span className="text-brand-500">*</span> sont obligatoires
              </p>
              <div className="space-y-5 max-w-lg mx-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1 text-sm text-white/60 mb-2">
                      Prenom <span className="text-brand-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                      className={`w-full bg-dark-800 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors ${
                        triedSubmitStep3 && step3Errors.firstName
                          ? 'border-error-500 focus:border-error-400'
                          : 'border-white/10 focus:border-brand-500'
                      }`}
                      placeholder="Votre prenom"
                    />
                    {triedSubmitStep3 && step3Errors.firstName && (
                      <p className="flex items-center gap-1 mt-1.5 text-xs text-error-400">
                        <AlertCircle className="w-3 h-3" />
                        Prenom requis
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="flex items-center gap-1 text-sm text-white/60 mb-2">
                      Nom <span className="text-brand-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                      className={`w-full bg-dark-800 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors ${
                        triedSubmitStep3 && step3Errors.lastName
                          ? 'border-error-500 focus:border-error-400'
                          : 'border-white/10 focus:border-brand-500'
                      }`}
                      placeholder="Votre nom"
                    />
                    {triedSubmitStep3 && step3Errors.lastName && (
                      <p className="flex items-center gap-1 mt-1.5 text-xs text-error-400">
                        <AlertCircle className="w-3 h-3" />
                        Nom requis
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1 text-sm text-white/60 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-brand-500 focus:outline-none transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1 text-sm text-white/60 mb-2">
                    Telephone <span className="text-brand-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className={`w-full bg-dark-800 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-colors ${
                      triedSubmitStep3 && step3Errors.phone
                        ? 'border-error-500 focus:border-error-400'
                        : 'border-white/10 focus:border-brand-500'
                    }`}
                    placeholder="06 12 34 56 78"
                  />
                  {triedSubmitStep3 && step3Errors.phone ? (
                    <p className="flex items-center gap-1 mt-1.5 text-xs text-error-400">
                      <AlertCircle className="w-3 h-3" />
                      Numero de telephone requis
                    </p>
                  ) : (
                    <div className="flex items-start gap-2 mt-2 p-3 bg-brand-500/5 border border-brand-500/10 rounded-lg">
                      <Phone className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-white/50 leading-relaxed">
                        Le livreur pourra vous appeler sur ce numero en cas de besoin.
                        Assurez-vous qu'il soit joignable pendant la livraison.
                      </p>
                    </div>
                  )}
                </div>

                {deliveryMode === 'delivery' && (
                  <div>
                    <label className="flex items-center gap-1 text-sm text-white/60 mb-2">
                      Adresse de livraison <span className="text-brand-500">*</span>
                    </label>
                    <AddressAutocomplete
                      value={customerInfo.address}
                      onChange={(val) => setCustomerInfo({ ...customerInfo, address: val })}
                      placeholder="Recherchez votre adresse..."
                    />
                    {triedSubmitStep3 && step3Errors.address && (
                      <p className="flex items-center gap-1 mt-1.5 text-xs text-error-400">
                        <AlertCircle className="w-3 h-3" />
                        Adresse de livraison requise
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm text-white/60 mb-2">Instructions speciales</label>
                  <textarea
                    value={customerInfo.instructions}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, instructions: e.target.value })}
                    rows={3}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-brand-500 focus:outline-none transition-colors resize-none"
                    placeholder="Allergies, code porte, etage..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {orderStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="font-display text-3xl font-bold text-white uppercase mb-8 text-center">
                Paiement
              </h2>
              <div className="max-w-lg mx-auto">
                <div className="bg-dark-900 rounded-xl p-6 border border-white/5 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-5 h-5 text-brand-500" />
                    <span className="font-medium text-white">Carte bancaire</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Numero de carte</label>
                      <input
                        type="text"
                        className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-brand-500 focus:outline-none transition-colors"
                        placeholder="4242 4242 4242 4242"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Expiration</label>
                        <input
                          type="text"
                          className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-brand-500 focus:outline-none transition-colors"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-white/60 mb-2">CVC</label>
                        <input
                          type="text"
                          className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-brand-500 focus:outline-none transition-colors"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-900 rounded-xl p-6 border border-white/5 mb-6">
                  <div className="flex justify-between text-sm text-white/40 mb-2">
                    <span>Sous-total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/40 mb-4">
                    <span>Livraison</span>
                    <span className="text-success-400">Gratuit</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between">
                    <span className="font-semibold text-white">Total</span>
                    <span className="font-display text-2xl font-bold text-white">
                      {total.toFixed(2)}€
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-white/30 mb-4">
                  <Lock className="w-4 h-4" />
                  <span>Paiement securise SSL</span>
                </div>
              </div>
            </motion.div>
          )}

          {orderStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Check className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="font-display text-4xl font-bold text-white uppercase mb-4">
                Commande confirmee !
              </h2>
              <p className="text-white/50 text-lg mb-2">
                Numero de commande : #{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>
              <p className="text-white/40 mb-8">
                {deliveryMode === 'delivery'
                  ? 'Temps estime de livraison : environ 40 minutes'
                  : 'Votre commande sera prete dans environ 20 minutes'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    clearCart();
                    navigate('/');
                  }}
                  className="btn-outline"
                >
                  Retour a l'accueil
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {orderStep < 5 && (
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                canProceed()
                  ? 'bg-brand-500 hover:bg-brand-600 text-white'
                  : 'bg-dark-800 text-white/30 cursor-not-allowed'
              }`}
            >
              {orderStep === 4 ? `Payer ${total.toFixed(2)}€` : 'Continuer'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
