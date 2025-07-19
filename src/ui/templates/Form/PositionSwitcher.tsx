import { type Component } from 'solid-js';

export const PositionSwitcher: Component<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick()}
      class='bg-white rounded-full ring-offset-2 ring-2 ring-orange-300  p-1 overflow-hidden shadow-xl shadow-gray-400 active:scale-90 transition-all duration-200 stroke-slate-600 ease-in-out hover:bg-gray-100 hover:rotate-[360deg] hover:stroke-orange-700 active:shadow-md hover:ring-3 hover:ring-slate-700 hover:ring-offset-0 cursor-pointer'
    >
      <svg
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
          style='fill: none; stroke: inherit; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;'
        ></path>
        <path
          id='primary-2'
          data-name='primary'
          d='M18.93,16A8,8,0,0,1,4,12'
          style='fill: none; stroke: inherit; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;'
        ></path>
        <polyline
          id='primary-3'
          data-name='primary'
          points='5 3 5 8 10 8'
          style='fill: none; stroke: inherit; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;'
        ></polyline>
        <polyline
          id='primary-4'
          data-name='primary'
          points='19 21 19 16 14 16'
          style='fill: none; stroke: inherit; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;'
        ></polyline>
      </svg>
    </button>
  );
};
