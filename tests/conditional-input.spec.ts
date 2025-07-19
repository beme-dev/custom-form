import { expect, test } from '@playwright/test';
import path from 'path';

test.describe('ConditionalInput Component Tests', () => {
  test('should display nested selectors correctly', async ({ page }) => {
    await page.goto('/form');

    // Cliquer sur le bouton d'ajout de champ
    await page.click('button:has-text("Ajouter un champ")');

    // Ouvrir l'accordéon
    await page.click('.solid-headlessui-accordion-trigger');

    // Saisir un nom de question
    await page.fill(
      'textarea[placeholder*="Question"]',
      'Sélection géographique',
    );

    // Sélectionner le type de champ "conditional"
    await page.selectOption('select', { value: 'conditional' });

    // Vérifier que le bouton pour charger les données CSV apparaît
    await expect(
      page.locator('text=🚀 Charger mes données CSV'),
    ).toBeVisible();

    // Importer le fichier CSV
    const filePath = path.join(__dirname, 'fixtures', 'test-data.csv');

    // Cliquer sur le bouton pour ouvrir la boîte de dialogue
    await page.click('text=🚀 Charger mes données CSV');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('.dropzone-area');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);

    // Attendre que la boîte de dialogue se ferme
    await expect(
      page.locator('text=Importation de données CSV'),
    ).not.toBeVisible({ timeout: 10000 });

    // Aller à la vue du formulaire utilisateur
    await page.click('button:has-text("=>")');

    // Cliquer sur le bouton de basculement pour voir les champs du formulaire
    await page.click('.position-switcher', { force: true });

    // Vérifier que les sélecteurs conditionnels sont affichés
    await expect(
      page.locator('text=Sélection géographique'),
    ).toBeVisible();
    await expect(
      page.locator('text=Conditionnel à 3 niveaux'),
    ).toBeVisible();

    // Tester le premier niveau de sélection (pays)
    await expect(page.locator('text=#01 - pays')).toBeVisible();

    // Sélectionner "France"
    await page.selectOption('select >> nth=0', 'France');

    // Vérifier que le second niveau apparaît avec les villes françaises
    await expect(page.locator('text=#02 - ville')).toBeVisible();
    await expect(page.locator('select >> nth=1')).toContainText('Paris');
    await expect(page.locator('select >> nth=1')).toContainText('Lyon');

    // Sélectionner "Lyon"
    await page.selectOption('select >> nth=1', 'Lyon');

    // Vérifier que le troisième niveau apparaît avec les quartiers lyonnais
    await expect(page.locator('text=#03 - quartier')).toBeVisible();
    await expect(page.locator('select >> nth=2')).toContainText(
      'Croix-Rousse',
    );
    await expect(page.locator('select >> nth=2')).toContainText(
      'Confluence',
    );

    // Changer le premier niveau pour "Belgique"
    await page.selectOption('select >> nth=0', 'Belgique');

    // Vérifier que le second niveau change pour les villes belges
    await expect(page.locator('select >> nth=1')).toContainText(
      'Bruxelles',
    );
    await expect(page.locator('select >> nth=1')).toContainText('Anvers');

    // Sélectionner "Bruxelles"
    await page.selectOption('select >> nth=1', 'Bruxelles');

    // Vérifier que le troisième niveau change pour les quartiers bruxellois
    await expect(page.locator('select >> nth=2')).toContainText(
      'Grand-Place',
    );
    await expect(page.locator('select >> nth=2')).toContainText('Ixelles');
  });

  test('should reset selectors when changing parent selection', async ({
    page,
  }) => {
    await page.goto('/form');

    // Ajouter un champ et importer le CSV
    await page.click('button:has-text("Ajouter un champ")');
    await page.click('.solid-headlessui-accordion-trigger');
    await page.fill(
      'textarea[placeholder*="Question"]',
      'Test de réinitialisation',
    );
    await page.selectOption('select', { value: 'conditional' });

    await page.click('text=🚀 Charger mes données CSV');

    const filePath = path.join(__dirname, 'fixtures', 'test-data.csv');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('.dropzone-area');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);

    // Aller à la vue du formulaire utilisateur
    await expect(page.locator('text=Fichier importé :')).toBeVisible({
      timeout: 5000,
    });
    await page.click('button:has-text("=>")');
    await page.click('.position-switcher', { force: true });

    // Sélectionner "France"
    await page.selectOption('select >> nth=0', 'France');

    // Sélectionner "Paris"
    await page.selectOption('select >> nth=1', 'Paris');

    // Sélectionner "Montmartre"
    await page.selectOption('select >> nth=2', 'Montmartre');

    // Revenir à la sélection du pays et changer pour "Belgique"
    await page.selectOption('select >> nth=0', 'Belgique');

    // Vérifier que le second niveau est réinitialisé avec les villes belges
    await expect(page.locator('select >> nth=1')).not.toContainText(
      'Paris',
    );
    await expect(page.locator('select >> nth=1')).toContainText(
      'Bruxelles',
    );

    // Vérifier que le troisième niveau a disparu ou est désactivé
    await expect(
      page.locator('select >> nth=2:not([disabled])'),
    ).toHaveCount(0);
  });
});
