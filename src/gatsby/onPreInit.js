import { setupEnv } from 'build/utilities/env';
const { green } = require('chalk');
import paths from 'settings/paths';

/**
 * The first API called during Gatsby execution, runs as soon as
 * plugins are loaded, before cache initialization and
 * bootstrap preparation. Used to prepare the content configs.
 * API docs: https://www.gatsbyjs.com/docs/node-apis/#onPreInit
 */
const onPreInit = () => {
  setupEnv('PRODUCTION');
  process.configs = global.settings.configs;
};

export default onPreInit;
