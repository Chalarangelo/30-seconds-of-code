import { defineConfig } from 'astro/config';
import settings from '#src/astro/settings.js';

// https://astro.build/config
export default defineConfig({
  site: settings.websiteUrl,
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  srcDir: 'src/astro',
});
