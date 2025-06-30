import { For, type Component } from 'solid-js';
import { Input } from './Input';
import { selectFields } from './signals';

export const Inputs: Component = () => {
  return (
    <div class="w-full divide-y-2 divide-slate-300 flex flex-col">
      <For each={selectFields()()} children={Input} />
    </div>
  );
};
