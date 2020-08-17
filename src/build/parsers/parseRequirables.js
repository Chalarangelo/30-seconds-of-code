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
  glob.sync(`${contentDirPath}/*.json`)
    .forEach( file => {
      requirables.push(
        require( path.resolve( file ) )
      );
    });
  return requirables;
};

export default parseRequirables;
