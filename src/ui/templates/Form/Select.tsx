import { createSignal, type Component } from 'solid-js';
import { context } from '~/services/main';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as _Select,
} from '~/ui/cn/components/ui/select';

const Item: Component<{ children: string }> = ({ children }) => {
  const _children =
    children.trim() === ''
      ? `(# -> ${context(c => c.intl?.option.invite)()})`
      : children;

  return <span>{_children}</span>;
};

export const Select: Component<{
  options?: string[];
  onChange?: (e: string | null) => void;
}> = ({ options = [], onChange }) => {
  const [value, setValue] = createSignal('');
  return (
    <_Select
      options={options}
      value={value()}
      onChange={e => {
        console.log('change', e);
        if (e) setValue(e);
        onChange?.(e);
      }}
      placeholder={context(c => c.intl?.option.invite)()}
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
        class='w-sm mx-auto overflow-hidden'
        onInput={() => {
          console.log('input');
        }}
      >
        <div class='w-11/12 text-left truncate'>
          <SelectValue<string>
            onInput={() => {
              console.log('input');
            }}
          >
            {({ selectedOption }) => selectedOption()}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent class='' />
    </_Select>
  );
};
