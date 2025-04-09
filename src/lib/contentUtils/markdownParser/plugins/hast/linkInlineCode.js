import { visitParents } from 'unist-util-visit-parents';

/**
 * Links inline `code` block elements to the appropriate language reference.
 *
 * This also performs the following additrional tasks:
 * - Sets the `className` property to `notranslate` to prevent translation
 * - Sets the `translate` property to `no` to prevent translation
 *
 * @param {Map} options.references - A map of language references.
 */
export const linkInlineCode = ({ references }) => {
  return tree => {
    visitParents(
      tree,
      { type: `element`, tagName: `code` },
      (node, ancestors) => {
        const { properties } = node;
        // Ensure that inline code blocks are not translated
        properties.className = `notranslate`;
        properties.translate = `no`;

        // If there are no references, skip linking entirely
        if (references.size === 0) return;

        // Skip linking inside headings and links
        const parentNode = ancestors[ancestors.length - 1];
        const isParentLink = parentNode.tagName === `a`;
        const isParentHeading = parentNode.tagName.match(/^h[123456]$/);
        if (isParentLink || isParentHeading) return;

        const text = node.children[0].value;
        const hasReference = references.has(text);
        if (!hasReference) return;
        const reference = references.get(text);

        // Convert this element to a link and wrap the current element in it
        const innerNode = { ...node, children: [...node.children] };
        node.tagName = `a`;
        node.properties = { href: reference, dataCodeReference: 'true' };
        node.children = [innerNode];
      }
    );
    return tree;
  };
};
