import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#cn/components/ui/dialog';
import {
  createComputed,
  createSignal,
  onCleanup,
  Show,
  type Accessor,
  type Component,
} from 'solid-js';
import { cn } from '~/ui/cn/utils';
import { CSVDropzone, type CSVData } from './Dropzone';

type CSVDialogProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  trigger: Component<{}>;
  // Propriétés optionnelles pour personnaliser le dialog
  title?: string;
  description?: string;
  onDataLoaded?: (data: CSVData[], headers: string[]) => void;
  onError?: (error: string) => void;
  maxFileSize?: number;
  placeholder?: string;
  acceptMessage?: string;
  errorMessage?: string;
  class?: string;
  timeout?: number; // Durée avant la fermeture automatique en ms
};

const Name: Component<{
  name: Accessor<string | undefined>;
}> = ({ name }) => {
  const hasName = () => {
    const _name = name();
    return _name !== undefined && _name !== '';
  };

  createComputed(() => {
    console.log('Name computed:', name());
  });

  return (
    <Show when={hasName()}>
      <div class='p-2 bg-green-50 border border-green-200 rounded-lg w-full text-sm mt-5'>
        <h4 class='font-semibold text-green-800'>Fichier importé :</h4>
        <p class='text-xs text-green-700'>{name()}</p>
      </div>
    </Show>
  );
};

export const CSVDialog: Component<CSVDialogProps> = props => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [data, setData] = createSignal<CSVData[]>([]);
  const [headers, setHeaders] = createSignal<string[]>([]);
  const [name, setName] = createSignal<string | undefined>(undefined);

  let timer: NodeJS.Timeout;
  const timeout = props.timeout || 0;

  const handleSuccess = () => {
    // Fermer automatiquement après le chargement réussi
    if (timeout >= 2000)
      timer = setTimeout(() => {
        setIsOpen(false);
      }, timeout);
  };

  const cleanupTimer = () => {
    if (timer) clearTimeout(timer);
  };

  onCleanup(() => {
    cleanupTimer();
  });

  return (
    <div
      class={cn(
        props.class,
        'flex flex-col items-center max-w-sm mx-auto',
      )}
    >
      <Dialog open={isOpen()} onOpenChange={setIsOpen}>
        <DialogTrigger class='outline-none '>
          <props.trigger />
        </DialogTrigger>
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
              onDataLoaded={({ data, headers, name }) => {
                setData(data);
                setHeaders(headers);
                props.onDataLoaded?.(data, headers);
                setName(name);
                handleSuccess();
              }}
              onError={props.onError}
              maxFileSize={props.maxFileSize}
              className='w-full'
              placeholder={props.placeholder}
              acceptMessage={props.acceptMessage}
              errorMessage={props.errorMessage}
              onReset={() => {
                cleanupTimer();
              }}
            />
          </div>

          {/* Informations sur les données chargées */}
          {data().length > 0 && (
            <div class='mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
              <h4 class='font-semibold text-blue-800 mb-2'>
                Données importées :
              </h4>
              <div class='text-sm text-blue-700 space-y-1'>
                <p>Nombre de lignes : {data().length}</p>
                <p>Nombre de colonnes : {headers().length}</p>
                <p>Colonnes : {headers().join(', ')}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Name name={name} />
    </div>
  );
};

export default CSVDialog;
