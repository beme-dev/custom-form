import { interpret } from '@bemedev/app-solid';
import { createMachine } from '@bemedev/app-ts';
import { deepEqual, typings } from '@bemedev/app-ts/lib/utils';
import { LANG_STORE_KEY, type Lang } from '~/signals/lang';
import { LANGS } from '~/ui/constants/strings';
import { type _Intl, type Field } from '~/ui/templates/Form';
import { INTL } from '~/ui/templates/Form/constants';

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
            actions: ['changeLang', 'changeIntl'],
          },
          REMOVE: {
            actions: ['remove'],
            target: '/working/select',
          },
          ADD: {
            actions: ['add'],
            target: '/working/select',
          },
          UPDATE: {
            actions: 'update',
            target: '/working/select',
          },
        },
      },
    },
  },
  {
    context: typings.partial({
      lang: typings.string(),
      intl: typings<_Intl>(),
      fields: typings.array(typings<Field>()),
      current: typings<Field>(),
    }),
    pContext: {},
    eventsMap: {
      CHANGE_LANG: { lang: typings.string() },
      REMOVE: { index: typings.number() },
      ADD: typings.object,
      UPDATE: {
        index: typings.number(),
        value: typings<Field>(),
      },
    },
    promiseesMap: {},
  },
  { '/': 'idle' },
).provideOptions(({ assign }) => ({
  actions: {
    changeLang: assign('context.lang', {
      CHANGE_LANG: (_, __, { lang }) => {
        localStorage.setItem(LANG_STORE_KEY, lang);
        return lang;
      },
    }),

    changeIntl: assign('context.intl', {
      CHANGE_LANG: (_, __, { lang }) => {
        let intl = (INTL as any)[lang!] as _Intl;
        if (!intl) {
          intl = INTL['en'];
        }
        return intl;
      },
    }),

    add: assign('context.fields', (_, { fields }) => {
      fields?.push({ label: '', type: 'text' });
      return fields;
    }),

    remove: assign('context.fields', {
      REMOVE: (_, { fields }, { index }) => {
        fields?.splice(index, 1);
        return fields;
      },
    }),

    update: assign('context.fields', {
      UPDATE: (_, { fields }, { index, value }) => {
        if (!fields) return;
        fields[index] = { ...fields[index], ...value };
        return fields;
      },
    }),

    /**
     * Prepare at starting point
     * @returns
     */
    prepare: () => {
      let lang = (localStorage.getItem(LANG_STORE_KEY) ||
        navigator.language.substring(0, 2)) as Lang;

      const check = !lang || !LANGS.includes(lang);
      if (check) lang = 'en';

      const current = { label: '' };

      return {
        context: {
          fields: [structuredClone(current)],
          current,
          lang,
          intl: INTL[lang],
        },
      };
    },

    // check: voidAction((_, context) => {
    //   console.log('context', context);
    // }),
  },
}));

export const { context, select, send, start } = interpret(mainMachine, {
  context: {},
  pContext: {},
});

export const selectFields = select('fields', (a, b) => deepEqual(a, b));
