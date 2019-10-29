import glob from 'glob';
import path from 'path';

/**
 * Combines the given resolver functions, using the config files
 * of the content, returning an object of the resolvers used, where
 * each resolver name is mapped to the resolver function.
 */
const parseResolvers = contentDirPath => {
  // Load configurations
  let configs = [];
  glob.sync(`${contentDirPath}/configs/*.js`)
    .forEach( file => {
      configs.push(
        require( path.resolve( file ) ).default
      );
    });
  // Create the array of resolvers.
  let resolvers = {};
  configs.forEach(cfg => {
    const rlv = cfg.resolver ? cfg.resolver : 'stdResolver';
    glob.sync(`${contentDirPath}/resolvers/${rlv}.js`).forEach( file => {
      let resolver = require( path.resolve( file ) ).default;
      resolvers = {
        ...resolvers,
        [`${rlv}`]: resolver,
      };
    });
  });
  return resolvers;
};

export default parseResolvers;
