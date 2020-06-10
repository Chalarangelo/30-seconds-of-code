import schema from 'typedefs';

/**
 * Extension point to tell plugins to source nodes.
 * Defines the custom Snippet type.
 * Populates the newly-created nodes.
 * API docs: https://www.gatsbyjs.org/docs/node-apis/#sourceNodes
 */
const sourceNodes = (requirables, reducers) => ({ actions, createNodeId, createContentDigest, getNodesByType }) => {
  const { createTypes, createNode } = actions;

  // Create the GraphQL schema, adding the custom types
  const typeDefs = `${schema}`;
  createTypes(typeDefs);

  const markdownNodes = getNodesByType('MarkdownRemark');

  // Use the passed requirables (JSON snippet_data files) to create a list of
  // snippet nodes as an object with each key representing the id of a snippet.
  let snippetNodes = requirables
    .reduce((acc, sArr) => {
      return ({
        ...acc,
        ...sArr.data.reduce((snippets, snippet) => {
          return ({
            ...snippets,
            [`${sArr.meta.sourceDir}/${snippet.id}`]: snippet,
          });
        }, {}),
      });
    }, {});

  // Find the relevant information for each snippet node (markdown node, reducer,
  // resolver etc.) and create an actual GraphQL node from it, combining it as
  // necessary (call the reducer to parse the content, set up type and id etc.).
  Object.entries(snippetNodes).forEach(([id, sNode]) => {
    let mNode = markdownNodes.find(mN => mN.fileAbsolutePath.includes(`${id}.md`));
    let reducer = reducers[sNode.reducer];
    let nodeContent = reducer(id, sNode, mNode);
    nodeContent.resolver = sNode.resolver;

    createNode({
      id: createNodeId(`snippet${sNode.slug}`),
      parent: null,
      children: [],
      internal: {
        type: 'Snippet',
        content: JSON.stringify(nodeContent),
        contentDigest: createContentDigest(nodeContent),
      },
      ...nodeContent,
    });
  });
};

export default sourceNodes;
