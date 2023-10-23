import { readFileSync } from 'node:fs';

/**
 * Handles reading CSV objects from files.
 */
export class CSVHandler {
  /**
   * Returns the data from a given CSV file.
   * @param {string} filePath - The path to a CSV file.
   * @param {object} options - Options for the function.
   * @param {boolean} options.withHeaders - Whether to include the headers in the
   *    returned data.
   * @param {string} options.delimiter - The delimiter to use when parsing the CSV
   *    file (defaults to ',').
   * @param {string[]} options.excludeProperties - An array of properties to
   *    exclude from the returned data (if withHeaders is true, this should be an
   *    array of header names, otherwise it should be an array of indices).
   * @param {string} options.keyProperty - The property to use as the key for the
   *    returned object (if withHeaders is true, this should be a header name,
   *    otherwise it should be an index)
   * @return {object[]} An array of objects representing the data from the given
   *    CSV file.
   * @returns {object} An object containing the data from the given CSV file, if
   *    a keyProperty was provided.
   */
  static fromFile = (
    filePath,
    {
      withHeaders = true,
      delimiter = ',',
      excludeProperties = [],
      keyProperty = null,
    }
  ) => {
    const data = readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    const headers = withHeaders ? lines[0].split(delimiter) : null;
    const contents = (withHeaders ? lines.slice(1) : lines).map(line =>
      line.split(delimiter)
    );

    const lineParser = withHeaders
      ? item => {
          const obj = {};
          headers.forEach((header, index) => {
            if (!excludeProperties.includes(header)) obj[header] = item[index];
          });
          return obj;
        }
      : item => {
          const obj = {};
          item.forEach((value, index) => {
            if (!excludeProperties.includes(index)) obj[index] = value;
          });
          return obj;
        };

    const parsed = contents.map(lineParser);

    if (keyProperty)
      return parsed.reduce((acc, item) => {
        acc[item[keyProperty]] = item;
        return acc;
      }, {});

    return parsed;
  };
}
