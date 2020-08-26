const { green } = require('chalk');
const {
  createPages,
  onCreateWebpackConfig,
  parseRequirements,
} = require(`./src/gatsby`);

const { requirables, templates} = parseRequirements();
console.log(`${green('success')} parse requirements`);

exports.createPages = createPages(templates, requirables);
exports.onCreateWebpackConfig = onCreateWebpackConfig;
