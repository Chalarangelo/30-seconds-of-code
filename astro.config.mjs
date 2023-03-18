import { defineConfig } from 'astro/config';
import settings from './src/settings/global.json';

// https://astro.build/config
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: settings.websiteUrl,
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
