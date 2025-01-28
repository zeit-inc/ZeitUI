import { defineConfig } from 'tsup';

export default defineConfig({
  target: 'es2022',
  format: ['cjs', 'esm'],
  clean: true,
  banner: { js: '"use client";' },
});
