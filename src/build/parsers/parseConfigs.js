import glob from 'glob';
import path from 'path';

/**
 * Combines the given configs, creating a usable array of
 * `gatsby-source-filesystem` plugin resolvers.
 * @param {string} contentDirPath - The path to the content directory.
 */
const parseConfigs = contentDirPath => {
  // Load configurations
  let configs = [];
  glob.sync(`${contentDirPath}/configs/*.json`)
    .forEach( file => {
      configs.push(
        require( path.resolve( file ) )
      );
    });
  // Create the array of resolvers.
  return configs.reduce((acc, cfg) => {
    /* istanbul ignore else */
    if (cfg.images && cfg.images.name && cfg.images.path) {
      acc.push({
        resolve: 'gatsby-source-filesystem',
        options: {
          name: `${cfg.images.name}`,
          path: `${contentDirPath}/sources/${cfg.dirName}/${cfg.images.path}`,
        },
      });
    }
    return acc;
  }, []);
};

export default parseConfigs;
