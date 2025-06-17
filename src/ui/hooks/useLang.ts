import { LANG_STORE_KEY } from '../constants/strings';
import type { Lang } from '../templates/Form';

export const useLang = () => {
  const lang = () =>
    (localStorage.getItem(LANG_STORE_KEY) ||
      navigator.language.substring(0, 2) ||
      'en') as Lang;

  const setLang = (newLang: string) => {
    localStorage.setItem(LANG_STORE_KEY, newLang);
  };

  return [lang, setLang] as const;
};
