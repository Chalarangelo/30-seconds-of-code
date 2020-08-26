import glob from 'glob';
import path from 'path';

/**
 * Combines the given data JSONs, using the data files
 * of the content, returning an array of objects from the files.
 * @param {string} contentDirPath - The path to the content directory.
 */
const parseRequirables = contentDirPath => {
  // Load configurations
  let requirables = [];
  glob
    .sync(`${contentDirPath}/**/index.json`)
    .forEach( file => {
      const dir = file.slice(0, file.lastIndexOf('/'));
      const reqData = glob
        .sync(`${dir}/!(index).json`)
        .reduce((acc, dataFile) => {
          const data = require(path.resolve(dataFile));
          acc.context = {
            ...acc.context,
            ...data,
          };
          return acc;
        },
        {
          ...require(path.resolve(file)),
          context: {},
        });
      requirables.push(reqData);
    });
  return requirables;
};

export default parseRequirables;
