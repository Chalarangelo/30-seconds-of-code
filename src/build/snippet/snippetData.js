import fs from 'fs-extra';
import path from 'path';
import util from 'util';
import sass from 'node-sass';
import frontmatter from 'front-matter';
import { exec } from 'child_process';

const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);

const mdCodeFence = '```';
const codeMatcher = new RegExp(
  `${mdCodeFence}[.\\S\\s]*?${mdCodeFence}`,
  'g'
);

/**
 * Synchronously reads all files in a directory and returns the resulting array.
 * @param {string} directoryPath - The path of the directory to read.
 */
export const getFilesInDir = directoryPath => new Promise((resolve, reject) =>
  readDir(directoryPath)
    .then(files => resolve(
      files.sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
    ))
    .catch(err => reject(err))
);

/**
 * Synchronously gets the data from a snippet file in a usable format, using frontmatter.
 * @param {string} snippetsPath - The path of the snippets directory.
 * @param {string} snippet - The name of the snippet file.
 */
export const getData = (snippetsPath, snippet) => new Promise((resolve, reject) =>
  readFile(path.join(snippetsPath, snippet), 'utf8')
    .then(content => resolve(frontmatter(content)))
    .catch(err => reject(err))
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
  }) => new Promise(resolve => {
  const replacer = new RegExp(
    `^${mdCodeFence}(${languages})?`,
    'gm'
  );
  const raw = Array.from([...str.matchAll(codeMatcher)].map(m => m[0]));
  const results = raw.map(v => v.replace(replacer, '').trim());

  if(isCssSnippet) {
    const scopedCss = sass
      .renderSync({ data: `[data-scope="${snippetName}"] { ${results[1]} }`})
      .css
      .toString();

    return resolve([{
      html: results[0],
      css: results[1],
      js: results.length > 2 ? results[2] : '',
      scopedCss,
    }, {
      html: raw[0],
      css: raw[1],
      js: raw.length > 2 ? raw[2] : '',
    }]);
  }

  if(hasOptionalLanguage && results.length > 2) {
    return resolve([{
      style: results[0],
      src: results[1],
      example: results[2],
    }, {
      style: raw[0],
      code: raw[1],
      example: raw[2],
    }]);
  }

  return resolve([{
    style: hasOptionalLanguage ? '' : undefined,
    src: results[0],
    example: results[1],
  }, {
    style: hasOptionalLanguage ? '' : undefined,
    code: raw[0],
    example: raw[1],
  }]);
});

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
export const getGitMetadata = (snippet, snippetsPath) => new Promise(resolve => Promise.all([
  new Promise(rsl => exec(
    `cd ${snippetsPath}; git log --diff-filter=A --pretty=format:%at -- ${snippet} | head -1`,
    (error, stdout) => rsl(stdout.toString().replace('\n', ''))
  )),
  new Promise(rsl => exec(
    `cd ${snippetsPath}; git log -n 1 --pretty=format:%at -- ${snippet} | head -1`,
    (error, stdout) => rsl(stdout.toString().replace('\n', ''))
  )),
]).then(values =>
  resolve({
    firstSeen: new Date(+`${values[0]}000`),
    lastUpdated: new Date(+`${values[1]}000`),
  }))
);

/**
 * Gets the tag array for a snippet from the tags string.
 * @param {string} tagStr - The string of comma-separated tags for the snippet.
 */
export const getTags = tagStr => [...new Set(tagStr.toLowerCase().split(','))];

/**
 * Gets the snippet id from the snippet's filename.
 * @param {string} snippetFilename - Filename of the snippet.
 * @param {string} sourceDir - The name of the source directory.
 */
export const getId = (snippetFilename, sourceDir) => `${sourceDir}/${snippetFilename.slice(0, -3)}`;

