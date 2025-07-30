import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { Motion, Presence } from 'solid-motionone';

interface ErrorMessageProps {
  error: () => string | null;
}

export const ErrorMessage: Component<ErrorMessageProps> = props => {
  return (
    <Presence>
      <Show when={props.error()}>
        <Motion
          class='mt-4 px-4 py-2 bg-red-50 border border-red-200 rounded-lg overflow-x-hidden overflow-y-auto
                scrollbar-thin scrollbar-thumb-red-700 scrollbar-hover:scrollbar-thumb-red-900 scrollbar-track-red-100'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            x: '200%',
          }}
        >
          <div class='flex items-center space-x-2'>
            <span class='text-red-500'>❌</span>
            <span class='text-red-700 text-sm'>{props.error()}</span>
          </div>
        </Motion>
      </Show>
    </Presence>
  );
};
