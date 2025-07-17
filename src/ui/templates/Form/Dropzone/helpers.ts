//TODO: Merge conditions
//TODO: Create the conditonal Input

import type { types } from '@bemedev/types';
import { EXTENSIONS, LINE_BREAK, SEPARATOR } from './constants';
import type { Conditions, CSVData, ParsedCSV } from './types';

type ParseCSV_F = (text: string) => ParsedCSV;

const verifySize = (file: File, MAX: number) => {
  const sizeInMB = file.size / (1024 * 1024); // Convertir la taille en Mo
  if (sizeInMB > MAX) {
    throw new Error(
      `Le fichier dépasse la taille maximale autorisée de ${MAX} Mo. Taille actuelle du fichier : ${sizeInMB.toFixed(
        2,
      )} Mo.`,
    );
  }
};

const verifyExtensions = (file: File) => {
  const extension = !file.name.toLowerCase().endsWith(EXTENSIONS.csv);
  const type = file.type !== EXTENSIONS.type;
  const check = extension && type;

  if (check) {
    const line1 = 'Le fichier doit être au format CSV',
      line2 = `(avoir l'extension "${EXTENSIONS.csv}" ou de type "${EXTENSIONS.type}")`;

    const error = [line1, line2].join(' ');
    throw new Error(error);
  }
};

export const verifyFile = (file: File, MAX: number) => {
  verifySize(file, MAX);
  verifyExtensions(file);

  return true;
};

// Fonction pour parser le CSV
export const parseCSV: ParseCSV_F = text => {
  const lines = text.trim().split(LINE_BREAK);

  let firstLineNumber = 0;
  let firstLine = lines[firstLineNumber].split(SEPARATOR);

  if (lines.length === 0) {
    throw new Error('Le fichier CSV est vide');
  }

  // Si la première ligne est vide, on l'ignore
  while (
    firstLineNumber < lines.length &&
    firstLine.some(line => line === '')
  ) {
    firstLineNumber++;
    firstLine = lines[firstLineNumber]?.split(SEPARATOR);
  }

  // Première ligne = en-têtes
  const headers = lines[firstLineNumber]
    .split(SEPARATOR)
    .map(header => header.trim().replace(/"/g, ''));

  const depth = headers.length;

  firstLineNumber++;

  // Lignes suivantes = données
  const data: CSVData[] = [];

  for (let i = firstLineNumber; i < lines.length; i++) {
    const values = lines[i]
      .split(SEPARATOR)
      .map(value => value.trim().replace(/"/g, ''));

    const checkLength = values.length === headers.length;

    if (!checkLength) {
      throw new Error(
        `La ligne ${i + 1} ne correspond pas au nombre d'en-têtes : (${headers.length} en-têtes, ${values.length} valeurs)`,
      );
    }

    const row: CSVData = {};
    headers.forEach((header, index) => {
      const value = values[index];
      // Tentative de conversion en nombre si possible
      const numValue = Number(value);
      row[header] = !isNaN(numValue) && value !== '' ? numValue : value;
    });
    data.push(row);
  }

  return { data, headers, depth };
};

export function compareArrays<T>(...arrays: T[][]): boolean {
  if (arrays.length === 0) return true;

  const [first, ...rest] = arrays;

  // Check if all arrays have the same length as the first array
  for (const array of rest) {
    if (array.length !== first.length) return false;

    // Check if each element in the array matches the corresponding element in the first array
    for (let i = 0; i < array.length; i++) {
      if (array[i] !== first[i]) return false;
    }
  }

  return true;
}

const verifyConditions = (row: CSVData, headers: string[], index = 0) => {
  const keys = Object.keys(row);
  const noKeysMatchLength = keys.length !== headers.length;
  const _index = index + 1;
  const headersLen = headers.length;
  const valuesLen = keys.length;

  const _headers = `${headersLen} en-tête${headersLen > 1 ? 's' : ''}`;
  const _values = `${valuesLen} valeur${valuesLen > 1 ? 's' : ''}`;

  if (noKeysMatchLength) {
    throw new Error(
      `La ligne ${_index} ne correspond pas au nombre d'en-têtes : (${_headers} pour ${_values})`,
    );
  }

  const noKeysMatch = !compareArrays(headers, keys);

  if (noKeysMatch) {
    throw new Error(
      `La ligne ${_index} ne correspond pas aux en-têtes : (${headers.join(', ')})`,
    );
  }

  return true;
};

type MergeConditions_F = (
  data: CSVData[],
  headers: string[],
) => Conditions;

const logIndex = (index: number, length: number) => {
  const logLen = Math.floor(Math.log10(length));
  const logIndex = Math.floor(Math.log10(index));

  const zeroNum = Math.max(logLen - logIndex, 0);
  const zeroStr = '0'.repeat(zeroNum);

  return `${zeroStr}${index}`; // +1 pour l'indexation humaine
};

export const mergeConditions: MergeConditions_F = (data, headers) => {
  const conditions: Conditions = { merged: {}, warnings: [] };
  const lenH = headers.length;

  if (lenH === 1) {
    const out: types.ValuesOf<CSVData>[] = [];
    data.forEach((row, index) => {
      verifyConditions(row, headers, index);
      const value = row[headers[0]];

      const isEmpty = value === '';
      if (isEmpty) {
        conditions.warnings.push(`La ligne ${index + 1} est vide.`);
      }
      out.push(value);
    });

    conditions.merged = out;
    return conditions;
  }

  const merged: any = {};

  data.forEach((row, index) => {
    verifyConditions(row, headers, index);

    // Naviguer à travers la structure en créant les niveaux nécessaires
    let current = merged;
    const lastI = lenH - 1;

    // Tous les headers sauf le dernier sont des niveaux intermédiaires
    for (let i = 0; i < lastI; i++) {
      const headerValue = row[headers[i]];

      if (i === lastI - 1) {
        // Avant-dernier niveau : créer un array si n'existe pas
        if (!current[headerValue]) {
          current[headerValue] = [];
        }
        current = current[headerValue];
      } else {
        // Niveaux intermédiaires : créer un objet si n'existe pas
        if (!current[headerValue]) {
          current[headerValue] = {};
        }
        current = current[headerValue];
      }
    }

    // Le dernier header contient les valeurs finales
    const lastHeader = headers[lastI];
    const finalValue = row[lastHeader];

    // Ajouter la valeur finale si elle n'existe pas déjà
    if (!current.includes(finalValue)) {
      const isEmpty = finalValue === '';
      if (isEmpty) {
        conditions.warnings.push(
          `L'élement "${lastHeader}" de la ligne #${logIndex(index + 1, data.length + 1)} est vide.`,
        );
      }
      current.push(finalValue);
    }
  });

  conditions.merged = merged;

  return conditions;
};
