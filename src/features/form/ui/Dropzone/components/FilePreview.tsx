import { lang, translate } from '#service';
import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { Motion, Presence } from 'solid-motionone';
import type { DropzoneProps } from '../types';
import { DataTable } from './DataTable';

interface FilePreviewProps {
  fileName: () => string | undefined;
  error: () => string | null;
  previewData: () => Record<string, any>[];
  headers: () => string[];
  tableWidth: string;
  thStyle: any;
  reset: () => void;
  props: DropzoneProps;
}

export const FilePreview: Component<FilePreviewProps> = props => {
  return (
    <Presence>
      <Show when={props.fileName() && !props.error()}>
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
                {props.fileName()}
              </span>
            </div>
            <div class='flex flex-col space-y-2'>
              <button
                onClick={props.reset}
                class='text-red-600 hover:text-red-800 text-sm hover:scale-110 active:scale-none transition-transform duration-200 ease-in-out cursor-pointer'
              >
                ❌ {translate('pages.form.buttons.fields.delete')(lang())}
              </button>
              <button
                onClick={() => {
                  props.props.update?.({
                    data: props.previewData(),
                    headers: props.headers(),
                    name: props.fileName()!,
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
          <Show when={props.previewData().length > 0}>
            <div class='mt-3'>
              <h4 class='text-sm font-medium text-gray-700 mb-2'>
                Aperçu des données, ({props.previewData().length} premières
                lignes) :
              </h4>
              <DataTable
                headers={props.headers}
                previewData={props.previewData}
                tableWidth={props.tableWidth}
                thStyle={props.thStyle}
              />
            </div>
          </Show>
        </Motion>
      </Show>
    </Presence>
  );
};
