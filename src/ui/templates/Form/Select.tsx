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
  disabled?: boolean;
}> = ({ options = [], onChange, disabled }) => {
  const [value, setValue] = createSignal('');

  return (
    <_Select
      options={options}
      value={value()}
      onChange={e => {
        if (e) setValue(e);
        onChange?.(e);
      }}
      placeholder={context(c => c.intl?.option.invite)()}
      itemComponent={props => (
        <SelectItem item={props.item}>
          <Item>{props.item.rawValue}</Item>
        </SelectItem>
      )}
      disabled={disabled}
    >
      <SelectTrigger class='w-sm mx-auto overflow-hidden cursor-pointer'>
        <div class='w-11/12 text-left truncate'>
          <SelectValue<string>>
            {({ selectedOption }) => selectedOption()}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent class='' />
    </_Select>
  );
};
