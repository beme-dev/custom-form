import { expect, test } from '@playwright/test';

test('01 => Process for extract data from CSV', async ({ page }) => {
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
    'X:/github/WORKS/Nouveau dossier/custom-form/src/__tests__/fixtures/countries_cities_districts.csv',
  ]);

  await page.getByLabel('Dismiss').click();

  await page.waitForTimeout(1000); // Wait for the file to be processed

  await expect(
    page.getByText(/countries_cities_districts.csv/),
  ).toBeVisible();

  await page.getByRole('button', { name: '=>' }).click();

  const pagee = page.getByText(/Conditionnel à 3 niveaux/);
  await expect(pagee).not.toBeAttached({ timeout: 0, attached: false });

  // Vérifier que le champ conditionnel est visible
  await expect(pagee).toBeAttached({ timeout: 1000 });
  await expect(pagee).toBeVisible({ timeout: 0 });

  console.log('Test completed successfully!');
});
