import { createSignal } from 'solid-js';
import type { Lang } from '~/utils/types';
import { LANG_STORE_KEY, LANGS } from '../constants/strings';
import { createDebounce } from './createDebounce';

const useLang = () => {
  let __lang = (localStorage.getItem(LANG_STORE_KEY) ||
    navigator.language.substring(0, 2)) as Lang;

  const check = !__lang || !LANGS.includes(__lang as any);
  if (check) __lang = 'en';

  const [lang, _setLang] = createSignal(__lang);

  const setLang = (newLang: Lang) => {
    localStorage.setItem(LANG_STORE_KEY, newLang);
    _setLang(newLang);
  };

  const debounce = createDebounce(setLang, 350);

  return [lang, debounce] as const;
};

export const [lang, setLang] = useLang();
