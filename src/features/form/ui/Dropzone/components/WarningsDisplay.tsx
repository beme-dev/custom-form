import type { Component } from 'solid-js';
import { For, Show } from 'solid-js';
import { Motion, Presence } from 'solid-motionone';

interface WarningsDisplayProps {
  warnings: () => string[];
  error: () => string | null;
}

export const WarningsDisplay: Component<WarningsDisplayProps> = props => {
  return (
    <Presence>
      <Show when={!props.error() && props.warnings().length > 0}>
        <Motion
          class='mt-2 p-1 bg-yellow-50 border-2 border-yellow-200 rounded-lg'
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            x: '200%',
          }}
          transition={{
            duration: 0.3,
            easing: 'ease-in-out',
          }}
        >
          <div class='max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-700 scrollbar-hover:scrollbar-thumb-yellow-900 scrollbar-track-yellow-100'>
            <div class='flex items-center space-x-2'>
              <span class='text-yellow-500'>⚠️</span>
              <span class='text-yellow-700 text-sm'>
                {props.warnings().length} avertissement(s) :
              </span>
            </div>
            <ul class='mt-2 list-disc list-inside text-xs text-yellow-700'>
              <For each={props.warnings()}>
                {warning => <li>{warning}</li>}
              </For>
            </ul>
          </div>
        </Motion>
      </Show>
    </Presence>
  );
};
