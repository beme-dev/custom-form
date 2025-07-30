import { cn } from '#cn/utils';
import type { Component } from 'solid-js';
import { DisplaySection, DropZone } from './components';
import { dropSignals } from './signals';
import type { DropzoneProps } from './types';

export const CSVDropzone: Component<DropzoneProps> = props => {
  const {
    isDragOver,
    isProcessing,
    error,
    warnings,
    fileName,
    previewData,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileSelect,
    headers,
    reset,
    fileInputRef,
    config,
    showAds,
    handleClick,
    motionH,
    processMessage,
    tableWidth,
    thStyle,
  } = dropSignals(props);

  return (
    <div
      class={cn('w-full max-w-2xl mx-auto overflow-hidden', props.class)}
    >
      <DropZone
        isDragOver={isDragOver}
        isProcessing={isProcessing}
        showAds={showAds}
        processMessage={processMessage}
        maxFileSize={config.maxFileSize}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleDrop={handleDrop}
        handleClick={handleClick}
        handleFileSelect={handleFileSelect}
        fileInputRef={fileInputRef}
      />

      <DisplaySection
        showAds={showAds}
        motionH={motionH}
        error={error}
        warnings={warnings}
        fileName={fileName}
        previewData={previewData}
        headers={headers}
        tableWidth={tableWidth}
        thStyle={thStyle}
        reset={reset}
        props={props}
      />
    </div>
  );
};

export default CSVDropzone;

export * from './types';
