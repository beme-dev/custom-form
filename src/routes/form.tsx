import { context, dispose, start, value } from '#main';
import { LangSwitcher } from '#molecules/lang';
import { SwitchPanels } from '#templates/Form/SwitchPanels';
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

export const Route = createFileRoute('/form')({
  pendingComponent: FullPageSpinner,
  wrapInSuspense: true,
  preload: true,
  component: () => {
    onMount(start);
    onCleanup(dispose);

    const [canStart, _start] = createSignal(false);

    createComputed(() => {
      const val = value();
      if (val === 'working') {
        _start(true);
        untrack(value);
      }
    });

    return (
      <Show when={canStart()} fallback={<FullPageSpinner />}>
        <div class='w-full'>
          <div class='w-full flex items-center justify-between px-4 py-2 bg-gray-100 pl-10'>
            <h1 class='text-2xl font-bold mb-4'>
              {context(c => c.intl?.title)()}
            </h1>
            <LangSwitcher />
          </div>
          <SwitchPanels />
        </div>
      </Show>
    );
  },
});
