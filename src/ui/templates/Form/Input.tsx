import { Match, Switch, type Component } from 'solid-js';
import { hasOptions, useIntl } from './hooks';
import { RadioGroup } from './RadioGroup';
import { Select } from './Select';
import type { Field } from './types';

export const Input: Component<Field> = ({ type, label, options }) => {
  const INTL = useIntl();
  const _label = () =>
    label.trim() === '' ? `(${INTL().question})` : label;

  return (
    <div class="flex flex-col space-y-3 min-w-lg w-11/12 mx-auto px-2 py-8">
      <label class="block mb-2 font-medium text-gray-700" for="answer">
        {_label()}
      </label>
      <Switch>
        <Match when={!hasOptions(type)}>
          <input
            type={type}
            class="border p-2 rounded w-full outline-none"
            placeholder={INTL().answer.placeholder}
            name="answer"
          />
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
