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
        addField: 'Añadir Campo',
        delete: 'Eliminar',
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
            success: { default: 'Solo se aceptan archivos CSV' },
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

            title: 'Importar un archivo CSV',
            imported: 'Archivo importado:',

            description:
              'Selecciona o arrastra y suelta tu archivo CSV aquí para subirlo',
          },

          buttons: {
            load: 'Cargar archivo CSV',
          },
        },
      },
    },
  },
}));
