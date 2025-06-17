import type { LANGS } from '~/ui/constants/strings';

export type Lang = (typeof LANGS)[number];

export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;
