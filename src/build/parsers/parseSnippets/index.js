import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';
import { blue, green, red } from 'kleur';
import rankSnippet from 'engines/rankingEngine';
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
const parseSnippets = contentDirPath => {
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

  // Extract snippet JSON files
  configs.forEach(cfg => {
    const snippetsPath = `${contentDirPath}/sources/${cfg.dirName}/${cfg.snippetPath}`;
    const outputJson = `${contentDirPath}/data/${cfg.dirName}.json`;
    console.log(`${blue('Extracting snippets from: ')}${snippetsPath}`);

    let parser;
    if(cfg.parser && cfg.parser !== 'standardParser')
      parser = parsers[cfg.parser];
    else parser = parsers.standardParser;
    const rsv = cfg.resolver ? cfg.resolver : 'stdResolver';
    const slugPrefix = `${cfg.slug}/s`;
    const repoUrlPrefix = `${cfg.repoUrl}/blob/master/${cfg.snippetPath}`;
    const isBlog = !!cfg.isBlog;

    const commonData = {
      blog: isBlog,
      language: cfg.language || {},
      icon: cfg.theme ? cfg.theme.iconName : null,
      resolver: rsv,
    };

    // Parse additional languages
    let otherLanguages = [];
    if(cfg.secondLanguage || cfg.optionalLanguage) {
      if(cfg.secondLanguage) otherLanguages.push(cfg.secondLanguage);
      if(cfg.optionalLanguage) otherLanguages.push(cfg.optionalLanguage);
      commonData.language.otherLanguages = otherLanguages;
    }

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

        fs.writeFileSync(
          outputJson,
          JSON.stringify(completeData, null, 2)
        );
        console.log(`${green('Finished writing ')}${outputJson}`);
      })
      .catch(err => {
        console.log(`${red('[ERROR]')} Encountered an error: ${err}`);
      });
  });
};

export default parseSnippets;
