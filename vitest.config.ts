import { aliasTs } from '@bemedev/vitest-alias';
import { exclude } from '@bemedev/vitest-exclude';
import solid from 'vite-plugin-solid';
import { defineConfig } from 'vitest/config';

import tsconfig from './tsconfig.json';

export default defineConfig({
  plugins: [
    aliasTs(tsconfig as any),
    exclude({
      ignoreCoverageFiles: ['**/index.ts', '**/types.ts'],
      ignoreTestFiles: [],
    }),
    solid(),
  ],
  resolve: {
    conditions: ['development', 'browser'],
  },
  test: {
    passWithNoTests: true,
    coverage: {
      enabled: true,
      extension: 'ts',
      reportsDirectory: '.coverage',
      all: true,
      provider: 'v8',
    },
  },
});
