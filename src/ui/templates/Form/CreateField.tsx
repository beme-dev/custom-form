import { For, Show, type Component } from 'solid-js';
import { FieldTypes } from './FieldTypes';
import { FocusInput } from './FocusInput';
import { createDebounce, createField, setFocus, toFocus } from './hooks';
import type { Field } from './types';

export const CreateField: Component<{
  field: Field;
  update: (field: Field) => void;
  remove: () => void;
  index: number;
}> = ({ update, remove, field: _field, index: indexC }) => {
  const {
    setLabel,
    setType,
    addOption,
    options,
    label,
    type,
    setOptions,
  } = createField();
  setLabel(_field.label);
  setType(_field.type);
  setOptions(_field.options);

  const onInput = createDebounce(update, 700);

  const submit = () => {
    update({
      label: label(),
      type: type(),
      options: options(),
    });
  };

  const len = () => options()?.length || -1;
  const safeOptions = () => options() || [];

  const autofocus = (value: string) => toFocus() === value;

  return (
    <div class="mb-6 pb-4 flex space-x-3 outline-none">
      <div>
        <FocusInput
          class="border p-2 rounded w-full mb-2 outline-none"
          type="text"
          placeholder="Intitulé de la question"
          name={`${indexC}->question`}
          value={label()}
          autofocus={autofocus(`${indexC}->question`)}
          onInput={e => {
            setLabel((e.target as HTMLInputElement).value);

            onInput({
              label: e.target.value,
              type: type(),
              options: options(),
            });
            setFocus(`${indexC}->question`);
          }}
          // onBlur={onBlur}
        />
        <FieldTypes
          type={type}
          name={`${indexC}->type`}
          setType={value => {
            setType(value);
            onInput({
              label: label(),
              type: value,
              options: options(),
            });
            setFocus(`${indexC}->type`);
          }}
        />
        {
          <Show when={len() > 0}>
            <div class="mt-4 flex space-x-4 items-start">
              <div class="space-y-2">
                <For each={safeOptions()}>
                  {(option, index) => (
                    <div class="flex items-center space-x-2">
                      <FocusInput
                        class="border p-1 rounded outline-none"
                        type="text"
                        placeholder={`Option ${index() + 1}`}
                        name={`${indexC}->options->${index()}`}
                        value={option}
                        onInput={e => {
                          const value = (e.target as HTMLInputElement)
                            .value;

                          onInput({
                            label: label(),
                            type: type(),
                            options: options()?.map((opt, i) =>
                              i === index() ? value : opt,
                            ),
                          });

                          setFocus(`${indexC}->options->${index()}`);
                        }}
                      />
                      <button
                        class="ml-2 text-red-600"
                        type="button"
                        onClick={() => {
                          setOptions(prev => {
                            if (!prev) return prev;
                            const updated = [...prev];
                            updated.splice(index(), 1);
                            return updated;
                          });
                          submit();
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
                onClick={() => addOption()}
              >
                +
              </button>
            </div>
          </Show>
        }
      </div>
      <div class="flex flex-col space-y-2">
        <button
          class="text-red-500 border-2 border-red-700 bg-red-100 shadow-sm active:scale-95 hover:bg-transparent px-2 py-1.5 rounded"
          onClick={remove}
        >
          Remove -
        </button>
        <button
          onClick={submit}
          class="bg-blue-500 text-white p-2 rounded"
        >
          {'=>'}
        </button>
      </div>
    </div>
  );
};
