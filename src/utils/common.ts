import { deepEqual as __deepEqual } from '@bemedev/app-ts/lib/utils';

export const deepEqual = <T>(a: T, b: T): boolean => {
  return __deepEqual(a, b);
};
