import { createFileRoute } from '@tanstack/solid-router';
import { CSVDialog } from '~/ui/templates/Form/Dialog';

function DropzoneExample() {
  return (
    <div class='container mx-auto p-6 max-w-4xl'>
      <div class='mb-8'>
        <h1 class='text-3xl font-bold text-gray-900 mb-2'>Dropzone CSV</h1>
        <p class='text-gray-600'>
          Testez le composant dropzone pour charger des fichiers CSV
        </p>
      </div>

      {/* Section avec le dialog */}
      <div class='mb-12'>
        <h2 class='text-2xl font-semibold text-gray-800 mb-4'>
          Version Dialog
        </h2>
        <div class='space-y-4'>
          {/* Dialog avec trigger personnalisé */}
          <div class='flex flex-col space-y-7'>
            <h3 class='text-lg font-medium text-gray-700'>
              Dialog avec trigger personnalisé :
            </h3>
            <CSVDialog
              trigger={
                <span class='px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-lg active:shadow-none active:scale-90'>
                  🚀 Charger mes données CSV
                </span>
              }
              title='Importation de données CSV'
              description='Glissez-déposez votre fichier CSV ou cliquez pour le sélectionner. Les données seront automatiquement analysées et affichées.'
              onDataLoaded={(data, fileHeaders) => {
                console.log('Données CSV chargées:', {
                  data,
                  headers: fileHeaders,
                });
              }}
              maxFileSize={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/dropzone')({
  component: DropzoneExample,
});
