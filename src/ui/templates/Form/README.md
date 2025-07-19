# Composants CSV Dropzone et Dialog

Ce dossier contient deux composants principaux pour l'importation de
fichiers CSV :

## 1. CSVDropzone

Composant de dropzone autonome pour l'importation de fichiers CSV.

### Utilisation

```tsx
import { CSVDropzone } from '~/ui/templates/Form/Dropzone';

<CSVDropzone
  onDataLoaded={(data, headers) => {
    console.log('Données:', data);
    console.log('En-têtes:', headers);
  }}
  onError={error => {
    console.error('Erreur:', error);
  }}
  maxFileSize={10} // MB
  className='border border-gray-200 rounded-lg p-4'
/>;
```

### Props

- `onDataLoaded?: (data: CSVData[], headers: string[]) => void` - Callback
  appelé lors du chargement réussi
- `onError?: (error: string) => void` - Callback appelé en cas d'erreur
- `className?: string` - Classes CSS personnalisées
- `maxFileSize?: number` - Taille max du fichier en MB (défaut: 10MB)
- `placeholder?: string` - Texte d'invitation personnalisé
- `acceptMessage?: string` - Message d'acceptation personnalisé
- `errorMessage?: string` - Message d'erreur personnalisé

## 2. CSVDialog

Composant dialog qui contient le CSVDropzone pour une interface modale.

### Utilisation

```tsx
import { CSVDialog, CSVImportButton } from '~/ui/templates/Form/Dialog';

// Utilisation simple avec bouton pré-défini
<CSVImportButton
  onDataLoaded={(data, headers) => {
    console.log('Données:', data);
  }}
  onError={(error) => console.error(error)}
/>

// Utilisation avancée avec trigger personnalisé
<CSVDialog
  trigger={
    <button class="px-4 py-2 bg-blue-600 text-white rounded">
      Mon bouton personnalisé
    </button>
  }
  title="Importer mes données"
  description="Description personnalisée"
  onDataLoaded={(data, headers) => {
    console.log('Données:', data);
  }}
  onError={(error) => console.error(error)}
  maxFileSize={5}
/>
```

### Props CSVDialog

- `trigger: JSX.Element` - Élément qui déclenche l'ouverture du dialog
- `title?: string` - Titre du dialog (défaut: "Importer un fichier CSV")
- `description?: string` - Description du dialog
- `onDataLoaded?: (data: CSVData[], headers: string[]) => void` - Callback
  de succès
- `onError?: (error: string) => void` - Callback d'erreur
- `maxFileSize?: number` - Taille max en MB
- `onClose?: () => void` - Callback de fermeture

### Props CSVImportButton

- `onDataLoaded?: (data: CSVData[], headers: string[]) => void` - Callback
  de succès
- `onError?: (error: string) => void` - Callback d'erreur
- `children?: JSX.Element` - Contenu du bouton
- `class?: string` - Classes CSS du bouton

## Fonctionnalités

### Parsing CSV

- Séparateur point-virgule (`;`) par défaut
- Ignore les lignes vides en début de fichier
- Conversion automatique des nombres
- Support des guillemets dans les valeurs

### Validation

- Vérification de la taille du fichier
- Vérification de l'extension `.csv`
- Gestion des erreurs avec messages personnalisables

### Interface

- Drag & drop avec feedback visuel
- Aperçu des données importées
- Animations fluides avec solid-motionone
- Design responsive avec Tailwind CSS

### Sécurité

- Limitation de taille de fichier
- Validation du type de fichier
- Sanitisation des données

## Exemple complet

Voir `/routes/dropzone.tsx` pour un exemple complet d'utilisation des deux
composants.
