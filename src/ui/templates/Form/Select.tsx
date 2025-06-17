import type { Component } from 'solid-js';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as _Select,
} from '~/ui/cn/components/ui/select';
import { useIntl } from './signals';
import type { Field } from './types';

const INTL = useIntl();
const Item: Component<{ children: string }> = ({ children }) => {
  const _children =
    children.trim() === '' ? `(# -> ${INTL().option.invite})` : children;

  return <span>{_children}</span>;
};

export const Select: Component<{ options?: Field['options'] }> = ({
  options = [],
}) => {
  return (
    <_Select
      options={options}
      placeholder={INTL().option.invite}
      itemComponent={props => (
        <SelectItem item={props.item}>
          <Item>{props.item.rawValue}</Item>
        </SelectItem>
      )}
    >
      <SelectTrigger class="w-sm mx-auto overflow-hidden">
        <div class="w-11/12 text-left truncate">
          <SelectValue<string>>
            {({ selectedOption }) => selectedOption()}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent class="" />
    </_Select>
  );
};
