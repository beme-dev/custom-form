import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from '#cn/components/ui/resizable';
import {
  createSignal,
  Show,
  type Accessor,
  type Component,
  type ParentComponent,
} from 'solid-js';
import { Motion } from 'solid-motionone';
import { translate } from '~/services/lang';
import { lang, send } from '~/services/main';
import { Fields } from './Fields';
import { Inputs } from './Inputs';
import { PositionSwitcher } from './PositionSwitcher';

const AddButton: Component = () => (
  <button
    class='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm active:border-2 active:border-blue-800 transition-colors duration-200 box-border'
    onClick={() => send('ADD')}
  >
    {translate('pages.form.buttons.addField')(lang())}
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

const SwiperTop: Component<{
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

const SwiperBottom: Component<{
  switcher: Accessor<boolean>;
}> = ({ switcher }) => (
  <Show when={switcher()} fallback={<_Inputs direction='right' />}>
    <_Fields direction='right' />
  </Show>
);

const useSwitcher = () => {
  const [switcher, setSwitcher] = createSignal(true);
  const toggle = () => setSwitcher(val => !val);
  const rSwicher = () => !switcher();
  return { switcher, rSwicher, toggle };
};

export const SwitchPanels: Component = () => {
  const { switcher, rSwicher, toggle } = useSwitcher();

  return (
    <Resizable class='flex w-full shadow rounded mt-8  p-2 min-h-[80vh]'>
      <ResizablePanel
        class={
          switcher()
            ? 'min-w-lg px-6 py-2 bg-white relative'
            : 'w-1/3 relative'
        }
      >
        <SwiperTop switcher={switcher} toggle={toggle} />
      </ResizablePanel>
      <ResizableHandle
        as='div'
        class='cursor-col-resize w-1 bg-slate-400 hover:bg-orange-700'
      />
      <ResizablePanel
        class={!switcher() ? 'min-w-lg px-6 py-2 bg-white' : 'w-1/3'}
      >
        <SwiperBottom switcher={rSwicher} />
      </ResizablePanel>
    </Resizable>
  );
};
