import type { LANGS } from '#service';

export type Lang = (typeof LANGS)[number];

export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;
