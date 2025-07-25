/* eslint-disable no-empty-pattern */

import { test as baseTest, expect, type Locator } from '@playwright/test';
import { resolve as _resolve, basename } from 'path';

export const resolve = (path: string) => {
  const _path = _resolve(process.cwd(), path);
  const filename = new RegExp(basename(path));

  return {
    path: _path,
    filename,
  };
};

export const expandId = <T extends number>(number: T) =>
  `field-${number}` as const;

export const downSeclect = (name: string) => {
  const down = name.endsWith(' ▼') ? name : `${name} ▼`;
  return down;
};

const void0 = () => void 0; // Placeholder for unused variables
const emptyStep = (name: string) => baseTest.step(name, void0);

const test = baseTest.extend<{
  emptyStep: (name: string) => Promise<undefined>;
}>({
  emptyStep: ({}, use) => use(emptyStep),
});

export { expect, test, type Locator };
