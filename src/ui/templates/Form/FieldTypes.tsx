import { type Accessor, For } from 'solid-js';
import { forwardFocus } from '~/ui/molecules/focus';
import { hasOptions, setFocus, toFocus, useTypes } from './signals';
import type { FieldType } from './types';

type Props = {
  type: Accessor<FieldType>;
  setType: (type: FieldType) => void;
  name: string;
};
export const FieldTypes = forwardFocus(
  ({ type, setType, name }: Props) => {
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
      >
        <For each={types()}>
          {option => {
            return <option {...option} />;
          }}
        </For>
      </select>
    );
  },

  ({ type, name }) => !hasOptions(type()) && toFocus() === name,
);
