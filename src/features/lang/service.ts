import { create, type ConfigFrom, type KeyFrom } from '@bemedev/i18n';

export const machine = create(
  dt => ({
    lang: 'en',

    pages: {
      form: {
        title: 'Form Generator',
        description: 'A simple form generator with conditional fields',

        labels: {
          question: 'Question Title',
          field: 'Field',
          conditional: dt('Conditional with {LEVEL:plural}', {
            plural: {
              LEVEL: { other: '{?} levels', one: '1 level' },
            },
          }),
        },

        inputs: {
          question: {
            placeholder: 'Question Title',
          },
          answer: {
            placeholder: 'Answer',
          },
        },

        buttons: {
          fields: {
            register: 'Register Fields',
            modify: 'Modify Fields',
            add: 'Add Field',
            delete: 'Delete',
          },
          inputs: {
            register: 'Register Inputs',
            modify: 'Modify Inputs',
          },
          switchPanels: 'Switch Panels',
        },

        selects: {
          inputs: {
            invite: 'Your choice',
            placeholder: 'Option',

            options: {
              text: 'Text',
              select: 'Choice',
              checkbox: 'Checkbox',
              number: 'Number',
              color: 'Color',
              email: 'Email',
              date: 'Date',
              time: 'Time',
              url: 'URL',
              tel: 'Phone',
              'datetime-local': 'Date and Time',
              image: 'Image',
              file: 'File',
              week: 'Week',
              conditional: 'Conditional',
            },
          },
        },

        dropzones: {
          csv: {
            messages: {
              error: {
                default: 'An error occurred while uploading the file',
                size: dt(
                  'File exceeds the maximum allowed size of {MAX:number} MB. Current file size: {SIZE:number} MB',
                  {},
                ),
                extension:
                  'The file must be in CSV format (with the extension ".csv" or of type "text/csv")',
                noHeaders: 'The CSV file does not contain valid headers',
                columnsRow: dt(
                  'Line #{LINE:number} does not match the number of headers: ({HEADERS:plural} for {COLUMNS:plural})',
                  {
                    plural: {
                      HEADERS: { other: '{?} headers', one: '1 header' },
                      COLUMNS: { other: '{?} columns', one: '1 column' },
                    },
                  },
                ),
              },
              warnings: {
                one: dt('Line {LINE} is empty', {}),
                many: dt('Element {ELEMENT} at line #{LINE} is empty', {}),
              },
              processings: {
                file: 'Processing CSV file...',
              },
            },

            labels: {
              overview: dt(
                'Overview of data, the first {COUNT:number} lines',
                {},
              ),

              processing: 'Processing CSV file...',

              title: 'Import a CSV file',
              imported: 'Imported file :',

              description:
                'Select or drag & drop your CSV file here to upload',

              accept: dt(
                'Only CSV files are accepted (max: {MAX:number} MB)',
                {},
              ),
            },

            buttons: {
              load: '🚀 Load CSV file',
            },
          },
        },
      },
    },
  }),
  'en',
)
  .provideTranslation('es', dt => ({
    lang: 'es',

    pages: {
      form: {
        title: 'Generador de Formularios',
        description:
          'Un generador de formularios simple con campos condicionales',

        labels: {
          question: 'Título de la Pregunta',
          field: 'Campo',
          conditional: dt('Condicional con {LEVEL:plural}', {
            plural: {
              LEVEL: { other: '{?} niveles', one: '1 nivel' },
            },
          }),
        },

        inputs: {
          question: {
            placeholder: 'Título de la Pregunta',
          },
          answer: {
            placeholder: 'Respuesta',
          },
        },

        buttons: {
          fields: {
            register: 'Registrar campos',
            modify: 'Modificar campos',
            add: 'Añadir campo',
            delete: 'Eliminar',
          },
          inputs: {
            register: 'Registrar entradas',
            modify: 'Modificar entradas',
          },
          switchPanels: 'Cambiar paneles',
        },

        selects: {
          inputs: {
            invite: 'Tu elección',
            placeholder: 'Opción',

            options: {
              text: 'Texto',
              select: 'Selección',
              checkbox: 'Casilla de verificación',
              number: 'Número',
              color: 'Color',
              email: 'Correo electrónico',
              date: 'Fecha',
              time: 'Hora',
              url: 'URL',
              tel: 'Teléfono',
              'datetime-local': 'Fecha y Hora',
              image: 'Imagen',
              file: 'Archivo',
              week: 'Semana',
              conditional: 'Condicional',
            },
          },
        },

        dropzones: {
          csv: {
            messages: {
              error: {
                default: 'Ocurrió un error al subir el archivo',
                size: dt(
                  'El archivo excede el tamaño máximo permitido de {MAX:number} MB. Tamaño actual del archivo: {SIZE:number} MB',
                  {},
                ),
                extension:
                  'El archivo debe estar en formato CSV (con la extensión ".csv" o de tipo "text/csv")',
                noHeaders:
                  'El archivo CSV no contiene encabezados válidos',
                columnsRow: dt(
                  'La línea #{LINE:number} no coincide con el número de encabezados: ({HEADERS:plural} para {COLUMNS:plural})',
                  {
                    plural: {
                      HEADERS: {
                        other: '{?} encabezados',
                        one: '1 encabezado',
                      },
                      COLUMNS: { other: '{?} columnas', one: '1 columna' },
                    },
                  },
                ),
              },
              warnings: {
                one: dt('La línea {LINE} está vacía', {}),
                many: dt(
                  'El elemento {ELEMENT} en la línea #{LINE} está vacío',
                  {},
                ),
              },
              processings: {
                file: 'Procesando archivo CSV...',
              },
            },
            invite:
              'Arrastra y suelta tu archivo CSV aquí o haz clic para seleccionar',
            labels: {
              overview: dt(
                'Vista general de los datos, las primeras {COUNT:number} líneas',
                {},
              ),

              processing: 'Procesando archivo CSV...',

              title: 'Importar un archivo CSV',
              imported: 'Archivo importado:',

              description:
                'Selecciona o arrastra y suelta tu archivo CSV aquí para subirlo',

              accept: dt(
                'Solo se aceptan archivos CSV (máx: {MAX:number} MB)',
                {},
              ),
            },

            buttons: {
              load: '🚀 Cargar archivo CSV',
            },
          },
        },
      },
    },
  }))
  .provideTranslation('fr', dt => ({
    lang: 'fr',

    pages: {
      form: {
        title: 'Générateur de Formulaires',
        description:
          'Un générateur de formulaires simple avec des champs conditionnels',

        labels: {
          question: 'Titre de la Question',
          field: 'Champ',
          conditional: dt('Conditionnel à {LEVEL:plural}', {
            plural: {
              LEVEL: { other: '{?} niveaux', one: '1 niveau' },
            },
          }),
        },

        inputs: {
          question: {
            placeholder: 'Titre de la Question',
          },
          answer: {
            placeholder: 'Réponse',
          },
        },

        buttons: {
          fields: {
            register: 'Enregistrer les champs',
            modify: 'Modifier les champs',
            add: 'Ajouter un champ',
            delete: 'Supprimer',
          },
          inputs: {
            register: 'Enregistrer les entrées',
            modify: 'Modifier les entrées',
          },
          switchPanels: 'Alterner les panneaux',
        },

        selects: {
          inputs: {
            invite: 'Votre choix',
            placeholder: 'Option',

            options: {
              text: 'Texte',
              select: 'Choix',
              checkbox: 'Case à cocher',
              number: 'Nombre',
              color: 'Couleur',
              email: 'E-mail',
              date: 'Date',
              time: 'Heure',
              url: 'URL',
              tel: 'Téléphone',
              'datetime-local': 'Date et Heure',
              image: 'Image',
              file: 'Fichier',
              week: 'Semaine',
              conditional: 'Conditionnel',
            },
          },
        },

        dropzones: {
          csv: {
            messages: {
              error: {
                default:
                  'Une erreur est survenue lors du téléchargement du fichier',
                size: dt(
                  'Le fichier dépasse la taille maximale autorisée de {MAX:number} MB. Taille actuelle du fichier : {SIZE:number} MB',
                  {},
                ),
                extension:
                  'Le fichier doit être au format CSV (avec l\'extension ".csv" ou de type "text/csv")',
                noHeaders:
                  "Le fichier CSV ne contient pas d'en-têtes valides",
                columnsRow: dt(
                  "La ligne #{LINE:number} ne correspond pas au nombre d'en-têtes : ({HEADERS:plural} pour {COLUMNS:plural})",
                  {
                    plural: {
                      HEADERS: { other: '{?} en-têtes', one: '1 en-tête' },
                      COLUMNS: { other: '{?} colonnes', one: '1 colonne' },
                    },
                  },
                ),
              },
              warnings: {
                one: dt('La ligne {LINE} est vide', {}),
                many: dt(
                  "L'élément {ELEMENT} à la ligne #{LINE} est vide",
                  {},
                ),
              },
              processings: {
                file: 'Traitement du fichier CSV...',
              },
            },
            invite:
              'Glissez-déposez ou votre fichier CSV ici ou cliquez pour sélectionner',
            labels: {
              overview: dt(
                'Aperçu des données, les {COUNT:number} premières lignes',
                {},
              ),

              processing: 'Traitement du fichier CSV...',

              title: 'Importer un fichier CSV',
              imported: 'Fichier importé :',

              description:
                'Sélectionnez ou glissez-déposez votre fichier CSV ici pour le télécharger',

              accept: dt(
                'Seuls les fichiers CSV sont acceptés (max : {MAX:number} MB)',
                {},
              ),
            },

            buttons: {
              load: '🚀 Charger le fichier CSV',
            },
          },
        },
      },
    },
  }));

export type FieldType = keyof ConfigFrom<
  typeof machine
>['pages']['form']['selects']['inputs']['options'];

export const LANGS = machine.keys;

export type Lang = KeyFrom<typeof machine>;

export { LANG_STORE_KEY } from './constants';

export const translate = machine.translate;
