export const DEFAULT_PROPS = {
  maxFileSize: 10, // 10MB par défaut
  placeholder:
    'Glissez-déposez votre fichier CSV ici ou cliquez pour sélectionner',
  acceptMessage: 'Seuls les fichiers CSV sont acceptés',
  errorMessage: 'Erreur lors du traitement du fichier',
};

export const SEPARATOR = ';' as const;

export const LINE_BREAK = '\n' as const;

export const EXTENSIONS = {
  csv: '.csv',
  type: 'text/csv',
};

export const COLUMN_WIDTH = 90; // Largeur maximale d'une colonne en pixels

export const MAX_COLUMN_WIDTH_FACTOR = 2.5; // Facteur pour la largeur maximale d'une colonne

export const MIN_COLUMN_WIDTH_FACTOR = 0.7; // Facteur de largeur minimale d'une colonne en pixels
