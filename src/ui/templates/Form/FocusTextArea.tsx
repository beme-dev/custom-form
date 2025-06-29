import { forwardFocus } from '~/ui/molecules/focus';
import { toFocus } from './signals';

export const FocusTextArea = forwardFocus<'textarea'>(
  ({ name }) => name === toFocus()?.name,
)(props => <textarea {...props} />);
