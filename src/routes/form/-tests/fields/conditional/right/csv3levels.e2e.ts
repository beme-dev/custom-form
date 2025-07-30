import { LANGS, translate, type Lang } from '#service';
import { expect, test } from '../../fixtures';

const fixture = (lang: Lang) => {
  return test(`Conditionnal - "${lang}"`, async ({
    page,
    emptyStep,
    FILES,
    locSelect: select,
    selectLang,
    selectOption,
    headless,
  }, { project }) => {
    const locSelect = select(
      translate('pages.form.selects.inputs.options.text')(lang),
    );

    const file = FILES.csv.countries_cities_districts;

    const locFile = page.getByText(file.filename);

    const inputsTitle = page.getByText(
      translate('pages.form.labels.conditional', {
        LEVEL: 3,
      })(lang),
    );

    const loadButtonText = translate(
      'pages.form.dropzones.csv.buttons.load',
    )(lang);

    const locInputFile = page
      .getByLabel(translate('pages.form.dropzones.csv.labels.title')(lang))
      .locator('div')
      .filter({
        hasText: translate('pages.form.dropzones.csv.labels.description')(
          lang,
        ),
      })
      .nth(2);

    await test.step('#01 => Select french', () => selectLang(lang));

    await test.step('#02 => Click on the select', async () => {
      await expect(locSelect).toBeVisible();
      await locSelect.click();
    });

    await test.step('#03 => Select conditional', () =>
      selectOption(
        translate('pages.form.selects.inputs.options.conditional')(lang),
      ));

    await test.step(`#04 => Click on "${loadButtonText}"`, async () => {
      await page.getByRole('button', { name: loadButtonText }).click();
    });

    await test.step('#05 => Verify CSV importation prompt', () =>
      expect(locInputFile).toBeVisible());

    await test.step('#06 => Upload CSV file', async () => {
      const fileChooserPromise = page.waitForEvent('filechooser');
      await locInputFile.click();

      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles([file.path]);
      await page.waitForTimeout(headless ? 200 : 500); // Wait for the file to be processed in headless mode
    });

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
};

test.describe('Conditional - CSV 3 levels', () => {
  LANGS.forEach(fixture);
});
