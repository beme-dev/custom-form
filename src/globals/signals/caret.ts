import type { JSX } from 'solid-js';
import { toFocus } from './focus';

export const onCaret = (name: string) => {
  type _Fn = JSX.FocusEventHandlerUnion<
    HTMLInputElement | HTMLTextAreaElement,
    FocusEvent
  >;

  const out: _Fn = e => {
    const focus = toFocus();
    let start = focus?.start;

    if (focus?.name === name && start !== undefined) {
      const check2 = e.target.scrollHeight > e.target.clientHeight;
      if (check2) {
        start = 0;
      }
      e.target.setSelectionRange(start, start);
    }
  };

  return out;
};
