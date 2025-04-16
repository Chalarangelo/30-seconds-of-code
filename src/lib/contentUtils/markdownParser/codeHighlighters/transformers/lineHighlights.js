/**
 * Transforms `.line`s in the code block by adding the appropriate properties
 * to their nodes, if they are highlighted.
 */
export const transformerLineHighlights = ({
  highlightedLines = { labels: new Map(), lines: new Map() },
} = {}) => {
  return {
    name: 'line-higlights',
    line(node, line) {
      // Skip if there are no highlighted lines.
      if (!highlightedLines.lines.size) return node;

      const highlightedLine = highlightedLines.lines.get(line);
      // Skip if the line is not highlighted.
      if (!highlightedLine) return node;

      const hasLabel = highlightedLine !== null;
      let showLabel = hasLabel;
      if (hasLabel) {
        // Check if the previous line has the same label.
        const label = highlightedLines.labels.get(highlightedLine);
        showLabel = !label.includes(line - 1);
      }

      // If the line is highlighted, we change the `span` element to a `mark`.
      node.tagName = 'mark';
      // If the label should be shown, add the `data-highlight-label` attribute.
      if (showLabel) node.properties['data-highlight-label'] = highlightedLine;
    },
  };
};
