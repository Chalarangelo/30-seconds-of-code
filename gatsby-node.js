const { green } = require('kleur');

const {
  onCreateNode,
  sourceNodes,
  createResolvers,
  createPages,
  onCreateWebpackConfig,
} = require(`./src/build`);
const {
  createPagesQuery,
  getLogoSrc,
  getImages,
  getSearchIndex,
} = require(`./src/queries`);
const {
  parseQueries,
  parseRequirables,
  parseResolvers,
  parseTemplates,
} = require(`./src/build/parsers`);
const paths = require(`./src/config/paths`);
const reducers = require(`./src/build/reducers`).default;

const requirables = parseRequirables(paths.contentPath);
console.log(`${green('success')} parse requirables`);

const resolvers = parseResolvers(paths.contentPath);
console.log(`${green('success')} parse resolvers`);

const templates = parseTemplates(paths.templates, paths.templatesPath);
console.log(`${green('success')} parse templates`);

const pagesQuery = parseQueries(getLogoSrc, createPagesQuery, getSearchIndex, getImages);
console.log(`${green('success')} parse queries`);

exports.createPages = createPages(pagesQuery, templates, requirables);

exports.onCreateNode = onCreateNode;

exports.sourceNodes = sourceNodes(requirables, reducers);

exports.createResolvers = createResolvers(resolvers);

exports.onCreateWebpackConfig = onCreateWebpackConfig;
