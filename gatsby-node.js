const { green } = require('chalk');
const env = require('./.build/env').default;

const {
  createPages,
  onCreateWebpackConfig,
  parseRequirements,
} = require(`./src/gatsby`);
const paths = require(`./src/config/paths`);

const { requirables, templates} = parseRequirements(
  env === 'DEVELOPMENT' ? paths.devTemplates : paths.templates,
  paths.templatesPath,
  paths.contentPath
);
console.log(`${green('success')} parse requirements`);

exports.createPages = createPages(templates, requirables);

exports.onCreateWebpackConfig = onCreateWebpackConfig;
