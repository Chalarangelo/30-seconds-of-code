import { readFile, readdir } from 'node:fs/promises';
import frontmatter from 'front-matter';
import { globSync } from 'glob';

/**
 * Parses text files, using frontmatter, returning text objects.
 */
export class TextParser {
  /**
   * Reads the data from a text file, using frontmatter.
   * @param {string} filePath - Path of the given file
   * @returns {Promise<object>} A promise that resolves to the object containing the file's data.
   */
  static fromPath = filePath => {
    const fileName = filePath.match(/.*\/([^/]*)$/)[1];
    return readFile(filePath, 'utf8').then(content => {
      const { body, attributes } = frontmatter(content);
      const {
        dateModified = '2021-06-13',
        language = null,
        ...restAttributes
      } = attributes;
      return {
        body,
        ...restAttributes,
        dateModified: new Date(dateModified),
        language,
        fileName,
        filePath,
      };
    });
  };

  static fromDir = async dirPath => {
    const fileNames = await readdir(dirPath).then(files =>
      files.sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1))
    );

    return Promise.all(
      fileNames.map(f => TextParser.fromPath(`${dirPath}/${f}`))
    );
  };

  static fromGlob = async globPattern => {
    const fileNames = globSync(globPattern).sort((a, b) =>
      a.toLowerCase() < b.toLowerCase() ? -1 : 1
    );

    return Promise.all(fileNames.map(f => TextParser.fromPath(f)));
  };
}
