import type { Component } from 'solid-js';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as _Select,
} from '~/ui/cn/components/ui/select';
import type { Field } from './types';

export const Select: Component<{ options?: Field['options'] }> = ({
  options = [],
}) => (
  <_Select
    options={options}
    placeholder="Votre choix"
    itemComponent={props => (
      <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
    )}
  >
    <SelectTrigger class="w-sm mx-auto overflow-hidden">
      <div class="w-11/12 text-left truncate">
        <SelectValue<string>>
          {state => state.selectedOption()}
        </SelectValue>
      </div>
    </SelectTrigger>
    <SelectContent class="" />
  </_Select>
);
