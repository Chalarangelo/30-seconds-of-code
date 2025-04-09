import { visit } from 'unist-util-visit';
import StringUtils from '#src/lib/stringUtils.js';
import { toString } from 'hast-util-to-string';

// Convert headings to the appropriate elements (h1 -> h2, (h5, h6) -> h4)
// Also, add hash links to headings
/**
 * Converts headings to the appropriate elements (h1 -> h2, (h5, h6) -> h4)
 *
 * This also adds hash links to headings.
 *
 * @param {number} options.minLevel - The minimum heading level to allow.
 * @param {number} options.maxLevel - The maximum heading level to allow.
 */
export const transformHeadings = ({ minLevel, maxLevel }) => {
  return tree => {
    visit(tree, `element`, node => {
      if (!node.tagName) return;

      const isHeading = node.tagName.match(/^h[123456]$/);
      if (!isHeading) return;
      const level = isHeading[1];

      if (level < minLevel) node.tagName = `h${minLevel}`;
      else if (level > maxLevel) node.tagName = `h${maxLevel}`;

      const id = StringUtils.convertToValidId(toString(node));
      node.children = [
        {
          type: `element`,
          tagName: `a`,
          properties: { href: `#${id}`, id },
          children: [...node.children],
        },
      ];
    });
    return tree;
  };
};
