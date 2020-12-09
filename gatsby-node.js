const { Requirements } = require('build/utilities/requirements');
const { green } = require('chalk');
const {
  createPagesStatefully,
  onCreateWebpackConfig,
  onPreInit,
  onPostBuild,
  onCreateDevServer,
} = require(`./src/gatsby`);

const { requirables, templates } = Requirements.load();
console.log(`${green('success')} parse requirements`);

exports.onPreInit = onPreInit;
exports.createPagesStatefully = createPagesStatefully(templates, requirables);
exports.onCreateWebpackConfig = onCreateWebpackConfig;
exports.onPostBuild = onPostBuild;
exports.onCreateDevServer = onCreateDevServer;
