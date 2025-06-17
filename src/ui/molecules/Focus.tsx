import { onMount, type Accessor, type Component } from 'solid-js';

type Props<T extends Component<any>> = {
  focus: Accessor<boolean>;
  Compt: T;
};
export function Focus<T extends Component<any>>({
  Compt,
  focus,
}: Props<T>) {
  let ref: any;

  onMount(() => {
    if (focus()) ref?.focus();
  });

  return <Compt ref={ref} />;
}
