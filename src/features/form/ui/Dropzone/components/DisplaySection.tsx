import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { Motion, Presence } from 'solid-motionone';
import type { DropzoneProps } from '../types';
import { ErrorMessage } from './ErrorMessage';
import { FilePreview } from './FilePreview';
import { WarningsDisplay } from './WarningsDisplay';

interface DisplaySectionProps {
  showAds: () => boolean;
  motionH: () => number;
  error: () => string | null;
  warnings: () => string[];
  fileName: () => string | undefined;
  previewData: () => Record<string, any>[];
  headers: () => string[];
  tableWidth: string;
  thStyle: any;
  reset: () => void;
  props: DropzoneProps;
}

export const DisplaySection: Component<DisplaySectionProps> = props => {
  return (
    <Presence>
      <Show when={props.showAds()}>
        <Motion
          exit={{
            height: 0,
            transition: {
              duration: 0.4,
              easing: 'linear',
              delay: 0.4,
            },
          }}
          initial={{ opacity: 0, scale: 0.5, y: -10 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            height: `${props.motionH()}px`,
          }}
          transition={{ duration: 0.3, easing: 'ease-in-out' }}
          class='overflow-hidden'
          style={{ height: `${props.motionH()}px` }}
        >
          <ErrorMessage error={props.error} />

          <WarningsDisplay warnings={props.warnings} error={props.error} />

          <FilePreview
            fileName={props.fileName}
            error={props.error}
            previewData={props.previewData}
            headers={props.headers}
            tableWidth={props.tableWidth}
            thStyle={props.thStyle}
            reset={props.reset}
            props={props.props}
          />
        </Motion>
      </Show>
    </Presence>
  );
};
