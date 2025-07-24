import { createTranslations } from '@bemedev/i18n';

export const FR = createTranslations(dt => ({
  lang: 'fr',

  pages: {
    form: {
      title: 'Générateur de Formulaires',
      description:
        'Un générateur de formulaires simple avec des champs conditionnels',

      labels: {
        question: 'Titre de la Question',
        field: 'Champ',
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
        addField: 'Ajouter un Champ',
        delete: 'Supprimer',
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
            success: { default: 'Seuls les fichiers CSV sont acceptés' },
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

            title: 'Importer un fichier CSV',
            imported: 'Fichier importé :',

            description:
              'Sélectionnez ou glissez-déposez votre fichier CSV ici pour le télécharger',
          },

          buttons: {
            load: 'Charger le fichier CSV',
          },
        },
      },
    },
  },
}));
