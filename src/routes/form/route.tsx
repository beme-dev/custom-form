import { LangSwitcher } from '#molecules/lang';
import { dispose, lang, start, translate, value } from '#service';
import { SwitchPanels } from '#templates/Form/SwitchPanels';
import { deepEqual } from '@bemedev/app-ts/lib/utils/index.js';
import { createFileRoute } from '@tanstack/solid-router';
import {
  createComputed,
  createSignal,
  onCleanup,
  onMount,
  Show,
  untrack,
} from 'solid-js';
import FullPageSpinner from '~/ui/atoms/FullPageSpinner';
import { RegisterFields } from '~/ui/templates/Form/RegisterFields';

export const Route = createFileRoute('/form')({
  component: () => {
    onMount(start);
    onCleanup(dispose);

    const [canStart, _start] = createSignal(false);

    createComputed(() => {
      const _contains = deepEqual(value(), { working: 'idle' });

      if (_contains) {
        _start(true);
        untrack(value);
      }
      console.log(value());
    });

    return (
      <Show when={canStart()} fallback={<FullPageSpinner />}>
        <div class='w-full'>
          <div class='w-full flex items-center justify-between px-4 py-2 bg-gray-100 pl-10'>
            <h1 class='text-2xl font-bold'>
              {translate('pages.form.title').to(lang())}
            </h1>
            <LangSwitcher />
          </div>
          <RegisterFields class='mt-2' />
          <SwitchPanels />
        </div>
      </Show>
    );
  },
});
