import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from '#cn/components/ui/resizable';
import { lang, reducer, send, translate } from '#service';
import {
  createSignal,
  mergeProps,
  Show,
  type Accessor,
  type Component,
  type ParentComponent,
} from 'solid-js';
import { Motion } from 'solid-motionone';
import { BlurLock } from '~/ui/atoms/BlurLock';
import { cn } from '~/ui/cn/utils';
import { Fields } from './Fields';
import { Inputs } from './Inputs';
import { ModifyFields } from './ModifyFields';
import { PositionSwitcher } from './PositionSwitcher';

const AddButton: Component = () => (
  <button
    class='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm active:border-2 active:border-blue-800 transition-colors duration-200 box-border'
    onClick={() => send('ADD')}
    type='submit'
  >
    {translate('pages.form.buttons.fields.add')(lang())}
  </button>
);

type _Presencer = ParentComponent<{ direction?: 'left' | 'right' }>;

const Presencer: _Presencer = props => {
  const { direction = 'left' } = props;

  return (
    <Motion
      initial={{
        x: direction === 'left' ? '50%' : '-50%',
        scale: 0.4,
        opacity: 0,
      }}
      animate={{
        x: '0%',
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.25,
          easing: 'ease-in-out',
        },
      }}
    >
      {props.children}
    </Motion>
  );
};

const _Inputs: Component<{ direction?: 'left' | 'right' }> = ({
  direction,
}) => (
  <Presencer direction={direction}>
    <Inputs />
  </Presencer>
);

const _Fields: Component<{ direction?: 'left' | 'right' }> = ({
  direction,
}) => (
  <Presencer direction={direction}>
    <Fields />
    <AddButton />
  </Presencer>
);

const SwiperLeft: Component<{
  switcher: Accessor<boolean>;
  toggle: () => any;
}> = ({ switcher, toggle }) => (
  <>
    <Show when={switcher()} fallback={<_Inputs />}>
      <_Fields />
    </Show>
    <div class='absolute bg-transparent right-0 top-0 translate-x-1/2 z-50'>
      <PositionSwitcher onClick={toggle} />
    </div>
  </>
);

const SwiperRight: Component<{
  switcher: Accessor<boolean>;
}> = ({ switcher }) => (
  <Show when={switcher()} fallback={<_Inputs direction='right' />}>
    <_Fields direction='right' />
  </Show>
);

const useSwitcher = () => {
  const [switcher, setSwitcher] = createSignal(true);
  const toggle = () => setSwitcher(val => !val);
  const rSwitcher = () => !switcher();
  const inRegistration = reducer(c => c.context.states?.fields);

  return { switcher, rSwitcher, toggle, inRegistration };
};

export const SwitchPanels: Component = () => {
  const { switcher, rSwitcher, toggle, inRegistration } = useSwitcher();
  const propsL = mergeProps({ switcher, toggle });
  const power = 3.6;

  return (
    <Resizable class='flex w-full shadow rounded mt-8 p-2 min-h-[80vh]'>
      <ResizablePanel
        class={cn(
          'relative',
          switcher() ? 'min-w-lg px-6 py-2 bg-white' : 'w-1/3',
        )}
      >
        <SwiperLeft {...propsL} />

        <BlurLock
          show={inRegistration(c => c !== 'idle' && switcher())}
          power={power}
        >
          <ModifyFields />
        </BlurLock>
      </ResizablePanel>
      <ResizableHandle
        as='div'
        class='cursor-col-resize w-1 bg-slate-400 hover:bg-orange-700 z-30 shadow-xl shadow-gray-900 active:scale-x-90 transition-all duration-200 ease-in-out'
      />
      <ResizablePanel
        class={cn(
          'relative',
          rSwitcher() ? 'min-w-lg px-6 py-2 bg-white' : 'w-1/3',
        )}
      >
        <SwiperRight switcher={rSwitcher} />
        <BlurLock
          show={inRegistration(c => c !== 'idle' && rSwitcher())}
          power={power}
        >
          <ModifyFields />
        </BlurLock>
      </ResizablePanel>
    </Resizable>
  );
};
