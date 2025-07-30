import { reduceComponent } from '#molecules/reducer';
import { ChromePicker } from 'solid-color';
import { createSignal } from 'solid-js';

const _ColorPicker = reduceComponent(ChromePicker, {
  defaultView: 'rgb',
});

export const ColorPicker: typeof _ColorPicker = () => {
  const [color, setColor] = createSignal('red');

  return (
    <div class='py-3 cursor-default'>
      <_ColorPicker
        width={250}
        className='rounded-full mx-auto my-3'
        color={color()}
        onChange={c => setColor(c.hex)}
      />
    </div>
  );
};
