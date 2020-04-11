import { createFilePath } from 'gatsby-source-filesystem';

/**
 * Called when a new node is created.
 * Creates the slug field for the created node.
 * API docs: https://www.gatsbyjs.org/docs/node-apis/#onCreateNode
 */
const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  /* istanbul ignore else */
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

export default onCreateNode;
