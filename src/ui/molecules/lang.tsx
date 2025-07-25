import {
  Select as _Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#components/select';
import { createSignal, onCleanup, type Component } from 'solid-js';
import { TEST_IDS } from '~/constants/test';
import { translate } from '~/services/lang';
import { send } from '~/services/main';
import { debounceFn } from '~/signals/debounce';
import type { Lang } from '~/utils/types';
import { LANGS } from '../constants/strings';

export const LangSwitcher: Component = () => {
  const [lang, setLang] = createSignal<Lang>('en');

  const setLang2 = debounceFn(
    (lang: Lang) => send({ type: 'CHANGE_LANG', payload: { lang } }),
    500,
  );

  const placeholder = translate('pages.form.selects.inputs.invite')(
    lang(),
  );

  onCleanup(setLang2.cancel);

  return (
    <_Select
      options={LANGS as unknown as Lang[]}
      defaultValue={'en' as Lang}
      value={lang()}
      placeholder={placeholder}
      onChange={value => {
        if (value) {
          setLang(value);
          setLang2(value);
        }
      }}
      itemComponent={props => (
        <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
      )}
    >
      <SelectTrigger
        class='w-20 mx-auto overflow-hidden cursor-pointer'
        data-testid={TEST_IDS.lang}
      >
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
