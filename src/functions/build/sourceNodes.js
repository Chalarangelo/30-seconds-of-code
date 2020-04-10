
import { Snippet } from 'typedefs';

/**
 * Extension point to tell plugins to source nodes.
 * Defines the custom Snippet type.
 * Populates the newly-created nodes.
 */
const sourceNodes = (requirables, reducers) => ({ actions, createNodeId, createContentDigest, getNodesByType }) => {
  const { createTypes, createNode } = actions;

  const typeDefs = `${Snippet}`;
  createTypes(typeDefs);

  const markdownNodes = getNodesByType('MarkdownRemark');

  let snippetNodes = requirables
    .reduce((acc, sArr) => {
      const commonData = {
        blog: sArr.meta.blog,
        language: sArr.meta.language,
        icon: sArr.meta.theme ? sArr.meta.theme.iconName : null,
        otherLanguages: sArr.meta.otherLanguages,
        sourceDir: sArr.meta.sourceDir,
        slugPrefix: sArr.meta.slugPrefix,
        repoUrlPrefix: sArr.meta.repoUrlPrefix,
        reducer: sArr.meta.reducer,
        resolver: sArr.meta.resolver,
        biasPenaltyMultiplier: sArr.meta.biasPenaltyMultiplier,
      };
      return ({
        ...acc,
        ...sArr.data.reduce((snippets, snippet) => {
          return ({
            ...snippets,
            [`${commonData.sourceDir}/${snippet.id}`]: {
              ...snippet,
              ...commonData,
            },
          });
        }, {}),
      });
    }, {});

  Object.entries(snippetNodes).forEach(([id, sNode]) => {
    let mNode = markdownNodes.find(mN => mN.fileAbsolutePath.includes(`${id}.md`));
    let reducer = reducers[sNode.reducer];
    let nodeContent = reducer(id, sNode, mNode);
    nodeContent.resolver = sNode.resolver;

    createNode({
      id: createNodeId(`snippet-${sNode.meta.hash}`),
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
