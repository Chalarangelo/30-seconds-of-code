import util from 'util';
import fs from 'fs-extra';
import globalConfig from 'settings/global';

const writeFile = util.promisify(fs.writeFile);
const routePrefix = globalConfig.websiteUrl;

/**
 * Writes the provided chunks to the specified directory.
 * If the directory does not exist, it will be created.
 * Displays a warning, if there are multiple chunks without one named `index`.
 * @param {string} path - Directory path to write the chunks.
 * @param {Array} dataChunkPairs - A 2D array of key-value ([string, object]) pairs.
 * @returns {Promise} - A promise that resolves as soon as all chunks are written
 */
export const writeChunks = (path, ...dataChunkPairs) => {
  fs.ensureDirSync(path);
  if (!dataChunkPairs > 1 && !dataChunkPairs.some(dcp => dcp[0] === 'index'))
    console.warn(`Data for ${path} does not contain an index!`);

  return Promise.all(
    dataChunkPairs.map(([key, value]) =>
      writeFile(`${path}/${key}.json`, JSON.stringify(value, null, 2))
    )
  );
};

/**
 * Creates the bare minimum for an index chunk.
 * @param {string} path - Relative path for the chunk (e.g. `/404`).
 * @param {string} template - Name of the template to be used.
 * @param {number} priority - A value between 0.0 and 1.0 (default 0.5)
 * @param {object} rest - (Optional) Rest of the data to add
 */
export const createIndexChunk = (path, template, priority = 0.5, rest = {}) => {
  const relRoute = path.startsWith('/') ? path : `/${path}`;
  return {
    template,
    relRoute,
    fullRoute: `${routePrefix}${relRoute}`,
    priority,
    ...rest,
  };
};

export default {
  writeChunks,
  createIndexChunk,
};
