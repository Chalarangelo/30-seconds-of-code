import { visitParents } from 'unist-util-visit-parents';

/**
 * Transforms single-line CodePen links to embedded CodePens.
 *
 * Note: Adding `data-preview="true"` hijacks all the custom styles in the
 * CodePen embed. This is why the `data-preview="true"` attribute is explicitly
 * not set.
 *
 * @param {Object} options - Options for the plugin.
 * @param {string} options.className - The class name to apply to the figure element.
 * @param {Object} options.dataAttrs - Additional data attributes to apply to
 *  the CodePen embed.
 */
export const embedCodepensFromLinks = ({
  className,
  dataAttrs = {
    height: '100%',
    'theme-id': 'dark',
    'default-tab': 'result',
    'border-color': '#07071c',
    border: 'none',
    'tab-bar-color': '#161632',
    'tab-link-color': '#e3e3e8',
    'active-link-color': '#8bb7fe',
    'active-tab-accent-color': '#5394fd',
    'active-tab-color': '#18203a',
    'tab-color': '#18203a',
  },
}) => {
  const codepenRegexp = /^https?:\/\/codepen\.io\/([^/]+)\/pen\/([^/]+)\/?$/;
  const dataAttrString = Object.entries(dataAttrs).reduce(
    (acc, [key, value]) => `${acc} data-${key}="${value}"`,
    ''
  );
  return tree => {
    visitParents(tree, `link`, (node, ancestors) => {
      // Skip embedding unless the parent is a paragraph
      const parentNode = ancestors[ancestors.length - 1];
      const isParentParagraph = parentNode.type === `paragraph`;
      if (!isParentParagraph) return;

      // Check if the link matches the CodePen pattern
      const { url } = node;
      const match = url.match(codepenRegexp);
      if (!match) return;

      const [, user, slug] = match;
      parentNode.type = `html`;
      parentNode.value = `<figure class="${className}">
        <p class="codepen" ${dataAttrString} data-slug-hash="${slug}" data-user="${user}">
          <span>See the <a href="https://codepen.io/${user}/pen/${slug}" target="_blank" rel="noopener noreferrer">embedded CodePen</a></span>
        </p>
        <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
      </figure>`;
    });
  };
};
