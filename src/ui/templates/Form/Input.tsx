import { Match, Switch, type Component } from 'solid-js';
import { select } from '~/services/main';
import { ColorPicker } from './_inputs/color';
import { Calendar } from './_inputs/date';
import { NumberField } from './_inputs/number';
import { RadioGroup } from './RadioGroup';
import { Select } from './Select';
import { hasOptions } from './signals';
import type { Field } from './types';

export const Input: Component<Field> = ({ type, label, options }) => {
  const _label = () => {
    const question = select('context.intl.question')();
    return label.trim() === '' ? `(${question})` : label;
  };

  return (
    <div class="flex flex-col space-y-3 min-w-lg w-11/12 mx-auto px-2 py-8">
      <label
        class="block mb-2 font-medium text-gray-700 select-none"
        for="answer"
      >
        {_label()}
      </label>
      <Switch>
        <Match when={!hasOptions(type)}>
          <Switch
            fallback={
              <input
                type={type}
                class="border p-2 rounded w-full outline-none"
                placeholder={select('context.intl.answer.placeholder')()}
                name="answer"
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
