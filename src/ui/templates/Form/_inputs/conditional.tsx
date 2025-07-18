import {
  createSignal,
  For,
  Match,
  Show,
  Switch,
  type Component,
} from 'solid-js';
import { Select } from '../Select';

export const ConditionalField: Component<{
  merged?: any;
  headers?: string[]; // Optional depth prop for future use
}> = ({ merged, headers }) => {
  const isArray = () =>
    merged && Array.isArray(merged) && merged.length > 0;

  return (
    <Show when={merged}>
      <div class='flex flex-col space-y-3 min-w-lg w-11/12 mx-auto px-2 py-3'>
        <div class='text-lg font-semibold'>
          Conditionnel à {headers?.length ?? 1} niveau
          {!headers || headers.length === 1 ? '' : 'x'}
        </div>
        <Switch
          fallback={
            <RecursiveConditional merged={merged} headers={headers} />
          }
        >
          <Match when={isArray()}>
            <Select options={merged} />
          </Match>
        </Switch>
      </div>
    </Show>
  );
};

const createRecursive = (merged?: any, headers?: string[]) => {
  // Si merged est un objet, on affiche un Select pour les clés
  const options = Object.keys(merged ?? {});
  const [next, setNext] = createSignal<any>(undefined);
  const title = headers?.[0] ?? 'Sélection';

  const fallback = (
    <For each={headers?.slice(1)}>
      {title => <Selector title={title} disabled />}
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
  };

  return {
    next,
    fallback,
    selectProps,
    hasOptions,
    title,
  };
};

const RecursiveConditional: Component<{
  merged?: any;
  headers?: string[]; // Optional headers prop for future use
}> = ({ merged, headers }) => {
  // Si merged est un tableau, on affiche le Select final
  if (Array.isArray(merged)) {
    const title = headers?.[0] ?? 'Sélection';
    return <Selector title={title} options={merged} />;
  }

  const { next, fallback, selectProps, hasOptions, title } =
    createRecursive(merged, headers);

  return (
    <Show when={hasOptions}>
      <Selector
        title={title}
        options={selectProps.options}
        onChange={selectProps.onChange}
      />
      <Show when={!!next()} fallback={fallback}>
        <RecursiveConditional
          merged={next()}
          headers={headers?.slice(1)}
        />
      </Show>
    </Show>
  );
};

const Selector: Component<{
  title: string;
  options?: string[];
  onChange?: (value: string | null) => void;
  disabled?: boolean;
}> = ({ title, options, onChange, disabled }) => (
  <div class='flex flex-col space-y-2 p-2'>
    <div class='font-semibold'>{title}</div>
    <Select options={options} onChange={onChange} disabled={disabled} />
  </div>
);
