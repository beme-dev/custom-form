import { interpret } from '@bemedev/app-solid';
import { createMachine, typings } from '@bemedev/app-ts';
import type { SingleOrArrayL } from '@bemedev/app-ts/lib/types/index.js';
import { createMemo, createRoot } from 'solid-js';

import { type Field } from '~/ui/templates/Form';

import { type Lang, LANGS, LANG_STORE_KEY } from './lang';
export {
  LANGS,
  LANG_STORE_KEY,
  translate,
  type FieldType,
  type Lang,
} from './lang';

export const mainMachine = createMachine(
  {
    states: {
      idle: {
        entry: 'prepare',
        always: '/working',
      },
      working: {
        on: {
          CHANGE_LANG: {
            actions: ['changeLang'],
          },
          REMOVE: {
            actions: ['remove'],
          },
          ADD: {
            actions: ['add'],
          },
          UPDATE: {
            actions: 'update',
          },
        },
      },
    },
  },
  typings({
    context: typings.partial({
      lang: typings.custom<Lang>(),
      fields: [typings.custom<Field>()],
      responses: [typings.custom<SingleOrArrayL<string>>()],
    }),
    eventsMap: {
      CHANGE_LANG: { lang: typings.custom<Lang>() },
      REMOVE: { index: 'number' },
      ADD: 'primitive',
      UPDATE: {
        index: 'number',
        value: typings.partial(typings.custom<Field>()),
      },
    },
    // promiseesMap: 'primitive',
  }),
  { '/': 'idle' },
).provideOptions(({ assign }) => ({
  actions: {
    changeLang: assign('context.lang', {
      CHANGE_LANG: ({ payload: { lang } }) => {
        localStorage.setItem(LANG_STORE_KEY, lang);
        return lang;
      },
    }),

    add: assign('context.fields', ({ context: { fields } }) => {
      fields?.push({ label: '', type: 'text' });
      return fields;
    }),

    remove: assign('context.fields', {
      REMOVE: ({ context: { fields }, payload: { index } }) => {
        fields?.splice(index, 1);
        return fields;
      },
    }),

    update: assign('context.fields', {
      UPDATE: ({ context: { fields }, payload: { index, value } }) => {
        if (!fields) return;
        fields[index] = { ...fields[index], ...value };
        return fields;
      },
    }),

    /**
     * Prepare at starting point
     * @returns
     */
    prepare: assign('context', () => {
      let lang = (localStorage.getItem(LANG_STORE_KEY) ||
        navigator.language.substring(0, 2)) as Lang;

      const check = !lang || !LANGS.includes(lang);
      if (check) lang = 'en';

      const current = { label: '', type: 'text' } as Field;

      return {
        fields: [structuredClone(current)],
        lang,
      };
    }),
  },
}));

export const { context, send, start, dispose, value } =
  interpret(mainMachine);

export const lang = createRoot(() =>
  createMemo(context(c => c.lang ?? 'en')),
);
