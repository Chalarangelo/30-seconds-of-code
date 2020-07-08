import fs from 'fs-extra';
import path from 'path';
import { red } from 'kleur';
import sass from 'node-sass';
import frontmatter from 'front-matter';
import { exec } from 'child_process';
import tokenizeSnippet from 'engines/searchIndexingEngine';
import { uniqueElements } from 'utils';
import { determineExpertiseFromTags, stripExpertiseFromTags } from 'build/transformers';
import { parseMarkdown } from 'build/parsers';
import resolvers from 'build/resolvers';
// TODO: Remove usage and package after update to Node.js v12.x
import matchAll from 'string.prototype.matchall';

const mdCodeFence = '```';

/**
 * Synchronously reads all files in a directory and returns the resulting array.
 * @param {string} directoryPath - The path of the directory to read.
 */
export const getFilesInDir = directoryPath => {
  try {
    return fs.readdirSync(directoryPath)
      .sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1);
  } catch (err) {
    /* istanbul ignore next */
    console.log(`${red('[ERROR]')} Error while getting directory files: ${err}`);
    /* istanbul ignore next */
    process.exit(1);
  }
};

/**
 * Synchronously gets the data from a snippet file in a usable format, using frontmatter.
 * @param {string} snippetsPath - The path of the snippets directory.
 * @param {string} snippet - The name of the snippet file.
 */
export const getData = (snippetsPath, snippet) => frontmatter(
  fs.readFileSync(path.join(snippetsPath, snippet), 'utf8')
);

/**
 * Gets the code blocks for a snippet.
 * @param {string} str - The snippet's raw content.
 * @param {object} config - The content repository's configuration file.
 */
export const getCodeBlocks = (
  str,
  {
    isCssSnippet = false,
    hasOptionalLanguage = false,
    languages = [],
    snippetName = '',
  }) => {
  const regex = new RegExp(
    `${mdCodeFence}[.\\S\\s]*?${mdCodeFence}`,
    'g'
  );
  const replacer = new RegExp(
    `^${mdCodeFence}(${languages.filter(Boolean).join('|')})?`,
    'gm'
  );

  // TODO: Replace matchAll(str, regex) with str.matchAll(regex) after update to Node.js v12.x
  const results = Array.from(
    matchAll(str, regex),
    m => m[0]
  ).map(v => v.replace(replacer, '').trim());

  if(isCssSnippet) {
    const scopedCss = sass
      .renderSync({ data: `[data-scope="${snippetName}"] { ${results[1]} }`})
      .css
      .toString();

    return {
      html: results[0],
      css: results[1],
      js: results.length > 2 ? results[2] : '',
      scopedCss,
    };
  }

  if(hasOptionalLanguage && results.length > 2) {
    return {
      style: results[0],
      src: results[1],
      example: results[2],
    };
  }

  return {
    style: hasOptionalLanguage ? '' : undefined,
    src: results[0],
    example: results[1],
  };
};

/**
 * Gets the textual content for a snippet.
 * @param {string} str - The snippet's raw content.
 */
export const getTextualContent = str =>
  str.slice(0, str.indexOf(mdCodeFence)).replace(/\r\n/g, '\n');

/**
 * Asynchronously gets the git metadata for a snippet.
 * @param {string} snippet - The name of the snippet file.
 */
export const getGitMetadata = async(snippet, snippetsPath) => {
  const getFirstSeen = new Promise(resolve => exec(
    `cd ${snippetsPath}; git log --diff-filter=A --pretty=format:%at -- ${snippet} | head -1`,
    (error, stdout) => resolve(stdout.toString().replace('\n', ''))
  ));
  const getLastUpdated = new Promise(resolve => exec(
    `cd ${snippetsPath}; git log -n 1 --pretty=format:%at -- ${snippet} | head -1`,
    (error, stdout) => resolve(stdout.toString().replace('\n', ''))
  ));
  const getUpdateCount = new Promise(resolve => exec(
    `cd ${snippetsPath}; git log --pretty=%H -- ${snippet}`,
    (error, stdout) => resolve(stdout.toString().split('\n').length)
  ));
  let metaData = {};
  await Promise.all([
    getFirstSeen,
    getLastUpdated,
    getUpdateCount,
  ]).then(values => {
    metaData = {
      firstSeen: new Date(+`${values[0]}000`),
      lastUpdated: new Date(+`${values[1]}000`),
      updateCount: values[2],
    };
  });
  return metaData;
};

/**
 * Gets the tag array for a snippet from the tags string.
 * @param {string} tagStr - The string of comma-separated tags for the snippet.
 */
export const getTags = tagStr =>
  tagStr
    .split(',')
    .reduce((acc, t) => {
      const _t = t.trim().toLowerCase();
      if(!acc.includes(_t)) acc.push(_t);
      return acc;
    }, []);

/**
 * Gets the snippet id from the snippet's filename.
 * @param {string} snippetFilename - Filename of the snippet.
 * @param {string} sourceDir - The name of the source directory.
 */
export const getId = (snippetFilename, sourceDir) => `${sourceDir}/${snippetFilename.slice(0, -3)}`;

/**
 * Synchronously read all snippets and sort them as necessary.
 * The sorting is case-insensitive.
 * @param {string} snippetsPath - The path of the snippets directory.
 * @param {object} config - The project's configuration file.
 */
export const readSnippets = async(snippetsPath, config) => {
  const snippetFilenames = getFilesInDir(snippetsPath, false);
  const sourceDir = `${config.dirName}/${config.snippetPath}`;
  const resolver = config.resolver ? config.resolver : 'stdResolver';

  // Properties used in getCodeBlocks config
  const isCssSnippet = config.dirName === '30css';
  const hasOptionalLanguage = !isCssSnippet && config.optionalLanguage && config.optionalLanguage.short;
  const languages = [
    config.language.short,
    isCssSnippet ? config.secondLanguage.short : null,
    hasOptionalLanguage ? config.optionalLanguage.short : null,
  ];

  let snippets = {};
  try {
    for (let snippet of snippetFilenames) {
      let data = getData(snippetsPath, snippet);
      const tags = getTags(data.attributes.tags);
      const text = getTextualContent(data.body);
      const shortText = text.slice(0, text.indexOf('\n\n'));
      const html = parseMarkdown(data.body);

      snippets[snippet] = {
        id: getId(snippet, sourceDir),
        title: data.attributes.title,
        type: 'snippet',
        tags: {
          all: tags,
          primary: tags[0],
        },
        code: getCodeBlocks(data.body, {
          isCssSnippet,
          hasOptionalLanguage,
          languages,
          snippetName: snippet.slice(0, -3),
        }),
        expertise: determineExpertiseFromTags(tags),
        text: {
          full: text,
          short: shortText,
        },
        searchTokens: uniqueElements([
          data.attributes.title,
          config.language.short,
          config.language.long,
          ...stripExpertiseFromTags(tags),
          ...tokenizeSnippet(shortText),
        ].map(v => v.toLowerCase())).join(' '),
        html: {
          full: html,
          ...resolvers[resolver](html),
        },
        ...await getGitMetadata(snippet, snippetsPath),
      };
    }
  } catch (err) {
    /* istanbul ignore next */
    console.log(`${red('[ERROR]')} Error while reading snippets: ${err}`);
    /* istanbul ignore next */
    process.exit(1);
  }
  return snippets;
};

export default {
  getFilesInDir,
  getData,
  getId,
  getCodeBlocks,
  getTextualContent,
  getGitMetadata,
  getTags,
  readSnippets,
};
