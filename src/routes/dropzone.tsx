import { createFileRoute } from '@tanstack/solid-router';
import type { ComponentProps } from 'solid-js';
import { CSVDialog } from '~/ui/templates/Form/Dialog';

type Comp = ComponentProps<typeof CSVDialog>['trigger'];

const Trigger: Comp = () => (
  <span class='px-6 py-3 bg-orange-600 text-white rounded-lg transition-all font-medium shadow-lg active:inset-shadow-sm inset-shadow-orange-800 active:scale-90 active:ring-yellow-900 active:ring-4 select-none'>
    🚀 Charger mes données CSV
  </span>
);

export const Route = createFileRoute('/dropzone')({
  component: () => (
    <div class='container mx-auto p-6 max-w-4xl space-y-5'>
      <div class=''>
        <h1 class='text-3xl font-bold text-gray-900 mb-2'>Dropzone CSV</h1>
        <p class='text-gray-600'>
          Testez le composant dropzone pour charger des fichiers CSV
        </p>
      </div>

      <CSVDialog
        trigger={Trigger}
        title='Importation de données CSV'
        description='Glissez-déposez votre fichier CSV ou cliquez pour le sélectionner. Les données seront automatiquement analysées et affichées.'
        onDataLoaded={args => {
          console.log('Données CSV chargées:', args);
        }}
        maxFileSize={10}
      />
    </div>
  ),
});
