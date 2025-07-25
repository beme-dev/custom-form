import { EN } from './en';
import { ES } from './es';
import { FR } from './fr';

export const TRANSLATIONS = {
  en: EN,
  es: ES,
  fr: FR,
} as const;

export type RootTranslations = typeof EN;

export const LANGS = Object.keys(TRANSLATIONS) as Array<
  keyof typeof TRANSLATIONS
>;

export const LANG_STORE_KEY = 'lang';

export type Lang = keyof typeof TRANSLATIONS;

export type FieldType =
  keyof RootTranslations['pages']['form']['selects']['inputs']['options'];
