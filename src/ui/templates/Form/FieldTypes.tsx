import { forwardFocus } from '#molecules/focus';
import { type Accessor } from 'solid-js';
import type { FieldType } from '~/services/lang';
import { fieldTypes } from '~/services/lang';
import { lang } from '~/services/main';
import { MySelect } from './Select.my';
import { hasOptions, setFocus, toFocus } from './signals';

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
      // Add options to trnslates multiples at same time
      const _types = fieldTypes(lang());
      return Object.entries(_types).map(([key, children]) => ({
        value: key,
        children,
      })) as _Field[];
    };

    const option0 = `${name.split('->')[0]}->options->0`;

    return (
      <MySelect
        name={name}
        data={types()}
        defaultValue={types().find(t => t.value === type())}
        labelExtractor={item => item?.children ?? '****'}
        onChange={({ value }) => {
          setType(value);

          if (hasOptions(value)) setFocus({ name: option0 });
          else setFocus({ name });
        }}
        classes={{
          container: 'w-full max-w-md mt-3',
          panel: 'w-full max-w-md',
        }}
        icon={({ selected }) =>
          selected() && (
            <span class='text-orange-600 text-xl'>{'  ⎷'}</span>
          )
        }
        equals={(a, b) => a.value === b.value}
      />
    );
  },

  ({ index, type }) => {
    const name = `${index()}->type`;
    return !hasOptions(type()) && toFocus()?.name === name;
  },
);
