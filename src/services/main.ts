import { interpret } from '@bemedev/app-solid';
import { createMachine, typings } from '@bemedev/app-ts';
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
            // target: '/working/select',
          },
          ADD: {
            actions: ['add'],
            // target: '/working/select',
          },
          UPDATE: {
            actions: 'update',
            // target: '/working/select',
          },
        },
      },
    },
  },
  typings({
    context: typings.partial({
      lang: typings.custom<Lang>(),
      intl: typings.custom<_Intl>(),
      fields: [typings.custom<Field>()],
      current: typings.custom<Field>(),
    }),
    eventsMap: {
      CHANGE_LANG: { lang: typings.custom<Lang>() },
      REMOVE: { index: 'number' },
      ADD: 'primitive',
      UPDATE: { index: 'number', value: typings.custom<Partial<Field>>() },
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

    changeIntl: assign('context.intl', {
      CHANGE_LANG: ({ payload: { lang } }) => {
        let intl = (INTL as any)[lang!] as _Intl;
        if (!intl) {
          intl = INTL['en'];
        }
        return intl;
      },
    }),

    add: assign('context.fields', ({ context: { fields } }) => {
      console.warn('fields', fields);
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
        console.warn('fields', fields);
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
      console.warn('current', INTL[lang].types);

      return {
        fields: [structuredClone(current)],
        current,
        lang,
        intl: INTL[lang],
      };
    }),
  },
}));

export const { context, select, send, start } = interpret(mainMachine, {
  context: {},
});
