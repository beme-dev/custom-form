import { lang, translate } from '#service';
import { Match, Switch, type Component } from 'solid-js';
import { ColorPicker } from './_inputs/color';
import { ConditionalField } from './_inputs/conditional';
import { Calendar } from './_inputs/date';
import { NumberField } from './_inputs/number';
import { RadioGroup } from './RadioGroup';
import { Select } from './Select';
import { hasOptions } from './signals';
import type { Field } from './types';

export const Input: Component<Field> = ({
  type,
  label,
  options,
  data,
}) => {
  const _label = () => {
    const question = translate('pages.form.labels.question')(lang());
    return label.trim() === '' ? `(${question})` : label;
  };

  return (
    <div class='flex flex-col space-y-2 min-w-lg w-11/12 mx-auto px-2 py-8'>
      <label
        class='block mb-2 font-medium text-gray-700 select-none'
        for='answer'
      >
        {_label()}
      </label>
      <Switch>
        <Match when={!hasOptions(type)}>
          <Switch
            fallback={
              <input
                type={type}
                class='border p-2 rounded w-full outline-none max-w-10/12'
                placeholder={translate(
                  'pages.form.inputs.answer.placeholder',
                )(lang())}
                name='answer'
              />
            }
          >
            <Match when={type === 'color'}>
              <ColorPicker />
            </Match>
            <Match when={type === 'date'}>
              <Calendar />
            </Match>
            <Match when={type === 'number'}>
              <NumberField />
            </Match>
            <Match when={type === 'conditional'}>
              <ConditionalField
                merged={data?.merged as any}
                headers={data?.headers}
              />
            </Match>
          </Switch>
        </Match>

        <Match when={type === 'checkbox'}>
          <RadioGroup options={options} />
        </Match>

        <Match when={type === 'select'}>
          <Select options={options} />
        </Match>
      </Switch>
    </div>
  );
};
