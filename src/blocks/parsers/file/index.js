import glob from 'glob';
import fs from 'fs-extra';
import util from 'util';

const readDir = util.promisify(fs.readdir);

/**
 * Parses directories and globs, returning array of file names.
 */
export class FileParser {
  /**
   * Returns an array of files matching a glob pattern.
   * @param {string} globPattern - A glob pattern.
   * @returns {Array<String>} Names of the files matching the glob pattern.
   */
  static fromGlob = globPattern => {
    return glob.sync(globPattern);
  };

  /**
   * Returns an array of files in a directory.
   * @param {string} dirPath - The path of the directory.
   * @return {Promise<Array<String>>} A promise that resolves to the array of file names.
   */
  static fromDir = dirPath =>
    new Promise((resolve, reject) =>
      readDir(dirPath)
        .then(files =>
          resolve(
            files.sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1))
          )
        )
        .catch(err => reject(err))
    );
}
