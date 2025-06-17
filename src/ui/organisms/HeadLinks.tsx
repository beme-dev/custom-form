import { Link as _Link } from '@tanstack/solid-router';
import { For, type Component } from 'solid-js';
import { createLinks } from '../../signals/links';
import type { PropsOf } from '../helpers/types';

type LinkProps = Omit<
  ReturnType<typeof createLinks>[number],
  'children' | 'search'
> &
  Partial<Pick<ReturnType<typeof createLinks>[number], 'search'>> &
  PropsOf<typeof _Link, 'children'>;

const Link: Component<LinkProps> = ({
  children,
  to,
  search = () => undefined,
}) => {
  return (
    <_Link
      to={to}
      search={search()}
      class={'text-gray-400 hover:underline hover:scale-105'}
      activeProps={{
        class:
          'text-yellow-900 font-semibold hover:no-underline! hover:scale-100! cursor-default text-xl',
      }}
    >
      {children}
    </_Link>
  );
};

const HeadLinks: Component = () => {
  const LINKS = createLinks({
    filter: value => value === '/projects' || !value.includes('projects'),
    formatChild: to => {
      const _children = to.charAt(1).toUpperCase() + to.slice(2);
      const children = _children === '' ? 'Home' : _children;
      return children;
    },
  });

  return (
    <header class="p-2 flex gap-2 text-lg justify-center w-full space-x-2">
      <For each={LINKS} children={Link} />
    </header>
  );
};

export default HeadLinks;
