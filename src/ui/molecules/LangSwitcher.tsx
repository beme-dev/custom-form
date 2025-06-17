import { onCleanup, type Component } from 'solid-js';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as _Select,
} from '~/ui/cn/components/ui/select';
import { LANGS } from '../constants/strings';
import { lang, setLang } from '../hooks/useLang';
import type { Lang } from '../templates/Form';

export const LangSwitcher: Component = () => {
  onCleanup(setLang.cancel);
  return (
    <_Select
      options={LANGS as unknown as Lang[]}
      defaultValue={lang()}
      placeholder="Votre choix"
      onChange={value => {
        if (value) setLang(value);
      }}
      itemComponent={props => (
        <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
      )}
    >
      <SelectTrigger class="w-20 mx-auto overflow-hidden cursor-pointer">
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
