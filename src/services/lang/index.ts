import { initI18n } from '@bemedev/i18n';
import { type FieldType, type Lang, type RootTranslations } from './langs';
import { TRANSLATIONS } from './langs/index';

declare module '@bemedev/i18n' {
  interface Register {
    translations: RootTranslations;
  }
}

export const { translate } = initI18n(TRANSLATIONS, 'en');

const TYPES_KEY = Object.keys(
  TRANSLATIONS.en.pages.form.selects.inputs.options,
) as FieldType[];

export const fieldTypes = (lang: Lang = 'en') =>
  TYPES_KEY.reduce(
    (acc, key) => {
      acc[key] = translate(`pages.form.selects.inputs.options.${key}`).to(
        lang,
      );
      return acc;
    },
    {} as Record<FieldType, string>,
  );

export type { FieldType };
