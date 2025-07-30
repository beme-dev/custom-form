import { toFocus } from '#signals/focus';
import { forwardFocus } from './focus';

export const FocusInput = forwardFocus<'input'>(
  ({ name }) => name === toFocus()?.name,
)(props => <input {...props} />);
