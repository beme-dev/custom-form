import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/form');
  await page.getByRole('button', { name: 'X Champ 1 : **** Arrow' }).click();
  await page.getByRole('button', { name: 'Texte ▼' }).click();
  await page.getByText('Conditionnel').click();
  await page.getByRole('button', { name: '🚀 Charger mes données CSV' }).click();
  await page.getByLabel('Importation de données CSV').locator('div').filter({ hasText: '📊Glissez-déposez votre' }).nth(2).click();
  await page.getByRole('dialog', { name: 'Importation de données CSV' }).setInputFiles('countries_cities_districts.csv');
  await page.locator('.fixed').first().click();


});
