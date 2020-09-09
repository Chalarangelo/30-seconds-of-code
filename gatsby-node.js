const { green } = require('chalk');
const {
  createPagesStatefully,
  onCreateWebpackConfig,
  onPreInit,
  onPostBuild,
  parseRequirements,
} = require(`./src/gatsby`);

const { requirables, templates} = parseRequirements();
console.log(`${green('success')} parse requirements`);

exports.onPreInit = onPreInit;
exports.createPagesStatefully = createPagesStatefully(templates, requirables);
exports.onCreateWebpackConfig = onCreateWebpackConfig;
exports.onPostBuild = onPostBuild;
