import { For, type Component } from 'solid-js';
import { selectFields } from '~/services/main';
import { Input } from './Input';

export const Inputs: Component = () => {
  return (
    <div class="w-full divide-y-2 divide-slate-300 flex flex-col">
      <For each={selectFields()} children={Input} />
    </div>
  );
};
