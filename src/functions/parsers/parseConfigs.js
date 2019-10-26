import glob from 'glob';
import path from 'path';

/**
 * Combines the given configs, creating a usable array of
 * `gatsby-source-filesystem` plugin resolvers.
 */
const parseConfigs = contentDirPath => {
  // Load configurations
  let configs = [];
  glob.sync(`${contentDirPath}/configs/*.js`)
    .forEach( file => {
      configs.push(
        require( path.resolve( file ) ).default
      );
    });
  // Create the array of resolvers.
  return configs.reduce((acc, cfg) => [
    ...acc,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `${cfg.dirName}_snippets`,
        path: `${contentDirPath}/sources/${cfg.dirName}/${cfg.snippetPath}`,
      },
    },
  ], []);
};

export default parseConfigs;
