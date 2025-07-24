import { expect, test } from '../fixtures';

test('Conditionnal - "fr"', async ({
  page,
  emptyStep,
  FILES,
  locSelect: select,
  selectLang,
  selectOption,
}, { project }) => {
  const locSelect = select('Texte');

  const file = FILES.csv.countries_cities_districts;

  const locFile = page.getByText(file.filename);

  const inputsTitle = page.getByText(/Conditionnel à 3 niveaux/);


  await test.step('#01 => Select french', () => selectLang('fr'));

  await test.step('#02 => Click on the select', async () => {
    await expect(locSelect).toBeVisible();
    await locSelect.click();
  });

  await test.step('#03 => Select conditional', () =>
    selectOption('Conditionnel'));

  await test.step('#04 => Click on "Charger mes données CSV"', async () => {
    await page
      .getByRole('button', { name: '🚀 Charger mes données CSV' })
      .click();
  });

  await test.step('#05 => Verify CSV importation prompt', () =>
    expect(
      page
        .getByLabel('Importation de données CSV')
        .locator('div')
        .filter({ hasText: '📊Glissez-déposez votre' })
        .nth(2),
    ).toBeVisible());

  await test.step('#06 => Upload CSV file', () =>
    page.setInputFiles('input[type="file"]', [file.path]));

  await test.step('#07 => Dismiss importation prompt', () =>
    page.getByLabel('Dismiss').click());

  await test.step('#08 => Verify CSV file is displayed', async () => {
    const check = process.env?.PLAYWRIGHT_SLOMO === 'true';
    if (!check) {
      await expect(locFile).toHaveCount(2, {
        timeout: 0,
      });
    }

    await page.waitForTimeout(500);

    await expect(locFile).toBeVisible({
      timeout: 1500,
    });
  });

  await test.step('#09 => Register CSV file inside fields : (Click on "=>" button)', async () => {
    await page.getByRole('button', { name: '=>' }).click();
  });

  await test.step('#10 => Verify CSV file is registered', () =>
    expect(locFile).toBeVisible());

  await test.step('#11 => Verify inputs title is visible', async () => {
    await expect(inputsTitle).not.toBeAttached({
      timeout: 0,
      attached: false,
    });

    await expect(inputsTitle).toBeVisible({ timeout: 1000 });
  });

  emptyStep(
    `#12 => Test : Process for extract data from CSV with the device ${project.name} => All tests are completed successfully !`,
  );
});
