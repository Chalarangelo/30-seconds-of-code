import { visit } from 'unist-util-visit';

/**
 * Loads web components as ES modules.
 *
 * Using a regular expression, the component name is matched in the HTML, then
 * its JS module is added as a script tag before the HTML.
 * Any CSS modules need to be imported by the JS module itself.
 *
 * @param {string} options.componentsPath - The path to the components folder.
 */
export const loadWebComponents = ({ componentsPath }) => {
  return tree => {
    visit(tree, { type: `raw` }, node => {
      const { value } = node;
      const isWebComponent = value.match(
        /<(?<component>[a-zA-Z0-9]+-[a-zA-Z0-9]+).*>/
      );
      if (!isWebComponent) return;
      const { component } = isWebComponent.groups;
      if (component === 'article-embed') return;
      node.value = [
        `<script type="module" src="${componentsPath}scripts/${component}.mjs"></script>`,
        value.replace(component, `${component} interactive="false"`),
      ].join('\n');
    });
    return tree;
  };
};
