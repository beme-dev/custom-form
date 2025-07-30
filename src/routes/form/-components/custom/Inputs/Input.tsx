import { Select } from '#organisms/Select';
import { lang, translate, type Field } from '#service';
import { createMemo, Match, Switch, type Component } from 'solid-js';
import { hasOptions } from '~/routes/form/-signals';
import { ColorPicker } from './color';
import { ConditionalField } from './conditional';
import { Calendar } from './date';
import { NumberField } from './number';
import { RadioGroup } from './RadioGroup';

type InputProps = Field & {
  id: number;
};

export const Input: Component<InputProps> = ({
  type,
  label,
  options,
  data,
  id,
}) => {
  const _label = () => {
    const question = translate('pages.form.labels.question')(lang());
    return label.trim() === '' ? `(${question})` : label;
  };

  const testId = createMemo(() => `${_label()}input-${id}`, '', {
    name: 'input-id',
  });

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
                onInput={() => {}}
                data-testid={testId()}
              />
            }
          >
            <Match when={type === 'color'}>
              <ColorPicker data-testid={testId()} />
            </Match>
            <Match when={type === 'date'}>
              <Calendar data-testid={testId()} />
            </Match>
            <Match when={type === 'number'}>
              <NumberField data-testid={testId()} />
            </Match>
            <Match when={type === 'conditional'}>
              <ConditionalField
                merged={data?.merged as any}
                headers={data?.headers}
                data-testid={testId()}
              />
            </Match>
          </Switch>
        </Match>

        <Match when={type === 'checkbox'}>
          <RadioGroup options={options} data-testid={testId()} />
        </Match>

        <Match when={type === 'select'}>
          <Select options={options} data-testid={testId()} />
        </Match>
      </Switch>
    </div>
  );
};
