import { type Field, type FieldType } from '#service';
import { createSignal } from 'solid-js';

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

export const hasOptions = (type?: FieldType) => {
  return type === 'select' || type === 'checkbox';
};
