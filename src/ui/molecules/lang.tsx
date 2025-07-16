import {
  Select as _Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#components/select';
import { onCleanup, type Component } from 'solid-js';
import { select, send } from '~/services/main';
import { debounceFn } from '~/signals/debounce';
import type { Lang } from '~/utils/types';
import { LANG_STORE_KEY, LANGS } from '../constants/strings';

const defaultValue = () => {
  let __lang = (localStorage.getItem(LANG_STORE_KEY) ||
    navigator.language.substring(0, 2)) as Lang;

  const check = !__lang || !LANGS.includes(__lang as any);
  if (check) __lang = 'en';
  return __lang;
};

export const LangSwitcher: Component = () => {
  const setLang2 = debounceFn(
    (lang: Lang) => send({ type: 'CHANGE_LANG', payload: { lang } }),
    500,
  );

  onCleanup(setLang2.cancel);
  return (
    <_Select
      options={LANGS as unknown as Lang[]}
      defaultValue={defaultValue()}
      placeholder={select('context.intl.option.invite')()}
      onChange={value => {
        if (value) setLang2(value);
      }}
      itemComponent={props => (
        <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
      )}
    >
      <SelectTrigger class='w-20 mx-auto overflow-hidden cursor-pointer'>
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
