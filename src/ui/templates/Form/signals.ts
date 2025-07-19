import { deepEqual } from '@bemedev/app-ts/lib/utils';
import { createRoot, createSignal, type JSX } from 'solid-js';
import { context } from '~/services/main';
import type { Field, FieldType } from './types';

export const createField = (field?: Field) => {
  const [label, setLabel] = createSignal(field?.label || '');
  const [type, setType] = createSignal(field?.type || 'text');
  const [options, setOptions] = createSignal(field?.options);
  const [data, setData] = createSignal(field?.data);

  const updateLabel = (newLabel: string) => {
    setLabel(newLabel);
  };

  const updateType = (newType?: FieldType) => {
    if (!newType) return;
    setType(newType);
    const _has = hasOptions(newType);
    if (_has) setOptions(prev => prev ?? ['']);
    else setOptions(undefined);
  };

  const addOption = (option = '') => {
    setOptions(prev => (prev ? [...prev, option] : [option]));
  };

  const updateOption = (index: number, value: string) => {
    setOptions(prev => {
      if (!prev) return prev;

      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const deleteOption = (index: number) => {
    setOptions(prev => {
      if (!prev) return prev;
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  return {
    label,
    setLabel: updateLabel,
    type,
    data,
    setType: updateType,

    options,
    addOption,
    updateOption,
    setOptions,
    setData,
    deleteOption,
  };
};

type FocusProps = {
  name: string;
  start?: number | null;
  length?: number | null;
};

export const [toFocus, setFocus] = createRoot(() =>
  createSignal({} as FocusProps),
);

export const hasOptions = (type?: FieldType) => {
  return type === 'select' || type === 'checkbox';
};

export const onCaret = (name: string) => {
  type _Fn = JSX.FocusEventHandlerUnion<
    HTMLInputElement | HTMLTextAreaElement,
    FocusEvent
  >;

  const out: _Fn = e => {
    const focus = toFocus();
    let start = focus?.start;

    if (focus?.name === name && start !== undefined) {
      const check2 = e.target.scrollHeight > e.target.clientHeight;
      if (check2) {
        start = 0;
      }
      e.target.setSelectionRange(start, start);
    }
  };

  return out;
};

export const selectFields = () => {
  return context(
    c => c.fields,
    (a, b) => {
      return deepEqual(a, b);
    },
  );
};
