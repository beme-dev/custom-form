# Tests E2E avec Playwright

Ce dossier contient des tests end-to-end (E2E) pour les fonctionnalités de
traitement CSV et les composants associés.

## Structure des tests

- `csv-processing.spec.ts` : Tests pour le traitement général des fichiers
  CSV
- `conditional-input.spec.ts` : Tests pour le composant ConditionalInput
- `csv-dialog.spec.ts` : Tests pour le composant CSVDialog

## Comment exécuter les tests

### Installation des navigateurs requis

Avant de lancer les tests pour la première fois, installez les navigateurs
nécessaires :

```bash
pnpm exec playwright install
```

### Exécuter tous les tests E2E

```bash
pnpm test:e2e
```

### Exécuter les tests avec l'interface utilisateur Playwright

```bash
pnpm test:e2e:ui
```

### Exécuter un fichier de test spécifique

```bash
pnpm exec playwright test tests/csv-processing.spec.ts
```

## Données de test

Le dossier `fixtures` contient les fichiers CSV de test utilisés dans les
tests.
