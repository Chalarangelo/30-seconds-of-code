import path from 'node:path';
import fs from 'node:fs';
import { contentDir } from '#src/lib/contentUtils/config.js';

const collectionTemplate = path.join(contentDir, 'collection-template.yaml');
const snippetTemplateFile = 'snippet-template.md';

const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');

const templateProcessors = {
  collection: (template, name) =>
    template
      .replace(/name:\s*.*\n/, `name: ${name}\n`)
      .replace(/slug:\s*.*\n/, `slug: ${name}\n`),
  snippet: (template, name) => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}`;

    return template
      .replace(/title:\s*.*\n/, `title: ${name}\n`)
      .replace(/dateModified:\s*.*\n/, `dateModified: ${dateString}\n`);
  },
};

export default class ContentCreator {
  static create = (type, directoryName, name) => {
    const isCollection = type === 'collection';

    let targetPath = path.join(
      process.cwd(),
      contentDir,
      isCollection ? 'collections' : 'snippets',
      directoryName
    );

    const templatePath = isCollection
      ? collectionTemplate
      : path.join(targetPath, snippetTemplateFile);
    const template = fs.readFileSync(templatePath, 'utf8');

    // Add the `/s` for snippets after loading the template
    if (!isCollection) targetPath = path.join(targetPath, 's');

    try {
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
      }

      const fileData = templateProcessors[type](template, name);
      fs.writeFileSync(
        path.join(targetPath, `${name}.${isCollection ? 'yaml' : 'md'}`),
        fileData
      );
    } catch (err) {
      console.error(err);
    }
  };
}
