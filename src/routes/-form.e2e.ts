import { expect, test } from '@playwright/test';
import { FILES } from '../fixtures/constants';

test.describe('', () => {});

test.beforeEach(async ({ page }, { project }) => {
  await page.goto('/form');
  console.log(`Navigating to /form on ${project.name}`);
});

test.describe('#01 => Fields usage', () => {
  test.beforeEach('Expand Accordion', async ({ page }) => {
    const loc_Expand = page
      .getByRole('button')
      .and(page.getByTestId('field-1'));

    await loc_Expand.click({
      timeout: 10_000,
    });
  });

  test('01 => Process for extract data from CSV', async ({ page }, {
    project,
    testId,
  }) => {
    const locSelect = page.getByRole('button', {
      name: 'Text ▼',
    });
    await expect(locSelect).toBeVisible();
    await locSelect.click();

    const locOptionConditional = page.getByRole('option', {
      name: /Condition/,
    });
    await expect(locOptionConditional).toBeVisible();
    await locOptionConditional.click();

    await expect(
      page.getByRole('button', { name: 'Conditional ▼' }),
    ).toBeVisible();

    await page
      .getByRole('button', { name: '🚀 Charger mes données CSV' })
      .click();

    await expect(
      page
        .getByLabel('Importation de données CSV')
        .locator('div')
        .filter({ hasText: '📊Glissez-déposez votre' })
        .nth(2),
    ).toBeVisible();

    const file = FILES.csv.countries_cities_districts;

    await page.setInputFiles('input[type="file"]', [file.path]);

    await page.getByLabel('Dismiss').click();

    await expect(page.getByText(file.filename)).toHaveCount(2, {
      timeout: 300,
    });

    await page.waitForTimeout(1500);

    await expect(page.getByText(file.filename)).toBeVisible({
      timeout: 5000,
    });

    await page.getByRole('button', { name: '=>' }).click();

    const pagee = page.getByText(/Conditionnel à 3 niveaux/);
    await expect(pagee).not.toBeAttached({ timeout: 0, attached: false });

    await expect(pagee).toBeVisible({ timeout: 1000 });

    console.log('Project:', project.name);
    console.log('Test ID:', testId);
    console.log('Tests completed successfully!');
  });
});
