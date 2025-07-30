import {
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemLabel,
  RadioGroup as _RadioGroup,
} from '#components/radio-group';
import { lang, translate, type Field } from '#service';
import { For, type Component } from 'solid-js';

export const RadioGroup: Component<{
  options?: Field['options'];
}> = ({ options = [] }) => {
  return (
    <_RadioGroup class='grid gap-2 mx-auto px-7 py-3 border border-gray-100 rounded-md'>
      <For each={options}>
        {option => {
          const _label = () =>
            option.trim() === ''
              ? `(${translate('pages.form.selects.inputs.invite')(lang())})`
              : option;
          return (
            <RadioGroupItem value={option} class='flex items-center gap-2'>
              <RadioGroupItemControl />
              <RadioGroupItemLabel class='text-sm'>
                {_label()}
              </RadioGroupItemLabel>
            </RadioGroupItem>
          );
        }}
      </For>
    </_RadioGroup>
  );
};
