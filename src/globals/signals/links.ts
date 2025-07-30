import { useRouter } from '@tanstack/solid-router';

type Filter = (value: string) => boolean;
type SearchFn = (to: string) => () => any;
type FormatFn = (to: string) => string;
type Args = {
  filter?: Filter;
  getSearch?: SearchFn;
  formatChild?: FormatFn;
};

export const createLinks = (args?: Args) => {
  const { flatRoutes } = useRouter();

  // #region Destructure maybe undefined object
  const { filter, getSearch, formatChild } = {
    filter: args?.filter ?? (() => true),
    getSearch: args?.getSearch ?? (() => () => undefined),
    formatChild: args?.formatChild ?? (value => value),
  } satisfies Args;
  // #endregion

  return flatRoutes
    .map<string>(({ fullPath }) => fullPath)
    .sort((a, b) => {
      if (a === '/') return -1; // Home should be first
      return a.localeCompare(b);
    })
    .filter(filter)
    .map(to => ({
      to,
      children: formatChild(to),
      search: getSearch(to),
    }));
};
