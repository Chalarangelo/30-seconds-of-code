import { visit } from 'unist-util-visit';

/**
 * Transforms relative paths for images (adding the asset path).
 *
 * @param {string} options.assetPath - The asset path to prepend to the image
 * paths.
 */
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
