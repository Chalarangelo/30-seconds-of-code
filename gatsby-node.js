const { green } = require('kleur');

const {
  onCreateNode,
  sourceNodes,
  createResolvers,
  createPages,
  onCreateWebpackConfig,
} = require(`./src/build`);
const {
  parseQueries,
  parseRequirables,
  parseTemplates,
} = require(`./src/build/parsers`);
const paths = require(`./src/config/paths`);

const resolvers = require(`./src/build/resolvers`).default;

const requirables = parseRequirables(paths.contentPath);
console.log(`${green('success')} parse requirables`);

const templates = parseTemplates(paths.templates, paths.templatesPath);
console.log(`${green('success')} parse templates`);

const pagesQuery = parseQueries(paths.queryPath);
console.log(`${green('success')} parse queries`);

exports.createPages = createPages(pagesQuery, templates, requirables);

exports.onCreateNode = onCreateNode;

exports.sourceNodes = sourceNodes(requirables);

exports.createResolvers = createResolvers(resolvers);

exports.onCreateWebpackConfig = onCreateWebpackConfig;
