import { context, lang, send } from '#service';
import { type Component } from 'solid-js';
import { translate } from '~/services/lang';
import { cn } from '~/ui/cn/utils';

//On register block the fields ui
export const RegisterFields: Component<{
  class?: string;
}> = ({ class: _class }) => {
  return (
    <button
      type='submit'
      class={cn(
        'py-2 px-3 bg-orange-600 shadow-xl hover:bg-orange-500 active:scale-95 text-white rounded-lg cursor-pointer disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-700 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-slate-200 disabled:hover:scale-none transition-all duration-300 ease-in-out',
        _class,
      )}
      onClick={() => {
        send('FIELDS.REGISTER');
      }}
      disabled={context(c => c.states?.fields !== 'idle')()}
    >
      {translate('pages.form.buttons.fields.register')(lang())}
    </button>
  );
};
