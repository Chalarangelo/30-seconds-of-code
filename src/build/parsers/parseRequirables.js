import glob from 'glob';
import path from 'path';

/**
 * Combines the given requirable JSONs, using the config files
 * of the content, returning an array of objects from the files.
 * @param {string} contentDirPath - The path to the content directory.
 */
const parseRequirables = contentDirPath => {
  // Load configurations
  let configs = [];
  glob.sync(`${contentDirPath}/configs/*.json`)
    .forEach( file => {
      configs.push(
        require( path.resolve( file ) )
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

        const rsv = cfg.resolver ? cfg.resolver : 'stdResolver';
        reqJson.meta.resolver = `${rsv}`;

        reqJson.meta.blog = !!cfg.isBlog;

        reqJson.meta.slugPrefix = `${cfg.slug}/s`;

        reqJson.meta.sourceDir = `${cfg.dirName}/${cfg.snippetPath}`;
        reqJson.meta.repoUrlPrefix = `${cfg.repoUrl}/blob/master/${cfg.snippetPath}`;

        reqJson.meta.biasPenaltyMultiplier = cfg.biasPenaltyMultiplier ? cfg.biasPenaltyMultiplier : 1.0;

        reqJson.meta.featured = cfg.featured ? cfg.featured : 0;
        reqJson.meta.theme = cfg.theme;

        requirables.push( reqJson );
      });
    });
  });
  return requirables;
};

export default parseRequirables;
