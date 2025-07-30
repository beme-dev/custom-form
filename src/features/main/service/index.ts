import { interpret } from '@bemedev/app-solid';
import { createMemo, createRoot } from 'solid-js';
import { mainMachine } from './machine';

export const { context, send, start, dispose, reducer, value } =
  interpret(mainMachine);

export const lang = createRoot(() =>
  createMemo(context(c => c.lang ?? 'en')),
);

export {
  LANG_STORE_KEY,
  LANGS,
  translate,
  type FieldType,
  type Lang,
} from '../../lang/service';

export * from './types';
