import path from 'path';
import glob from 'glob';
// TODO: Consider parsing this via a new parser or similar
// The argument against is that it's a single case and might not extend to other repos in the future
import authors from '../../../content/sources/30blog/blog_data/blog_authors';

/**
 * Enriches the content configuration objects with additional attributes.
 * @param {Array} configs - An array of configuration objects.
 * @param {Array} langData - An array of language data objects.
 */
export const getRichConfigs = (configs, langData) => configs.map(cfg => {
  const {
    contentPath: contentOutDir,
    staticAssetPath: assetDir,
  } = global._yild_instance.config.paths;

  const assetPath = `/${assetDir}/`;
  cfg.assetPath = assetPath;
  cfg.outPath = contentOutDir;
  cfg.langData = langData;

  const isBlog = Boolean(cfg.isBlog);
  cfg.commonData = {
    blog: isBlog,
    language: cfg.language || {},
  };
  cfg.slugPrefix = `${cfg.slug}/s`;
  cfg.repoUrlPrefix = `${cfg.repoUrl}/blob/master/${cfg.snippetPath}`;

  let otherLanguages = [];
  if (cfg.secondLanguage) otherLanguages.push(cfg.secondLanguage);
  if (cfg.optionalLanguage) otherLanguages.push(cfg.optionalLanguage);
  if (otherLanguages.length) cfg.commonData.language.otherLanguages = otherLanguages;
  if (!cfg.cardTemplate) cfg.cardTemplate = 'StandardSnippetCard';

  cfg.isCssSnippet = cfg.dirName === '30css';
  cfg.isBlogSnippet = isBlog;
  cfg.hasOptionalLanguage = !cfg.isCssSnippet && !isBlog
    && cfg.optionalLanguage && cfg.optionalLanguage.short;
  cfg.languages = isBlog ? [] : [
    cfg.language.short,
    cfg.isCssSnippet ? cfg.secondLanguage.short : null,
    cfg.hasOptionalLanguage || cfg.isCssSnippet ? cfg.optionalLanguage.short : null,
  ].filter(Boolean).join('|');
  cfg.authors = !isBlog ? [] : authors;

  cfg.icon = cfg.theme ? cfg.theme.iconName : null;
  cfg.sourceDir = `${cfg.dirName}/${cfg.snippetPath}`;
  return cfg;
});

/**
 * Loads and enriches the content configuration files.
 * Will use stored ones, if they exist.
 * @param {string} inPath - Name of the directory where the configs are located.
 * @param {logger} boundLog - A bound logger.log function.
 * @returns {array} - An array of content configs.
 */
export const loadContentConfigs = (inPath, boundLog) => {
  boundLog(`Loading individual configuration files in ${path.resolve(inPath, 'configs')}`, 'info');
  let configs = [];
  if(global._yild_instance.contentConfigs) {
    configs = global._yild_instance.contentConfigs;
    boundLog(`Using already loaded configuration files`, 'success');
  } else {
    const rawConfigs = glob.sync(`${inPath}/configs/*.json`)
      .map( file => require(path.resolve(file)));
    const langData = rawConfigs
      .filter(cfg =>
        cfg.language && cfg.language.long &&
        cfg.theme && cfg.theme.iconName
      )
      .map(cfg => ({
        language: cfg.language.long.toLowerCase(),
        icon: cfg.theme.iconName,
      }));
    boundLog(`Processed data for ${langData.length} languages`, 'success');
    configs = getRichConfigs(rawConfigs, langData);

    global._yild_instance.contentConfigs = configs;
    boundLog(`Loaded ${configs.length} configuration files`, 'success');
  }
  return configs;
};
