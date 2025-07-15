import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/solid-start/plugin/vite';
import { defineConfig } from 'vite';
import viteSolid from 'vite-plugin-solid';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 3101,
  },
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({ customViteSolidPlugin: true, target: 'vercel' }),
    viteSolid({ ssr: true }),
    tailwindcss(),
  ],
});
