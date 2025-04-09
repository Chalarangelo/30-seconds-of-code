import { visit } from 'unist-util-visit';

/**
 * Safeguards external links, by adding `rel="noopener noreferrer"` and
 * `target="_blank"` attributes.
 *
 * Relies on a RegExp to match external links, checking for `https?://` in the
 * `href` attribute.
 */
export const safeguardExternalLinks = () => {
  return tree => {
    visit(tree, { type: `element`, tagName: `a` }, node => {
      const { properties } = node;
      if (!properties || !properties.href) return;

      if (properties.href.match(/^https?:\/\//)) {
        properties.rel = `noopener noreferrer`;
        properties.target = `_blank`;
      }
    });

    return tree;
  };
};
