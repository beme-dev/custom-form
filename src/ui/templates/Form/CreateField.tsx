import { debounceFn } from '#signals/debounce';
import {
  For,
  onCleanup,
  Show,
  type Accessor,
  type Component,
} from 'solid-js';
import { context, select, send } from '~/services/main';
import { FieldTypes } from './FieldTypes';
import { FocusInput } from './FocusInput';
import { createField, setFocus, toFocus } from './signals';
import type { Field } from './types';

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

  console.log('CreateField', field, indexC());

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

  const onInput = debounceFn(_update, 500);
  onCleanup(onInput.cancel);
  const len = () => options()?.length || -1;
  const autofocus = (value: string) => toFocus() === value;

  return (
    <div class="mb-6 pb-4 flex space-x-3 outline-none">
      <div>
        <FocusInput
          class="border p-2 rounded w-full mb-2 outline-none"
          type="text"
          placeholder={select('intl.question')()}
          name={`${indexC()}->question`}
          value={label()}
          autofocus={autofocus(`${indexC()}->question`)}
          onInput={e => {
            const label = e.target.value;
            // setLabel((e.target as HTMLInputElement).value);
            setLabel(label);

            onInput();
            setFocus(`${indexC()}->question`);
          }}
          // onBlur={onBlur}
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
          <div class="mt-4 flex space-x-4 items-start">
            <div class="space-y-2">
              <For each={options()}>
                {(option, index) => (
                  <div class="flex items-center space-x-2">
                    <FocusInput
                      class="border p-1 rounded outline-none"
                      type="text"
                      placeholder={`${select('intl.option.placeholder')()} ${index() + 1}`}
                      name={`${indexC()}->options->${index()}`}
                      value={option}
                      onInput={e => {
                        const value = (e.target as HTMLInputElement).value;

                        updateOption(index(), value);
                        onInput();
                        setFocus(`${indexC()}->options->${index()}`);
                      }}
                    />
                    <button
                      class="ml-2 text-red-600"
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        deleteOption(index());

                        // #region Rinit if no options
                        const checkEmpty = context(c => {
                          const toCheck = c.current?.options?.length;
                          return !toCheck || toCheck === 0;
                        });

                        if (checkEmpty()) {
                          setType('text');
                          setFocus(`${indexC()}->question`);
                          _update();
                        } else _update();
                        // #endregion
                      }}
                    >
                      X
                    </button>
                  </div>
                )}
              </For>
            </div>
            <button
              class="text-xs text-blue-600 mt-4 size-6 border-blue-300 border-2 rounded-md text-center content-center pb-0.5 shadow-lg active:scale-90 hover:bg-blue-100 ease-in-out duration-200 transition-colors"
              type="button"
              onClick={() => {
                setFocus(`${indexC()}->options->${len()}`);
                addOption();
                _update();
              }}
            >
              +
            </button>
          </div>
        </Show>
      </div>
      <div class="flex flex-col space-y-2">
        <button
          class="text-red-500 border-2 border-red-700 bg-red-100 shadow-sm active:scale-95 hover:bg-transparent px-2 py-1.5 rounded min-w-max"
          onClick={() => {
            send({ type: 'REMOVE', payload: { index: indexC() } });
          }}
        >
          {`${select('intl.delete')()} -`}
        </button>
        <button
          onClick={_update}
          class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-sm active:border-2 active:border-blue-800 transition-colors duration-200 h-10 max-h-10"
        >
          {'=>'}
        </button>
      </div>
    </div>
  );
};
