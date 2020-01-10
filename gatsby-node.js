const { green } = require('kleur');

const {
  onCreateNode,
  sourceNodes,
  createResolvers,
  createPages,
  onCreateWebpackConfig,
} = require(`./src/functions/build`);
const {
  createPagesQuery,
  getLogoSrc,
  getImages,
  getSearchIndex,
} = require(`./src/queries`);
const {
  parseQueries,
  parseRequirables,
  parseReducers,
  parseResolvers,
  parseTemplates,
} = require(`./src/functions/parsers`);
const config = require('./config');

const requirables = parseRequirables(config.contentPath);
console.log(`${green('success')} parse requirables`);

const reducers = parseReducers(config.contentPath);
console.log(`${green('success')} parse reducers`);

const resolvers = parseResolvers(config.contentPath);
console.log(`${green('success')} parse resolvers`);

const templates = parseTemplates(config.templates, config.templatesPath);
console.log(`${green('success')} parse templates`);

const pagesQuery = parseQueries(getLogoSrc, createPagesQuery, getSearchIndex, getImages);
console.log(`${green('success')} parse queries`);

exports.createPages = createPages(pagesQuery, templates, requirables);

exports.onCreateNode = onCreateNode;

exports.sourceNodes = sourceNodes(requirables, reducers);

exports.createResolvers = createResolvers(resolvers);

exports.onCreateWebpackConfig = onCreateWebpackConfig;
