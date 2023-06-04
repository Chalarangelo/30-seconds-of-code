import { defineConfig } from 'astro/config';
import settings from './src/settings/global.json';

import compress from 'astro-compress';
import critters from 'astro-critters';

// https://astro.build/config
export default defineConfig({
  site: settings.websiteUrl,
  experimental: {
    inlineStylesheets: 'always',
  },
  integrations: [
    compress({
      img: false,
      html: true,
      js: true,
      svg: true,
      css: true,
      logger: 1,
    }),
  ],
});
