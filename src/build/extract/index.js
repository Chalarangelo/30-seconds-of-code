import fs from 'fs-extra';
import { Logger } from 'build/utilities/logger';
import { JSONSerializer } from 'build/serializers/json';
import { Chunk } from 'build/utilities/chunk';
import { SnippetCollection } from 'build/entities/snippetCollection';
import { SnippetPreview } from 'build/adapters/snippetPreview';
import { readSnippets } from 'build/tasks/readSnippets';
import { compileListingData } from 'build/listing';
import literals from 'lang/en';

const extract = (configs, boundLog) =>
  configs.map(cfg => {
    const { rawContentPath: contentDir } = global.settings.paths;
    const snippetsPath = `${contentDir}/sources/${cfg.dirName}/${cfg.snippetPath}`;
    boundLog(`Extracting snippets from ${snippetsPath}`, 'info');

    return new Promise((resolve, reject) =>
      readSnippets(snippetsPath, cfg)
        .then(snippetsArray => {
          boundLog(`Finished extracting ${snippetsPath}`, 'success');
          resolve(
            new SnippetCollection(
              {
                type: cfg.isBlog ? 'blog' : 'language',
                slugPrefix: `/${cfg.slug}`,
                config: cfg,
              },
              snippetsArray
            )
          );
        })
        .catch(err => {
          boundLog(
            `Encountered an error while extracting ${snippetsPath}`,
            'error'
          );
          boundLog(`${err}`, 'error');
          reject(err);
        })
    );
  });

const postProcess = (allData, allSnippetData, boundLog) => {
  // Generate listing data and write snippet recommendations
  return [
    compileListingData(
      allSnippetData,
      allData.map(({ meta }) => meta)
    ),
    ...allData.map(async ({ snippets, meta }) => {
      const { contentPath: contentOutDir } = global.settings.paths;
      boundLog(`Post-processing snippets for ${meta.name}`, 'info');

      for (let snippet of snippets) {
        await JSONSerializer.serializeToDir(
          `${contentOutDir}/${snippet.slug.slice(1)}`,
          [
            'recommendations',
            {
              recommendedSnippets: snippet.recommendedSnippets.map(s =>
                new SnippetPreview(s).toObject()
              ),
            },
          ]
        );
      }
    }),
  ];
};

export const extractData = async () => {
  const boundLog = Logger.bind('extractData');
  const { contentPath: outPath } = global.settings.paths;
  const configs = global.settings.configs;
  fs.ensureDirSync(outPath);
  let allData = [];

  boundLog('Extracting snippet data', 'info');
  await Promise.all(extract(configs, boundLog)).then(res => {
    allData = res;
  });
  const allSnippetData = allData
    .reduce((acc, r) => [...acc, ...r.snippets], [])
    .sort((a, b) => b.ranking - a.ranking);
  boundLog(`Extracted data for ${allSnippetData.length} snippets`, 'success');

  boundLog('Post-processing snippet data', 'info');
  await Promise.all(postProcess(allData, allSnippetData, boundLog));
  boundLog('Snippet post-processing complete', 'success');

  boundLog('Creating static data files', 'info');
  await Promise.all([
    JSONSerializer.serializeToDir(
      ...Chunk.createStaticPageChunks(outPath, '/404', 'NotFoundPage', 0)
    ),
    JSONSerializer.serializeToDir(
      ...Chunk.createStaticPageChunks(outPath, '/about', 'StaticPage', 0.25, {
        stringLiterals: literals.about,
      })
    ),
    JSONSerializer.serializeToDir(
      ...Chunk.createStaticPageChunks(outPath, '/cookies', 'StaticPage', 0.25, {
        stringLiterals: literals.cookies,
      })
    ),
    JSONSerializer.serializeToDir(
      ...Chunk.createStaticPageChunks(
        outPath,
        '/settings',
        'SettingsPage',
        0.05,
        {
          stringLiterals: literals.settings,
        }
      )
    ),
    JSONSerializer.serializeToDir(
      ...Chunk.createStaticPageChunks(outPath, '/search', 'SearchPage', 0.25, {
        searchIndex: allSnippetData
          .filter(s => s.isListed)
          .map(s =>
            new SnippetPreview(s, { withSearchTokens: true }).toObject()
          ),
        recommendedSnippets: allSnippetData
          .slice(0, 3)
          .map(s => new SnippetPreview(s).toObject()),
        pageDescription: literals.search.pageDescription(allSnippetData.length),
      })
    ),
    JSONSerializer.serializeToDir(
      ...Chunk.createStaticPageChunks(outPath, '/archive', 'SearchPage', 0, {
        searchIndex: allSnippetData
          .filter(s => !s.isListed)
          .map(s =>
            new SnippetPreview(s, { withSearchTokens: true }).toObject()
          ),
        recommendedSnippets: allSnippetData
          .slice(0, 3)
          .map(s => new SnippetPreview(s).toObject()),
        pageDescription: literals.search.pageDescription(allSnippetData.length),
      })
    ),
  ]);
  boundLog('Static data creation complete', 'info');

  return;
};

export default extractData;
