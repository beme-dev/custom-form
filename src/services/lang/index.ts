import { initI18n } from '@bemedev/i18n';
import { type RootTranslations } from './langs';
import { TRANSLATIONS } from './langs/index';

declare module '@bemedev/i18n' {
  interface Register {
    translations: RootTranslations;
  }
}

export const { translate } = initI18n(TRANSLATIONS, 'en');

export { LANG_STORE_KEY, LANGS, type FieldType, type Lang } from './langs';
