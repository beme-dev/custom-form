# Composants de Formulaire Dynamique avec Import CSV

Ce projet contient une solution de formulaire dynamique avec fonctionnalité
d'import CSV et sélection conditionnelle à plusieurs niveaux.

## Fonctionnalités principales

- Création de formulaires dynamiques avec différents types de champs
- Import de données depuis un fichier CSV
- Champs de formulaire conditionnels à plusieurs niveaux basés sur les
  données CSV
- Interface utilisateur intuitive avec glisser-déposer pour les fichiers
  CSV

## Structure du projet

- `src/ui/templates/Form/` - Composants principaux du formulaire
- `src/ui/templates/Form/Dropzone/` - Composants pour l'import de fichiers
  CSV
- `src/ui/templates/Form/_inputs/` - Différents types de champs de
  formulaire

## Tests

Le projet inclut désormais des tests E2E complets pour la fonctionnalité
d'import CSV et les composants conditionnels.

### Tests E2E avec Playwright

- Tests pour le traitement de fichiers CSV
- Tests pour le composant ConditionalInput
- Tests pour le composant CSVDialog

Pour exécuter les tests :

```bash
# Installation des navigateurs requis (première fois uniquement)
pnpm exec playwright install

# Exécuter tous les tests E2E
pnpm test:e2e

# Exécuter les tests avec l'interface visuelle
pnpm test:e2e:ui
```

Plus de détails sur les tests sont disponibles dans le
[dossier tests](../../../../../../tests/README.md).

## Utilisation

Consultez la documentation spécifique de chaque composant :

- [Documentation du composant Dropzone](./Dropzone/README.md)
