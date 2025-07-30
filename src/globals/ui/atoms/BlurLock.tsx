import { type Accessor, type ParentComponent, Show } from 'solid-js';
import { Motion, Presence } from 'solid-motionone';

export const BlurLock: ParentComponent<{
  show: Accessor<boolean>;
  power?: number;
}> = ({ show, children, power }) => {
  const blur = `blur(${power || 3}px)`;
  return (
    <Presence>
      <Show when={show()}>
        <Motion
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, easing: 'ease-in' }}
          exit={{ opacity: 0, scale: 0.7 }}
          class='absolute -inset-2 bg-slate-900/5 z-10 hover:bg-slate-500/5 rounded-lg content-center text-7xl select-none cursor-not-allowed transition-colors duration-200 ease-out mask-size-[auto_100px]'
          style={{ 'backdrop-filter': blur }}
        >
          {children}
        </Motion>
      </Show>
    </Presence>
  );
};
