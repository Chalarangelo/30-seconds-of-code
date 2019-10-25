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
const { parseQueries } = require(`./src/functions/parsers`);
const config = require('./config');

const requirables = [];

config.requirables.forEach(fileName => {
  requirables.push(require(`./content/sources/30python/snippet_data/${fileName}`));
});

const templates = {
  'SnippetPage': path.resolve(`./src/templates/snippetPage/index.jsx`),
  'TagPage': path.resolve(`./src/templates/tagPage/index.jsx`),
};

const pagesQuery = parseQueries(getLogoSrc, createPagesQuery);

exports.createPages = createPages(pagesQuery, templates);

exports.onCreateNode = onCreateNode;

exports.sourceNodes = sourceNodes(requirables);

exports.createResolvers = createResolvers;
