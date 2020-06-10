import schema from 'typedefs';

/**
 * Extension point to tell plugins to source nodes.
 * Defines the custom Snippet type.
 * Populates the newly-created nodes.
 * API docs: https://www.gatsbyjs.org/docs/node-apis/#sourceNodes
 */
const sourceNodes = requirables => ({ actions, createNodeId, createContentDigest }) => {
  const { createTypes, createNode } = actions;

  // Create the GraphQL schema, adding the custom types
  const typeDefs = `${schema}`;
  createTypes(typeDefs);

  // Use the passed requirables (JSON files) to create the GraphQL nodes for
  // the snippet data nodes they include.
  requirables
    .forEach(sArr => {
      sArr.data.forEach(sNode => {
        createNode({
          id: createNodeId(`snippet${sNode.slug}`),
          parent: null,
          children: [],
          internal: {
            type: 'Snippet',
            content: JSON.stringify(sNode),
            contentDigest: createContentDigest(sNode),
          },
          ...sNode,
        });
      });
    });
};

export default sourceNodes;
