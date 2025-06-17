import { Fields, Inputs, createFields } from '#templates/Form';
import { createFileRoute } from '@tanstack/solid-router';

// Définition des types pour les champs du formulaire

export const Route = createFileRoute('/form')({
  component: () => {
    const { updateField, fields, addField, removeField } = createFields();

    return (
      <div class="flex w-full shadow rounded mt-8 divide-x-2 divide-gray-200 p-2 min-h-[80vh]">
        <div class="min-w-lg mx-auto p-6 bg-white">
          <h1 class="text-2xl font-bold mb-4">Générateur de Formulaire</h1>
          <Fields
            fields={fields}
            removeField={removeField}
            updateField={updateField}
          />
          <button
            class="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm active:border-2 active:border-blue-800 transition-colors duration-200 box-border"
            onClick={addField}
          >
            Ajouter un champ
          </button>
        </div>
        <Inputs fields={fields} />
      </div>
    );
  },
});
