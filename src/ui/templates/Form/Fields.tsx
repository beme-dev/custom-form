import { Accordion } from '#components/accordion';
import { For, type Accessor, type Component } from 'solid-js';
import { CreateField } from './CreateField';
import { useIntl } from './hooks';
import type { Field } from './types';

export const Fields: Component<{
  fields: Accessor<Field[]>;
  updateField: (index: number, field: Field) => void;
  removeField: (index: number) => void;
}> = ({ fields, updateField, removeField }) => {
  const INTL = useIntl();

  return (
    <Accordion collapsible class="">
      <For each={fields()}>
        {(field, index) => (
          <Accordion.Item class="border-0" value={`field-${index()}`}>
            <Accordion.Trigger class="cursor-pointer hover:no-underline">
              <button
                class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm active:border-2 active:border-red-800 transition-colors duration-200 box-border"
                onClick={() => removeField(index())}
              >
                X
              </button>
              <span>
                {`${INTL().field} ${index() + 1} : ${field.label || '****'}`}
              </span>
            </Accordion.Trigger>
            <Accordion.Content class="p-3">
              <CreateField
                field={field}
                update={field => {
                  updateField(index(), field);
                }}
                index={index()}
                remove={() => removeField(index())}
              />
            </Accordion.Content>
          </Accordion.Item>
        )}
      </For>
    </Accordion>
  );
};
