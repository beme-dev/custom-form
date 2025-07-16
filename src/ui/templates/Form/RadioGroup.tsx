import { For, type Component } from 'solid-js';
import { select } from '~/services/main';
import {
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemLabel,
  RadioGroup as _RadioGroup,
} from '~/ui/cn/components/ui/radio-group';
import type { Field } from './types';

export const RadioGroup: Component<{
  options?: Field['options'];
}> = ({ options = [] }) => {
  return (
    <_RadioGroup class='grid gap-2 mx-auto px-7 py-3 border border-gray-100 rounded-md'>
      <For each={options}>
        {option => {
          const _label = () =>
            option.trim() === ''
              ? `(${select('context.intl.option.invite')()})`
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
