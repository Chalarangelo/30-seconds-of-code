import path from 'path';
import fs from 'fs';
import pathSettings from 'settings/paths';
import { Logger } from 'blocks/utilities/logger';

export class Content {
  /**
   * Creates a new snippet or collection
   * @param {string} directoryName - Name of the directory (e.g. 'articles')
   * @param {string} type - Type of the content item ('collection', 'snippet' or 'story')
   * @param {string} name - Name of the new content item (e.g. 'my-blog-post')
   */
  static create = (directoryName, type, name) => {
    const logger = new Logger('Content.create');
    const isCollection = type === 'collection';
    logger.log(
      `Creating new ${
        isCollection ? 'collection' : 'snippet'
      } ${name} in ${directoryName}...`
    );

    const { rawContentPath: contentPath } = pathSettings;

    if (isCollection) {
      const collectionPath = path.join(
        process.cwd(),
        contentPath,
        'collections',
        directoryName
      );
      const templatePath = path.join(contentPath, `collection-template.yaml`);
      try {
        if (!fs.existsSync(collectionPath)) {
          logger.log('Collection directory not found! Creating directory...');
          fs.mkdirSync(collectionPath);
        }
        const template = fs.readFileSync(templatePath, 'utf8');

        const fileData = template
          .replace(/name:\s*.*\n/, `name: ${name}\n`)
          .replace(/slug:\s*.*\n/, `slug: ${name}\n`);

        fs.writeFileSync(path.join(collectionPath, `${name}.yaml`), fileData);

        logger.success('Collection creation complete!');
      } catch (err) {
        logger.error(err);
      }
    } else {
      const directoryPath = path.join(
        process.cwd(),
        contentPath,
        'snippets',
        directoryName
      );
      const templatePath = path.join(directoryPath, `${type}-template.md`);
      const snippetPath = path.join(directoryPath, 's');
      try {
        if (!fs.existsSync(snippetPath)) {
          logger.log('Snippet directory not found! Creating directory...');
          fs.mkdirSync(snippetPath);
        }
        const template = fs.readFileSync(templatePath, 'utf8');

        const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
        const date = new Date();
        const dateString = `${date.getFullYear()}-${pad(
          date.getMonth() + 1
        )}-${pad(date.getDate())}T05:00:00-04:00`;

        const fileData = template
          .replace(/title:\s*.*\n/, `title: ${name}\n`)
          .replace(/dateModified:\s*.*\n/, `dateModified: ${dateString}\n`);
        fs.writeFileSync(path.join(snippetPath, `${name}.md`), fileData);

        logger.success('Snippet creation complete!');
      } catch (err) {
        logger.error(err);
      }
    }
  };
}
