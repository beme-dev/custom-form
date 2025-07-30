import type { PolymorphicProps } from '@kobalte/core/polymorphic';
import type {
  ToggleGroupItemProps,
  ToggleGroupRootProps,
} from '@kobalte/core/toggle-group';
import { ToggleGroup as ToggleGroupPrimitive } from '@kobalte/core/toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';
import type { Accessor, ParentProps, ValidComponent } from 'solid-js';
import {
  createContext,
  createMemo,
  splitProps,
  useContext,
} from 'solid-js';
import { cn } from '~/globals/ui/cn/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-3',
        sm: 'h-8 px-2',
        lg: 'h-10 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const ToggleGroupContext =
  createContext<Accessor<VariantProps<typeof toggleVariants>>>();

const useToggleGroup = () => {
  const context = useContext(ToggleGroupContext);

  if (!context) {
    throw new Error(
      '`useToggleGroup`: must be used within a `ToggleGroup` component',
    );
  }

  return context;
};

type toggleGroupProps<T extends ValidComponent = 'div'> = ParentProps<
  ToggleGroupRootProps<T> &
    VariantProps<typeof toggleVariants> & {
      class?: string;
    }
>;

export const ToggleGroup = <T extends ValidComponent = 'div'>(
  props: PolymorphicProps<T, toggleGroupProps<T>>,
) => {
  const [local, rest] = splitProps(props as toggleGroupProps, [
    'class',
    'children',
    'size',
    'variant',
  ]);

  const value = createMemo<VariantProps<typeof toggleVariants>>(() => ({
    size: local.size,
    variant: local.variant,
  }));

  return (
    <ToggleGroupPrimitive
      class={cn('flex items-center justify-center gap-1', local.class)}
      {...rest}
    >
      <ToggleGroupContext.Provider value={value}>
        {local.children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
};

type toggleGroupItemProps<T extends ValidComponent = 'button'> =
  ToggleGroupItemProps<T> & {
    class?: string;
  };

export const ToggleGroupItem = <T extends ValidComponent = 'button'>(
  props: PolymorphicProps<T, toggleGroupItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as toggleGroupItemProps, [
    'class',
  ]);
  const context = useToggleGroup();

  return (
    <ToggleGroupPrimitive.Item
      class={cn(
        toggleVariants({
          variant: context().variant,
          size: context().size,
        }),
        local.class,
      )}
      {...rest}
    />
  );
};
