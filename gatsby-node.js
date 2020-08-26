const { green } = require('chalk');
const env = require('./.build/env').default;

const {
  createPages,
  onCreateWebpackConfig,
} = require(`./src/build`);
const {
  parseRequirables,
  parseTemplates,
} = require(`./src/build/parsers`);
const paths = require(`./src/config/paths`);

const requirables = parseRequirables(paths.contentPath);
console.log(`${green('success')} parse requirables`);

const templates = parseTemplates(env === 'DEVELOPMENT' ? paths.devTemplates : paths.templates, paths.templatesPath);
console.log(`${green('success')} parse templates`);

exports.createPages = createPages(templates, requirables);

exports.onCreateWebpackConfig = onCreateWebpackConfig;
