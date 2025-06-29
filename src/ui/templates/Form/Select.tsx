import type { Component } from 'solid-js';
import { select } from '~/services/main';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as _Select,
} from '~/ui/cn/components/ui/select';
import type { Field } from './types';

const Item: Component<{ children: string }> = ({ children }) => {
  const _children =
    children.trim() === ''
      ? `(# -> ${select('intl.option.invite')()})`
      : children;

  return <span>{_children}</span>;
};

export const Select: Component<{ options?: Field['options'] }> = ({
  options = [],
}) => {
  return (
    <_Select
      options={options}
      placeholder={select('intl.option.invite')()}
      itemComponent={props => (
        <SelectItem
          item={props.item}
          onClick={e => {
            console.log('click', e.currentTarget.dataset.key, e.type);
          }}
        >
          <Item>{props.item.rawValue}</Item>
        </SelectItem>
      )}
    >
      <SelectTrigger
        class="w-sm mx-auto overflow-hidden"
        onInput={() => {
          console.log('input');
        }}
      >
        <div class="w-11/12 text-left truncate">
          <SelectValue<string>
            onInput={() => {
              console.log('input');
            }}
          >
            {({ selectedOption }) => selectedOption()}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent class="" />
    </_Select>
  );
};
