const { green } = require('chalk');
const {
  createPages,
  onCreateWebpackConfig,
  onPreInit,
  onPostBuild,
  parseRequirements,
} = require(`./src/gatsby`);

const { requirables, templates} = parseRequirements();
console.log(`${green('success')} parse requirements`);

exports.onPreInit = onPreInit;
exports.onCreateWebpackConfig = onCreateWebpackConfig;
exports.onPostBuild = onPostBuild;
