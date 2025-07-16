import { type Component } from 'solid-js';

export const PositionSwitcher: Component<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick()}
      class='bg-white rounded-full p-1 overflow-hidden shadow-lg shadow-gray-400 active:scale-75 transition-transform duration-200 hover:bg-gray-100 hover:rotate-[360deg] hover:shadow-md cursor-pointer'
    >
      <svg
        fill='#000000'
        width='800px'
        height='800px'
        viewBox='0 0 24 24'
        id='update-alt'
        data-name='Flat Line'
        xmlns='http://www.w3.org/2000/svg'
        class='size-8'
      >
        <path
          id='primary'
          d='M5.07,8A8,8,0,0,1,20,12'
          style='fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;'
        ></path>
        <path
          id='primary-2'
          data-name='primary'
          d='M18.93,16A8,8,0,0,1,4,12'
          style='fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;'
        ></path>
        <polyline
          id='primary-3'
          data-name='primary'
          points='5 3 5 8 10 8'
          style='fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;'
        ></polyline>
        <polyline
          id='primary-4'
          data-name='primary'
          points='19 21 19 16 14 16'
          style='fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;'
        ></polyline>
      </svg>
    </button>
  );
};
