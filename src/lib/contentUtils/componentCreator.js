import path from 'node:path';
import fs from 'node:fs';
import {
  componentScriptsPath,
  componentStylesPath,
} from '#src/lib/contentUtils/config.js';

export default class ComponentCreator {
  static create = name => {
    const componentScriptPath = path.join(
      process.cwd(),
      componentScriptsPath,
      `${name}.mjs`
    );
    const componentStylePath = path.join(
      process.cwd(),
      componentStylesPath,
      `${name}.scss`
    );

    const webComponentName = name.replace(/-(\w)/g, (_, c) => c.toUpperCase());

    const componentScriptContent = [
      `import styles from '../styles/${name}.css' with { type: 'css' };`,
      '',
      `class ${webComponentName} extends HTMLElement {`,
      `  constructor() {`,
      `    super();`,
      `  }`,
      '',
      `  connectedCallback() {`,
      `    this.setAttribute('interactive', 'true');`,
      `  }`,
      '',
      `}`,
      '',
      `document.addEventListener('DOMContentLoaded', () => {`,
      `  document.adoptedStyleSheets.push(styles);`,
      `  customElements.define('${name}', ${webComponentName});`,
      `});`,
    ].join('\n');

    const componentStyleContent = [`${name}[interactive='true'] {`, '}'].join(
      '\n'
    );

    try {
      fs.writeFileSync(componentScriptPath, componentScriptContent);
      fs.writeFileSync(componentStylePath, componentStyleContent);
    } catch (err) {
      console.error(err);
    }
  };
}
