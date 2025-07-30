import { cn } from '#cn/utils';
import { lang, translate } from '#service';
import type { Component } from 'solid-js';
import { Motion } from 'solid-motionone';
import { FileInput } from './FileInput';

interface DropZoneProps {
  isDragOver: () => boolean;
  isProcessing: () => boolean;
  showAds: () => boolean;
  processMessage: string;
  maxFileSize: number;
  handleDragOver: (e: DragEvent) => void;
  handleDragLeave: (e: DragEvent) => void;
  handleDrop: (e: DragEvent) => void;
  handleClick: () => void;
  handleFileSelect: (e: Event) => void;
  fileInputRef: (el?: HTMLInputElement) => void;
}

export const DropZone: Component<DropZoneProps> = props => {
  return (
    <Motion
      class={cn(
        'border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-200 m-3',
        props.isDragOver()
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400',
        props.isProcessing() && 'pointer-events-none opacity-50',
      )}
      onDragOver={props.handleDragOver}
      onDragLeave={props.handleDragLeave}
      onDrop={props.handleDrop}
      onClick={props.handleClick}
      animate={{
        scale: props.isDragOver() ? 1.02 : 1,
        padding: props.showAds() ? '1rem' : '2rem',
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <FileInput
        ref={props.fileInputRef}
        onChange={props.handleFileSelect}
      />

      <div class='flex flex-col items-center space-y-4'>
        <div class='text-4xl text-gray-400'>
          {props.isProcessing() ? '⏳' : '📊'}
        </div>

        <div class='text-lg font-medium text-gray-700'>
          {props.processMessage}
        </div>

        <div class='text-xs text-gray-500'>
          {translate('pages.form.dropzones.csv.labels.accept', {
            MAX: props.maxFileSize,
          })(lang())}
        </div>
      </div>
    </Motion>
  );
};
