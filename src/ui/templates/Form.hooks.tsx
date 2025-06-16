import { createSignal } from 'solid-js';

export type FieldType = 'text' | 'select' | 'checkbox';

export type Field = {
  label: string;
  type?: FieldType;
  options?: string[];
};

export const FIELD_TYPES: { label: string; value: FieldType }[] = [
  { label: 'Texte', value: 'text' },
  { label: 'Choix', value: 'select' },
  { label: 'Case à cocher', value: 'checkbox' },
];

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

export const createFields = () => {
  const [fields, setFields] = createSignal<Field[]>([{ label: '' }]);

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
      console.log('Updated field 3:', updated[index]);
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
