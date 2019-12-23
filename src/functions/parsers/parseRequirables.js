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

        const rsv = cfg.resolver ? cfg.resolver : 'stdResolver';
        reqJson.meta.resolver = `${rsv}`;

        const archived = !!cfg.isArchived;
        reqJson.meta.archived = archived;

        const blog = !!cfg.isBlog;
        reqJson.meta.blog = blog;

        reqJson.meta.slugPrefix = archived ? `${cfg.slug}/v` : `${cfg.slug}/s`;

        reqJson.meta.sourceDir = `${cfg.dirName}/${cfg.snippetPath}`;
        reqJson.meta.repoUrlPrefix = `${cfg.repoUrl}/blob/master/${cfg.snippetPath}`;

        reqJson.meta.biasPenaltyMultiplier = cfg.biasPenaltyMultiplier;
        reqJson.meta.tagScores = cfg.tagScores;
        reqJson.meta.keywordScores = cfg.keywordScores;

        reqJson.meta.featured = cfg.featured ? cfg.featured : 0;
        reqJson.meta.theme = cfg.theme;

        requirables.push( reqJson );
      });
    });
  });
  return requirables;
};

export default parseRequirables;
