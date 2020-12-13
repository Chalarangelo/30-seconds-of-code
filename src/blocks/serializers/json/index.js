import util from 'util';
import fs from 'fs-extra';
const writeFile = util.promisify(fs.writeFile);

/**
 * Serializes objects to JSON files.
 */
export class JSONSerializer {
  static serializeToFile = (filePath, obj) =>
    writeFile(filePath, JSON.stringify(obj, null, 2));

  /**
   * Writes the provided chunks to the specified directory.
   * If the directory does not exist, it will be created.
   * Displays a warning, if there are multiple chunks without one named `index`.
   * @param {string} path - Directory path to write the chunks.
   * @param {Array} dataChunkPairs - A 2D array of key-value ([string, object]) pairs.
   * @returns {Promise} - A promise that resolves as soon as all chunks are written
   */
  static serializeToDir = (path, ...dataChunkPairs) => {
    fs.ensureDirSync(path);
    if (!dataChunkPairs > 1 && !dataChunkPairs.some(dcp => dcp[0] === 'index'))
      console.warn(`Data for ${path} does not contain an index!`);

    return Promise.all(
      dataChunkPairs.map(([key, value]) =>
        writeFile(`${path}/${key}.json`, JSON.stringify(value, null, 2))
      )
    );
  };
}
