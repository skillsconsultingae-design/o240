import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Lock, LogOut, RefreshCw, Printer, ShoppingBag } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// ── Types ──
interface Ligne { id: string; nom: string; quantite: number; prix_centimes: number; }
interface Commande {
  id: string;
  numero: number | null;
  statut: string;
  total_centimes: number;
  table_num: string | null;
  mode: string | null;
  adresse: string | null;
  client_nom: string | null;
  client_tel: string | null;
  notes: string | null;
  created_at: string;
  commande_lignes: Ligne[];
}

// ── Helpers ──
const euros = (c: number) => (Number(c || 0) / 100).toFixed(2) + '€';
const heure = (iso: string) =>
  new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

const BADGE: Record<string, { cls: string; label: string }> = {
  payee:    { cls: 'bg-amber-500/15 text-amber-400',   label: 'À préparer' },
  imprimee: { cls: 'bg-success-500/15 text-success-400', label: 'Imprimée' },
  terminee: { cls: 'bg-white/10 text-white/50',         label: 'Terminée' },
};

export default function Commandes() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  // ── Auth ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (checking) {
    return <main className="pt-24 pb-20 min-h-screen flex items-center justify-center text-white/40">Chargement…</main>;
  }

  return session ? <Dashboard email={session.user.email ?? ''} /> : <LoginForm />;
}

// ── Écran de connexion ──
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) setErr(error.message);
  };

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-sm mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <Lock className="w-5 h-5 text-brand-500" />
          <h1 className="font-display text-2xl font-bold text-white uppercase">Espace commandes</h1>
        </div>
        <p className="text-sm text-white/40 mb-8">Accès réservé au personnel du restaurant.</p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" autoComplete="username"
            className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-brand-500 focus:outline-none"
          />
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe" autoComplete="current-password"
            className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-brand-500 focus:outline-none"
          />
          {err && <p className="text-sm text-error-400">{err}</p>}
          <button
            type="submit" disabled={loading}
            className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </main>
  );
}

// ── Tableau des commandes ──
function Dashboard({ email }: { email: string }) {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);
  const [printing, setPrinting] = useState<string | null>(null);

  const charger = useCallback(async () => {
    const { data, error } = await supabase
      .from('commandes')
      .select('*, commande_lignes(*)')
      .neq('statut', 'en_attente_paiement')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) toast.error(error.message);
    else setCommandes((data as Commande[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    charger();
    const channel = supabase
      .channel('commandes-admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'commandes' }, charger)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'impressions' }, charger)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [charger]);

  const imprimer = async (commandeId: string) => {
    setPrinting(commandeId);
    const { error } = await supabase.from('impressions').insert({ commande_id: commandeId });
    setPrinting(null);
    toast[error ? 'error' : 'success'](error ? error.message : 'Impression lancée');
  };

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white uppercase">Commandes</h1>
            <p className="text-sm text-white/40">{email}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={charger} className="p-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 transition-colors" title="Rafraîchir">
              <RefreshCw className="w-5 h-5 text-white/60" />
            </button>
            <button onClick={() => supabase.auth.signOut()} className="p-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 transition-colors" title="Déconnexion">
              <LogOut className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-white/40 py-16">Chargement…</p>
        ) : commandes.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-14 h-14 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">Aucune commande pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {commandes.map((c) => {
              const badge = BADGE[c.statut] ?? { cls: 'bg-white/10 text-white/50', label: c.statut };
              return (
                <div key={c.id} className="bg-dark-900 rounded-xl p-5 border border-white/5">
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className="text-white">Commande #{c.numero ?? ''}</strong>
                        <span className={`text-xs px-2.5 py-1 rounded-full ${badge.cls}`}>{badge.label}</span>
                      </div>
                      <p className="text-sm text-white/40 mt-1">
                        {heure(c.created_at)}
                        {c.mode ? ` · ${c.mode === 'delivery' ? '🛵 Livraison' : '🛍️ À emporter'}` : ''}
                        {c.client_nom ? ` · ${c.client_nom}` : ''}
                        {c.client_tel ? ` · ${c.client_tel}` : ''}
                      </p>
                      {c.adresse && <p className="text-sm text-white/40">📍 {c.adresse}</p>}
                      <p className="text-sm text-white/60 mt-2">
                        {(c.commande_lignes ?? []).map((l) => `${l.quantite}× ${l.nom}`).join(' · ') || '—'}
                      </p>
                      {c.notes && <p className="text-sm text-white/40 mt-1">📝 {c.notes}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-display text-xl font-bold text-white">{euros(c.total_centimes)}</div>
                      <button
                        onClick={() => imprimer(c.id)}
                        disabled={printing === c.id}
                        className="mt-3 inline-flex items-center gap-2 bg-success-600 hover:bg-success-500 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                      >
                        <Printer className="w-4 h-4" />
                        {printing === c.id ? '…' : 'Imprimer'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
