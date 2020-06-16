const { green } = require('kleur');

const {
  sourceNodes,
  createPages,
  onCreateWebpackConfig,
} = require(`./src/build`);
const {
  parseQueries,
  parseRequirables,
  parseTemplates,
} = require(`./src/build/parsers`);
const paths = require(`./src/config/paths`);

const requirables = parseRequirables(paths.contentPath);
console.log(`${green('success')} parse requirables`);

const templates = parseTemplates(paths.templates, paths.templatesPath);
console.log(`${green('success')} parse templates`);

const pagesQuery = parseQueries(paths.queryPath);
console.log(`${green('success')} parse queries`);

exports.createPages = createPages(pagesQuery, templates, requirables);

exports.sourceNodes = sourceNodes(requirables);

exports.onCreateWebpackConfig = onCreateWebpackConfig;
