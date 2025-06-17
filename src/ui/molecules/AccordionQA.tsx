import { Accordion as AccordionD } from '#components/accordion';
import { For, type Accessor, type Component, type JSX } from 'solid-js';

export type AccordionData = { question: JSX.Element; answer: JSX.Element };

export const Item: Component<
  AccordionData & { index: Accessor<number> }
> = ({ question, answer, index }) => {
  return (
    <AccordionD.Item value={`Item - ${index()}`}>
      <AccordionD.Trigger class="cursor-pointer" children={question} />
      <AccordionD.Content class="cursor-pointer" children={answer} />
    </AccordionD.Item>
  );
};

export const AccordionQA: Component<{ data: AccordionData[] }> = ({
  data,
}) => {
  return (
    <AccordionD collapsible class="mx-auto min-w-md">
      <For
        each={data}
        children={(data, index) => {
          const props = { ...data, index };
          return Item(props);
        }}
      />
    </AccordionD>
  );
};

export default AccordionQA;
