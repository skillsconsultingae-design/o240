-- ===========================================================================
--  Schema commandes en ligne + impression
--  A coller dans Supabase > SQL Editor > Run
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists public.commandes (
  id                uuid primary key default gen_random_uuid(),
  numero            bigint generated always as identity,       -- numero lisible auto (#1, #2, ...)
  stripe_session_id text unique,
  statut            text not null default 'payee',             -- en_attente_paiement | payee | imprimee | terminee
  total_centimes    int  not null default 0,
  table_num         text,
  client_nom        text,
  client_email      text,
  client_tel        text,
  mode              text,                                      -- delivery | pickup
  adresse           text,
  notes             text,
  created_at        timestamptz not null default now()
);

-- Colonnes ajoutees apres coup (si la table existait deja) — sans risque a re-executer
alter table public.commandes add column if not exists client_tel text;
alter table public.commandes add column if not exists mode       text;
alter table public.commandes add column if not exists adresse    text;

create table if not exists public.commande_lignes (
  id             uuid primary key default gen_random_uuid(),
  commande_id    uuid not null references public.commandes(id) on delete cascade,
  nom            text not null,
  quantite       int  not null default 1,
  prix_centimes  int  not null default 0
);

-- Jobs d'impression : 1 ligne = 1 demande d'impression.
-- Nouvelle commande payee -> 1 job. Re-impression depuis le dashboard -> nouveau job.
create table if not exists public.impressions (
  id           uuid primary key default gen_random_uuid(),
  commande_id  uuid not null references public.commandes(id) on delete cascade,
  statut       text not null default 'en_attente',            -- en_attente | imprimee | erreur
  erreur       text,
  created_at   timestamptz not null default now()
);

create index if not exists idx_lignes_commande on public.commande_lignes(commande_id);
create index if not exists idx_impressions_statut on public.impressions(statut);

-- ---------------------------------------------------------------------------
-- Realtime : l'agent d'impression ecoute les nouveaux jobs
-- ---------------------------------------------------------------------------
alter publication supabase_realtime add table public.impressions;
alter publication supabase_realtime add table public.commandes;

-- ---------------------------------------------------------------------------
-- Row Level Security
--   - Le public (anon) n'a AUCUN acces direct aux tables.
--   - Le personnel connecte (authenticated) a un acces complet (app staff).
--   - Le webhook et l'agent utilisent la cle service_role, qui contourne RLS.
-- ---------------------------------------------------------------------------
alter table public.commandes       enable row level security;
alter table public.commande_lignes enable row level security;
alter table public.impressions     enable row level security;

create policy "staff full access commandes"
  on public.commandes for all to authenticated using (true) with check (true);

create policy "staff full access lignes"
  on public.commande_lignes for all to authenticated using (true) with check (true);

create policy "staff full access impressions"
  on public.impressions for all to authenticated using (true) with check (true);
