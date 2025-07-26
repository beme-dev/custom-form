import { createTranslations } from '@bemedev/i18n';

export const ES = createTranslations(dt => ({
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
              noHeaders: 'El archivo CSV no contiene encabezados válidos',
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
}));
