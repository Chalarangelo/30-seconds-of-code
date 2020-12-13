import fs from 'fs-extra';
import util from 'util';
import { exec } from 'child_process';
import frontmatter from 'front-matter';
import { FileParser } from 'blocks/parsers/file';

const readFile = util.promisify(fs.readFile);

/**
 * Parses text files, using frontmatter, returning text objects.
 */
export class TextParser {
  /**
   * Reads the data from a text file, using frontmatter.
   * @param {string} filePath - Path of the given file
   * @param {object} options - An options object, containing the following:
   *  - `withMetadata`: Should include git metadata for the returned object?
   * @returns {Promise<object>} A promise that resolves to the object containing the file's data.
   */
  static fromPath = (filePath, { withMetadata = false } = {}) => {
    const [, dirPath, fileName] = filePath.match(/(.*)\/([^/]*)$/);
    const promises = [
      new Promise((res, rej) =>
        readFile(filePath, 'utf8')
          .then(content => res(frontmatter(content)))
          .catch(err => rej(err))
      ),
    ];

    if (withMetadata) {
      promises.push(
        new Promise(rsl =>
          exec(
            `cd ${dirPath}; git log --diff-filter=A --pretty=format:%at -- ${fileName} | head -1`,
            (error, stdout) => rsl(stdout.toString().replace('\n', ''))
          )
        )
      );
      promises.push(
        new Promise(rsl =>
          exec(
            `cd ${dirPath}; git log -n 1 --pretty=format:%at -- ${fileName} | head -1`,
            (error, stdout) => rsl(stdout.toString().replace('\n', ''))
          )
        )
      );
    }

    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then(values => {
          const data = {
            body: values[0].body,
            ...values[0].attributes,
            fileName,
          };

          if (withMetadata) {
            resolve({
              ...data,
              firstSeen: new Date(+`${values[1]}000`),
              lastUpdated: new Date(+`${values[2]}000`),
            });
          } else {
            resolve(data);
          }
        })
        .catch(err => reject(err));
    });
  };

  static fromDir = async (dirPath, { withMetadata = false }) => {
    const fileNames = await FileParser.fromDir(dirPath);
    return Promise.all(
      fileNames.map(f => this.fromPath(`${dirPath}/${f}`, { withMetadata }))
    );
  };
}
