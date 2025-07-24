import { downSeclect, expandId, type Locator } from '#e2e_fixtures';
import { test as baseTest, expect } from '../-fixtures';

const test = baseTest.extend<{
  locSelect: (name: string) => Locator;
  expand: () => Promise<void>;
  selectOption: (name: string) => Promise<void>;
}>({
  locSelect: ({ page }, use) => {
    const func = (_name: string) => {
      const name = downSeclect(_name);
      return page.getByRole('button', { name });
    };

    return use(func);
  },
  selectOption: async ({ page, locSelect }, use) => {
    const func = async (name: string) => {
      const locOption = page.getByRole('option', { name });
      await expect(locOption).toBeVisible();
      await locOption.click();
      await expect(locSelect(name)).toBeVisible({
        timeout: 1500,
      });
    };

    return use(func);
  },

  expand: async ({ page }, use) => {
    const func = async () => {
      const locExpand = page.getByTestId(expandId(1));
      await locExpand.click({
        timeout: 10_000,
      });
    };

    return use(func);
  },
});

export { expect, test };
