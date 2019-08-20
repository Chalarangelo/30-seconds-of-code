"use strict";

const repl = require(`repl`);

const {
  graphql
} = require(`graphql`);

const bootstrap = require(`../bootstrap`);

const {
  trackCli
} = require(`gatsby-telemetry`);

const {
  loadNodeContent,
  getNodes,
  getNode,
  getNodesByType
} = require(`../db/nodes`);

const {
  store
} = require(`../redux`);

module.exports = async program => {
  trackCli(`REPL_START`); // run bootstrap

  await bootstrap(program); // get all the goodies from the store

  const {
    schema,
    config,
    babelrc,
    pages,
    components,
    staticQueryComponents
  } = store.getState();
  const nodes = getNodes();

  const query = async query => {
    const result = await graphql(schema, query, {}, {}, {});
    console.log(`query result: ${JSON.stringify(result)}`);
  }; // init new repl


  const _ = repl.start({
    prompt: `gatsby > `
  }); // set some globals to make life easier


  _.context.babelrc = babelrc;
  _.context.components = components;
  _.context.getNode = getNode;
  _.context.getNodes = getNodes;
  _.context.getNodesByType = getNodesByType;
  _.context.loadNodeContent = loadNodeContent;
  _.context.nodes = [...nodes.entries()];
  _.context.pages = [...pages.entries()];
  _.context.graphql = query;
  _.context.schema = schema;
  _.context.siteConfig = config;
  _.context.staticQueries = staticQueryComponents;

  _.on(`exit`, () => {
    trackCli(`REPL_STOP`);
    process.exit(0);
  });
};
//# sourceMappingURL=repl.js.map