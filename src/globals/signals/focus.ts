import { createRoot, createSignal } from 'solid-js';

type FocusProps = {
  name: string;
  start?: number | null;
  length?: number | null;
};

export const [toFocus, setFocus] = createRoot(() =>
  createSignal({} as FocusProps),
);
