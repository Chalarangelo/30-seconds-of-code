/**
 * Transforms `.line`s in the code block by adding the appropriate properties
 * to their nodes, if they are highlighted.
 */
export const transformerLineHighlights = ({
  highlightedLines = new Set(),
} = {}) => {
  return {
    name: 'line-higlights',
    line(node, line) {
      // Skip if there are no highlighted lines.
      if (!highlightedLines.size) return node;

      // If the line is highlighted, we need to add a data attribute to the
      // node, so that we can style it with CSS.
      if (highlightedLines.has(line)) {
        node.properties['data-line-highlight'] = 'true';
      }
    },
  };
};
