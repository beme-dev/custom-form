import {
  DefaultError,
  DefaultNotFound,
  DefaultPending,
} from '#atoms/defaults';
import { createRouter as createTanStackRouter } from '@tanstack/solid-router';
import { routeTree } from './routeTree.gen';

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultErrorComponent: DefaultError,
    defaultNotFoundComponent: DefaultNotFound,
    defaultPendingComponent: DefaultPending,
    scrollRestoration: true,
  });

  return router;
}

declare module '@tanstack/solid-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
