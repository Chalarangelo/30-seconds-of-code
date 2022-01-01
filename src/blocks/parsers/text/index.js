import { readFile, readdir } from 'fs/promises';
import frontmatter from 'front-matter';

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
        firstSeen = '2021-06-13T05:00:00-04:00',
        lastUpdated = firstSeen,
        ...restAttributes
      } = attributes;
      return {
        body,
        ...restAttributes,
        firstSeen: new Date(firstSeen),
        lastUpdated: new Date(lastUpdated),
        fileName,
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
}
