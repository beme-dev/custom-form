import { createMachine, typings, type ContextFrom } from '@bemedev/app-ts';
import { types } from '@bemedev/types';
import { type Lang } from '../../lang/service';
import type { Field, State } from './types';

export const mainMachine = createMachine(
  {
    states: {
      idle: {
        entry: 'prepare',
        always: {
          /* '/working' */
        },
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
          'UPDATE:NOW': {
            actions: 'update:now',
          },
          'FIELDS:REGISTER': {
            actions: ['fields.register', 'fields.register.finish'],
          },
          'FIELDS:MODIFY': {
            actions: ['fields.modify'],
          },
        },

        states: {
          idle: {},

          register: {
            on: {
              'VALUES:REGISTER': {
                actions: [
                  'values.start.register',
                  'values.register',
                  'values.register.finish',
                ],
              },
              'VALUES:MODIFY': {
                actions: ['values.modify'],
              },
            },
          },
        },
      },
    },
  },
  typings({
    context: typings.partial({
      lang: typings.custom<Lang>(),
      fields: [typings.custom<Field>()],
      responses: [typings.custom<types.SingleOrArray<string>>()],
      states: typings.partial({
        fields: typings.custom<State>(),
        values: typings.custom<State>(),
      }),
      values: typings.custom<Record<string, string>>(),
    }),
    eventsMap: {
      CHANGE_LANG: { lang: typings.custom<Lang>() },
      REMOVE: { index: 'number' },
      ADD: 'primitive',
      UPDATE: {
        index: 'number',
        value: typings.partial(typings.custom<Field>()),
      },
      'UPDATE:NOW': {
        index: 'number',
        value: typings.custom<Field>(),
      },
      'FIELDS:REGISTER': 'primitive',
      'FIELDS:MODIFY': 'primitive',
      'VALUES:REGISTER': typings.custom<Record<string, string>>(),
      'VALUES:MODIFY': 'primitive',
    },
  }),
  {
    initials: { '/': 'idle', '/working': 'idle' },
    targets: {
      '/idle.always': '/working',
      '/working.on.FIELDS:REGISTER': '/working/register',
      '/working.on.FIELDS:MODIFY': '/working/idle',
    },
  },
).provideOptions(({ assign, debounce }) => ({
  actions: {
    changeLang: debounce(
      assign('context.lang', {
        CHANGE_LANG: ({ payload: { lang } }) => {
          return lang;
        },
      }),
      { ms: 500, id: 'change-lang' },
    ),

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

    update: debounce(
      assign('context.fields', {
        UPDATE: ({ context: { fields }, payload: { index, value } }) => {
          if (!fields) return;
          fields[index] = { ...fields[index], ...value };
          return fields;
        },
      }),
      { ms: 500, id: 'update-field' },
    ),

    'update:now': assign('context.fields', {
      'UPDATE:NOW': ({
        context: { fields },
        payload: { index, value },
      }) => {
        if (!fields) return;
        fields[index] = value;
        return fields;
      },
    }),

    // #region Fields
    'fields.register': assign(
      'context.states.fields',
      () => 'registration',
    ),

    'fields.register.finish': debounce(
      assign('context.states.fields', () => 'registered'),
      { ms: 500, id: 'register-fields-finish' },
    ),

    'fields.modify': assign('context.states.fields', () => 'idle'),
    // #endregion

    // #region Values
    'values.start.register': assign(
      'context.states.values',
      () => 'registration',
    ),

    'values.register': assign('context.values', {
      'VALUES:REGISTER': ({ payload }) => payload,
    }),

    'values.register.finish': debounce(
      assign('context.states.values', () => 'registered'),
      { ms: 500, id: 'register-values-finish' },
    ),

    'values.modify': assign('context.states.values', () => 'idle'),
    // #endregion

    /**
     * Prepare at starting point
     * @returns
     */
    prepare: assign('context', () => {
      const current = { label: '', type: 'text' } as Field;

      return {
        fields: [structuredClone(current)],
        lang: 'en',
        states: {
          fields: 'idle',
          values: 'idle',
        },
      };
    }),
  },
}));

export type Context = ContextFrom<typeof mainMachine>;
