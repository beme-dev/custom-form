import { cn } from '#cn/utils';
import { lang, translate } from '#service';
import {
  createComputed,
  createSignal,
  For,
  mergeProps,
  Show,
  type Component,
  type JSX,
} from 'solid-js';
import { Motion, Presence } from 'solid-motionone';
import {
  COLUMN_WIDTH,
  DEFAULT_PROPS,
  EXTENSIONS,
  MAX_COLUMN_WIDTH_FACTOR,
  MIN_COLUMN_WIDTH_FACTOR,
} from './constants';
import { mergeConditions, parseCSV, verifyFile } from './helpers';
import type { DropzoneProps } from './types';

export const CSVDropzone: Component<DropzoneProps> = props => {
  const [isDragOver, setIsDragOver] = createSignal(false);
  const [isProcessing, setIsProcessing] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [warnings, setWarnings] = createSignal<string[]>([]);
  const [fileName, setFileName] = createSignal(props.data?.name);

  const defaultPreviewData = props.data?.data || [];
  const [previewData, setPreviewData] = createSignal(defaultPreviewData);

  const defaultHeaders = props.data?.headers || [];
  const [headers, setHeaders] = createSignal<string[]>(defaultHeaders);

  let fileInputRef: HTMLInputElement | undefined;

  const config = mergeProps(DEFAULT_PROPS, props);

  // Fonction pour traiter le fichier
  const processFile = async (file: File) => {
    const name = file.name;
    setError(null);
    setIsProcessing(true);
    setFileName(file.name);

    try {
      verifyFile(file, config.maxFileSize);

      // Lecture du fichier
      const text = await file.text();
      const { data, headers } = parseCSV(text, lang());

      setHeaders(headers);
      setPreviewData(data.slice(0, 3)); // Aperçu des 3 premières lignes

      // Callback avec toutes les données
      const conditions = mergeConditions(data, headers, lang());
      setWarnings(conditions.warnings);
      props.onDataLoaded?.({ data, headers, name, conditions });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : translate('pages.form.dropzones.csv.messages.error.default')(
              lang(),
            );
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
    softReset();

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
    softReset();
    fileInputRef?.click();
  };

  const softReset = () => {
    setError(null);
    setFileName();
    setPreviewData([]);
    setHeaders([]);
    setWarnings([]);
  };

  // Reset du composant
  const reset = () => {
    setIsProcessing(true);
    softReset();
    if (fileInputRef) {
      fileInputRef.value = '';
    }
    props.onReset?.();
    setIsProcessing(false);
  };

  const showAds = () => {
    const hasError = !!error();
    const hasWarnings = warnings().length > 0;
    const hasFileName = !!fileName() && !error();

    return hasError || hasWarnings || hasFileName;
  };

  const tableWidth = `${headers().length * COLUMN_WIDTH}px`;
  const thStyle: JSX.CSSProperties = {
    'max-width': `${COLUMN_WIDTH * MAX_COLUMN_WIDTH_FACTOR}px`,
    'min-width': `${COLUMN_WIDTH * MIN_COLUMN_WIDTH_FACTOR}px`,
  };

  const [motionH, setMotionH] = createSignal(0);

  createComputed(() => {
    const hasError = !!error();
    const hasFilename = !!fileName() && !hasError;
    const hasWarnings = warnings().length > 0 && !hasError;
    const hasFileNameAndWarnings = hasFilename && hasWarnings;
    if (hasError) {
      setMotionH(65);
    } else if (hasFileNameAndWarnings) {
      setMotionH(480);
    } else if (hasFilename) {
      setMotionH(280);
    } else if (hasWarnings) {
      setMotionH(200);
    } else {
      setMotionH(0);
    }
  });

  const processMessage = isProcessing()
    ? translate('pages.form.dropzones.csv.labels.processing')(lang())
    : translate('pages.form.dropzones.csv.labels.description')(lang());

  return (
    <div
      class={cn('w-full max-w-2xl mx-auto overflow-hidden', props.class)}
    >
      {/* Zone de drop */}
      <Motion
        class={cn(
          'border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-200 m-3',
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
          padding: showAds() ? '1rem' : '2rem',
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <input
          ref={fileInputRef}
          type='file'
          accept={`${EXTENSIONS.csv},${EXTENSIONS.type}`}
          class='hidden'
          onChange={handleFileSelect}
        />

        <div class='flex flex-col items-center space-y-4'>
          <div class='text-4xl text-gray-400'>
            {isProcessing() ? '⏳' : '📊'}
          </div>

          <div class='text-lg font-medium text-gray-700'>
            {processMessage}
          </div>

          <div class='text-xs text-gray-500'>
            {translate('pages.form.dropzones.csv.labels.accept', {
              MAX: config.maxFileSize,
            })(lang())}
          </div>
        </div>
      </Motion>

      <Presence>
        <Show when={showAds()}>
          <Motion
            exit={{
              height: 0,
              transition: {
                duration: 0.4,
                easing: 'linear',
                delay: 0.4,
              },
            }}
            initial={{ opacity: 0, scale: 0.5, y: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: `${motionH()}px`,
            }}
            transition={{ duration: 0.3, easing: 'ease-in-out' }}
            class='overflow-hidden'
            style={{ height: `${motionH()}px` }}
          >
            {/* Message d'erreur */}
            <Presence>
              <Show when={error()}>
                <Motion
                  class='mt-4 px-4 py-2 bg-red-50 border border-red-200 rounded-lg overflow-x-hidden overflow-y-auto
                  scrollbar-thin scrollbar-thumb-red-700 scrollbar-hover:scrollbar-thumb-red-900 scrollbar-track-red-100'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    x: '200%',
                  }}
                >
                  <div class='flex items-center space-x-2'>
                    <span class='text-red-500'>❌</span>
                    <span class='text-red-700 text-sm'>{error()}</span>
                  </div>
                </Motion>
              </Show>
            </Presence>

            {/* Warnings */}
            <Presence>
              <Show when={!error() && warnings().length > 0}>
                <Motion
                  class='mt-2 p-1 bg-yellow-50 border-2 border-yellow-200 rounded-lg'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    x: '200%',
                  }}
                  transition={{
                    duration: 0.3,
                    easing: 'ease-in-out',
                  }}
                >
                  <div class='max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-700 scrollbar-hover:scrollbar-thumb-yellow-900 scrollbar-track-yellow-100'>
                    <div class='flex items-center space-x-2'>
                      <span class='text-yellow-500'>⚠️</span>
                      <span class='text-yellow-700 text-sm'>
                        {warnings().length} avertissement(s) :
                      </span>
                    </div>
                    <ul class='mt-2 list-disc list-inside text-xs text-yellow-700 '>
                      <For each={warnings()}>
                        {warning => <li>{warning}</li>}
                      </For>
                    </ul>
                  </div>
                </Motion>
              </Show>
            </Presence>

            {/* Informations du fichier et aperçu */}
            <Presence>
              <Show when={fileName() && !error()}>
                <Motion
                  class='mt-4 p-4 bg-green-50 border border-green-200 rounded-lg'
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    x: '-200%',
                  }}
                  transition={{ duration: 0.5, easing: 'ease-in-out' }}
                >
                  <div class='flex items-center justify-between mb-3'>
                    <div class='flex items-center space-x-2'>
                      <span class='text-green-500'>✅</span>
                      <span class='text-green-700 font-medium'>
                        {fileName()}
                      </span>
                    </div>
                    <div class='flex flex-col space-y-2'>
                      <button
                        onClick={reset}
                        class='text-red-600 hover:text-red-800 text-sm hover:scale-110 active:scale-none transition-transform duration-200 ease-in-out cursor-pointer'
                      >
                        ❌{' '}
                        {translate('pages.form.buttons.addField')(lang())}
                      </button>
                      <button
                        onClick={() => {
                          props.update?.({
                            data: previewData(),
                            headers: headers(),
                            name: fileName()!,
                            conditions: {
                              merged: {},
                              warnings: [],
                            },
                          });
                        }}
                        class='text-green-600 hover:text-green-800 text-sm hover:scale-110 active:scale-none transition-transform duration-200 ease-in-out cursor-pointer'
                      >
                        ✅ {'=>'}
                      </button>
                    </div>
                  </div>

                  {/* Aperçu des données */}
                  <Show when={previewData().length > 0}>
                    <div class='mt-3'>
                      <h4 class='text-sm font-medium text-gray-700 mb-2'>
                        Aperçu des données, ({previewData().length}{' '}
                        premières lignes) :
                      </h4>
                      <div class='overflow-x-auto no-scrollbar rounded-md border-2 border-gray-200 bg-white'>
                        <table
                          class='text-xs'
                          style={{
                            width: tableWidth,
                          }}
                        >
                          <thead class='bg-gray-50'>
                            <tr class='w-full'>
                              <For each={headers()}>
                                {header => (
                                  <th
                                    class='px-3 py-2 text-left font-medium text-gray-700 border-r border-gray-200 truncate'
                                    style={thStyle}
                                    children={header}
                                  />
                                )}
                              </For>
                            </tr>
                          </thead>
                          <tbody>
                            <For each={previewData()}>
                              {(row, index) => (
                                <tr
                                  class={
                                    index() % 2 === 0
                                      ? 'bg-white'
                                      : 'bg-gray-50'
                                  }
                                >
                                  <For each={headers()}>
                                    {header => {
                                      const children = String(
                                        row[header] || '',
                                      );
                                      return (
                                        <td
                                          class='px-3 py-2 border-r border-gray-200 text-gray-600 truncate'
                                          children={children}
                                        />
                                      );
                                    }}
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
            </Presence>
          </Motion>
        </Show>
      </Presence>
    </div>
  );
};

export default CSVDropzone;
