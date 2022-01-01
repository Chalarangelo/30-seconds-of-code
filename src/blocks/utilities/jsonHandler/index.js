import path from 'path';
import glob from 'glob';
import { writeFile } from 'fs/promises';

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
  static toFile = (filePath, obj) =>
    writeFile(filePath, JSON.stringify(obj, null, JSONHandler.space));

  /**
   * Returns an array of objects from the JSON files matching a glob pattern.
   * @param {string} globPattern - A JSON file glob pattern (i.e. ending in '.json').
   * @param {object} options - An options object, containing the following:
   *  - `withNames`: Should return the names of the matching objects?
   *  - `reduced`: Should reduce the matching objects?
   *  - `reducer`: Used only if `reduced` is `true`. Reducer function used to combine the objects.
   *  - `initialValue`:  Used only if `reduced` is `true`. The reducer's initial value.
   * @throws Will throw an error under the following conditions:
   *  - The pattern is not a valid JSON matcher.
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
      reducer = (a, v) => ({ ...a, ...require(v) }),
      initialValue = {},
    } = {}
  ) => {
    if (!globPattern.endsWith('.json')) {
      throw new Error(
        `Invalid argument. The specified globPattern "${globPattern}" is not a valid JSON matcher.`
      );
    }

    if (withNames && reduced) {
      throw new Error(
        "Invalid options. 'withNames' and 'reduced' cannot be true at the same time."
      );
    }

    const matchingFiles = glob.sync(globPattern);

    // NOTE: The `reducer` should implement the `require` part in order for the
    // resulting value to make some sort of sense if it reduces to an object.
    if (reduced) {
      return matchingFiles.reduce(reducer, initialValue);
    }

    if (withNames) {
      return matchingFiles.map(file => [
        file,
        { ...require(path.resolve(file)) },
      ]);
    }

    return matchingFiles.map(file => ({ ...require(path.resolve(file)) }));
  };

  /**
   * Returns the data from a given JSON file.
   * @param {string} filePath - The path to a JSON file.
   * @returns {object} An object containing the data from the given JSON file.
   */
  static fromFile = filePath => {
    return { ...require(path.resolve(filePath)) };
  };
}
