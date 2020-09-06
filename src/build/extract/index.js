import fs from 'fs-extra';
import { bindLogger } from 'build/core';
import { transformSnippetIndex } from 'build/transformers';
import { writeChunks } from 'build/json';
import { readSnippets } from 'build/snippet';
import { compileListingData } from 'build/listing';
import { compileStaticData } from 'build/staticContent';
import recommendationEngine from 'engines/recommendationEngine';
import { uniqueElements } from 'utils';
import literals from 'lang/en';

const extract = (configs, boundLog) => configs.map(cfg => {
  const {
    rawContentPath: contentDir,
  } = global.yild.paths;
  const snippetsPath = `${contentDir}/sources/${cfg.dirName}/${cfg.snippetPath}`;
  boundLog(`Extracting snippets from ${snippetsPath}`, 'info');

  return new Promise((resolve, reject) =>
    readSnippets(snippetsPath, cfg, boundLog)
      .then(snippetsArray => {
        const completeData = {
          data: snippetsArray,
          meta: {
            name: cfg.isBlog ? literals.listing.blog : literals.listing.codelang(cfg.language.long),
            tags: uniqueElements(
              snippetsArray.map(snippet => snippet.tags.primary)
            ).sort((a, b) => a.localeCompare(b)),
            url: `/${cfg.slugPrefix.slice(0, cfg.slugPrefix.indexOf('/'))}/p/1`,
            slugPrefix: `/${cfg.slug}`,
            featured: cfg.featured ? cfg.featured : 0,
            blog: cfg.isBlog,
            icon: cfg.theme && cfg.theme.iconName,
          },
        };
        boundLog(`Finished extracting ${snippetsPath}`, 'success');
        resolve({
          snippetsPath,
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

const postProcess = (allData, allSnippetData, boundLog) => {
  // Generate listing data and write snippet recommendations
  return [
    compileListingData(allSnippetData, allData.map(({ data }) => data.meta)),
    ...allData.map(async({ snippetsPath, data }) => {
      const {
        contentPath: contentOutDir,
      } = global.yild.paths;
      boundLog(`Post-processing snippets for ${snippetsPath}`, 'info');

      for (let snippet of data.data) {
        await writeChunks(
          `${contentOutDir}/${snippet.slug.slice(1)}`,
          ['recommendations', {
            recommendedSnippets: transformSnippetIndex(
              recommendationEngine(allSnippetData, snippet)
            ),
          }]
        );
      }
    }),
  ];
};

export const extractData = async() => {
  const boundLog = bindLogger('extractData');
  const {
    contentPath: outPath,
  } = global.yild.paths;
  const configs = global.yild.configs;
  fs.ensureDirSync(outPath);
  let allData = [];

  boundLog('Extracting snippet data', 'info');
  await Promise
    .all(extract(configs, boundLog))
    .then(res => { allData = res; });
  const allSnippetData = allData
    .reduce((acc, r) => [...acc, ...r.data.data], [])
    .sort((a, b) => b.ranking - a.ranking);
  boundLog(`Extracted data for ${allSnippetData.length} snippets`, 'success');

  boundLog('Post-processing snippet data', 'info');
  await Promise
    .all(postProcess(allData, allSnippetData, boundLog));
  boundLog('Snippet post-processing complete', 'success');

  boundLog('Creating static data files', 'info');
  await Promise.all([
    compileStaticData(outPath, '/404', 'NotFoundPage', 0),
    compileStaticData(outPath, '/about', 'StaticPage', 0.25,
      { stringLiterals: literals.about }
    ),
    compileStaticData(outPath, '/cookies', 'StaticPage', 0.25,
      { stringLiterals: literals.cookies }
    ),
    compileStaticData(outPath, '/settings', 'SettingsPage', 0.05,
      { stringLiterals: literals.settings }
    ),
    compileStaticData(outPath, '/search', 'SearchPage', 0.25,
      {
        searchIndex: transformSnippetIndex(allSnippetData, true),
        recommendedSnippets: transformSnippetIndex(allSnippetData.slice(0, 3)),
        pageDescription: literals.search.pageDescription(allSnippetData.length),
      }
    ),
  ]);
  boundLog('Static data creation complete', 'info');

  return;
};

export default extractData;
