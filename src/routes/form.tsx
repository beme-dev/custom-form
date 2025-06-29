import { createFileRoute } from '@tanstack/solid-router';
import { onMount } from 'solid-js';
import { select, send, start } from '~/services/main';
import { LangSwitcher } from '~/ui/molecules/lang';
import { Fields } from '~/ui/templates/Form/Fields';
import { Inputs } from '~/ui/templates/Form/Inputs';

// Définition des types pour les champs du formulaire

export const Route = createFileRoute('/form')({
  component: () => {
    onMount(start);

    return (
      <div class="w-full">
        <div class="w-full flex items-center justify-between px-4 py-2 bg-gray-100 pl-10">
          <h1 class="text-2xl font-bold mb-4">{select('intl.title')()}</h1>
          <LangSwitcher />
        </div>
        <div class="flex w-full shadow rounded mt-8 divide-x-2 divide-gray-200 p-2 min-h-[80vh]">
          <div class="min-w-lg mx-auto px-6 py-2 bg-white">
            <Fields />
            <button
              class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm active:border-2 active:border-blue-800 transition-colors duration-200 box-border"
              onClick={() => {
                send('ADD');
              }}
            >
              {select('intl.addField', (a, b) => a === b)()}
            </button>
          </div>
          <Inputs />
        </div>
      </div>
    );
  },
});
