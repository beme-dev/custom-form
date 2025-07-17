import {
  createSignal,
  Match,
  Show,
  Switch,
  type Component,
} from 'solid-js';
import { Select } from '../Select';

export const ConditionalField: Component<{
  merged?: any;
}> = ({ merged }) => {
  const isArray = () =>
    merged && Array.isArray(merged) && merged.length > 0;

  return (
    <Switch fallback={<RecursiveConditional merged={merged} />}>
      <Match when={isArray()}>
        <Select options={merged} />
      </Match>
    </Switch>
  );
};

const RecursiveConditional: Component<{
  merged?: any;
}> = ({ merged }) => {
  // Si merged est un tableau, on affiche le Select final
  if (Array.isArray(merged)) {
    return <Select options={merged} />;
  }

  // Si merged est un objet, on affiche un Select pour les clés
  const keys = Object.keys(merged ?? {});
  const [selected, setSelected] = createSignal<string | null>(null);

  return (
    <Show when={keys.length > 0}>
      <Select options={keys} onChange={setSelected} />
      <Show when={!!selected() && merged[selected()!]}>
        <RecursiveConditional merged={merged[selected()!]} />
      </Show>
    </Show>
  );
};
