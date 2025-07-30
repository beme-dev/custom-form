import type { Component, JSX } from 'solid-js';
import { For } from 'solid-js';

interface DataTableProps {
  headers: () => string[];
  previewData: () => Record<string, any>[];
  tableWidth: string;
  thStyle: JSX.CSSProperties;
}

export const DataTable: Component<DataTableProps> = props => {
  return (
    <div class='overflow-x-auto no-scrollbar rounded-md border-2 border-gray-200 bg-white'>
      <table
        class='text-xs'
        style={{
          width: props.tableWidth,
        }}
      >
        <thead class='bg-gray-50'>
          <tr class='w-full'>
            <For each={props.headers()}>
              {header => (
                <th
                  class='px-3 py-2 text-left font-medium text-gray-700 border-r border-gray-200 truncate'
                  style={props.thStyle}
                  children={header}
                />
              )}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={props.previewData()}>
            {(row, index) => (
              <tr class={index() % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <For each={props.headers()}>
                  {header => {
                    const children = String(row[header] || '');
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
  );
};
