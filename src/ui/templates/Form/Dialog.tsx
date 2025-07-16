import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#cn/components/ui/dialog';
import { createSignal, type Component, type JSX } from 'solid-js';
import { CSVDropzone } from './Dropzone';

type CSVData = Record<string, string | number>;

type CSVDialogProps = {
  trigger: JSX.Element;
  title?: string;
  description?: string;
  onDataLoaded?: (data: CSVData[], headers: string[]) => void;
  onError?: (error: string) => void;
  maxFileSize?: number;
};

export const CSVDialog: Component<CSVDialogProps> = props => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [csvData, setCsvData] = createSignal<CSVData[]>([]);
  const [headers, setHeaders] = createSignal<string[]>([]);

  const handleDataLoaded = (data: CSVData[], fileHeaders: string[]) => {
    setCsvData(data);
    setHeaders(fileHeaders);
    props.onDataLoaded?.(data, fileHeaders);
  };

  const handleError = (error: string) => props.onError?.(error);

  const handleSuccess = () => {
    const check = isOpen();
    // Fermer automatiquement après le chargement réussi
    if (check)
      setTimeout(() => {
        setIsOpen(false);
      }, 5000);
  };

  return (
    <Dialog open={isOpen()} onOpenChange={setIsOpen}>
      <DialogTrigger class='outline-none'>{props.trigger}</DialogTrigger>
      <DialogContent class='max-w-3xl max-h-[80vh] w-10/12 overflow-y-auto shadow-xl border-4 border-slate-300 dark:border-gray-700'>
        <DialogHeader>
          <DialogTitle>
            {props.title || 'Importer un fichier CSV'}
          </DialogTitle>
          <DialogDescription>
            {props.description ||
              "Sélectionnez ou glissez-déposez votre fichier CSV pour l'importer."}
          </DialogDescription>
        </DialogHeader>

        <div class='mt-6'>
          <CSVDropzone
            onDataLoaded={(data, headers) => {
              handleDataLoaded(data, headers);
              handleSuccess();
            }}
            onError={handleError}
            maxFileSize={props.maxFileSize || 10}
            className='w-full'
          />
        </div>

        {/* Informations sur les données chargées */}
        {csvData().length > 0 && (
          <div class='mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
            <h4 class='font-semibold text-blue-800 mb-2'>
              Données importées :
            </h4>
            <div class='text-sm text-blue-700 space-y-1'>
              <p>Nombre de lignes : {csvData().length}</p>
              <p>Nombre de colonnes : {headers().length}</p>
              <p>Colonnes : {headers().join(', ')}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Composant Button personnalisé pour le trigger
export const CSVImportButton: Component<{
  onDataLoaded?: (data: CSVData[], headers: string[]) => void;
  onError?: (error: string) => void;
  children?: JSX.Element;
  class?: string;
}> = props => {
  return (
    <CSVDialog
      trigger={
        <button
          class={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${props.class || ''}`}
        >
          {props.children || '📊 Importer CSV'}
        </button>
      }
      onDataLoaded={props.onDataLoaded}
      onError={props.onError}
    />
  );
};

export default CSVDialog;
