import type { types } from '@bemedev/types';
import {
  createSignal,
  For,
  Match,
  Show,
  Switch,
  type Component,
} from 'solid-js';
import { logIndex } from '../Dropzone/helpers';
import type { CSVData, Merged } from '../Dropzone/types';
import { Select } from '../Select';

export const ConditionalField: Component<{
  merged?: Merged;
  headers?: string[]; // Optional depth prop for future use
}> = ({ merged, headers }) => {
  const isArray = () =>
    merged && Array.isArray(merged) && merged.length > 0;
  const title = headers?.[0] ?? 'Sélection';
  const length = headers?.length ?? 1;

  return (
    <Show when={merged}>
      <div class='flex flex-col space-y-3 min-w-lg w-11/12 mx-auto px-2 py-3'>
        <div class='text-lg font-semibold'>
          Conditionnel à {headers?.length ?? 1} niveau
          {headers && headers.length > 1 && 'x'}
        </div>
        <Switch
          fallback={
            <RecursiveConditional
              merged={merged}
              headers={headers}
              index={0}
              length={length}
            />
          }
        >
          <Match when={isArray()}>
            <Selector
              title={title}
              options={merged as any[]}
              index={0}
              length={length}
            />
          </Match>
        </Switch>
      </div>
    </Show>
  );
};

const createRecursive = (
  index: number,
  length: number,
  merged?: any,
  headers?: string[],
) => {
  // Si merged est un objet, on affiche un Select pour les clés
  const options = Object.keys(merged ?? {});
  const [next, setNext] = createSignal<any>(undefined);
  const title = headers?.[0] ?? 'Sélection';

  const fallback = (
    <For each={headers?.slice(1)}>
      {(title, index2) => {
        const args = {
          title,
          index: index + index2() + 1,
          disabled: true,
          length,
        };
        return <Selector {...args} />;
      }}
    </For>
  );

  const onChange = (value: string | null) => {
    const previous = next(); // Sauvegarder l'état précédent avant de changer
    setNext(undefined); // Réinitialiser le next avant de le mettre à jour
    if (value) setNext(merged?.[value]);
    else setNext(previous);
  };

  const hasOptions = options.length > 0;

  const selectProps = {
    options,
    onChange,
    title,
    index,
    length,
  };

  return {
    next,
    fallback,
    selectProps,
    hasOptions,
  };
};

const Selector: Component<{
  title: string;
  index: number;
  length: number;
  options?: types.ValuesOf<CSVData>[];
  onChange?: (value: string | null) => void;
  disabled?: boolean;
}> = ({ title, options, onChange, disabled, index }) => {
  console.log('index', index, 'length', length);
  const _title = `#${logIndex(index + 1, length)} - ${title}`;
  const selectProps = {
    options: options?.map(String),
    onChange,
    disabled,
  };
  return (
    <div class='flex flex-col space-y-2 px-3'>
      <div class='font-semibold'>{_title}</div>
      <Select {...selectProps} />
    </div>
  );
};

const RecursiveConditional: Component<{
  merged?: Merged;
  headers?: string[];
  index: number; // Optional index prop for future use
  length: number;
  // Optional headers prop for future use
}> = ({ merged, headers, index, length }) => {
  // Si merged est un tableau, on affiche le Select final
  if (Array.isArray(merged)) {
    const title = headers?.[0] ?? 'Sélection';
    const args = { index, title, options: merged, length };
    return <Selector {...args} />;
  }

  const { next, fallback, selectProps, hasOptions } = createRecursive(
    index,
    length,
    merged,
    headers,
  );

  return (
    <Show when={hasOptions}>
      <Selector {...selectProps} />
      <Show when={!!next()} fallback={fallback}>
        <RecursiveConditional
          merged={next()}
          headers={headers?.slice(1)}
          index={index + 1} // Increment index for recursion
          length={length}
        />
      </Show>
    </Show>
  );
};
