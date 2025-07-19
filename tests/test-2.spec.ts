import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/form');
  await expect(page.getByTestId('field-1')).toBeVisible();
  await page.getByTestId('field-1').click();
  // await page.getByRole('button', { name: /Texte/ }).click();
  await expect(page.getByRole('button', { name: 'Text ▼' })).toBeVisible();
  page.getByRole('button', { name: 'Text ▼' }).click();
  await expect(
    page.getByRole('option', { name: /Condition/ }),
  ).toBeVisible();
  page.getByRole('option', { name: /Condition/ }).click();
  await expect(
    page.getByRole('button', { name: 'Conditional ▼' }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: '🚀 Charger mes données CSV' })
    .click();
  await page
    .getByLabel('Importation de données CSV')
    .locator('div')
    .filter({ hasText: '📊Glissez-déposez votre' })
    .nth(2)
    .click();
  // await expect(page.getByText(/Conditionnel/)).toBeVisible();
  await page.setInputFiles('input[type="file"]', [
    'X:/github/WORKS/Nouveau dossier/custom-form/public/countries_cities_districts.csv',
  ]);
});
