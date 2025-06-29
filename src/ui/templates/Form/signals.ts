import { createSignal } from 'solid-js';
import type { Field, FieldType } from './types';

export const createField = (field?: Field) => {
  const [label, setLabel] = createSignal(field?.label || '');
  const [type, setType] = createSignal(field?.type || 'text');
  const [options, setOptions] = createSignal(field?.options);

  const updateLabel = (newLabel: string) => {
    setLabel(newLabel);
  };

  const updateType = (newType?: FieldType) => {
    if (!newType) return;
    setType(newType);
    const _has = hasOptions(newType);
    if (_has) setOptions(['']);
    else setOptions(undefined);
    console.log('Updated type:', newType);
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
    setType: updateType,
    options,
    addOption,
    updateOption,
    setOptions,
    deleteOption,
  };
};

export const [toFocus, setFocus] = createSignal<string | undefined>();

export const hasOptions = (type?: FieldType) => {
  return type === 'select' || type === 'checkbox';
};
