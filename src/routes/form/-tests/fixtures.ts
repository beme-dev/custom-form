/* eslint-disable no-empty-pattern */

import { TEST_IDS } from '#constants/test';
import {
  test as baseTest,
  expect,
  FILES,
  type Locator,
} from '#fixtures/e2e';
import type { Lang } from '#service';

const test = baseTest.extend<{
  FILES: typeof FILES;
  locLang: Locator;
  selectLang: (name: Lang) => Promise<void>;
}>({
  page: async ({ page }, use) => {
    await page.goto('/form');
    await use(page);
  },
  FILES: ({}, use) => use(FILES),
  locLang: async ({ page }, use) => {
    const locLang = page.getByTestId(TEST_IDS.lang);
    await expect(locLang).toBeVisible();
    return use(locLang);
  },
  selectLang: async ({ page, locLang }, use) => {
    const func = async (name: Lang) => {
      await locLang.click();
      const locLangOption = page.getByRole('option', { name });
      await expect(locLangOption).toBeVisible();
      await locLangOption.click();
      await page.waitForTimeout(500); // Wait for the page to update
      await expect(locLang).toHaveText(name);
    };

    return use(func);
  },
});

export { expect, test };
