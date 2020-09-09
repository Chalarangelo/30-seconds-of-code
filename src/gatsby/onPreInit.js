import { loadContentConfigs } from 'build/config';
const { green } = require('chalk');
import paths from 'config/paths';

/**
 * The first API called during Gatsby execution, runs as soon as
 * plugins are loaded, before cache initialization and
 * bootstrap preparation. Used to prepare the content configs.
 * API docs: https://www.gatsbyjs.com/docs/node-apis/#onPreInit
 */
const onPreInit = () => {
  global.yild = global.yild || {};
  global.yild.paths = paths;
  process.configs =
    loadContentConfigs(paths.rawContentPath, msg => {
      console.log(`${green('success')} ${msg}`);
    });
};

export default onPreInit;
