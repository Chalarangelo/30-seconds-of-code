import { visit } from 'unist-util-visit';
import { visitParents } from 'unist-util-visit-parents';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';

// Highlight code blocks
export const highlightCode = ({ grammars }) => {
  const languages = { ...grammars };
  // Load Prism grammars
  loadLanguages(Object.keys(languages));
  return tree => {
    visit(tree, `code`, node => {
      const languageName = node.lang ? node.lang : `text`;
      node.type = `html`;

      const highlightedCode = Prism.highlight(
        node.value,
        Prism.languages[languageName],
        languageName
      );

      const languageStringLiteral = languages[languageName] || '';

      const attributes = {
        class: `language-${languageName} notranslate`,
        translate: `no`,
      };

      if (languageStringLiteral)
        attributes[`data-code-language`] = languageStringLiteral;

      node.value = `<pre
        ${Object.entries(attributes).reduce(
          (acc, [key, value]) => `${acc} ${key}="${value}"`,
          ``
        )}
      >${highlightedCode.trim()}</pre>`;
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
        node.properties = { href: reference };
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
      // if (node.tagName !== `a`) return;
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
export const convertHeadings = ({ minLevel, maxLevel }) => {
  return tree => {
    visit(tree, `element`, node => {
      if (!node.tagName) return;

      const isHeading = node.tagName.match(/^h[123456]$/);
      if (!isHeading) return;
      const level = isHeading[1];

      if (level < minLevel) node.tagName = `h${minLevel}`;
      else if (level > maxLevel) node.tagName = `h${maxLevel}`;
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
        const isParentDiv = parentNode.tagName === `div`;
        if (isParentDiv) return;

        // Wrap the table in a div
        const innerNode = { ...node, children: [...node.children] };
        node.tagName = `div`;
        node.properties = { className };
        node.children = [innerNode];
      }
    );
    return tree;
  };
};
