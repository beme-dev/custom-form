import { Match, Switch, type Component } from 'solid-js';
import { RadioGroup } from './RadioGroup';
import { Select } from './Select';
import type { Field } from './types';

export const Input: Component<Field> = ({ type, label, options }) => {
  return (
    <div class="flex flex-col space-y-3 min-w-lg w-11/12 mx-auto px-2 py-8">
      <label class="block mb-2 font-medium text-gray-700" for="answer">
        {label}
      </label>
      <Switch>
        <Match when={type === 'text'}>
          <input
            type={type}
            class="border p-2 rounded w-full outline-none"
            placeholder={`Réponse`}
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
