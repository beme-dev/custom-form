import type { _FIELDS_TYPES, LANGS } from './constants';

export type FieldType = (typeof _FIELDS_TYPES)[number];

export type Option = {
  name: string;
  value: string;
};

export type Field = {
  label: string;
  type?: FieldType;
  options?: string[];
};

export type Lang = (typeof LANGS)[number];

export type FieldTypes = Record<Lang, Record<FieldType, string>>;
