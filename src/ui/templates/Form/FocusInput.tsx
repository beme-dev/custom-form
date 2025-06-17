import type { ReduceComponent } from '#helpers/types';
import { onMount } from 'solid-js';
import { toFocus } from './signals';

export const FocusInput: ReduceComponent<'input', 'ref'> = props => {
  let ref: any;
  onMount(() => {
    if (toFocus() === props.name) ref?.focus();
  });
  return <input {...props} ref={ref} />;
};
