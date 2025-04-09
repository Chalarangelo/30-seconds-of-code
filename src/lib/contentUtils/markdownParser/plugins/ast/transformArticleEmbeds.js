import { visitParents } from 'unist-util-visit-parents';

/**
 * Transforms @-prefixed single line links to article embeds.
 * =============== NOTE ===================
 * This is a custom syntax that is not part of the GFM spec.
 * It is used to embed snippets/collections in the content.
 *
 * The syntax is as follows:
 * @[title](/path/to/article)
 *
 * The link is then transformed to a pseudo-web-component element,
 * `<article-embed>`, which is then processed by the snippet itself.
 * Note that this element is not even a valid web component due to it being
 * self-closing.
 * ========================================
 */
export const transformArticleEmbeds = () => {
  return tree => {
    visitParents(tree, `link`, (node, ancestors) => {
      // Check if the link is a relative path
      const { url } = node;
      const match = url.match(/^\//);
      if (!match) return;

      // Skip embedding the article unless the parent is a paragraph with 2 children
      const parentNode = ancestors[ancestors.length - 1];
      const isParentParagraph = parentNode.type === `paragraph`;
      if (!isParentParagraph || parentNode.children.length !== 2) return;

      const firstChild = parentNode.children[0];
      const secondChild = parentNode.children[1];
      // Check if the format is like `@[foo](/bar)`
      if (
        firstChild.type !== 'text' ||
        firstChild.value !== '@' ||
        secondChild.type !== 'link'
      )
        return;

      const title = node.children[0].value;
      // Use a pseudo-element to inject the article into the content for later
      // processing in the snippet model.
      parentNode.type = `html`;
      parentNode.value = `<article-embed ref="${node.url}" title="${title}"/>`;
    });
    return tree;
  };
};
