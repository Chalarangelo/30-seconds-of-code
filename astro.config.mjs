import { defineConfig } from 'astro/config';
import settings from '#settings/global';

// https://astro.build/config
export default defineConfig({
  site: settings.websiteUrl,
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
});
