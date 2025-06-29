import { createSignal } from 'solid-js';
import { lang } from '~/signals/lang';
import { INTL } from './constants';
import type { Field, FieldType } from './types';

export const useIntl = () => {
  return () => INTL[lang()];
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

export const useTypes = () => {
  type _Field = { children: string; value: FieldType };

  const types = () => {
    const _types = useIntl()().types;
    return Object.entries(_types).map(([key, children]) => ({
      value: key as FieldType,
      children,
    })) satisfies _Field[];
  };

  return types;
};
