import { For, Show, type Accessor, type Component } from 'solid-js';
import {
  createField,
  FIELD_TYPES,
  type Field,
  type FieldType,
} from './Form.hooks';

export const FieldTypes: Component<{
  type: Accessor<FieldType>;
  setType: (type: FieldType) => void;
}> = ({ type, setType }) => {
  return (
    <select
      class="border p-2 rounded mb-2"
      value={type()}
      name="fieldType"
      onInput={e => {
        setType(e.target.value as FieldType);
      }}
    >
      {FIELD_TYPES.map(opt => (
        <option value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
};

export const CreateField: Component<{
  field: Field;
  update: (field: Field) => void;
  remove: () => void;
}> = ({ update, remove, field: _field }) => {
  const {
    setLabel,
    setType,
    addOption,
    updateOption,
    options,
    label,
    type,
    setOptions,
  } = createField();
  setLabel(_field.label);
  setType(_field.type);
  setOptions(_field.options);

  const len = () => options()?.length || -1;

  return (
    <div class="mb-6 border-b pb-4 flex">
      <div>
        <input
          class="border p-2 rounded w-full mb-2"
          type="text"
          placeholder="Intitulé de la question"
          value={label()}
          onInput={e => setLabel((e.target as HTMLInputElement).value)}
        />
        <FieldTypes type={type} setType={setType} />
        {
          <Show when={len() > 0}>
            <div class="mt-4 flex space-x-4 items-start">
              <div>
                <For each={options()!}>
                  {(option, idx) => (
                    <div class="flex items-center mb-1">
                      <input
                        class="border p-1 rounded flex-1"
                        type="text"
                        placeholder={`Option ${idx() + 1}`}
                        value={option}
                        onBlur={e => {
                          const fn = async () =>
                            updateOption(
                              idx(),
                              (e.target as HTMLInputElement).value,
                            );
                          fn();
                        }}
                      />
                      <button
                        class="ml-2 text-red-600"
                        type="button"
                        onClick={() => {
                          setOptions(prev => {
                            if (!prev) return prev;
                            const updated = [...prev];
                            updated.splice(idx(), 1);
                            return updated;
                          });
                        }}
                      >
                        X
                      </button>
                    </div>
                  )}
                </For>
              </div>
              <button
                class="ml-2 text-xs text-blue-600 mt-4 size-6 border-blue-300 border-2 rounded-md text-center content-center pb-0.5 shadow-lg active:scale-90 hover:bg-blue-100 ease-in-out duration-200 transition-colors"
                type="button"
                onClick={() => addOption()}
              >
                +
              </button>
            </div>
          </Show>
        }
      </div>
      <div class="flex flex-col Space-y-2 ml-4">
        <button onClick={remove}>Remove -</button>
        <button
          onClick={() => {
            update({
              label: label(),
              type: type(),
              options: options(),
            });
          }}
          class="mt-2 bg-blue-500 text-white p-2 rounded"
        >
          {'=>'}
        </button>
      </div>
    </div>
  );
};
