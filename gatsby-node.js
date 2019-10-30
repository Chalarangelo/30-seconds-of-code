const path = require(`path`);
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
} = require(`./src/functions/parsers`);
const config = require('./config');

const requirables = parseRequirables(config.contentPath);
const reducers = parseReducers(config.contentPath);
const resolvers = parseResolvers(config.contentPath);

const templates = {
  'SnippetPage': path.resolve(`./src/templates/snippetPage/index.jsx`),
  'TagPage': path.resolve(`./src/templates/tagPage/index.jsx`),
};

const pagesQuery = parseQueries(getLogoSrc, createPagesQuery);

exports.createPages = createPages(pagesQuery, templates);

exports.onCreateNode = onCreateNode;

exports.sourceNodes = sourceNodes(requirables, reducers);

exports.createResolvers = createResolvers(resolvers);
