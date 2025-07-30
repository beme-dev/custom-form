import { lang, translate } from '#service';
import { createComputed, createSignal, type JSX } from 'solid-js';
import {
  COLUMN_WIDTH,
  MAX_COLUMN_WIDTH_FACTOR,
  MIN_COLUMN_WIDTH_FACTOR,
} from '../constants';
import type { DropzoneProps } from '../types';

export const simpleSignals = (data?: DropzoneProps['data']) => {
  const [isDragOver, setIsDragOver] = createSignal(false);
  const [isProcessing, setIsProcessing] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [warnings, setWarnings] = createSignal<string[]>([]);
  const [fileName, setFileName] = createSignal(data?.name);

  const defaultPreviewData = data?.data || [];
  const [previewData, setPreviewData] = createSignal(defaultPreviewData);

  const defaultHeaders = data?.headers || [];
  const [headers, setHeaders] = createSignal<string[]>(defaultHeaders);

  const [motionH, setMotionH] = createSignal(0);

  createComputed(() => {
    const hasError = !!error();
    const hasFilename = !!fileName() && !hasError;
    const hasWarnings = warnings().length > 0 && !hasError;
    const hasFileNameAndWarnings = hasFilename && hasWarnings;
    if (hasError) {
      setMotionH(65);
    } else if (hasFileNameAndWarnings) {
      setMotionH(480);
    } else if (hasFilename) {
      setMotionH(280);
    } else if (hasWarnings) {
      setMotionH(200);
    } else {
      setMotionH(0);
    }
  });

  const tableWidth = `${headers().length * COLUMN_WIDTH}px`;
  const thStyle: JSX.CSSProperties = {
    'max-width': `${COLUMN_WIDTH * MAX_COLUMN_WIDTH_FACTOR}px`,
    'min-width': `${COLUMN_WIDTH * MIN_COLUMN_WIDTH_FACTOR}px`,
  };

  const processMessage = isProcessing()
    ? translate('pages.form.dropzones.csv.labels.processing')(lang())
    : translate('pages.form.dropzones.csv.labels.description')(lang());

  return {
    isDragOver,
    setIsDragOver,
    isProcessing,
    setIsProcessing,
    error,
    setError,
    warnings,
    setWarnings,
    fileName,
    setFileName,
    previewData,
    setPreviewData,
    headers,
    setHeaders,
    motionH,
    processMessage,
    tableWidth,
    thStyle,
  };
};
