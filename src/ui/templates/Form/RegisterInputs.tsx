import type { Component } from 'solid-js';
import { translate } from '~/services/lang';
import { lang } from '~/services/main';

export const RegisterInputs: Component<{ onClick: () => void }> = () => {
  const text = translate('pages.form.buttons.inputs.register')(lang());

  return (
    <button
      type='submit'
      class='py-2 px-3 bg-orange-500 shadow-lg active:scale-95'
    >
      {text}
    </button>
  );
};
