import type { Component } from 'solid-js';
import { EXTENSIONS } from '../constants';

interface FileInputProps {
  ref: (el?: HTMLInputElement) => void;
  onChange: (e: Event) => void;
}

export const FileInput: Component<FileInputProps> = props => {
  return (
    <input
      ref={props.ref}
      type='file'
      accept={`${EXTENSIONS.csv},${EXTENSIONS.type}`}
      class='hidden'
      onChange={props.onChange}
    />
  );
};
