import {
  NumberField as _NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
} from '#components/number-field';

export const NumberField = () => {
  return (
    <_NumberField defaultValue={1} minValue={0} class="w-xs mx-auto">
      <NumberFieldGroup>
        <NumberFieldDecrementTrigger aria-label="Decrement" />
        <NumberFieldInput />
        <NumberFieldIncrementTrigger aria-label="Increment" />
      </NumberFieldGroup>
    </_NumberField>
  );
};
