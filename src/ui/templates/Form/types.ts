import type { Lang } from '~/utils/types';
import type { _FIELDS_TYPES } from './constants';
import type { CSVData, CSVDataDeep } from './Dropzone/types';

export type FieldType = (typeof _FIELDS_TYPES)[number];

export type Option = {
  name: string;
  value: string;
};

export type Field = {
  label: string;
  type?: FieldType;
  options?: string[];
  data?: {
    data: CSVData[];
    headers: string[];
    merged: CSVDataDeep;
  };
};

export type FieldTypes = Record<Lang, Record<FieldType, string>>;

export type _Intl = {
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
