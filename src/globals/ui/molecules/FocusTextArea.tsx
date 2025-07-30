import { toFocus } from '#signals/focus';
import { forwardFocus } from './focus';

export const FocusTextArea = forwardFocus<'textarea'>(
  ({ name }) => name === toFocus()?.name,
)(props => <textarea {...props} />);
