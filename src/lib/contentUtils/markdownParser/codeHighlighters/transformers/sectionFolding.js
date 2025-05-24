/**
 * Transforms code blocks to support section folding, wrapping folded `.line`
 * elements in a `details > summary + code` structure.
 */
export const transformerSectionFolding = ({ foldedSections = [] } = {}) => {
  const hasAnyFoldedSections = foldedSections.length > 0;

  const getFoldedSectionForLine = line => {
    const foldedSection = foldedSections.find(
      section => section.start <= line && line <= section.end
    );
    if (!foldedSection) return [false, null, null];
    return [
      true,
      foldedSection.start === line,
      foldedSection.end - foldedSection.start,
    ];
  };

  const svgNode = {
    type: 'element',
    tagName: 'svg',
    properties: {
      class: 'icon',
      viewBox: '0 0 128 128',
      width: '16',
      height: '16',
      fill: 'none',
    },
    children: [
      {
        type: 'element',
        tagName: 'path',
        properties: {
          'data-path-id': 'arrow-up',
          d: 'M31.538 30.538a5.25 5.25 0 1 0 7.424 7.424L59 17.925V49.5a5.25 5.25 0 1 0 10.5 0V17.925l20.038 20.037a5.25 5.25 0 0 0 7.424-7.424l-29-29a5.25 5.25 0 0 0-7.424 0l-29 29Z',
          fill: 'currentColor',
          'clip-rule': 'evenodd',
          'fill-rule': 'evenodd',
        },
      },
      {
        type: 'element',
        tagName: 'path',
        properties: {
          'data-path-id': 'arrow-down',
          d: 'M31.538 97.212a5.25 5.25 0 1 1 7.424-7.424L59 109.825V78.25a5.25 5.25 0 1 1 10.5 0v31.575l20.038-20.037a5.25 5.25 0 0 1 7.424 7.424l-29 29a5.249 5.249 0 0 1-7.424 0l-29-29Z',
          fill: 'currentColor',
          'clip-rule': 'evenodd',
          'fill-rule': 'evenodd',
        },
      },
    ],
  };

  const isLineNode = node =>
    ['span', 'mark', 'ins', 'del'].includes(node.tagName) &&
    node.properties.class?.includes('line');

  return {
    name: 'section-folding',
    code: node => {
      // Skip if there are no folded sections at all.
      if (!hasAnyFoldedSections) return node;

      // Retrieve the node's children.
      const { children } = node;

      // Initialize new children array and persisted variables for iteration.
      const newChildren = [];
      let isFolded = false;
      let isStart = false;
      let sectionLength = 0;
      let lineNumber = 0;

      for (let i = 0; i < children.length; i++) {
        // Check if the current child is a line node. This is necessary as there
        // are also text nodes that are the `\n` characters between them.
        const child = children[i];
        const isLine = isLineNode(child);

        // If the child is a line node, we can use its properties until the next
        // line node is reached (allowing newlines to be treated as part of the
        // previous line).
        // NOTE: We use lineNumber + 1. Lines are 1-indexed, as this makes it
        // easier to work with when authoring content (e.g. viewed in VSCode).
        if (isLine) {
          const foldedSectionData = getFoldedSectionForLine(lineNumber + 1);

          isFolded = foldedSectionData[0];
          isStart = foldedSectionData[1];
          sectionLength = foldedSectionData[2];
          lineNumber++;
        }

        // Skip if the line is not folded.
        if (!isFolded) {
          newChildren.push(child);
          continue;
        }

        // If the line is the fold start, we add a `details` element. It will
        // contain a standardized `summary` node with an icon and a `code` node
        // that will contain the folded lines.
        if (isLine && isStart) {
          const details = {
            type: 'element',
            tagName: 'details',
            properties: {},
            children: [
              {
                type: 'element',
                tagName: 'summary',
                properties: {},
                children: [
                  svgNode,
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {},
                    children: [
                      {
                        type: 'text',
                        value: `${sectionLength} collapsed lines`,
                      },
                    ],
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'code',
                properties: {},
                children: [],
              },
            ],
          };
          newChildren.push(details);
        }

        // If the line or element is folded, add it to the last `div` element.
        newChildren[newChildren.length - 1].children[1].children.push(child);
      }

      // Replace the children of the node with the new children.
      node.children = newChildren;
      return node;
    },
  };
};
