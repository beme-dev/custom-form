import { forwardFocus } from '#molecules/focus';
import { For, type Accessor } from 'solid-js';
import { context } from '~/services/main';
import { hasOptions, setFocus, toFocus } from './signals';
import type { FieldType } from './types';

type Props = {
  index: Accessor<number>;
  type: Accessor<FieldType>;
  setType: (type: FieldType) => void;
};

type _Field = { children: string; value: FieldType };

export const FieldTypes = forwardFocus(
  ({ index, type, setType }: Props) => {
    const name = `${index()}->type`;

    const types = () => {
      const _types = context(value => value.intl?.types ?? {});
      return Object.entries(_types()).map(([key, children]) => ({
        value: key,
        children,
      })) as _Field[];
    };

    return (
      <>
        <select
          class="border p-2 rounded mb-2"
          name={name}
          onInput={e => {
            const type = e.target.value as FieldType;
            setType(type);

            if (hasOptions(type)) {
              const value = `${name.split('->')[0]}->options->0`;

              setFocus({ name: value });
            } else setFocus({ name });
          }}
        >
          <For each={types()}>
            {option => {
              const props = {
                ...option,
                selected: type() === option.value,
              };
              return <option {...props} />;
            }}
          </For>
        </select>
      </>
    );
  },

  ({ index, type }) => {
    const name = `${index()}->type`;
    return !hasOptions(type()) && toFocus()?.name === name;
  },
);
