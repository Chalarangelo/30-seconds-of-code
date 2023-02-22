import { defineConfig } from 'astro/config';
import settings from './src/settings/global.json';

// https://astro.build/config
export default defineConfig({
  site: settings.websiteUrl,
});
