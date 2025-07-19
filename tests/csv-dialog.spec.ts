import { expect, test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('CSVDialog Component Tests', () => {
  test('should open dialog and allow file selection', async ({ page }) => {
    await page.goto('/form');

    // Ajouter un champ
    await page.click('button:has-text("Ajouter un champ")');
    await page.click('.solid-headlessui-accordion-trigger');

    // Sélectionner le type de champ "conditional"
    await page.selectOption('select', { value: 'conditional' });

    // Vérifier que le bouton CSV est visible
    const csvButton = page.locator('text=🚀 Charger mes données CSV');
    await expect(csvButton).toBeVisible();

    // Cliquer sur le bouton pour ouvrir la boîte de dialogue
    await csvButton.click();

    // Vérifier les éléments de la boîte de dialogue
    await expect(
      page.locator('text=Importation de données CSV'),
    ).toBeVisible();
    await expect(
      page.locator('text=Glissez-déposez votre fichier CSV'),
    ).toBeVisible();

    // Vérifier que la zone de dépôt est visible
    await expect(page.locator('.dropzone-area')).toBeVisible();
  });

  test('should display preview data after file upload', async ({
    page,
  }) => {
    await page.goto('/form');

    // Ajouter un champ et ouvrir le dialogue
    await page.click('button:has-text("Ajouter un champ")');
    await page.click('.solid-headlessui-accordion-trigger');
    await page.selectOption('select', { value: 'conditional' });
    await page.click('text=🚀 Charger mes données CSV');

    // Charger un fichier
    const filePath = path.join(__dirname, 'fixtures', 'test-data.csv');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('.dropzone-area');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);

    // Vérifier que l'aperçu des données est affiché
    await expect(page.locator('table')).toBeVisible({ timeout: 5000 });

    // Vérifier que les en-têtes sont affichés
    await expect(page.locator('th:has-text("pays")')).toBeVisible();
    await expect(page.locator('th:has-text("ville")')).toBeVisible();
    await expect(page.locator('th:has-text("quartier")')).toBeVisible();

    // Vérifier que certaines données sont affichées
    await expect(page.locator('td:has-text("France")')).toBeVisible();
    await expect(page.locator('td:has-text("Paris")')).toBeVisible();

    // Vérifier que le nom du fichier est affiché
    await expect(page.locator('text=test-data.csv')).toBeVisible();
  });

  test('should reject files with wrong extension', async ({ page }) => {
    await page.goto('/form');

    // Créer un fichier texte temporaire
    const textFilePath = path.join(__dirname, 'fixtures', 'test-file.txt');
    fs.writeFileSync(
      textFilePath,
      'Ceci est un fichier texte, pas un CSV',
    );

    // Ajouter un champ et ouvrir le dialogue
    await page.click('button:has-text("Ajouter un champ")');
    await page.click('.solid-headlessui-accordion-trigger');
    await page.selectOption('select', { value: 'conditional' });
    await page.click('text=🚀 Charger mes données CSV');

    // Télécharger le fichier texte
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('.dropzone-area');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(textFilePath);

    // Vérifier que le message d'erreur apparaît
    await expect(
      page.locator('text=Le fichier doit être au format CSV'),
    ).toBeVisible({ timeout: 5000 });

    // Nettoyer le fichier temporaire
    fs.unlinkSync(textFilePath);
  });

  test('should close dialog automatically after timeout', async ({
    page,
  }) => {
    test.setTimeout(15000); // Augmenter le délai pour ce test spécifique

    await page.goto('/form');

    // Ajouter un champ et ouvrir le dialogue
    await page.click('button:has-text("Ajouter un champ")');
    await page.click('.solid-headlessui-accordion-trigger');
    await page.selectOption('select', { value: 'conditional' });
    await page.click('text=🚀 Charger mes données CSV');

    // Charger un fichier
    const filePath = path.join(__dirname, 'fixtures', 'test-data.csv');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('.dropzone-area');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);

    // Vérifier que l'aperçu est affiché
    await expect(page.locator('table')).toBeVisible();

    // Simuler le déplacement du curseur en dehors de la zone de dialogue
    await page.mouse.move(10, 10);

    // Attendre que la boîte de dialogue se ferme automatiquement (le timeout est de 3000ms)
    await expect(
      page.locator('text=Importation de données CSV'),
    ).not.toBeVisible({ timeout: 10000 });

    // Vérifier que le nom du fichier reste affiché
    await expect(page.locator('text=Fichier importé :')).toBeVisible();
  });
});
