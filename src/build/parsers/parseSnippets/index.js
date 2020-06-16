import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';
import { blue, green, red } from 'kleur';
import rankSnippet from 'engines/rankingEngine';
import recommendationEngine from 'engines/recommendationEngine';
import { convertToSeoSlug, uniqueElements } from 'utils';
import standardParser from './standardParser';
import cssParser from './cssParser';
import blogParser from './blogParser';
import literals from 'lang/en/listing';

const parsers = {
  standardParser,
  cssParser,
  blogParser,
};

/**
 * Parses a repository's data using and generates the extracted JSON files.
 * @param {string} contentDirPath - The path to the content directory.
 */
const parseSnippets = async contentDirPath => {
  // Load configurations
  let configs = [];
  glob.sync(`${contentDirPath}/configs/*.json`)
    .forEach( file => {
      configs.push(
        require( path.resolve( file ) )
      );
    });

  const langData = configs
    .filter(cfg =>
      cfg.language && cfg.language.long &&
      cfg.theme && cfg.theme.iconName
    )
    .map(cfg => ({
      language: cfg.language.long.toLowerCase(),
      icon: cfg.theme.iconName,
    }));

  let allData = [];

  // Extract snippet JSON files
  await Promise.all(configs.map(cfg => {
    const snippetsPath = `${contentDirPath}/sources/${cfg.dirName}/${cfg.snippetPath}`;
    const outputJson = `${contentDirPath}/data/${cfg.dirName}.json`;
    console.log(`${blue('Extracting snippets from: ')}${snippetsPath}`);

    let parser;
    if(cfg.parser && cfg.parser !== 'standardParser')
      parser = parsers[cfg.parser];
    else parser = parsers.standardParser;
    const slugPrefix = `${cfg.slug}/s`;
    const repoUrlPrefix = `${cfg.repoUrl}/blob/master/${cfg.snippetPath}`;
    const isBlog = !!cfg.isBlog;

    const commonData = {
      blog: isBlog,
      language: cfg.language || {},
      icon: cfg.theme ? cfg.theme.iconName : null,
    };

    // Parse additional languages
    let otherLanguages = [];
    if(cfg.secondLanguage || cfg.optionalLanguage) {
      if(cfg.secondLanguage) otherLanguages.push(cfg.secondLanguage);
      if(cfg.optionalLanguage) otherLanguages.push(cfg.optionalLanguage);
      commonData.language.otherLanguages = otherLanguages;
    }

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
          console.log(`${green('Finished extracting ')}${snippetsPath}`);
          resolve({
            outputFile: outputJson,
            data: completeData,
          });
        })
        .catch(err => {
          console.log(`${red('[ERROR]')} Encountered an error: ${err}`);
          reject(err);
        })
    );
  })).then(results => { allData = results; });

  // Write snippet JSON files
  const allSnippetData = allData.reduce((acc, r) => [...acc, ...r.data.data], []);

  await Promise.all(
    allData.map(({ outputFile, data }) => new Promise((resolve, reject) => {
      const outputData = {
        data: data.data.map(snippet => {
          const recommendedSnippets = recommendationEngine(allSnippetData, snippet)
            .map(({
              id, title, expertise, tags, language,
              icon, html, slug, searchTokens,
              recommendationRanking,
            }) => ({
              id, title, expertise, icon, slug, searchTokens,
              recommendationRanking: +recommendationRanking,
              html: {
                description: html.description,
              },
              tags: {
                primary: tags.primary,
              },
              language: {
                short: language.short,
                long: language.long,
              },
            }));
          return {
            ...snippet,
            recommendedSnippets,
          };
        }),
        meta: data.meta,
      };
      fs.writeFile(
        outputFile,
        JSON.stringify(outputData, null, 2),
        err => {
          if (err) {
            console.log(`${red('[ERROR]')} Encountered an error: ${err}`);
            reject(err);
          } else {
            console.log(`${green('Finished writing ')}${outputFile}`);
            resolve();
          }
        }
      );
    }))
  );
};

export default parseSnippets;
