import type { types } from '@bemedev/types';

export type CSVData = Record<string, string | number>;

export type DropzoneProps = {
  onDataLoaded?: (props: {
    data: CSVData[];
    headers: string[];
    name: string;
    conditions: Conditions;
  }) => void;
  onError?: (error: string) => void;
  onReset?: () => void;
  className?: string;
  maxFileSize?: number; // en MB
  placeholder?: string;
  acceptMessage?: string;
  errorMessage?: string;
};

export type Conditions = {
  merged: CSVDataDeep;
  warnings: string[];
};

export type ParsedCSV = {
  data: CSVData[];
  headers: string[];
  depth: number;
};

export type CSVDataDeep =
  | string
  | number
  | (string | number)[]
  | CsvDataMap;

interface CsvDataMap {
  [key: types.Keys]: CSVDataDeep;
}
