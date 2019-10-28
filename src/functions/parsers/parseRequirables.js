import glob from 'glob';
import path from 'path';

/**
 * Combines the given requirable JSONs, using the config files
 * of the content, returning an array of objects from the files.
 */
const parseRequirables = contentDirPath => {
  // Load configurations
  let configs = [];
  glob.sync(`${contentDirPath}/configs/*.js`)
    .forEach( file => {
      configs.push(
        require( path.resolve( file ) ).default
      );
    });
  // Create the array of requirables.
  let requirables = [];
  configs.forEach(cfg => {
    cfg.requirables.forEach(req => {
      glob.sync(`${contentDirPath}/sources/${cfg.dirName}/${req}`).forEach( file => {
        let reqJson = require( path.resolve( file ) );

        const rdc = cfg.reducer ? cfg.reducer : 'stdReducer';
        reqJson.meta.reducer = `${rdc}`;

        const archived = !!cfg.isArchived;
        reqJson.meta.archived = archived;
        reqJson.meta.slugPrefix = archived ? `${cfg.slug}/a` : `${cfg.slug}/s`;

        reqJson.meta.sourceDir = `${cfg.dirName}/${cfg.snippetPath}`;

        requirables.push( reqJson );
      });
    });
  });
  return requirables;
};

export default parseRequirables;
