import {
  onMount,
  type Accessor,
  type Component,
  type ComponentProps,
} from 'solid-js';

export function forwardFocus(focus: Accessor<boolean>) {
  return <T extends Component<any>>(Compt: T) => {
    const out = (props: ComponentProps<T>) => {
      let ref: any;

      onMount(() => {
        if (focus()) ref?.focus();
      });

      return <Compt {...props} ref={ref} />;
    };

    return out;
  };
}
