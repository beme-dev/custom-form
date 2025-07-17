import { debounceFn } from '#signals/debounce';
import {
  For,
  onCleanup,
  Show,
  type Accessor,
  type Component,
  type ComponentProps,
} from 'solid-js';
import { select, send } from '~/services/main';
import CSVDialog from './Dialog';
import { FieldTypes } from './FieldTypes';
import { FocusTextArea } from './FocusTextArea';
import { createField, onCaret, setFocus, toFocus } from './signals';
import type { Field } from './types';

type Comp = ComponentProps<typeof CSVDialog>['trigger'];

const Trigger: Comp = () => (
  <span class='px-6 py-3 bg-orange-600 text-white rounded-lg transition-all font-medium shadow-lg active:inset-shadow-sm inset-shadow-orange-800 active:scale-90 active:ring-yellow-900 active:ring-4 select-none'>
    🚀 Charger mes données CSV
  </span>
);

export const CreateField: Component<{
  field: Field;
  index: Accessor<number>;
}> = ({ field, index: indexC }) => {
  const {
    label,
    setLabel,
    type,
    setType,
    options,
    addOption,
    deleteOption,
    updateOption,
    setOptions,
  } = createField();

  setType(field.type);
  setLabel(field.label);
  setOptions(field.options);

  const _update = () =>
    send({
      type: 'UPDATE',
      payload: {
        index: indexC(),
        value: {
          label: label(),
          options: options(),
          type: type(),
        },
      },
    });

  const onInput = debounceFn(_update, 400);
  const optionD = debounceFn(updateOption, 300);
  onCleanup(() => {
    onInput.cancel();
    optionD.cancel();
  });
  const len = () => options()?.length || -1;

  const nameQ = `${indexC()}->question`;
  const isConditional = () => type() === 'conditional';

  return (
    <div class='mb-6 pb-4 flex space-x-3 outline-none w-11/12'>
      <div class='flex-1 flex flex-col space-y-2'>
        <FocusTextArea
          class='border p-2 rounded w-full max-w-xl mb-2 outline-none min-h-9 h-12 max-h-48'
          // type="text"
          placeholder={select('context.intl.question')()}
          name={nameQ}
          value={label()}
          // autofocus={autofocus(nameQ)}
          onFocus={onCaret(nameQ)}
          onInput={e => {
            const label = e.target.value;
            // setLabel((e.target as HTMLInputElement).value);
            setLabel(label);
            onInput();
            setFocus({
              name: nameQ,
              start: e.target.selectionStart,
            });
          }}
        />
        <FieldTypes
          index={indexC}
          type={type}
          setType={type => {
            setType(type);
            _update();
          }}
        />
        <Show when={len() > 0}>
          <div class='mt-4 flex space-x-4 items-start w-full'>
            <div class='space-y-2 w-full'>
              <For each={options()}>
                {(option, index) => {
                  const name = `${indexC()}->options->${index()}`;
                  return (
                    <div class='flex items-center space-x-2'>
                      <FocusTextArea
                        class='border p-2 rounded outline-none min-h-9 h-12 max-h-48 w-full'
                        // type="text"
                        placeholder={`${select('context.intl.option.placeholder')()} ${index() + 1}`}
                        name={name}
                        // tabIndex={index()}
                        value={option}
                        onFocus={onCaret(name)}
                        autofocus={toFocus()?.name === name}
                        onInput={e => {
                          const value = e.target.value;

                          optionD(index(), value);
                          onInput();
                          setFocus({
                            name,
                            start: e.target.selectionStart,
                          });
                        }}
                        onKeyDown={e => {
                          const checkTab = e.key === 'Tab';
                          const checkShiftTab = e.shiftKey && checkTab;

                          const hack = () => {
                            addOption();
                            _update();
                            deleteOption(len() - 1);
                            _update();
                          };

                          if (checkShiftTab) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            const prevIndex = index() - 1;
                            if (prevIndex >= 0)
                              setFocus({
                                name: `${indexC()}->options->${prevIndex}`,
                              });
                            else setFocus({ name: nameQ });

                            hack();
                          } else if (checkTab) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            const nextIndex = index() + 1;
                            if (nextIndex < len()) {
                              setFocus({
                                name: `${indexC()}->options->${nextIndex}`,
                              });

                              hack();
                            } else {
                              addOption();

                              setFocus({
                                name: `${indexC()}->options->${nextIndex}`,
                              });

                              _update();
                            }
                          }
                        }}
                      />
                      <button
                        class='ml-2 text-red-600'
                        type='button'
                        onClick={e => {
                          e.preventDefault();
                          e.stopImmediatePropagation();
                          deleteOption(index());

                          // #region Rinit if no options
                          const checkEmpty =
                            !options() || options()?.length === 0;

                          if (checkEmpty) {
                            setType('text');
                            setFocus({ name: nameQ });
                            _update();
                          } else _update();
                          // #endregion
                        }}
                      >
                        X
                      </button>
                    </div>
                  );
                }}
              </For>
            </div>
            <button
              class='text-xs text-blue-600 mt-4 size-6 border-blue-300 border-2 rounded-md text-center content-center pb-0.5 shadow-lg active:scale-90 hover:bg-blue-100 ease-in-out duration-200 transition-colors'
              type='button'
              onClick={() => {
                setFocus({ name: `${indexC()}->options->${len()}` });
                addOption();
                _update();
              }}
            >
              +
            </button>
          </div>
        </Show>

        <Show when={isConditional()}>
          <CSVDialog
            class='mt-4'
            trigger={Trigger}
            title='Importation de données CSV'
            description='Glissez-déposez votre fichier CSV ou cliquez pour le sélectionner. Les données seront automatiquement analysées et affichées.'
            onDataLoaded={(data, fileHeaders) => {
              console.log('Données CSV chargées:', {
                data,
                headers: fileHeaders,
              });
            }}
            maxFileSize={10}
            timeout={2000}
          />
        </Show>
      </div>
      <div class='flex flex-col space-y-2'>
        <button
          class='text-red-500 border-2 border-red-700 bg-red-100 shadow-sm active:scale-95 hover:bg-transparent px-2 py-1.5 rounded min-w-max'
          onClick={() => {
            send({ type: 'REMOVE', payload: { index: indexC() } });
          }}
        >
          {`${select('context.intl.delete')()} -`}
        </button>
        <button
          onClick={_update}
          class='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-sm active:border-2 active:border-blue-800 transition-colors duration-200 h-10 max-h-10'
        >
          {'=>'}
        </button>
      </div>
    </div>
  );
};
