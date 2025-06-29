import { interpret } from '@bemedev/app-solid';
import { createMachine } from '@bemedev/app-ts';
import { typings } from '@bemedev/app-ts/lib/utils';
import { LANG_STORE_KEY, type Lang } from '~/signals/lang';
import { LANGS } from '~/ui/constants/strings';
import {
  hasOptions,
  type _Intl,
  type Field,
  type FieldType,
} from '~/ui/templates/Form';
import { INTL } from '~/ui/templates/Form/constants';

export const mainMachine = createMachine(
  {
    states: {
      idle: {
        entry: 'prepare',
      },
      working: {
        on: {
          CHANGE_LANG: {
            actions: ['changeLang', 'changeIntl'],
          },
          REMOVE: {
            actions: ['remove', 'select'],
          },
          ADD: { actions: ['add', 'select'] },
          UPDATE: { actions: 'update' },
          SELECT: { actions: 'select' },
          SET_LABEL: { actions: 'setLabel' },
          SET_TYPE: { actions: 'setType' },
          OPTIONS_ADD: { actions: 'addOption' },
          OPTIONS_UPDATE: { actions: 'updateOption' },
          OPTIONS_REMOVE: { actions: 'removeOption' },
        },
      },
    },
  },
  {
    context: typings.partial({
      lang: typings.string(),
      intl: typings<_Intl>(),
      fields: typings<Field[]>(),
      current: typings<Field>(),
    }),
    pContext: {},
    eventsMap: {
      CHANGE_LANG: { lang: typings.string() },
      REMOVE: { index: typings.number() },
      ADD: typings.object,
      UPDATE: {
        index: typings.number(),
      },
      SELECT: { index: typings.number() },
      SET_LABEL: { label: typings.string() },
      SET_TYPE: { type: typings<FieldType>() },
      OPTIONS_ADD: typings.partial({ option: typings.string() }),
      OPTIONS_REMOVE: { index: typings.number() },
      OPTIONS_UPDATE: { index: typings.number(), value: typings.string() },
    },
    promiseesMap: {},
  },
  { '/': 'idle' },
).provideOptions(({ assign }) => ({
  actions: {
    changeLang: assign('context.lang', {
      CHANGE_LANG: (_, __, { lang }) => lang,
    }),

    changeIntl: assign('context.intl', (_, { lang }) => {
      let intl = (INTL as any)[lang!] as _Intl;
      if (!intl) {
        intl = INTL['en'];
      }
      return intl;
    }),

    add: assign('context.fields', (_, { fields }) => {
      fields?.push({ label: '' });
      return fields;
    }),

    remove: assign('context.fields', {
      REMOVE: (_, { fields }, { index }) => {
        fields?.splice(index, 1);
        return fields;
      },
    }),

    update: assign('context.fields', {
      UPDATE: (_, { fields, current }, { index }) => {
        if (!fields) return;
        fields[index] = { ...fields[index], ...current };
        return fields;
      },
    }),

    select: assign('context.current', {
      REMOVE: (_, { fields }, { index }) => {
        if (!fields) return;

        const len = fields.length;
        if (len === 0) return;

        const _index = (len - (index - 1)) % len;
        return structuredClone(fields[_index]);
      },

      ADD: (_, { fields }) => {
        if (!fields) return;
        return structuredClone(fields[fields.length - 1]);
      },

      SELECT: (_, { fields }, { index }) =>
        structuredClone(fields?.[index]),
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

    setLabel: assign('context.current.label', {
      SET_LABEL: (_, __, { label }) => label,
    }),

    setType: assign('context.current', {
      SET_TYPE: (_, { current }, { type }) => {
        current!.type = type;
        const _has = hasOptions(type);
        if (_has) current!.options = [''];
        else current!.options = undefined;
        return current;
      },
    }),

    addOption: assign('context.current.options', {
      OPTIONS_ADD: (_, { current }, { option = '' }) => {
        current?.options?.push(option);
        return current?.options;
      },
    }),

    removeOption: assign('context.current.options', {
      OPTIONS_REMOVE: (_, { current }, { index }) => {
        current?.options?.splice(index, 1);
        return current?.options;
      },
    }),

    updateOption: assign('context.current.options', {
      OPTIONS_UPDATE: (_, { current }, { index, value }) => {
        const options = current?.options;
        if (!options) return;

        options[index] = value;
        return options;
      },
    }),
  },
}));

export const { context, select, send } = interpret(mainMachine, {
  context: {},
  pContext: {},
});
