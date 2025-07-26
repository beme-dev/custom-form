import { Accordion } from '#components/accordion';
import { context, lang, send, translate } from '#service';
import { createMemo, For, type Component } from 'solid-js';
import { CreateField } from './CreateField';

export const Fields: Component = () => {
  return (
    <Accordion collapsible class='relative w-full'>
      <For each={context(c => c.fields)()}>
        {(field, index) => {
          const tesID = createMemo(() => `field-${index() + 1}`, '', {
            name: 'field-id',
          });

          return (
            <Accordion.Item class='border-0' value={tesID()}>
              <Accordion.Trigger
                class='cursor-pointer hover:no-underline'
                data-testid={tesID()}
              >
                <button
                  type='submit'
                  class='bg-orange-700 text-white size-7 content-center rounded hover:bg-red-700 text-sm active:border-2 active:border-red-800 transition-colors duration-200 box-border'
                  onClick={() =>
                    send({ type: 'REMOVE', payload: { index: index() } })
                  }
                >
                  X
                </button>
                <span>
                  {`${translate('pages.form.labels.field')(lang())} ${index() + 1} : ${field.label || '****'}`}
                </span>
              </Accordion.Trigger>
              <Accordion.Content class='pt-3'>
                <CreateField field={field} index={index} />
              </Accordion.Content>
            </Accordion.Item>
          );
        }}
      </For>
    </Accordion>
  );
};
