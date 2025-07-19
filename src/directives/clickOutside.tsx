import { onCleanup } from 'solid-js';

export default function clickOutside(
  element: HTMLElement,
  accessor: () => (() => void) | undefined,
) {
  const onClick = (e: MouseEvent) =>
    !element.contains(e.target as Node) && accessor()?.();
  document.body.addEventListener('click', onClick);

  onCleanup(() => document.body.removeEventListener('click', onClick));
}
