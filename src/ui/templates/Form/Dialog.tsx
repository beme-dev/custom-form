import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#cn/components/ui/dialog';
import { lang, translate } from '#service';
import {
  createSignal,
  onCleanup,
  Show,
  type Accessor,
  type Component,
} from 'solid-js';
import { cn } from '~/ui/cn/utils';
import { CSVDropzone } from './Dropzone';
import type { DropzoneProps } from './Dropzone/types';

type CSVDialogProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  trigger: Component<{}>;

  timeout?: number; // Durée avant la fermeture automatique en ms
} & DropzoneProps;

const Name: Component<{
  name: Accessor<string | undefined>;
}> = ({ name }) => {
  const hasName = () => {
    const _name = name();
    return _name !== undefined && _name !== '';
  };

  return (
    <Show when={hasName()}>
      <div class='p-2 bg-green-50 border border-green-200 rounded-lg w-full text-sm mt-5'>
        <h4 class='font-semibold text-green-800'>
          {translate('pages.form.dropzones.csv.labels.imported')(lang())}
        </h4>
        <p class='text-xs text-green-700'>{name()}</p>
      </div>
    </Show>
  );
};

export const CSVDialog: Component<CSVDialogProps> = ({
  maxFileSize,

  data,
  ...props
}) => {
  const remainProps = {
    maxFileSize,
    data,
  };

  const [isOpen, setIsOpen] = createSignal(false);
  const [name, setName] = createSignal(data?.name);

  let timer: NodeJS.Timeout;
  const timeout = props.timeout || 0;

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
        <DialogContent class='max-w-3xl max-h-[95vh] w-10/12 overflow-y-hidden shadow-xl border-4 border-slate-300 dark:border-gray-700'>
          <DialogHeader>
            <DialogTitle>
              {translate('pages.form.dropzones.csv.labels.title')(lang())}
            </DialogTitle>
            <DialogDescription>
              {translate('pages.form.dropzones.csv.labels.description')(
                lang(),
              )}
            </DialogDescription>
          </DialogHeader>

          <div
            class='mt-2'
            onMouseLeave={() => {
              if (name())
                if (timeout >= 2000) {
                  timer = setTimeout(() => {
                    setIsOpen(false);
                  }, timeout);
                }
            }}
            onMouseEnter={() => {
              cleanupTimer();
            }}
          >
            <CSVDropzone
              class='w-full'
              {...remainProps}
              onDataLoaded={({ data, headers, name, conditions }) => {
                props.onDataLoaded?.({ data, headers, name, conditions });
                setName(name);
              }}
              onError={data => {
                props.onError?.(data);
              }}
              onReset={() => {
                cleanupTimer();
                props.onReset?.();
              }}
              update={args => {
                setIsOpen(false);
                return props.update?.(args);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
      <Name name={name} />
    </div>
  );
};

export default CSVDialog;
