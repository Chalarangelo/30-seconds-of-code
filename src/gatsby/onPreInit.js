import { Env } from 'blocks/utilities/env';

/**
 * The first API called during Gatsby execution, runs as soon as
 * plugins are loaded, before cache initialization and
 * bootstrap preparation. Used to prepare the content configs.
 * API docs: https://www.gatsbyjs.com/docs/node-apis/#onPreInit
 */
const onPreInit = () => {
  Env.setup('PRODUCTION');
  process.configs = global.settings.configs;
};

export default onPreInit;
