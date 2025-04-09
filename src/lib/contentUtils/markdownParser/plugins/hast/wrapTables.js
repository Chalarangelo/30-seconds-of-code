import { visitParents } from 'unist-util-visit-parents';

/**
 * Wraps tables in a custom wrapper.
 *
 * @param {string} options.className - The class name to apply to the wrapper.
 */
export const wrapTables = ({ className }) => {
  return tree => {
    visitParents(
      tree,
      { type: `element`, tagName: `table` },
      (node, ancestors) => {
        // Skip wrapping when already wrapped to prevent infinite recursion
        const parentNode = ancestors[ancestors.length - 1];
        const isParentFigure = parentNode.tagName === `figure`;
        if (isParentFigure) return;

        // Wrap the table in a figure
        const innerNode = { ...node, children: [...node.children] };
        node.tagName = `figure`;
        node.properties = { className };
        node.children = [innerNode];
      }
    );
    return tree;
  };
};
