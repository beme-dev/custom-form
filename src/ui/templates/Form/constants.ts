import type { FieldTypes } from './types';

export const LANGS = ['fr', 'en', 'es'] as const;

export const _FIELDS_TYPES = ['text', 'select', 'checkbox'] as const;

export const FIELD_TYPES2: FieldTypes = {
  fr: {
    text: 'Texte',
    select: 'Choix',
    checkbox: 'Case à cocher',
  },
  en: {
    text: 'Text',
    select: 'Choice',
    checkbox: 'Checkbox',
  },
  es: {
    text: 'Texto',
    select: 'Elección',
    checkbox: 'Casilla de verificación',
  },
};
