import CSVDialog from '#features/form/ui/Dialog';
import { FocusTextArea } from '#molecules/FocusTextArea';
import { lang, send, translate, type Field } from '#service';
import { onCaret } from '#signals/caret';
import { debounceFn } from '#signals/debounce';
import { setFocus, toFocus } from '#signals/focus';
import {
  createMemo,
  For,
  onCleanup,
  Show,
  type Accessor,
  type Component,
  type ComponentProps,
} from 'solid-js';
import { createField } from '~/routes/form/-signals';
import { FieldTypes } from './FieldTypes';

type Comp = ComponentProps<typeof CSVDialog>['trigger'];

const Trigger: Comp = () => (
  <span class='px-6 py-3 bg-orange-600 text-white rounded-lg transition-all font-medium shadow-lg active:inset-shadow-sm inset-shadow-orange-800 active:scale-90 active:ring-yellow-900 active:ring-4 select-none'>
    {translate('pages.form.dropzones.csv.buttons.load')(lang())}
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
    setData,
    data,
  } = createField();

  setType(field.type);
  setLabel(field.label);
  setOptions(field.options);
  setData(field.data);

  const payload = createMemo(() => ({
    index: indexC(),
    value: {
      label: label(),
      options: options(),
      type: type(),
      data: data(),
    },
  }));

  const update = () =>
    send({
      type: 'UPDATE',
      payload: payload(),
    });

  const updateNow = () =>
    send({
      type: 'UPDATE:NOW',
      payload: payload(),
    });

  const updateO = debounceFn(
    (...args: Parameters<typeof updateOption>) => {
      updateOption(...args);
      updateNow();
    },
    300,
  );

  onCleanup(() => {
    // onInput.cancel();
    updateO.cancel();
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
          placeholder={translate('pages.form.inputs.question.placeholder')(
            lang(),
          )}
          name={nameQ}
          value={label()}
          // autofocus={autofocus(nameQ)}
          onFocus={onCaret(nameQ)}
          onInput={e => {
            const label = e.target.value;
            // setLabel((e.target as HTMLInputElement).value);
            setLabel(label);
            update();
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
            updateNow();
          }}
        />
        <Show when={len() > 0}>
          <div class='mt-4 flex space-x-4 items-start w-full'>
            <div class='space-y-2 w-full'>
              <For each={options()}>
                {(option, index) => {
                  const name = `${indexC()}->options->${index()}`;
                  const placeholder = translate(
                    'pages.form.selects.inputs.placeholder',
                  )(lang());
                  return (
                    <div class='flex items-center space-x-2'>
                      <FocusTextArea
                        class='border p-2 rounded outline-none min-h-9 h-12 max-h-48 w-full'
                        // type="text"
                        placeholder={`${placeholder} ${index() + 1}`}
                        name={name}
                        // tabIndex={index()}
                        value={option}
                        onFocus={onCaret(name)}
                        autofocus={toFocus()?.name === name}
                        onInput={e => {
                          const value = e.target.value;

                          updateO(index(), value);
                          // update();
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
                            updateNow();
                            deleteOption(len() - 1);
                            updateNow();
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

                              updateNow();
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
                            updateNow();
                          } else updateNow();
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
                updateNow();
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
            onDataLoaded={args => {
              setData({
                data: args.data,
                headers: args.headers,
                merged: args.conditions.merged,
                name: args.name,
              });
              // update();
            }}
            maxFileSize={10}
            timeout={3000}
            data={data()}
            update={updateNow}
            onReset={() => {
              setData();
              updateNow();
            }}
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
          {`${translate('pages.form.buttons.fields.delete')(lang())} -`}
        </button>
        <button
          onClick={update}
          class='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-sm active:border-2 active:border-blue-800 transition-colors duration-200 h-10 max-h-10'
          name='update-field'
        >
          {'=>'}
        </button>
      </div>
    </div>
  );
};
