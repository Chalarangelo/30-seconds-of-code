const {
  onCreateNode,
  sourceNodes,
  createResolvers,
  createPages,
} = require(`./src/functions/build`);
const {
  createPagesQuery,
  getLogoSrc,
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
const reducers = parseReducers(config.contentPath);
const resolvers = parseResolvers(config.contentPath);
const templates = parseTemplates(config.templates, config.templatesPath);
const pagesQuery = parseQueries(getLogoSrc, createPagesQuery);

exports.createPages = createPages(pagesQuery, templates);

exports.onCreateNode = onCreateNode;

exports.sourceNodes = sourceNodes(requirables, reducers);

exports.createResolvers = createResolvers(resolvers);
