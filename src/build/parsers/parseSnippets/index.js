import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';
import { blue, green, red } from 'kleur';
import standardParser from './standardParser';
import cssParser from './cssParser';
import blogParser from './blogParser';

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
  // Extract snippet JSON files
  configs.forEach(cfg => {
    const snippetsPath = `${contentDirPath}/sources/${cfg.dirName}/${cfg.snippetPath}`;
    const outputJson = `${contentDirPath}/data/${cfg.dirName}.json`;
    console.log(`${blue('Extracting snippets from: ')}${snippetsPath}`);

    let parser;
    if(cfg.parser && cfg.parser !== 'standardParser')
      parser = parsers[cfg.parser];
    else parser = parsers.standardParser;

    const rdc = cfg.reducer ? cfg.reducer : 'stdReducer';
    const rsv = cfg.resolver ? cfg.resolver : 'stdResolver';

    const commonData = {
      blog: !!cfg.isBlog,
      language: cfg.language,
      icon: cfg.theme ? cfg.theme.iconName : null,
      sourceDir: `${cfg.dirName}/${cfg.snippetPath}`,
      slugPrefix: `${cfg.slug}/s`,
      repoUrlPrefix: `${cfg.repoUrl}/blob/master/${cfg.snippetPath}`,
      reducer: rdc,
      resolver: rsv,
      biasPenaltyMultiplier: cfg.biasPenaltyMultiplier ? cfg.biasPenaltyMultiplier : 1.0,
    };

    // Parse additional languages
    let otherLanguages = [];
    if(cfg.secondLanguage || cfg.optionalLanguage) {
      if(cfg.secondLanguage) otherLanguages.push(cfg.secondLanguage);
      if(cfg.optionalLanguage) otherLanguages.push(cfg.optionalLanguage);
      commonData.otherLanguages = otherLanguages;
    }

    parser.readSnippets(snippetsPath, cfg)
      .then(snippets => {
        let snippetsArray = Object.keys(snippets).reduce((acc, key) => {
          acc.push({
            ...snippets[key],
            ...commonData,
          });
          return acc;
        }, []);

        const completeData = {
          data: [...snippetsArray],
          meta: {
            specification: 'http://jsonapi.org/format/',
            type: 'snippetArray',
            language: cfg.language,
            blog: !!cfg.isBlog,
            slugPrefix: `${cfg.slug}/s`,
            sourceDir: `${cfg.dirName}/${cfg.snippetPath}`,
            repoUrlPrefix: `${cfg.repoUrl}/blob/master/${cfg.snippetPath}`,
            biasPenaltyMultiplier: cfg.biasPenaltyMultiplier ? cfg.biasPenaltyMultiplier : 1.0,
            featured: cfg.featured ? cfg.featured : 0,
            theme: cfg.theme,
            reducer: rdc,
            resolver: rsv,
          },
        };

        if (otherLanguages.length) completeData.meta.otherLanguages = otherLanguages;

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
