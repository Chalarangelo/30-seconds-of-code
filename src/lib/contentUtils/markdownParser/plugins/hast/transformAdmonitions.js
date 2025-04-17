import { visit } from 'unist-util-visit';
import StringUtils from '#src/lib/stringUtils.js';

/**
 * Transform admonitions. Syntax can be found here:
 *  https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)
 *
 * =============== NOTE ===================
 * This is a little fiddly, as there are many assumptions that have
 * been made. For example, the first child of the blockquote is assumed to be
 * a newline element (`\n`). Similarly, the second child is assumed to be a
 * paragraph element (`p`) with a singular `text` child, containing only the
 * admonition type and syntax. This effectively means that there needs to be
 * newline between the type and the content, like this:
 *
 * > [!NOTE]
 * >
 * > This is a note.
 *
 * While this may be a little different from the GFM syntax, it is still valid
 * GFM in itself. The Empty line at the start is a markdown parsing leftover and
 * the additional newline ensures that the admonition is clearly separated from
 * the content, thus eliminating the need for an extra node to be created here.
 * ========================================
 *
 * @param {Object} types - The types of admonitions to transform.
 */
export const transformAdmonitions = (
  types = {
    note: '💬',
    tip: '💡',
    warning: '⚠️',
    caution: '❗️',
    important: 'ℹ',
  }
) => {
  const matcher = new RegExp(`^\\[!(${Object.keys(types).join('|')})\\]$`, 'i');
  return tree => {
    visit(tree, { type: `element`, tagName: `blockquote` }, node => {
      const { children } = node;
      if (!children || !children.length) return;

      const firstChild = children[1];
      if (!firstChild || !firstChild.children || !firstChild.children.length)
        return;
      const match = firstChild.children[0]?.value?.match(matcher);
      if (!match) return;

      const type = match[1].toLowerCase();
      const typeIcon = types[type];

      node.tagName = 'figure';
      node.properties = {
        className: 'admonition',
        'data-admonition-type': type,
      };
      firstChild.tagName = 'figcaption';
      firstChild.children = [
        {
          type: 'text',
          value: `${typeIcon}  ${StringUtils.capitalize(type.toLowerCase())}`,
        },
      ];
    });
    return tree;
  };
};
