import { cn } from '#cn/utils';
import { lang, send, translate } from '#service';
import { type Component } from 'solid-js';

//On register block the fields ui
export const ModifyFields: Component<{
  class?: string;
}> = ({ class: _class }) => {
  return (
    <button
      type='submit'
      class={cn(
        'py-1 px-3 text-blue-600 border-1 border-spacing-7 border-dashed border-blue-700 hover:scale-105 hover:text-blue-500 hover:border-blue-600 hover:underline underline-offset-2 active:scale-95 cursor-pointer text-lg font-bold hover:transition-transform hover:duration-350 ease-out active:ease-in',
        _class,
      )}
      onClick={() => {
        send('FIELDS.MODIFY');
      }}
    >
      {translate('pages.form.buttons.fields.modify')(lang())}
    </button>
  );
};
