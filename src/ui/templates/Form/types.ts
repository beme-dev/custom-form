import type { LANGS } from '~/ui/constants/strings';
import type { _FIELDS_TYPES } from './constants';

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

type _Intl = {
  title: string;
  description: string;
  addField: string;
  field: string;
  types: Record<FieldType, string>;
  delete: string;
  question: string;
  option: {
    placeholder: string;
    invite: string;
  };
  answer: {
    placeholder: string;
  };
};

export type Intl = Record<Lang, _Intl>;
