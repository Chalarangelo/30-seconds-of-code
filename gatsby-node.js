const path = require(`path`);
const {
  onCreateNode,
  sourceNodes,
  createResolvers,
  createPages,
} = require(`./src/functions/build`);
const {createPagesQuery} = require(`./src/queries`);
const config = require('./config');

const requirables = [];

config.requirables.forEach(fileName => {
  requirables.push(require(`./snippet_data/${fileName}`));
});

const templates = {
  'SnippetPage': path.resolve(`./src/templates/snippetPage/index.jsx`),
  'TagPage': path.resolve(`./src/templates/tagPage/index.jsx`),
};

exports.createPages = createPages(createPagesQuery, templates);

exports.onCreateNode = onCreateNode;

exports.sourceNodes = sourceNodes(requirables);

exports.createResolvers = createResolvers;
