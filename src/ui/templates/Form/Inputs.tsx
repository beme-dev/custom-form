import { For, type Accessor, type Component } from 'solid-js';
import { Input } from './Input';
import type { Field } from './types';

export const Inputs: Component<{
  fields: Accessor<Field[]>;
}> = ({ fields }) => {
  return (
    <div class="w-full divide-y-2 divide-slate-300 flex flex-col">
      <For each={fields()} children={Input} />
    </div>
  );
};
