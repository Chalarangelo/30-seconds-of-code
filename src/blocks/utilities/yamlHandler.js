import path from 'path';
import glob from 'glob';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { writeFile } from 'fs/promises';

/**
 * Handles reading/writing YAML objects from/to files.
 */
export class YAMLHandler {
  static space = process.env.NODE_ENV === 'production' ? 0 : 2;
  /**
   * Writes the provided object to the specified file
   * @param {string} filePath - Path to write the file.
   * @param {object} obj - A serializable plain object.
   * @returns {Promise} - A promise that resolves as soon as the file has been written
   */
  static toFile = (filePath, obj) => {
    fs.ensureDirSync(path.dirname(filePath));
    return writeFile(filePath, yaml.dump(obj, { indent: YAMLHandler.space }));
  };

  /**
   * Returns an array of objects from the YAML files matching a glob pattern.
   * @param {string} globPattern - A YAML file glob pattern (i.e. ending in '.json').
   * @param {object} options - An options object, containing the following:
   *  - `withNames`: Should return the names of the matching objects?
   *  - `reduced`: Should reduce the matching objects?
   *  - `reducer`: Used only if `reduced` is `true`. Reducer function used to combine the objects.
   *  - `initialValue`:  Used only if `reduced` is `true`. The reducer's initial value.
   * @throws Will throw an error under the following conditions:
   *  - The pattern is not a valid YAML matcher.
   *  - Both `withNames` and `reduced` options are `true`.
   * @returns One of the following, depending on options:
   *  - An array of objects if neither `withNames` or `reduced` is `true`.
   *  - An array of (name, object) pairs if only `withNames` is `true`.
   *  - The result of reducing the retrieved objects if only `reduced` is `true`.
   */
  static fromGlob = (
    globPattern,
    {
      withNames = false,
      reduced = false,
      reducer = (a, v) => ({ ...a, ...yaml.load(fs.readFileSync(v)) }),
      initialValue = {},
    } = {}
  ) => {
    if (!globPattern.endsWith('.yaml')) {
      throw new Error(
        `Invalid argument. The specified globPattern "${globPattern}" is not a valid YAML matcher.`
      );
    }

    if (withNames && reduced) {
      throw new Error(
        "Invalid options. 'withNames' and 'reduced' cannot be true at the same time."
      );
    }

    const matchingFiles = glob.sync(globPattern);

    // NOTE: The `reducer` should implement the `yaml.load` part in order for the
    // resulting value to make some sort of sense if it reduces to an object.
    if (reduced) {
      return matchingFiles.reduce(reducer, initialValue);
    }

    if (withNames) {
      return matchingFiles.map(file => [
        file,
        yaml.load(fs.readFileSync(file)),
      ]);
    }

    return matchingFiles.map(file => yaml.load(fs.readFileSync(file)));
  };

  /**
   * Returns the data from a given YAML file.
   * @param {string} filePath - The path to a YAML file.
   * @returns {object} An object containing the data from the given YAML file.
   */
  static fromFile = filePath => {
    return yaml.load(fs.readFileSync(path.resolve(filePath)));
  };
}
