# Domaine des Fournelles

Site vitrine du Domaine des Fournelles, construit avec Vite + React et déployable sur Vercel.

## Stack

- `Vite`
- `React`
- `react-router-dom`
- `Redux`
- `Sass`
- `Supabase Auth` pour la connexion à l'admin
- `Supabase Postgres` pour les produits
- `Vercel Functions` sous `api/` pour les opérations d'administration protégées

## Architecture de contenu

La structure produit repose maintenant sur Supabase uniquement.

- `public` : la page vins lit la table `wines` via le client Supabase navigateur
- `admin` : la page `/admin` lit et écrit dans `wines` via `/api/admin/wines`
- `src/content/wines/*.json` : source locale de secours et source d'initialisation

Les JSON locaux servent à :
- conserver les données dans le repo
- réinitialiser la table Supabase
- fournir un fallback si Supabase n'est pas configuré côté navigateur

## Architecture de l'admin

L'admin personnalisé vit à `/admin`.

Flux :

1. l'éditeur se connecte avec `Supabase Auth`
2. le navigateur appelle `/api/admin/wines`
3. la fonction Vercel vérifie la session Supabase
4. la fonction lit ou écrit la table `wines` avec la clé `SUPABASE_SERVICE_ROLE_KEY`

Cela signifie :

- le client n'a pas besoin d'accès GitHub
- le client n'a pas besoin d'accès Supabase admin
- la clé service role ne passe jamais dans le navigateur

## Variables d'environnement

Créez un `.env.local` à partir de `.env.example`.

Variables navigateur :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_WINE_BUCKET` (`wines` par défaut)

Variables serveur :

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_WINE_BUCKET` (`wines` par défaut)
- `ADMIN_ALLOWED_EMAILS`

Notes :

- les variables `VITE_*` sont exposées au navigateur
- `SUPABASE_SERVICE_ROLE_KEY` doit rester strictement côté serveur
- `ADMIN_ALLOWED_EMAILS` est une allowlist séparée par des virgules

## Préparer Supabase

### 1. Créer la table

Dans l'éditeur SQL de Supabase, exécutez :

`supabase/schema.sql`

Ce script :

- crée la table `public.wines`
- active la `RLS`
- autorise la lecture publique des produits
- ajoute aussi les colonnes évolutives comme `price`, `bottle_image_path` et `title_image_path`

### 2. Seed initial

Une fois la table créée et les envs en place :

```bash
yarn supabase:seed
```

Cela injecte les 6 vins locaux dans la table `wines`.

### 3. Images produit

Si vous voulez uploader les images bouteille / titre depuis l'admin :

1. créez le bucket `wines` dans `Storage`
2. assurez-vous qu'il est `public`
3. si votre bucket a un autre nom, adaptez aussi :

```env
VITE_SUPABASE_WINE_BUCKET=your-bucket-name
SUPABASE_WINE_BUCKET=your-bucket-name
```

Les uploads passent maintenant par `/api/admin/upload`, donc ils utilisent la clé serveur Supabase et ne dépendent plus des policies `insert/update/delete` côté navigateur.

Le rendu public garde les assets locaux tant qu'aucune image uploadée n'est enregistrée dans la base.

Alternative :

- lancer `npx vercel dev`
- ouvrir `/admin`
- utiliser le bouton `Créer les produits depuis les fichiers locaux`

## Développement local

Frontend seul :

```bash
yarn start
```

Pour l'admin et les `api/` :

```bash
npx vercel dev
```

Pourquoi :

- `vite` sert uniquement le frontend
- `vercel dev` exécute aussi les fonctions sous `api/`

## Déploiement Vercel

Déployez le repo sur Vercel, puis ajoutez les variables d'environnement nécessaires dans le projet Vercel.

Aucun serveur CMS séparé n'est nécessaire. L'admin fait partie de l'application, et les écritures passent par les fonctions Vercel.

## Fichiers clés

- `src/components/AdminPage/index.jsx`
- `src/components/WinesPage/index.jsx`
- `src/supabase/client.js`
- `src/supabase/wines.js`
- `api/admin/wines.mjs`
- `api/admin/upload.mjs`
- `api/_lib/auth.mjs`
- `api/_lib/wines.mjs`
- `scripts/seed-supabase-wines.mjs`
- `supabase/schema.sql`

## Nettoyage effectué

Les morceaux hérités suivants ont été retirés ou remplacés :

- `Decap CMS`
- `Sanity Studio`
- `Sanity Content Lake`
- `styled-components`
- `joi`
- `react-icons`
