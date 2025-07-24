import { resolve as _resolve, basename } from 'path';

export const resolve = (path: string) => {
  const _path = _resolve(process.cwd(), path);
  const filename = new RegExp(basename(path));

  return {
    path: _path,
    filename,
  };
};
