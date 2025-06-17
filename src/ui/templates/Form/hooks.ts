import { createSignal, onCleanup } from 'solid-js';
import { useLang } from '~/ui/hooks/useLang';
import { FIELD_TYPES2 } from './constants';
import type { Field, FieldType } from './types';

export const createField = () => {
  const [label, setLabel] = createSignal('');
  const [type, setType] = createSignal<FieldType>('text');
  const [options, setOptions] = createSignal<string[] | undefined>(
    undefined,
  );

  const updateLabel = (newLabel: string) => {
    setLabel(newLabel);
  };

  const updateType = (newType?: FieldType) => {
    if (!newType) return;
    setType(newType);
    if (newType === 'select' || newType === 'checkbox') {
      setOptions(['']);
    } else {
      setOptions(undefined);
    }
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

  // Combined field for internal use
  const field = () => ({
    label: label(),
    type: type(),
    options: options(),
  });

  return {
    label,
    setLabel: updateLabel,
    type,
    setType: updateType,
    options,
    addOption,
    updateOption,
    setOptions,
    field,
  };
};

export const createFields = (...data: Field[]) => {
  // Initialize fields with provided data or default to an empty field
  if (data.length < 1) {
    data = [{ label: '' }];
  }

  const [fields, setFields] = createSignal(data);

  const addField = () => {
    const value: Field = {
      label: '',
    };
    setFields(f => {
      return [...f, value];
    });
  };

  const removeField = (index: number) => {
    setFields(f => {
      const updated = [...f];
      updated.splice(index, 1);
      return updated;
    });
  };

  const updateField = (index: number, value: Partial<Field>) => {
    setFields(f => {
      const updated = [...f];
      updated[index] = { ...updated[index], ...value };
      return updated;
    });
  };

  return {
    fields,
    addField,
    removeField,
    updateField,
  };
};

export function createDebounce<T>(
  action: (arg: any) => void,
  ms?: number,
): (value: T) => void;
export function createDebounce(
  action: () => void,
  ms?: number,
): () => void;

export function createDebounce<T>(
  action: (arg: T) => void | (() => void),
  ms = 1000,
) {
  let timerHandle: NodeJS.Timeout;
  function debounce(value?: T) {
    clearTimeout(timerHandle);
    if (action.length === 0) {
      timerHandle = setTimeout(() => (action as any)(), ms);
    } else {
      timerHandle = setTimeout(() => action(value as any), ms);
    }
  }

  onCleanup(() => clearTimeout(timerHandle));
  return debounce;
}

export const [toFocus, setFocus] = createSignal<string | undefined>(
  undefined,
);

export const hasOptions = (type: FieldType) => {
  return type === 'select' || type === 'checkbox';
};

export const useTypes = () => {
  type _Field = { children: string; value: FieldType };

  const [lang] = useLang();
  const _types = FIELD_TYPES2[lang()] || FIELD_TYPES2.en;

  const types = () =>
    Object.entries(_types).map(([key, children]) => ({
      value: key as FieldType,
      children,
    })) satisfies _Field[];

  return types;
};
