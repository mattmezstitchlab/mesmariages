# WORLD WEDDING — Prototype 01

Prototype web éditorial pour un wedding planner indépendant qui organise et suit plusieurs mariages.

> Cette version est volontairement un prototype : les données, personnes, lieux et documents sont fictifs et stockés localement.

## Ce qui est fonctionnel

- Voir les deux mariages de démonstration depuis **Mes mariages**.
- Ouvrir un mariage et consulter sa **Timeline**.
- Ouvrir chaque moment de la Timeline.
- Consulter les prestataires, personnes, documents, musique et logistique liés à un moment.
- Ouvrir une fiche personne et voir tous ses moments d’intervention.
- Ouvrir un document fictif et consulter son aperçu local.
- Revenir à la Timeline depuis chaque écran.
- Naviguer entre les deux mariages.
- Navigation responsive desktop et mobile.
- État `PROTOTYPE` explicite pour les actions non développées.
- Recherche globale dans les mariages, personnes, moments et documents.
- Création et édition locale d’un mariage avec persistance `localStorage`.
- Annuaire des prestataires avec filtre par mariage et accès direct aux moments.

## Choix de conception

- Palette : **INK** `#07080A`, **IVORY** `#F5F2EA`, **PAPER** `#FBF9F4`, accent fuchsia `#E2479C`.
- Direction : magazine international, mode, voyage, photographie cinématographique, beaucoup d’espace négatif.
- Typographies : DM Sans pour l’interface et Cormorant Garamond pour les titres éditoriaux.
- La Timeline est le point d’entrée de chaque dossier ; les autres objets sont reliés au moment par identifiants.
- Les images de démonstration sont stockées dans WebDev Managed Storage afin de ne pas alourdir le dépôt.

## Lancer le projet

Pré-requis : Node.js et pnpm.

```bash
pnpm install
pnpm dev
```

Le serveur de développement utilise Vite et écoute sur le port `3000`.

Vérifications disponibles :

```bash
pnpm check
pnpm build
```

## Structure principale

```text
client/
  index.html
  src/
    App.tsx                       # Routes principales
    index.css                     # Design system et responsive
    data.ts                       # Source de données fictives, relations par ID
    components/
      SiteShell.tsx               # Navigation desktop/mobile + notices prototype
    pages/
      Home.tsx                    # Mes mariages
      WeddingPage.tsx             # Timeline d’un mariage
      MomentPage.tsx              # Détail d’un moment
      PersonPage.tsx              # Fiche personne et interventions
      DocumentPage.tsx            # Aperçu document fictif
```

## Données et relations

La source de vérité locale est `client/src/data.ts`.

Les tableaux `weddings`, `people`, `venues`, `moments` et `documents` sont séparés. Les relations utilisent des IDs : une personne n’est jamais recopiée dans plusieurs moments, elle est seulement référencée par `personIds` ou `providerIds`.

Pour ajouter une donnée de démonstration :

1. Ajouter l’objet dans le tableau concerné.
2. Réutiliser son `id` dans les relations des mariages ou moments.
3. Ne jamais présenter une donnée fictive comme réelle : conserver les mentions `fictif`, `démonstration` ou `prototype`.

## Routes de démonstration

- `/` — Mes mariages
- `/wedding/matt-sophie` — Timeline Matt & Sophie
- `/wedding/matt-sophie/moment/matt-cocktail` — Moment Cocktail
- `/wedding/claire-thomas` — Timeline Claire & Thomas
- `/people/claire-aubert` — Fiche Claire Aubert
- `/documents/doc-caterer` — Aperçu Contrat traiteur
- `/providers` — Annuaire des prestataires et filtres par mariage
- `/new-wedding` — Création locale d’un mariage
- `/wedding/matt-sophie/edit` — Édition locale d’un dossier

## Interactions locales

- La recherche s’ouvre via **Recherche** dans la navigation et affiche jusqu’à huit résultats pertinents.
- Les mariages créés ou modifiés sont conservés dans le `localStorage` du navigateur sous la clé `world-wedding-local-weddings`.
- Les données de démonstration restent la base de référence ; une modification locale d’un mariage de démonstration est enregistrée comme surcharge locale.
- Un nouveau mariage commence avec une Timeline vide : le dossier peut être complété avant d’ajouter de futurs moments.

## Export / récupération

Le projet est autonome et ne dépend d’aucune API métier, authentification, paiement, base de données, email ou service externe obligatoire.

Pour récupérer le projet depuis WebDev :

1. Exporter ou cloner le dossier `world-wedding-prototype`.
2. Conserver `client/`, `server/`, `shared/`, `package.json`, `pnpm-lock.yaml`, `vite.config.ts` et `tsconfig*.json`.
3. Installer les dépendances avec `pnpm install`.
4. Lancer `pnpm dev` ou produire un build avec `pnpm build`.

Les fichiers image source utilisés pour générer les visuels sont conservés hors du dépôt dans `/home/ubuntu/webdev-static-assets/`. Les versions exploitées par l’interface sont les chemins `/manus-storage/...` déclarés dans `client/src/data.ts`.

## Hors périmètre de cette version

Authentification, paiements, vraie base de données, API externes, emails, notifications, calendrier externe, IA, marketplace, CRM avancé, permissions, disponibilité réelle, météo, cartes et upload cloud ne sont pas implémentés.
