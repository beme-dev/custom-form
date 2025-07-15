// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { cn } from '#cn/utils';
import {
  createSignal,
  For,
  Show,
  type Accessor,
  type Component,
} from 'solid-js';
import { Motion, Presence } from 'solid-motionone';
import clickOutside from '~/directives/clickOutside';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
clickOutside;

declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface Directives {
      clickOutside: () => void;
    }
  }
}

type Classes = Partial<Record<'container' | 'selector' | 'panel', string>>;
type Colors = Partial<
  Record<'accent' | 'hover' | 'selected' | 'bg', string>
>;

type Args<T extends Record<string, unknown>> = {
  name: string;
  data: T[];
  labelExtractor: (item?: T) => string;
  defaultValue?: T;
  equals?: (a: T, b: T) => boolean;
  icon: Component<{ selected: Accessor<boolean> }>;
  classes?: Classes;
  onChange?: (item: T) => void;
  colors?: Colors;
};

const DEFAULT_COLORS: Required<Colors> = {
  accent: '#f54a00',
  hover: '#f3f4f6',
  selected: '#e5e7eb',
  bg: '#ffffff',
};

const DEFAULT_CLASSES: Required<Classes> = {
  container: '',
  selector: '',
  panel: '',
};

export function MySelect<T extends Record<string, unknown>>({
  name,
  defaultValue,
  labelExtractor,
  data,
  equals = (a, b) => a === b,
  icon: Icon,
  onChange,
  classes,
  colors,
}: Args<T>) {
  const [opened, setOpened] = createSignal(false);
  const toggle = () => setOpened(value => !value);

  const [_current, _setCurrent] = createSignal(defaultValue);
  const current = () => _current() ?? data[0];
  const isSelected = (item: T) => {
    return equals(current(), item);
  };
  const setCurrent = (item: any) => _setCurrent(item);
  const _colors = { ...DEFAULT_COLORS, ...colors };
  const _classes = { ...DEFAULT_CLASSES, ...classes };

  return (
    <div
      class={cn(
        _classes.container,
        'flex flex-col min-w-xs h-10 relative',
      )}
      use:clickOutside={() => setOpened(false)}
    >
      <button
        class={cn(
          _classes.selector,
          'rounded-md p-2 border-2 flex justify-between items-center w-full',
        )}
        style={{
          'border-color': opened() ? _colors.accent : _colors.selected,
        }}
        onClick={toggle}
        aria-haspopup='listbox'
        aria-expanded={opened()}
        id={name}
        onKeyDown={e => {
          if (e.key === 'Escape' && opened()) {
            setOpened(false);
          } else if (
            (e.key === 'ArrowDown' || e.key === 'Enter') &&
            !opened()
          ) {
            setOpened(true);
          }
        }}
      >
        <span>{labelExtractor(current())}</span>
        <span class='ml-2'>{opened() ? '▲' : '▼'}</span>
      </button>
      <Presence>
        <Show when={opened()}>
          <Motion
            class={cn(_classes.panel, 'fixed mt-11 min-w-xs mx-auto z-20')}
            initial={{
              opacity: 0.5,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.25,
              easing: 'ease-in-out',
            }}
            exit={{
              opacity: 0,
            }}
            style={{
              height: 'auto',
            }}
          >
            <ul
              class='w-full max-h-60 border rounded shadow-lg overflow-auto'
              role='listbox'
              aria-labelledby={name}
              style={{
                'background-color': _colors.bg,
                'border-color': _colors.accent,
              }}
            >
              <For each={data}>
                {option => {
                  const selected = () => isSelected(option);

                  return (
                    <li
                      class='p-2 cursor-pointer'
                      style={{
                        'background-color': selected()
                          ? _colors.selected
                          : 'inherit',
                        'font-weight': selected() ? 'medium' : 'normal',
                      }}
                      role='option'
                      aria-selected={selected()}
                      tabIndex={0}
                      onClick={() => {
                        if (onChange) onChange(option);
                      }}
                      onmouseover={e => {
                        e.currentTarget.style.backgroundColor =
                          _colors.hover;
                      }}
                      onmouseleave={e => {
                        e.currentTarget.style.backgroundColor = 'inherit';
                      }}
                      onMouseDown={() => {
                        setCurrent(option);
                        setOpened(false);
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setCurrent(option);
                          if (onChange) onChange(option);
                        }
                      }}
                    >
                      <span children={labelExtractor(option)} />
                      <Icon selected={selected} />
                    </li>
                  );
                }}
              </For>
            </ul>
          </Motion>
        </Show>
      </Presence>
    </div>
  );
}
