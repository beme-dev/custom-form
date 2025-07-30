import { type types } from '@bemedev/types';
import { type FieldType } from '../../lang/service';

export type State = 'registration' | 'registered' | 'idle';

export type CSVData = Record<string, string | number>;

export type CSVDataDeep =
  | string
  | number
  | (string | number)[]
  | CsvDataMap;

interface CsvDataMap {
  [key: types.Keys]: CSVDataDeep;
}

export type Field = {
  label: string;
  type?: FieldType;
  options?: string[];
  data?: {
    data: CSVData[];
    headers: string[];
    merged: CSVDataDeep;
    name: string;
  };
};
