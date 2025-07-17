import { cn } from '#cn/utils';
import {
  createSignal,
  For,
  mergeProps,
  Show,
  type Component,
} from 'solid-js';
import { Motion } from 'solid-motionone';

export type CSVData = Record<string, string | number>;

type DropzoneProps = {
  onDataLoaded?: (props: {
    data: CSVData[];
    headers: string[];
    name: string;
  }) => void;
  onError?: (error: string) => void;
  onReset?: () => void;
  className?: string;
  maxFileSize?: number; // en MB
  placeholder?: string;
  acceptMessage?: string;
  errorMessage?: string;
};

const DEFAULT_PROPS = {
  maxFileSize: 10, // 10MB par défaut
  placeholder:
    'Glissez-déposez votre fichier CSV ici ou cliquez pour sélectionner',
  acceptMessage: 'Seuls les fichiers CSV sont acceptés',
  errorMessage: 'Erreur lors du traitement du fichier',
};

const SEPARATOR = ';' as const;

// Fonction pour parser le CSV
const parseCSV = (text: string) => {
  const lines = text.trim().split('\n');

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

  return { data, headers };
};

export const CSVDropzone: Component<DropzoneProps> = props => {
  const [isDragOver, setIsDragOver] = createSignal(false);
  const [isProcessing, setIsProcessing] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [fileName, setFileName] = createSignal<string | null>(null);
  const [previewData, setPreviewData] = createSignal<CSVData[]>([]);
  const [headers, setHeaders] = createSignal<string[]>([]);

  let fileInputRef: HTMLInputElement | undefined;

  const config = mergeProps(DEFAULT_PROPS, props);

  // Fonction pour traiter le fichier
  const processFile = async (file: File) => {
    const name = file.name;
    setError(null);
    setIsProcessing(true);
    setFileName(file.name);

    try {
      // Vérification de la taille
      if (file.size > config.maxFileSize * 1024 * 1024) {
        throw new Error(
          `Le fichier est trop volumineux (max: ${config.maxFileSize}MB)`,
        );
      }

      // Vérification du type de fichier
      if (
        !file.name.toLowerCase().endsWith('.csv') &&
        file.type !== 'text/csv'
      ) {
        throw new Error('Seuls les fichiers CSV sont acceptés');
      }

      // Lecture du fichier
      const text = await file.text();
      const { data, headers } = parseCSV(text);

      setHeaders(headers);
      setPreviewData(data.slice(0, 3)); // Aperçu des 3 premières lignes

      // Callback avec toutes les données
      props.onDataLoaded?.({ data, headers, name });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : config.errorMessage;
      setError(errorMessage);
      props.onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Gestionnaires d'événements drag & drop
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  // Gestionnaire pour l'input file
  const handleFileSelect = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  // Clic sur la zone pour ouvrir le sélecteur
  const handleClick = () => {
    fileInputRef?.click();
  };

  // Reset du composant
  const reset = () => {
    setIsProcessing(true);
    setError(null);
    setFileName(null);
    setPreviewData([]);
    setHeaders([]);
    if (fileInputRef) {
      fileInputRef.value = '';
    }
    props.onReset?.();
    setIsProcessing(false);
  };

  return (
    <div class={cn('w-full max-w-2xl mx-auto', props.className)}>
      {/* Zone de drop */}
      <Motion
        class={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200',
          isDragOver()
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400',
          isProcessing() && 'pointer-events-none opacity-50',
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        animate={{
          scale: isDragOver() ? 1.02 : 1,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <input
          ref={fileInputRef}
          type='file'
          accept='.csv,text/csv'
          class='hidden'
          onChange={handleFileSelect}
        />

        <div class='flex flex-col items-center space-y-4'>
          <div class='text-4xl text-gray-400'>
            {isProcessing() ? '⏳' : '📊'}
          </div>

          <div class='text-lg font-medium text-gray-700'>
            {isProcessing()
              ? 'Traitement en cours...'
              : config.placeholder}
          </div>

          <div class='text-sm text-gray-500'>
            {config.acceptMessage} (max: {config.maxFileSize}MB)
          </div>
        </div>
      </Motion>

      {/* Message d'erreur */}
      <Show when={error()}>
        <Motion
          class='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div class='flex items-center space-x-2'>
            <span class='text-red-500'>❌</span>
            <span class='text-red-700 text-sm'>{error()}</span>
          </div>
        </Motion>
      </Show>

      {/* Informations du fichier et aperçu */}
      <Show when={fileName() && !error()}>
        <Motion
          class='mt-4 p-4 bg-green-50 border border-green-200 rounded-lg'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, easing: 'ease-in-out' }}
        >
          <div class='flex items-center justify-between mb-3'>
            <div class='flex items-center space-x-2'>
              <span class='text-green-500'>✅</span>
              <span class='text-green-700 font-medium'>{fileName()}</span>
            </div>
            <button
              onClick={reset}
              class='text-gray-500 hover:text-gray-700 text-sm underline'
            >
              Nouveau fichier
            </button>
          </div>

          {/* Aperçu des données */}
          <Show when={previewData().length > 0}>
            <div class='mt-3'>
              <h4 class='text-sm font-medium text-gray-700 mb-2'>
                Aperçu des données ({previewData().length} premières
                lignes) :
              </h4>
              <div class='overflow-x-auto'>
                <table class='min-w-full text-xs border border-gray-200 rounded'>
                  <thead class='bg-gray-50'>
                    <tr>
                      <For each={headers()}>
                        {header => (
                          <th class='px-3 py-2 text-left font-medium text-gray-700 border-r border-gray-200'>
                            {header}
                          </th>
                        )}
                      </For>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={previewData()}>
                      {(row, index) => (
                        <tr
                          class={
                            index() % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }
                        >
                          <For each={headers()}>
                            {header => (
                              <td class='px-3 py-2 border-r border-gray-200 text-gray-600'>
                                {String(row[header] || '')}
                              </td>
                            )}
                          </For>
                        </tr>
                      )}
                    </For>
                  </tbody>
                </table>
              </div>
            </div>
          </Show>
        </Motion>
      </Show>
    </div>
  );
};

export default CSVDropzone;
