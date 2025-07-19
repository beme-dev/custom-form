import type {
  ErrorRouteComponent,
  NotFoundRouteComponent,
  RouteComponent,
} from '@tanstack/solid-router';

export const DefaultError: ErrorRouteComponent = ({ error, info }) => {
  console.log('Error:', error.stack);
  return (
    <div class='w-full h-full flex flex-col space-y-4 p-4 bg-red-100 rounded-xl border-2 border-red-600'>
      <h2 class='text-red-700 text-md font-semibold'>Error :</h2>
      <pre class='overflow-x-auto'>{error.stack}</pre>
      <h3 class='text-red-600 text-sm'>Info :</h3>
      <pre class='text-sm text-slate-500'>
        {JSON.stringify(info, null, 2)}
      </pre>
    </div>
  );
};

export const DefaultNotFound: NotFoundRouteComponent = ({ data }) => {
  return (
    <div class='w-full h-full flex flex-col space-y-4 p-4 bg=red=100 rounded-lg border=2 border-red-600'>
      <h2 class='text-red-700 text-md font-semibold'>Not Found :</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export const DefaultPending: RouteComponent = () => {
  return <div>Loading...</div>;
};
