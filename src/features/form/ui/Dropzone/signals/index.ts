import { lang, translate } from '#service';
import { mergeProps } from 'solid-js';
import { DEFAULT_PROPS } from '../constants';
import { mergeConditions, parseCSV, verifyFile } from '../helpers';
import type { DropzoneProps } from '../types';
import { simpleSignals } from './simples';

export const dropSignals = (props: DropzoneProps) => {
  const {
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
  } = simpleSignals(props.data);

  let fileInputRef: HTMLInputElement | undefined;

  const config = mergeProps(DEFAULT_PROPS, props);

  // Fonction pour traiter le fichier
  const processFile = async (file: File) => {
    const name = file.name;
    setError(null);
    setIsProcessing(true);
    setFileName(file.name);

    try {
      verifyFile(file, config.maxFileSize);

      // Lecture du fichier
      const text = await file.text();
      const { data, headers } = parseCSV(text, lang());

      setHeaders(headers);
      setPreviewData(data.slice(0, 3)); // Aperçu des 3 premières lignes

      // Callback avec toutes les données
      const conditions = mergeConditions(data, headers, lang());
      setWarnings(conditions.warnings);
      props.onDataLoaded?.({ data, headers, name, conditions });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : translate('pages.form.dropzones.csv.messages.error.default')(
              lang(),
            );
      setError(errorMessage);
      props.onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Gestionnaires d'événements drag & drop
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    softReset();

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  // Gestionnaire pour l'input file
  const handleFileSelect = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  // Clic sur la zone pour ouvrir le sélecteur
  const handleClick = () => {
    softReset();
    fileInputRef?.click();
  };

  const softReset = () => {
    setError(null);
    setFileName();
    setPreviewData([]);
    setHeaders([]);
    setWarnings([]);
  };

  // Reset du composant
  const reset = () => {
    setIsProcessing(true);
    softReset();
    if (fileInputRef) {
      fileInputRef.value = '';
    }
    props.onReset?.();
    setIsProcessing(false);
  };

  const showAds = () => {
    const hasError = !!error();
    const hasWarnings = warnings().length > 0;
    const hasFileName = !!fileName() && !error();

    return hasError || hasWarnings || hasFileName;
  };

  return {
    // #region Signals
    isDragOver,
    isProcessing,
    setIsProcessing,
    error,
    warnings,
    fileName,
    setFileName,
    previewData,
    headers,
    motionH,
    // #endregion

    // #region hooks
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    handleClick,
    reset,
    showAds,
    fileInputRef: (el?: HTMLInputElement) => (fileInputRef = el),
    // #endregion

    // #region Values
    config,
    processMessage,
    tableWidth,
    thStyle,
  };
  // #endregion
};
