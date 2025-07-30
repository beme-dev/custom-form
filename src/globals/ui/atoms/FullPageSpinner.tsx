import { type Component } from 'solid-js';

const FullPageSpinner: Component = () => {
  return (
    <div class='fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center z-50'>
      <div class='flex flex-col items-center space-y-4'>
        {/* Big rotating loader */}
        <div class='w-16 h-16 border-4 border-slate-400 border-t-orange-700 rounded-full animate-spinfast'></div>

        {/* Loading text */}
        <p class='text-lg font-medium text-gray-700'>Loading...</p>
      </div>
    </div>
  );
};

export default FullPageSpinner;
