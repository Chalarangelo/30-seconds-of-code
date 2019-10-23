
import { Snippet } from 'types';
import { EXPERTISE_LEVELS } from 'shared';

/**
 * Given an array of tags, determine the expertise level.
 */
const determineExpertiseFromTags = tags =>
  tags.reduce((expertise, tag) =>
    EXPERTISE_LEVELS.includes(tag) ? tag : expertise,
  EXPERTISE_LEVELS[1]
  );

/**
 * Extension point to tell plugins to source nodes.
 * Defines the custom Snippet type.
 * Populates the newly-created nodes.
 */
const sourceNodes = requirables => ({ actions, createNodeId, createContentDigest, getNodesByType }) => {
  const { createTypes, createNode } = actions;

  const typeDefs = Snippet;
  createTypes(typeDefs);

  const markdownNodes = getNodesByType('MarkdownRemark');

  const snippetNodes = requirables
    .reduce((acc, sArr) => {
      const archivedScope = false;
      return ({
        ...acc,
        ...sArr.data.reduce((snippets, snippet) => {
          return ({
            ...snippets,
            [snippet.id]: { ...snippet, archived: archivedScope },
          });
        }, {}),
      });
    }, {});

  Object.entries(snippetNodes).forEach(([id, sNode]) => {
    let mNode = markdownNodes.find(mN => mN.frontmatter.title === id);
    let nodeContent = {
      id,
      tags: {
        all: sNode.attributes.tags,
        primary: sNode.attributes.tags[0],
      },
      expertise: determineExpertiseFromTags(sNode.attributes.tags),
      title: mNode.frontmatter.title,
      code: {
        src: sNode.attributes.codeBlocks.code,
        example: sNode.attributes.codeBlocks.example,
      },
      slug: mNode.fields.slug,
      path: mNode.fileAbsolutePath,
      text: {
        full: sNode.attributes.text,
        short: sNode.attributes.text.slice(0, sNode.attributes.text.indexOf('\n\n')),
      },
      archived: sNode.archived,
      language: {
        long: 'JavaScript', // TODO
        short: 'js',
      },
    };
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
