import { createSignal } from 'solid-js';

type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;

/**
 *  Creates a debounced signal that updates the value after a specified delay.
 *  The signal will reset to the start value after the delay if no new value is set.
 * @param start  - The initial value of the signal
 * @param end  - The value to set when the debounce function is called
 * @param ms - The debounce time in milliseconds (default is 500ms)
 * @returns A tuple containing:
 *   - A signal getter function
 *   - A debounce function that updates the signal value and resets the debounce timer
 * @example
 * ```tsx
 * const [value, debounce] = debounceSignal("initial", "updated", 300);
 * debounce(); // Rapidly set the value to "updated"
 * // after 300ms of inactivity, reset to "initial"
 * ```
 */
export const debounceSignal = <T extends Primitive | object>(
  start: T,
  end: T,
  ms: number = 500,
) => {
  const [signal, _setSignal] = createSignal(start);
  const timeout = () => setTimeout(() => _setSignal(start as any), ms);

  const debounce = () => {
    _setSignal(end as any);
    timeout();
  };

  return [signal, debounce] as const;
};

/**
 * Creates a debounced signal with the specified initial value and debounce time.
 *
 * @template T - The type of the signal value, which can be a primitive or object
 * @param  initial - The initial value of the signal
 * @param  [ms=500] - The debounce time in milliseconds
 * @returns - A tuple containing:
 *   - A signal getter function
 *   - A debounce function that updates the signal value and resets the debounce timer
 *
 * @example
 * ```tsx
 * const [value, setValue] = debounceSignal2("initial", 300);
 * // Rapidly calling setValue and update after 300ms of inactivity
 * setValue("new value");
 * ```
 */
export function debounceSignal2<T extends Primitive | object>(
  initial: T,
  ms: number = 500,
) {
  const [signal, _setSignal] = createSignal(initial);
  const timeout = () => setTimeout(() => _setSignal(initial as any), ms);

  const debounce = (data: T) => {
    _setSignal(data as any);
    timeout();
  };

  return [signal, debounce] as const;
}

/**
 * Creates a debounced boolean signal that toggles between true and false.
 * @param ms - The debounce delay in milliseconds (defaults to 500ms)
 * @param initial - The initial boolean value of the signal (defaults to true)
 * @returns A tuple containing the signal accessor function and the debounce trigger function
 */
export const debounceBool = (ms = 500, initial = true) => {
  return debounceSignal(initial, !initial, ms);
};
