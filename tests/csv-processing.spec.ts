import { expect, test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('CSV Processing Tests', () => {
  test('should upload and process a CSV file properly', async ({
    page,
  }) => {
    await page.goto('/form');

    // Cliquer sur le bouton d'ajout de champ
    await page.click('button:has-text("Ajouter un champ")');

    // Ouvrir l'accordéon
    await page.click('.solid-headlessui-accordion-trigger');

    // Sélectionner le type de champ "conditional"
    await page.selectOption('select', { value: 'conditional' });

    // Vérifier que le bouton pour charger les données CSV apparaît
    const csvButton = page.locator('text=🚀 Charger mes données CSV');
    await expect(csvButton).toBeVisible();

    // Cliquer sur le bouton pour ouvrir la boîte de dialogue
    await csvButton.click();

    // Vérifier que la boîte de dialogue est visible
    await expect(
      page.locator('text=Importation de données CSV'),
    ).toBeVisible();

    // Préparer le fichier à télécharger
    const filePath = path.join(__dirname, 'fixtures', 'test-data.csv');

    // Configurer l'élément d'entrée de fichier
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('.dropzone-area');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);

    // Vérifier que le fichier a été chargé avec succès
    await expect(page.locator('text=Fichier importé :')).toBeVisible({
      timeout: 5000,
    });

    // Vérifier que les données sont correctement affichées
    await expect(
      page.locator('text=Conditionnel à 3 niveaux'),
    ).toBeVisible({ timeout: 5000 });

    // Vérifier la présence des sélecteurs (pays, ville, quartier)
    await expect(page.locator('text=#01 - pays')).toBeVisible();

    // Sélectionner "France" dans le premier sélecteur
    await page.selectOption('select >> nth=0', 'France');

    // Vérifier que le deuxième sélecteur (villes de France) apparaît
    await expect(page.locator('text=#02 - ville')).toBeVisible();
    await expect(page.locator('select >> nth=1')).toContainText('Paris');
    await expect(page.locator('select >> nth=1')).toContainText('Lyon');

    // Sélectionner "Paris" dans le deuxième sélecteur
    await page.selectOption('select >> nth=1', 'Paris');

    // Vérifier que le troisième sélecteur (quartiers de Paris) apparaît
    await expect(page.locator('text=#03 - quartier')).toBeVisible();
    await expect(page.locator('select >> nth=2')).toContainText(
      'Montmartre',
    );
    await expect(page.locator('select >> nth=2')).toContainText(
      'Bastille',
    );
  });

  test('should show error for invalid CSV file format', async ({
    page,
  }) => {
    await page.goto('/form');

    // Créer un fichier CSV invalide temporaire
    const invalidFilePath = path.join(
      __dirname,
      'fixtures',
      'invalid-test-data.csv',
    );
    fs.writeFileSync(
      invalidFilePath,
      'pays,ville\nFrance,Paris,Montmartre\n',
    );

    // Cliquer sur le bouton d'ajout de champ
    await page.click('button:has-text("Ajouter un champ")');

    // Ouvrir l'accordéon
    await page.click('.solid-headlessui-accordion-trigger');

    // Sélectionner le type de champ "conditional"
    await page.selectOption('select', { value: 'conditional' });

    // Cliquer sur le bouton pour ouvrir la boîte de dialogue
    await page.click('text=🚀 Charger mes données CSV');

    // Télécharger le fichier invalide
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('.dropzone-area');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(invalidFilePath);

    // Vérifier que le message d'erreur apparaît
    await expect(
      page.locator(
        "text=La ligne 1 ne correspond pas au nombre d'en-têtes",
      ),
    ).toBeVisible({ timeout: 5000 });

    // Nettoyer le fichier temporaire
    fs.unlinkSync(invalidFilePath);
  });

  test('should handle empty CSV file correctly', async ({ page }) => {
    await page.goto('/form');

    // Créer un fichier CSV vide temporaire
    const emptyFilePath = path.join(
      __dirname,
      'fixtures',
      'empty-test-data.csv',
    );
    fs.writeFileSync(emptyFilePath, '');

    // Cliquer sur le bouton d'ajout de champ
    await page.click('button:has-text("Ajouter un champ")');

    // Ouvrir l'accordéon
    await page.click('.solid-headlessui-accordion-trigger');

    // Sélectionner le type de champ "conditional"
    await page.selectOption('select', { value: 'conditional' });

    // Cliquer sur le bouton pour ouvrir la boîte de dialogue
    await page.click('text=🚀 Charger mes données CSV');

    // Télécharger le fichier vide
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('.dropzone-area');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(emptyFilePath);

    // Vérifier que le message d'erreur apparaît
    await expect(page.locator('text=Le fichier CSV est vide')).toBeVisible(
      { timeout: 5000 },
    );

    // Nettoyer le fichier temporaire
    fs.unlinkSync(emptyFilePath);
  });
});
