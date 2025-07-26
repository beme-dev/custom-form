import { createRootTanslations } from '@bemedev/i18n';

export const EN = createRootTanslations(dt => ({
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
}));
