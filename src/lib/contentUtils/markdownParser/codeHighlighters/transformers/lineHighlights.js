/**
 * Transforms `.line`s in the code block by adding the appropriate properties
 * to their nodes, if they are highlighted.
 */
export const transformerLineHighlights = ({
  highlightedLines = { labels: new Map(), lines: new Map() },
  insertedLines = { labels: new Map(), lines: new Map() },
  deletedLines = { labels: new Map(), lines: new Map() },
} = {}) => {
  const hasAnyHighlights =
    highlightedLines.lines.size ||
    insertedLines.lines.size ||
    deletedLines.lines.size;

  const getHighlightForLine = line => {
    if (highlightedLines.lines.has(line))
      return [
        true,
        highlightedLines.lines.get(line),
        highlightedLines.labels,
        'mark',
      ];
    if (insertedLines.lines.has(line))
      return [true, insertedLines.lines.get(line), insertedLines.labels, 'ins'];
    if (deletedLines.lines.has(line))
      return [true, deletedLines.lines.get(line), deletedLines.labels, 'del'];
    return [false, null, null];
  };

  const getLabelDisplayAttribute = (highlight, line, labels) => {
    const hasLabel = highlight !== null;
    if (!hasLabel) return false;

    // Check if the previous line has the same label.
    const label = labels.get(highlight);
    if (!label) return false;
    return !label.includes(line - 1);
  };

  return {
    name: 'line-higlights',
    line(node, line) {
      // Skip if there are no highlighted lines at all.
      if (!hasAnyHighlights) return node;

      const [isHighlighted, highlight, labels, tagName] =
        getHighlightForLine(line);
      // Skip if the line is not highlighted.
      if (!isHighlighted) return node;

      const showLabel = getLabelDisplayAttribute(highlight, line, labels);

      // If the line is highlighted, we change the `span` element to a `mark`,
      // `ins`, or `del` element, depending on the type of highlight.
      node.tagName = tagName;
      // If the label should be shown, add the `data-highlight-label` attribute.
      if (showLabel) node.properties['data-highlight-label'] = highlight;
    },
  };
};
