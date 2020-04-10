import { createFilePath } from 'gatsby-source-filesystem';

/**
 * Called when a new node is created.
 * Creates the slug field for the created node.
 */
const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

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
