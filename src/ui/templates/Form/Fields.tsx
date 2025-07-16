import { Accordion } from '#components/accordion';
import { For, type Component } from 'solid-js';
import { select, send } from '~/services/main';
import { CreateField } from './CreateField';

export const Fields: Component = () => {
  return (
    <Accordion collapsible class=''>
      <For each={select('context.fields')()}>
        {(field, index) => (
          <Accordion.Item class='border-0' value={`field-${index()}`}>
            <Accordion.Trigger class='cursor-pointer hover:no-underline'>
              <button
                class='bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm active:border-2 active:border-red-800 transition-colors duration-200 box-border'
                onClick={() =>
                  send({ type: 'REMOVE', payload: { index: index() } })
                }
              >
                X
              </button>
              <span>
                {`${select('context.intl.field')()} ${index() + 1} : ${field.label || '****'}`}
              </span>
            </Accordion.Trigger>
            <Accordion.Content class='pt-3'>
              <CreateField field={field} index={index} />
            </Accordion.Content>
          </Accordion.Item>
        )}
      </For>
    </Accordion>
  );
};
