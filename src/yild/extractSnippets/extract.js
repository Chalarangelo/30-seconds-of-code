import standardParser from './parsers/standardParser';
import blogParser from './parsers/blogParser';
const parsers = {
  standardParser,
  blogParser,
};
import { convertToSeoSlug, uniqueElements } from 'utils';
import rankSnippet from 'engines/rankingEngine';
import literals from 'lang/en/listing';

const extract = (configs, langData, parentLog) => configs.map(cfg => {
  const {
    rawContentPath: contentDir,
    contentPath: contentOutDir,
  } = global._yild_instance.config.paths;
  const boundLog = parentLog.rebind('extract');

  const snippetsPath = `${contentDir}/sources/${cfg.dirName}/${cfg.snippetPath}`;
  const outputJson = `${contentOutDir}/${cfg.dirName}.json`;
  const parser = cfg.parser ? parsers[cfg.parser] : parsers.standardParser;
  const slugPrefix = `${cfg.slug}/s`;
  const repoUrlPrefix = `${cfg.repoUrl}/blob/master/${cfg.snippetPath}`;
  const isBlog = !!cfg.isBlog;
  const commonData = {
    blog: isBlog,
    language: cfg.language || {},
    icon: cfg.theme ? cfg.theme.iconName : null,
  };
  let otherLanguages = [];
  if (cfg.secondLanguage) otherLanguages.push(cfg.secondLanguage);
  if (cfg.optionalLanguage) otherLanguages.push(cfg.optionalLanguage);
  if (otherLanguages.length) commonData.language.otherLanguages = otherLanguages;

  boundLog(`Extracting snippets from ${snippetsPath}`, 'info');
  return new Promise((resolve, reject) =>
    parser.readSnippets(snippetsPath, cfg, langData)
      .then(snippets => {
        let snippetsArray = Object.keys(snippets).reduce((acc, snippet) => {
          acc.push({
            ...commonData,
            ...snippets[snippet],
            slug: `/${slugPrefix}${convertToSeoSlug(snippet.slice(0, -3))}`,
            url: `${repoUrlPrefix}/${snippet}`,
            ranking: rankSnippet({
              ...snippets[snippet],
              language: commonData.language,
              biasPenaltyMultiplier: cfg.biasPenaltyMultiplier
                ? cfg.biasPenaltyMultiplier
                : 1.0,
            }),
          });
          return acc;
        }, []);

        const completeData = {
          data: [...snippetsArray],
          meta: {
            name: isBlog ? literals.blog : literals.codelang(cfg.language.long),
            count: literals.snippetCount(snippetsArray.length),
            tags: uniqueElements(
              snippetsArray.map(snippet => snippet.tags.primary)
            ).sort((a, b) => a.localeCompare(b)),
            url: `/${slugPrefix.slice(0, slugPrefix.indexOf('/'))}/p/1`,
            slugPrefix: `/${cfg.slug}`,
            featured: cfg.featured ? cfg.featured : 0,
            blog: isBlog,
            icon: cfg.theme && cfg.theme.iconName,
          },
        };
        boundLog(`Finished extracting ${snippetsPath}`, 'success');
        resolve({
          outputFile: outputJson,
          data: completeData,
        });
      })
      .catch(err => {
        boundLog(`Encountered an error while extracting ${snippetsPath}`, 'error');
        boundLog(`${err}`, 'error');
        reject(err);
      })
  );
});

export default extract;
