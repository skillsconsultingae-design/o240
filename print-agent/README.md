# Commandes en ligne + impression — restaurant

Système complet : encaissement Stripe → commande enregistrée dans Supabase →
impression automatique du ticket client sur l'Epson TM-T20II, + un tableau de bord
pour voir les commandes et **relancer une impression**.

```
Client paie (Stripe Checkout)
        │
        ▼
create-checkout (Edge Function) ──► commande "en_attente_paiement" dans Supabase
        │
   paiement OK
        ▼
stripe-webhook (Edge Function) ──► commande "payee" + job d'impression
        │
        ▼  temps réel
Agent d'impression (PC resto) ──► TM-T20II → ticket 🧾
        ▲
        │  bouton "Imprimer"
Dashboard (page web du resto) ──► nouveau job d'impression (ré-impression)
```

## Contenu du dossier

| Élément | Rôle |
|---|---|
| `db/schema.sql` | Tables `commandes`, `commande_lignes`, `impressions` + RLS + Realtime |
| `supabase/functions/create-checkout/` | Crée la commande + la session Stripe (appelée par le site) |
| `supabase/functions/stripe-webhook/` | Paiement confirmé → commande payée + job d'impression |
| `dashboard/index.html` | Page récap des commandes + bouton imprimer + commande test |
| `index.js` + `package.json` | L'agent d'impression qui tourne sur le PC du resto |

---

## Mise en place — dans l'ordre

### 1) Base de données
Dans **Supabase → SQL Editor**, coller le contenu de `db/schema.sql` et **Run**.

### 2) Créer un compte staff
Dans **Supabase → Authentication → Users → Add user**, créer l'email/mot de passe
du restaurateur (c'est ce login qui ouvre le dashboard).

### 3) Le dashboard (page des commandes)
- Ouvrir `dashboard/index.html`, remplir en haut du `<script>` :
  - `SUPABASE_URL` et `SUPABASE_ANON_KEY` (Project Settings → API).
- Ouvrir le fichier dans un navigateur, se connecter avec le compte de l'étape 2.
- L'anon key est publique par nature : ce sont **RLS + le login** qui protègent les données.

### 4) L'agent d'impression (sur le PC du resto, Windows 10)
Voir la section « Agent d'impression » plus bas. C'est lui qui fait sortir les tickets.

### 5) Stripe (encaissement) — quand tu veux brancher le paiement réel
```bash
supabase functions deploy create-checkout --no-verify-jwt
supabase functions deploy stripe-webhook  --no-verify-jwt
supabase secrets set STRIPE_SECRET_KEY=sk_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
```
Puis dans **Stripe → Developers → Webhooks**, ajouter l'endpoint
`https://<projet>.supabase.co/functions/v1/stripe-webhook` abonné à
`checkout.session.completed`.

Le site appellera `create-checkout` avec le panier :
```js
const r = await fetch('https://<projet>.supabase.co/functions/v1/create-checkout', {
  method:'POST', headers:{'Content-Type':'application/json'},
  body: JSON.stringify({
    panier: [{ nom:'Burger', quantite:2, prix_centimes:850 }],
    table_num:'5', client_email:'client@mail.com',
    success_url:'https://monsite/merci', cancel_url:'https://monsite/panier',
  }),
});
const { url } = await r.json();
window.location = url;   // redirige vers la page de paiement Stripe
```

---

## ✅ Tester l'impression SANS Stripe (dès maintenant)

Tu peux valider toute la chaîne d'impression avant même de brancher le paiement :

1. Lancer l'agent sur le PC du resto (`npm start`).
2. Ouvrir le dashboard, cliquer **« Créer une commande test »**.
3. → un job d'impression est créé, l'agent le reçoit en temps réel, **le ticket sort** 🧾
   et la commande passe en « imprimée » dans la liste.
4. Cliquer **« Imprimer »** sur n'importe quelle commande pour la **ré-imprimer**.

---

## Agent d'impression (PC du resto, Windows 10)

### Prérequis
1. Installer le driver **Epson Advanced Printer Driver (APD)** pour TM-T20II,
   brancher l'imprimante en USB, faire un test d'impression Windows.
2. Installer **Node.js 18+** (https://nodejs.org).

### Installation
```powershell
npm install
copy .env.example .env
notepad .env
```
Remplir `.env` :
- `SUPABASE_URL` + `SUPABASE_SERVICE_KEY` (clé **service_role**, Project Settings → API).
  ⚠️ Cette clé reste **uniquement sur ce PC**, jamais dans le site ni le dashboard.
- `PRINTER_NAME` : nom exact de l'imprimante dans Windows (`EPSON TM-T20II Receipt`).
- `RESTO_NOM` / `RESTO_ADRESSE` / `RESTO_TEL` : en-tête du ticket.

### Utilisation
```powershell
npm run test-print   # imprime un ticket de démo (valide l'imprimante)
npm start            # lance l'agent : imprime chaque nouvelle commande
```

### Démarrage automatique au boot (recommandé)
```powershell
npm install -g pm2
pm2 start index.js --name print-agent
pm2 save
pm2 startup   # suivre l'instruction affichée
```

### Robustesse
- **Rattrapage** : au démarrage, l'agent imprime tous les jobs restés « en attente »
  (s'il était éteint). Aucune commande perdue.
- **Anti-doublon** : chaque job passe à « imprimée » une fois traité.
- **Reconnexion auto** si le temps réel Supabase coupe.

### Réglages (`index.js`)
- **Accents mal imprimés** : remplacer `characterSet: 'WPC1252'` par `'PC858_EURO'` ou `'PC852'`.
- **Symbole €** : par défaut on imprime `EUR` (plus fiable). Pour le vrai symbole,
  remplacer `' EUR'` par `' €'` dans `euros()` et tester.
- **Largeur** : `width: 48` = 80 mm (Font A).
- **Tiroir-caisse** : ajouter `printer.openCashDrawer();` avant `printer.cut();`.
