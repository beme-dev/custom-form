import {
  For,
  Match,
  Show,
  Switch,
  type Accessor,
  type Component,
} from 'solid-js';
import {
  RadioGroup as _RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemLabel,
} from '../cn/components/ui/radio-group';
import {
  Select as _Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../cn/components/ui/select';
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
    <div class="mb-6 pb-4 flex space-x-3 outline-none">
      <div>
        <input
          class="border p-2 rounded w-full mb-2 outline-none"
          type="text"
          placeholder="Intitulé de la question"
          value={label()}
          onInput={e => setLabel((e.target as HTMLInputElement).value)}
        />
        <FieldTypes type={type} setType={setType} />
        {
          <Show when={len() > 0}>
            <div class="mt-4 flex space-x-4 items-start">
              <div class="space-y-2">
                <For each={options()!}>
                  {(option, idx) => (
                    <div class="flex items-center space-x-2">
                      <input
                        class="border p-1 rounded outline-none"
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
          class="text-red-500 border-2 border-red-700 bg-red-100 shadow-sm active:scale-95 hover:bg-transparent px-2 py-1 rounded"
          onClick={remove}
        >
          Remove -
        </button>
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

const Select: Component<{ options?: Field['options'] }> = ({
  options = [],
}) => (
  <_Select
    options={options}
    placeholder="Votre choix"
    itemComponent={props => (
      <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
    )}
  >
    <SelectTrigger class="w-sm mx-auto overflow-hidden">
      <div class="w-11/12 text-left truncate">
        <SelectValue<string>>
          {state => state.selectedOption()}
        </SelectValue>
      </div>
    </SelectTrigger>
    <SelectContent class="" />
  </_Select>
);

const RadioG: Component<{
  options?: Field['options'];
}> = ({ options = [] }) => (
  <_RadioGroup class="grid gap-2">
    <For each={options}>
      {option => (
        <RadioGroupItem value={option} class="flex items-center gap-2">
          <RadioGroupItemControl />
          <RadioGroupItemLabel class="text-sm">
            {option}
          </RadioGroupItemLabel>
        </RadioGroupItem>
      )}
    </For>
  </_RadioGroup>
);

export const Input: Component<Field> = ({ type, label, options }) => {
  return (
    <div class="mb-4 flex flex-col space-y-3 min-w-lg w-11/12 mx-auto px-2">
      <label
        class="block mb-2 text-sm font-medium text-gray-700"
        for="answer"
      >
        {label}
      </label>
      <Switch>
        <Match when={type === 'text'}>
          <input
            type={type}
            class="border p-2 rounded w-full outline-none"
            placeholder={`Respond`}
            name="answer"
          />
        </Match>

        <Match when={type === 'checkbox'}>
          <RadioG options={options} />
        </Match>

        <Match when={type === 'select'}>
          <Select options={options} />
        </Match>
      </Switch>
    </div>
  );
};
