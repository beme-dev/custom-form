import { createFileRoute } from '@tanstack/solid-router';
import { createEffect, For } from 'solid-js';
import { Accordion } from '~/ui/cn/components/ui/accordion';
import { CreateField } from '~/ui/templates/Form';
import { createFields } from '~/ui/templates/Form.hooks';

// Définition des types pour les champs du formulaire

export const Route = createFileRoute('/form')({
  component: () => {
    const { updateField, fields, addField, removeField } = createFields();

    createEffect(() => {
      console.log('Fields updated:', fields());
    });

    return (
      <div class="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
        <h1 class="text-2xl font-bold mb-4">Générateur de Formulaire</h1>
        <Accordion collapsible class="mx-auto min-w-md">
          <For each={fields()}>
            {(field, index) => (
              <Accordion.Item class="border-0" value={`field-${index()}`}>
                <Accordion.Trigger class="cursor-pointer hover:no-underline">
                  {`Champ ${index() + 1} : ${field.label || '****'}`}
                </Accordion.Trigger>
                <Accordion.Content class="p-3">
                  <CreateField
                    field={field}
                    update={field => {
                      updateField(index(), field);
                    }}
                    remove={() => removeField(index())}
                  />
                </Accordion.Content>
              </Accordion.Item>
            )}
          </For>
        </Accordion>
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={addField}
        >
          Ajouter un champ
        </button>
      </div>
    );
  },
});
