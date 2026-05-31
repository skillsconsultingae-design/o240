import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Check, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  type Produit,
  type ProduitFormule,
  type ProduitAssiette,
  type ProduitCrepe,
  VIANDES_ASSIETTE,
  BOISSONS_SUPP_ASSIETTE,
  BOISSONS_MENU,
  SAUCES_OFFERTES,
  PAINS_SANDWICHS,
  SODIPS_LEGUMES,
  SODIPS_VIANDES,
  SODIPS_FROMAGES,
} from '../data/catalogue';
import { useCartStore } from '../store/cart';

interface Props {
  produit: Produit;
  onClose: () => void;
}

const CATEGORIES_AVEC_SAUCES = ['burgers', 'paninis', 'sodips', 'sandwichs', 'tex_mex'];

export default function ConfigurateurModal({ produit, onClose }: Props) {
  const content = (() => {
    switch (produit.type) {
      case 'assiette':
        return <ConfigAssiette produit={produit} onClose={onClose} />;
      case 'formule':
        return <ConfigFormule produit={produit} onClose={onClose} />;
      case 'crepe_sucree':
        return <ConfigCrepe produit={produit} onClose={onClose} />;
      case 'simple':
        if (produit.id === 'sodip_compose') {
          return <ConfigSodipCompose produit={produit} onClose={onClose} />;
        }
        if (CATEGORIES_AVEC_SAUCES.includes(produit.categorie)) {
          return <ConfigSimpleAvecSauces produit={produit} onClose={onClose} />;
        }
        return null;
      default:
        return null;
    }
  })();

  if (!content) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-dark-900 w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ────────────────────────────────────────
// Assiette configurator (1 or 2 viandes)
// ────────────────────────────────────────

function ConfigAssiette({ produit, onClose }: { produit: ProduitAssiette; onClose: () => void }) {
  const addItem = useCartStore((s) => s.addItem);
  const isDouble = produit.nb_viandes_max === 2;

  const [selectedViande, setSelectedViande] = useState<string | null>(null);
  const [viandeCounts, setViandeCounts] = useState<Record<string, number>>(
    () => Object.fromEntries(VIANDES_ASSIETTE.map((v) => [v.id, 0]))
  );
  const [selectedBoissons, setSelectedBoissons] = useState<Set<string>>(new Set());

  const totalViandes = isDouble
    ? Object.values(viandeCounts).reduce((a, b) => a + b, 0)
    : selectedViande ? 1 : 0;

  const suppTotal = selectedBoissons.size * produit.supp_boisson;
  const totalPrice = produit.prix_base + suppTotal;

  const canConfirm = isDouble ? totalViandes === 2 : selectedViande !== null;

  function toggleBoisson(id: string) {
    setSelectedBoissons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function incrementViande(id: string) {
    if (totalViandes >= 2) {
      toast.error('Maximum 2 viandes atteint. Retirez d\'abord une viande avant d\'en choisir une autre.', {
        duration: 3000,
        style: { background: '#dc2626', color: '#fff', border: 'none' },
      });
      return;
    }
    setViandeCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  function decrementViande(id: string) {
    setViandeCounts((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }));
  }

  function handleConfirm() {
    const viandes = isDouble
      ? VIANDES_ASSIETTE
          .filter((v) => viandeCounts[v.id] > 0)
          .map((v) => ({ id: v.id, nom: v.nom, quantite: viandeCounts[v.id] }))
      : selectedViande
        ? [{ id: selectedViande, nom: VIANDES_ASSIETTE.find((v) => v.id === selectedViande)!.nom, quantite: 1 }]
        : [];

    addItem({
      id: produit.id,
      nom: produit.nom,
      categorie: produit.categorie,
      viandes,
      boissons_supp: [...selectedBoissons],
    });
    onClose();
  }

  return (
    <>
      <ModalHeader
        title={`ASSIETTE ${produit.nom}`}
        subtitle={`${produit.prix_base.toFixed(2)}€`}
        onClose={onClose}
      />

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-white text-sm uppercase">
              {isDouble ? 'Vos 2 viandes' : 'Votre viande'}
            </h4>
            {isDouble && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                totalViandes === 2
                  ? 'bg-success-500/20 text-success-400'
                  : 'bg-brand-500/20 text-brand-400'
              }`}>
                {totalViandes}/2
              </span>
            )}
          </div>

          <div className="space-y-2">
            {VIANDES_ASSIETTE.map((v) => {
              if (isDouble) {
                const qty = viandeCounts[v.id] || 0;
                return (
                  <div
                    key={v.id}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                      qty > 0 ? 'border-brand-500/50 bg-brand-500/5' : 'border-white/5 bg-dark-800'
                    }`}
                  >
                    <span className="text-sm text-white">{v.nom}</span>
                    <div className="flex items-center gap-2">
                      {qty > 0 && (
                        <>
                          <button
                            onClick={() => decrementViande(v.id)}
                            className="w-7 h-7 rounded-lg bg-dark-700 flex items-center justify-center hover:bg-dark-600 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5 text-white/60" />
                          </button>
                          <span className="text-white font-semibold text-sm w-5 text-center">{qty}</span>
                        </>
                      )}
                      <button
                        onClick={() => incrementViande(v.id)}
                        className="w-7 h-7 rounded-lg bg-brand-500/20 flex items-center justify-center hover:bg-brand-500/40 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 text-brand-400" />
                      </button>
                    </div>
                  </div>
                );
              }
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedViande(v.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                    selectedViande === v.id
                      ? 'border-brand-500 bg-brand-500/10'
                      : 'border-white/5 bg-dark-800 hover:border-white/10'
                  }`}
                >
                  <span className="text-sm text-white">{v.nom}</span>
                  {selectedViande === v.id && (
                    <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <BoissonsSuppSection
          selected={selectedBoissons}
          onToggle={toggleBoisson}
          prixUnit={produit.supp_boisson}
        />
      </div>

      <ModalFooter
        totalPrice={totalPrice}
        canConfirm={canConfirm}
        onConfirm={handleConfirm}
        warningMessage={
          isDouble
            ? 'Veuillez selectionner exactement 2 viandes'
            : 'Veuillez choisir votre viande'
        }
      />
    </>
  );
}

// ────────────────────────────────────────
// Formule configurator (seul/menu)
// ────────────────────────────────────────

function ConfigFormule({ produit, onClose }: { produit: ProduitFormule; onClose: () => void }) {
  const addItem = useCartStore((s) => s.addItem);
  const [formule, setFormule] = useState<'seul' | 'menu'>('seul');
  const [boissonMenu, setBoissonMenu] = useState<string | null>(null);
  const [pain, setPain] = useState<string | null>(
    produit.categorie === 'sandwichs' ? 'pain_classique' : null
  );
  const [sauces, setSauces] = useState<Set<string>>(new Set());

  const isSandwich = produit.categorie === 'sandwichs';
  const painSupp = isSandwich && pain
    ? (PAINS_SANDWICHS.find((p) => p.id === pain)?.supplement || 0)
    : 0;
  const totalPrice = (formule === 'menu' ? produit.prix_menu : produit.prix_seul) + painSupp;
  const canConfirm = (formule === 'seul' || boissonMenu !== null) && (!isSandwich || pain !== null);

  function toggleSauce(id: string) {
    setSauces((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleConfirm() {
    addItem({
      id: produit.id,
      nom: produit.nom,
      categorie: produit.categorie,
      formule,
      pain: isSandwich ? pain || undefined : undefined,
      boisson_menu: formule === 'menu' ? boissonMenu || undefined : undefined,
      sauces: sauces.size > 0 ? [...sauces] : undefined,
    });
    onClose();
  }

  return (
    <>
      <ModalHeader title={produit.nom} onClose={onClose} />

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Bread choice for sandwichs */}
        {isSandwich && (
          <div>
            <h4 className="font-semibold text-white text-sm uppercase mb-1">Choix du pain</h4>
            <p className="text-xs text-white/30 mb-3">Obligatoire</p>
            <div className="space-y-2">
              {PAINS_SANDWICHS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPain(p.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                    pain === p.id
                      ? 'border-brand-500 bg-brand-500/10'
                      : 'border-white/5 bg-dark-800 hover:border-white/10'
                  }`}
                >
                  <span className="text-sm text-white">{p.nom}</span>
                  <div className="flex items-center gap-2">
                    {p.supplement > 0 && (
                      <span className="text-xs text-brand-400">+{p.supplement.toFixed(2)}€</span>
                    )}
                    {p.supplement === 0 && (
                      <span className="text-xs text-success-400">Inclus</span>
                    )}
                    {pain === p.id && (
                      <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Garniture info for sandwichs */}
        {isSandwich && (
          <div>
            <h4 className="font-semibold text-white text-sm uppercase mb-1">Garniture incluse</h4>
            <p className="text-xs text-white/30 mb-3">Salade, Tomate, Oignon</p>
          </div>
        )}

        {/* Formule choice */}
        <div>
          <h4 className="font-semibold text-white text-sm uppercase mb-3">Formule</h4>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { setFormule('seul'); setBoissonMenu(null); }}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                formule === 'seul'
                  ? 'border-brand-500 bg-brand-500/10'
                  : 'border-white/10 bg-dark-800 hover:border-white/20'
              }`}
            >
              <span className="font-display text-2xl font-bold text-white block">
                {(produit.prix_seul + painSupp).toFixed(2)}€
              </span>
              <span className="text-xs text-white/40 mt-1 block uppercase">Seul</span>
              <span className="text-[10px] text-white/25 mt-0.5 block">Sans frites ni boisson</span>
            </button>
            <button
              onClick={() => setFormule('menu')}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                formule === 'menu'
                  ? 'border-brand-500 bg-brand-500/10'
                  : 'border-white/10 bg-dark-800 hover:border-white/20'
              }`}
            >
              <span className="font-display text-2xl font-bold text-white block">
                {(produit.prix_menu + painSupp).toFixed(2)}€
              </span>
              <span className="text-xs text-white/40 mt-1 block uppercase">En Menu</span>
              <span className="text-[10px] text-white/25 mt-0.5 block">Avec frites + boisson</span>
            </button>
          </div>
        </div>

        {/* Drink choice when menu selected */}
        <AnimatePresence>
          {formule === 'menu' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div>
                <h4 className="font-semibold text-white text-sm uppercase mb-1">Choix de la boisson</h4>
                <p className="text-xs text-white/30 mb-3">Incluse dans votre menu</p>
                <div className="space-y-2">
                  {BOISSONS_MENU.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBoissonMenu(b)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                        boissonMenu === b
                          ? 'border-brand-500 bg-brand-500/10'
                          : 'border-white/5 bg-dark-800 hover:border-white/10'
                      }`}
                    >
                      <span className="text-sm text-white">{b}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-success-400">Incluse</span>
                        {boissonMenu === b && (
                          <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {CATEGORIES_AVEC_SAUCES.includes(produit.categorie) && (
          <SaucesSection selected={sauces} onToggle={toggleSauce} />
        )}
      </div>

      <ModalFooter
        totalPrice={totalPrice}
        canConfirm={canConfirm}
        onConfirm={handleConfirm}
        warningMessage={
          isSandwich && !pain
            ? "Choisissez votre pain pour continuer"
            : "Choisissez votre boisson pour valider le menu"
        }
      />
    </>
  );
}

// ────────────────────────────────────────
// Crepe sucree configurator
// ────────────────────────────────────────

function ConfigCrepe({ produit, onClose }: { produit: ProduitCrepe; onClose: () => void }) {
  const addItem = useCartStore((s) => s.addItem);
  const [gourmandises, setGourmandises] = useState<Set<string>>(new Set());
  const [fruits, setFruits] = useState<Set<string>>(new Set());

  const suppGourmandises = gourmandises.size * 1.00;
  const suppFruits = fruits.size * 1.50;
  const totalPrice = produit.prix_base + suppGourmandises + suppFruits;

  function toggleGourmandise(id: string) {
    setGourmandises((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleFruit(id: string) {
    setFruits((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleConfirm() {
    addItem({
      id: produit.id,
      nom: produit.nom,
      categorie: produit.categorie,
      toppings_gourmandises: gourmandises.size > 0 ? [...gourmandises] : undefined,
      toppings_fruits: fruits.size > 0 ? [...fruits] : undefined,
    });
    onClose();
  }

  return (
    <>
      <ModalHeader
        title="COMPOSEZ VOTRE CREPE SUCREE"
        subtitle={`Base : ${produit.prix_base.toFixed(2)}€`}
        onClose={onClose}
      />

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div>
          <h4 className="font-semibold text-white text-sm uppercase mb-3">
            Gourmandises <span className="text-brand-400 font-normal">(+1.00€ chacune)</span>
          </h4>
          <div className="space-y-2">
            {produit.toppings_gourmandises.map((t) => (
              <button
                key={t.id}
                onClick={() => toggleGourmandise(t.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                  gourmandises.has(t.id)
                    ? 'border-brand-500 bg-brand-500/10'
                    : 'border-white/5 bg-dark-800 hover:border-white/10'
                }`}
              >
                <span className="text-sm text-white">{t.nom}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-brand-400">+{t.prix.toFixed(2)}€</span>
                  {gourmandises.has(t.id) && (
                    <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white text-sm uppercase mb-3">
            Fruits <span className="text-brand-400 font-normal">(+1.50€ chacun)</span>
          </h4>
          <div className="space-y-2">
            {produit.toppings_fruits.map((t) => (
              <button
                key={t.id}
                onClick={() => toggleFruit(t.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                  fruits.has(t.id)
                    ? 'border-brand-500 bg-brand-500/10'
                    : 'border-white/5 bg-dark-800 hover:border-white/10'
                }`}
              >
                <span className="text-sm text-white">{t.nom}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-brand-400">+{t.prix.toFixed(2)}€</span>
                  {fruits.has(t.id) && (
                    <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ModalFooter
        totalPrice={totalPrice}
        canConfirm={true}
        onConfirm={handleConfirm}
      />
    </>
  );
}

// ────────────────────────────────────────
// Simple product with sauces only
// ────────────────────────────────────────

function ConfigSimpleAvecSauces({ produit, onClose }: { produit: Produit & { type: 'simple'; prix: number }; onClose: () => void }) {
  const addItem = useCartStore((s) => s.addItem);
  const [sauces, setSauces] = useState<Set<string>>(new Set());

  function toggleSauce(id: string) {
    setSauces((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleConfirm() {
    addItem({
      id: produit.id,
      nom: produit.nom,
      categorie: produit.categorie,
      sauces: sauces.size > 0 ? [...sauces] : undefined,
    });
    onClose();
  }

  return (
    <>
      <ModalHeader
        title={produit.nom}
        subtitle={`${produit.prix.toFixed(2)}€`}
        onClose={onClose}
      />

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <SaucesSection selected={sauces} onToggle={toggleSauce} />
      </div>

      <ModalFooter
        totalPrice={produit.prix}
        canConfirm={true}
        onConfirm={handleConfirm}
      />
    </>
  );
}

// ────────────────────────────────────────
// Sodip's Compose configurator
// ────────────────────────────────────────

function ConfigSodipCompose({ produit, onClose }: { produit: Produit & { type: 'simple'; prix: number }; onClose: () => void }) {
  const addItem = useCartStore((s) => s.addItem);
  const [legumes, setLegumes] = useState<Set<string>>(new Set());
  const [viandes, setViandes] = useState<Set<string>>(new Set());
  const [fromages, setFromages] = useState<Set<string>>(new Set());
  const [sauces, setSauces] = useState<Set<string>>(new Set());

  const suppLegumes = [...legumes].reduce((sum, id) => {
    const t = SODIPS_LEGUMES.find((l) => l.id === id);
    return sum + (t ? t.prix : 0.50);
  }, 0);
  const suppViandes = [...viandes].reduce((sum, id) => {
    const t = SODIPS_VIANDES.find((v) => v.id === id);
    return sum + (t ? t.prix : 1.50);
  }, 0);
  const suppFromages = [...fromages].reduce((sum, id) => {
    const t = SODIPS_FROMAGES.find((f) => f.id === id);
    return sum + (t ? t.prix : 0.80);
  }, 0);
  const totalPrice = produit.prix + suppLegumes + suppViandes + suppFromages;

  function toggle(setFn: React.Dispatch<React.SetStateAction<Set<string>>>, id: string) {
    setFn((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleConfirm() {
    addItem({
      id: produit.id,
      nom: produit.nom,
      categorie: produit.categorie,
      sodips_legumes: legumes.size > 0 ? [...legumes] : undefined,
      sodips_viandes: viandes.size > 0 ? [...viandes] : undefined,
      sodips_fromages: fromages.size > 0 ? [...fromages] : undefined,
      sauces: sauces.size > 0 ? [...sauces] : undefined,
    });
    onClose();
  }

  return (
    <>
      <ModalHeader
        title="COMPOSEZ VOTRE SODIP'S"
        subtitle={`Base : ${produit.prix.toFixed(2)}€`}
        onClose={onClose}
      />

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <ToppingsSection
          title="Legumes"
          prixLabel="+0.50€"
          items={SODIPS_LEGUMES}
          selected={legumes}
          onToggle={(id) => toggle(setLegumes, id)}
        />
        <ToppingsSection
          title="Viandes / Poissons"
          prixLabel="+1.50€"
          items={SODIPS_VIANDES}
          selected={viandes}
          onToggle={(id) => toggle(setViandes, id)}
        />
        <ToppingsSection
          title="Fromages"
          prixLabel="+0.80€"
          items={SODIPS_FROMAGES}
          selected={fromages}
          onToggle={(id) => toggle(setFromages, id)}
        />
        <SaucesSection selected={sauces} onToggle={(id) => toggle(setSauces, id)} />
      </div>

      <ModalFooter
        totalPrice={totalPrice}
        canConfirm={true}
        onConfirm={handleConfirm}
      />
    </>
  );
}

function ToppingsSection({
  title,
  prixLabel,
  items,
  selected,
  onToggle,
}: {
  title: string;
  prixLabel: string;
  items: { id: string; nom: string; prix: number }[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <h4 className="font-semibold text-white text-sm uppercase mb-3">
        {title} <span className="text-brand-400 font-normal">({prixLabel} chacun)</span>
      </h4>
      <div className="space-y-2">
        {items.map((t) => (
          <button
            key={t.id}
            onClick={() => onToggle(t.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
              selected.has(t.id)
                ? 'border-brand-500 bg-brand-500/10'
                : 'border-white/5 bg-dark-800 hover:border-white/10'
            }`}
          >
            <span className="text-sm text-white">{t.nom}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-400">+{t.prix.toFixed(2)}€</span>
              {selected.has(t.id) && (
                <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────
// Shared sub-components
// ────────────────────────────────────────

function ModalHeader({ title, subtitle, onClose }: { title: string; subtitle?: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
      <div>
        <h3 className="font-display text-xl font-bold text-white uppercase">{title}</h3>
        {subtitle && <p className="text-sm text-white/40 mt-0.5">{subtitle}</p>}
      </div>
      <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
        <X className="w-5 h-5 text-white/60" />
      </button>
    </div>
  );
}

function ModalFooter({
  totalPrice,
  canConfirm,
  onConfirm,
  warningMessage,
}: {
  totalPrice: number;
  canConfirm: boolean;
  onConfirm: () => void;
  warningMessage?: string;
}) {
  return (
    <div className="border-t border-white/10 p-5 shrink-0">
      <div className="flex items-center justify-between mb-4">
        <span className="text-white font-medium">Total</span>
        <span className="font-display text-2xl font-bold text-white">{totalPrice.toFixed(2)}€</span>
      </div>
      <button
        onClick={onConfirm}
        disabled={!canConfirm}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all ${
          canConfirm
            ? 'bg-brand-500 hover:bg-brand-600 text-white'
            : 'bg-dark-800 text-white/30 cursor-not-allowed'
        }`}
      >
        {!canConfirm && <AlertCircle className="w-4 h-4" />}
        AJOUTER AU PANIER {'\u2022'} {totalPrice.toFixed(2)}€
      </button>
      {!canConfirm && warningMessage && (
        <p className="text-center text-xs text-warning-400 mt-2 flex items-center justify-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {warningMessage}
        </p>
      )}
    </div>
  );
}

function SaucesSection({ selected, onToggle }: { selected: Set<string>; onToggle: (id: string) => void }) {
  return (
    <div>
      <h4 className="font-semibold text-white text-sm uppercase mb-3">
        Vos sauces <span className="text-success-400 font-normal text-xs">(Offertes)</span>
      </h4>
      <div className="space-y-2">
        {SAUCES_OFFERTES.map((s) => (
          <button
            key={s.id}
            onClick={() => onToggle(s.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
              selected.has(s.id)
                ? 'border-brand-500 bg-brand-500/10'
                : 'border-white/5 bg-dark-800 hover:border-white/10'
            }`}
          >
            <span className="text-sm text-white">{s.nom}</span>
            {selected.has(s.id) && (
              <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function BoissonsSuppSection({
  selected,
  onToggle,
  prixUnit,
}: {
  selected: Set<string>;
  onToggle: (id: string) => void;
  prixUnit: number;
}) {
  return (
    <div>
      <h4 className="font-semibold text-white text-sm uppercase mb-3">
        Boisson supplementaire <span className="text-brand-400 font-normal">(+{prixUnit.toFixed(2)}€ chacune)</span>
      </h4>
      <div className="space-y-2">
        {BOISSONS_SUPP_ASSIETTE.map((b) => (
          <button
            key={b.id}
            onClick={() => onToggle(b.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
              selected.has(b.id)
                ? 'border-brand-500 bg-brand-500/10'
                : 'border-white/5 bg-dark-800 hover:border-white/10'
            }`}
          >
            <span className="text-sm text-white">{b.nom}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-400">+{b.prix.toFixed(2)}€</span>
              {selected.has(b.id) && (
                <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
