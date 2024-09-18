import { visit } from 'unist-util-visit';
import { visitParents } from 'unist-util-visit-parents';
import { toString } from 'hast-util-to-string';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';
import StringUtils from '#src/lib/stringUtils.js';

// Highlight code blocks
export const highlightCode = ({ grammars }) => {
  const languages = { ...grammars };
  // Load Prism grammars
  loadLanguages(Object.keys(languages));

  return tree => {
    visit(tree, `code`, node => {
      // Parse the language and title from the language string. Only supports
      // space separated language and title, e.g. `language [title]`.
      // The title must be wrapped in square brackets.
      const languageName = node.lang || 'text';
      const title = node.meta?.replace('[', '').replace(']', '') || null;
      node.type = `html`;

      let highlightedCode = Prism.highlight(
        node.value,
        Prism.languages[languageName],
        languageName
      );

      // Inject a `--hex-color` style into nodes with the `.hexcode.color` class.
      // This is then used by CSS to display a color swatch next to the hex code.
      if (languageName === 'css') {
        highlightedCode = highlightedCode.replace(
          /hexcode color">(#[0-9a-f]+)/g,
          `hexcode color" style="--hex-color:$1">$1`
        );
      }

      const languageStringLiteral = languages[languageName] || '';

      // Note: While something classless, such as
      // `[data-code-grammar=languageName]` whould be nicer to look at, Prism
      // uses the same language-X classes to target nested styles. By using
      // a class for this plugin, consistence and compliance are ensured.
      const attributes = {
        class: `language-${languageName} notranslate`,
        translate: `no`,
      };

      if (languageStringLiteral)
        attributes[`data-code-language`] = languageStringLiteral;

      if (title) attributes[`data-code-title`] = title;

      node.value = `<pre
        ${Object.entries(attributes).reduce(
          (acc, [key, value]) => `${acc} ${key}="${value}"`,
          ``
        )}>${highlightedCode.trim()}</pre>`;
    });
  };
};

// Link inline code block elements to the appropriate language reference
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
        node.properties = {
          href: reference,
          dataCodeReference: 'true',
        };
        node.children = [innerNode];
      }
    );
    return tree;
  };
};

// Add 'rel' and 'target' to external links
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

// Convert headings to the appropriate elements (h1 -> h2, (h5, h6) -> h4)
// Also, add hash links to headings
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

// Transforms relative paths for images (adding the asset path)
export const transfomImagePaths = ({ assetPath }) => {
  return tree => {
    visit(tree, { type: `element`, tagName: `img` }, node => {
      const { properties } = node;
      if (!properties || !properties.src) return;

      properties.src = properties.src
        .split('/')
        .reduce((acc, segment, index, segments) => {
          // Skip the `.` segment that is added from Markdown
          if (segment === '.') return acc;
          if (index === segments.length - 1) {
            const [fileName, extension] = segment.split('.');
            return `${acc}/${fileName}.${
              ['png', 'svg'].includes(extension) ? extension : 'webp'
            }`;
          }
          return `${acc}/${segment}`;
        }, `${assetPath}`);
    });
    return tree;
  };
};

// Wrap tables in a custom wrapper
export const wrapTables = ({ className }) => {
  return tree => {
    visitParents(
      tree,
      { type: `element`, tagName: `table` },
      (node, ancestors) => {
        // Skip wrapping when already wrapped to prevent infinite recursion
        const parentNode = ancestors[ancestors.length - 1];
        const isParentFigure = parentNode.tagName === `figure`;
        if (isParentFigure) return;

        // Wrap the table in a figure
        const innerNode = { ...node, children: [...node.children] };
        node.tagName = `figure`;
        node.properties = { className };
        node.children = [innerNode];
      }
    );
    return tree;
  };
};

// Transforms single-line CodePen links to embedded CodePens.
// Note: Adding `data-preview="true"` hijacks all the custom styles in the
// CodePen embed. This is why the `data-preview="true"` attribute is explicitly
// not set.
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

// Transform admonitions -syntax can be found here:
// https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)
// FIXME: Consider this feature experimental and treat it with caution.
// This is particularly fiddly, as there are many assumptions that have
// been made. For example, the first child of the blockquote is assumed to be
// a newline element (`\n`). Similarly, the second child is assumed to be a
// paragraph element (`p`) with a singular `text` child, containing only the
// admonition type and syntax. This effectively means that there needs to be
// a newline between the type and the content, like this:
// > [!NOTE]
// >
// > This is a note.
// As this is very unstable and prone to breakage, it is recommended to use
// an official plugin, as soon as it is released (maybe as part of GFM).
export const transformAdmonitions = (
  types = {
    NOTE: '💬',
    TIP: '💡',
    WARNING: '⚠️',
    CAUTION: '❗️',
    IMPORTANT: 'ℹ',
  }
) => {
  return tree => {
    visit(tree, { type: `element`, tagName: `blockquote` }, node => {
      const { children } = node;
      if (!children || !children.length) return;

      const firstChild = children[1];
      if (!firstChild || !firstChild.children || !firstChild.children.length)
        return;
      const textValue = firstChild.children[0].value;
      const type = Object.keys(types).find(type => textValue === `[!${type}]`);
      if (!type) return;

      const typeIcon = types[type];

      node.tagName = 'figure';
      node.properties = {
        className: 'admonition',
        'data-admonition-type': type.toLowerCase(),
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
