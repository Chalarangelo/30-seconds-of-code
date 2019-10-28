import glob from 'glob';
import path from 'path';

/**
 * Combines the given reducer functions, using the config files
 * of the content, returning an object of the reducers used, where
 * each reducer name is mapped to the reducer function.
 */
const parseReducers = contentDirPath => {
  // Load configurations
  let configs = [];
  glob.sync(`${contentDirPath}/configs/*.js`)
    .forEach( file => {
      configs.push(
        require( path.resolve( file ) ).default
      );
    });
  // Create the array of reducers.
  let reducers = {};
  configs.forEach(cfg => {
    const rdc = cfg.reducer ? cfg.reducer : 'stdReducer';
    glob.sync(`${contentDirPath}/reducers/${rdc}.js`).forEach( file => {
      let reducer = require( path.resolve( file ) ).default;
      reducers = {
        ...reducers,
        [`${rdc}`]: reducer,
      };
    });
  });
  return reducers;
};

export default parseReducers;
