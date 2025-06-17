import {
  type Accessor,
  type Component,
  createEffect,
  ErrorBoundary,
  For,
  onMount,
} from 'solid-js';
import { hasOptions, setFocus, toFocus, useTypes } from './hooks';
import type { FieldType } from './types';

export const FieldTypes: Component<{
  type: Accessor<FieldType>;
  setType: (type: FieldType) => void;
  name: string;
}> = ({ type, setType, name }) => {
  let ref: any;
  onMount(() => {
    const check = !hasOptions(type()) && toFocus() === name;
    if (check) ref?.focus();
  });

  createEffect(() => {
    console.log('focus', toFocus(), name);
  });

  const types = useTypes();

  return (
    <select
      class="border p-2 rounded mb-2"
      value={type()}
      name={name}
      onInput={e => {
        const value = e.target.value as FieldType;
        setType(value);
        if (hasOptions(value)) {
          const value = `${name.split('->')[0]}->options->0`;

          setFocus(value);
        }
      }}
      ref={ref}
    >
      <ErrorBoundary
        fallback={er => <option value="text">{`${er}`}</option>}
      >
        <For each={types()}>
          {option => {
            return <option {...option} />;
          }}
        </For>
      </ErrorBoundary>
    </select>
  );
};
