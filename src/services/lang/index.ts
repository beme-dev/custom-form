import { initI18n } from '@bemedev/i18n';
import { EN } from './langs/en';
import { ES } from './langs/es';
import { FR } from './langs/fr';

declare module '@bemedev/i18n' {
  interface Register {
    translations: typeof EN;
  }
}

export const { translate } = initI18n(
  {
    en: EN,
    es: ES,
    fr: FR,
  },
  'en',
);
