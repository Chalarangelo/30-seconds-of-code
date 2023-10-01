import path from 'node:path';
import fs from 'fs-extra/esm';
import { readFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';

/**
 * Handles reading/writing JSON objects from/to files.
 */
export class JSONHandler {
  static space = process.env.NODE_ENV === 'production' ? 0 : 2;
  /**
   * Writes the provided object to the specified file
   * @param {string} filePath - Path to write the file.
   * @param {object} obj - A serializable plain object.
   * @returns {Promise} - A promise that resolves as soon as the file has been written
   */
  static toFile = (filePath, obj) => {
    fs.ensureDirSync(path.dirname(filePath));
    return writeFile(filePath, JSON.stringify(obj, null, JSONHandler.space));
  };

  /**
   * Returns the data from a given JSON file.
   * @param {string} filePath - The path to a JSON file.
   * @returns {object} An object containing the data from the given JSON file.
   */
  static fromFile = filePath => {
    return JSON.parse(readFileSync(filePath));
  };
}
