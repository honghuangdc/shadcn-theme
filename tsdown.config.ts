import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  platform: 'neutral',
  external: ['@soybeanjs/colord'],
  clean: true,
  dts: true,
  sourcemap: false,
  minify: true
});
