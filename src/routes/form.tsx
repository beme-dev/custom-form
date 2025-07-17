import { createFileRoute } from '@tanstack/solid-router';
import { onMount } from 'solid-js';
import { context, start } from '~/services/main';
import { LangSwitcher } from '~/ui/molecules/lang';
import { SwitchPanels } from '~/ui/templates/Form/SwitchPanels';

export const Route = createFileRoute('/form')({
  component: () => {
    onMount(start);

    return (
      <div class='w-full'>
        <div class='w-full flex items-center justify-between px-4 py-2 bg-gray-100 pl-10'>
          <h1 class='text-2xl font-bold mb-4'>
            {context(c => c.intl?.title)()}
          </h1>
          <LangSwitcher />
        </div>
        <SwitchPanels />
      </div>
    );
  },
});
