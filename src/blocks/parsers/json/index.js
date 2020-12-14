import path from 'path';
import { FileParser } from 'blocks/parsers/file';
import { ArgsError } from 'blocks/utilities/error';

/**
 * Parses JSON files, returning plain objects.
 */
export class JSONParser {
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
      throw new ArgsError(
        `Invalid argument. The specified globPattern "${globPattern}" is not a valid JSON matcher.`
      );
    }

    if (withNames && reduced) {
      throw new ArgsError(
        "Invalid options. 'withNames' and 'reduced' cannot be true at the same time."
      );
    }

    const matchingFiles = FileParser.fromGlob(globPattern);

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

  /**
   * Recursively loads all chunked JSON data in a directory.
   * @param {string} contentDir - The path to the top-level data directory.
   * @returns {Array<object>} An array of objects from the chunk directories.
   */
  static fromChunks = dirPath =>
    this.fromGlob(`${dirPath}/**/index.json`, { withNames: true }).map(
      ([file, data]) =>
        this.fromGlob(`${file.slice(0, file.lastIndexOf('/'))}/!(index).json`, {
          reduced: true,
          reducer: (acc, dataFile) => {
            acc.context = {
              ...acc.context,
              ...require(path.resolve(dataFile)),
            };
            return acc;
          },
          initialValue: data,
        })
    );
}
