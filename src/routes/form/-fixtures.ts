/* eslint-disable no-empty-pattern */

import { test as baseTest, expect, type Locator } from '#e2e_fixtures';
import { TEST_IDS } from '~/constants/test';
import type { Lang } from '~/services/main';
import { FILES } from '../../fixtures/e2e/constants';

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
