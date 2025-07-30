import {
  Select as _Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#components/select';
import { TEST_IDS } from '#constants/test';
import {
  lang as defaultLang,
  LANGS,
  send,
  translate,
  type Lang,
} from '#service';
import { createSignal, type Component } from 'solid-js';

export const LangSwitcher: Component = () => {
  const [lang, setLang] = createSignal<Lang>(defaultLang());

  const placeholder = translate('pages.form.selects.inputs.invite')(
    lang(),
  );

  return (
    <_Select
      options={LANGS}
      value={lang()}
      placeholder={placeholder}
      onChange={lang => {
        if (lang) {
          setLang(lang);
          send({ type: 'CHANGE_LANG', payload: { lang } });
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
