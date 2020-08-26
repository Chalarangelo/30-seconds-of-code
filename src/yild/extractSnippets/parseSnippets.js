import fs from 'fs-extra';
import path from 'path';
import sass from 'node-sass';
import frontmatter from 'front-matter';
import { exec } from 'child_process';
import tokenizeSnippet from 'engines/searchIndexingEngine';
import { convertToSeoSlug, uniqueElements } from 'utils';
import {
  determineExpertiseFromTags,
  stripExpertiseFromTags,
  transformSnippetContext,
  transformBreadcrumbs,
  transformSnippetDescription
} from 'build/transformers';
import rankSnippet from 'engines/rankingEngine';
import parseMarkdown from './parseMarkdown';
// TODO: Consider parsing this via a new parser or similar
// The argument against is that it's a single case and might not extend to other repos in the future
import authors from '../../../content/sources/30blog/blog_data/blog_authors';

const mdCodeFence = '```';
const codeMatcher = new RegExp(
  `${mdCodeFence}[.\\S\\s]*?${mdCodeFence}`,
  'g'
);

/**
 * Synchronously reads all files in a directory and returns the resulting array.
 * @param {string} directoryPath - The path of the directory to read.
 * @param {function} boundLog - A bound logger.log function.
 */
export const getFilesInDir = (directoryPath, boundLog) => {
  try {
    return fs.readdirSync(directoryPath)
      .sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1);
  } catch (err) {
    /* istanbul ignore next */
    boundLog(`Fatal error while getting directory files: ${err}', 'error`);
    boundLog(`Stack trace: ${err.stack}`, 'error');
    /* istanbul ignore next */
    process.exit(1);
  }
};

/**
 * Synchronously gets the data from a snippet file in a usable format, using frontmatter.
 * @param {string} snippetsPath - The path of the snippets directory.
 * @param {string} snippet - The name of the snippet file.
 */
export const getData = (snippetsPath, snippet) => new Promise((resolve, reject) => {
  fs.readFile(path.join(snippetsPath, snippet), 'utf8', (err, content) => {
    if(err) reject(err);
    resolve(frontmatter(content));
  });
});

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

    return [{
      html: results[0],
      css: results[1],
      js: results.length > 2 ? results[2] : '',
      scopedCss,
    }, {
      html: raw[0],
      css: raw[1],
      js: raw.length > 2 ? raw[2] : '',
    }];
  }

  if(hasOptionalLanguage && results.length > 2) {
    return [{
      style: results[0],
      src: results[1],
      example: results[2],
    }, {
      style: raw[0],
      code: raw[1],
      example: raw[2],
    }];
  }

  return [{
    style: hasOptionalLanguage ? '' : undefined,
    src: results[0],
    example: results[1],
  }, {
    style: hasOptionalLanguage ? '' : undefined,
    code: raw[0],
    example: raw[1],
  }];
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
export const getTags = tagStr => [...new Set(tagStr.split(','))];

/**
 * Gets the snippet id from the snippet's filename.
 * @param {string} snippetFilename - Filename of the snippet.
 * @param {string} sourceDir - The name of the source directory.
 */
export const getId = (snippetFilename, sourceDir) => `${sourceDir}/${snippetFilename.slice(0, -3)}`;

export const parseSnippet = async(
  snippetsPath, snippet, {
    sourceDir, commonData, slugPrefix, repoUrlPrefix, assetPath, outPath,
    langData, language, isCssSnippet, isBlogSnippet, hasOptionalLanguage,
    languages, icon, biasPenaltyMultiplier, cardTemplate,
  }
) => {
  let data, gitMetadata;
  await Promise.all([
    getData(snippetsPath, snippet),
    getGitMetadata(snippet, snippetsPath),
  ]).then(values => {
    data = values[0];
    gitMetadata = values[1];
  });
  const tags = getTags(data.attributes.tags);
  const text = getTextualContent(data.body);
  const [ code, rawCode ] = isBlogSnippet
    ? [ null, [ ] ]
    : getCodeBlocks(data.body, {
      isCssSnippet,
      hasOptionalLanguage,
      languages,
      snippetName: snippet.slice(0, -3),
    });
  const type = isBlogSnippet ? `blog.${data.attributes.type}` : 'snippet';

  let excerpt, cover, shortSliceIndex, authorsData, langIcon, shortText;

  if (isBlogSnippet) {
    excerpt = data.attributes.excerpt;
    cover = `${assetPath}${data.attributes.cover}`;
    shortSliceIndex = text.indexOf('\n\n') <= 180
      ? text.indexOf('\n\n')
      : text.indexOf(' ', 160);
    shortText = excerpt && excerpt.trim().length !== 0
      ? excerpt
      : `${text.slice(0, shortSliceIndex)}...`;
    authorsData = getTags(data.attributes.authors).map(a => authors[a]);
    langIcon = langData.find(l => tags.includes(l.language));
  } else
    shortText = text.slice(0, text.indexOf('\n\n'));

  const html = parseMarkdown(
    {
      texts: {
        fullDescription: isBlogSnippet ? data.body : text,
        description: shortText,
      },
      codeBlocks: rawCode,
    }, {
      isBlog: isBlogSnippet,
      type,
      assetPath,
    }
  );

  const snippetData = {
    ...commonData,
    id: getId(snippet, sourceDir),
    title: data.attributes.title,
    type,
    tags: {
      all: tags,
      primary: tags[0],
    },
    code,
    expertise: isBlogSnippet ? 'blog' : determineExpertiseFromTags(tags),
    text: {
      full: isBlogSnippet ? data.body : text,
      short: shortText,
    },
    cover,
    authors: authorsData,
    icon: langIcon ? langIcon.icon : icon,
    searchTokens: uniqueElements(
      isBlogSnippet ? [
        ...stripExpertiseFromTags(tags),
        ...tokenizeSnippet(`${shortText} ${data.attributes.title}`),
      ].map(v => v.toLowerCase()) : [
        data.attributes.title,
        language.short,
        language.long,
        ...stripExpertiseFromTags(tags),
        ...tokenizeSnippet(shortText),
      ].map(v => v.toLowerCase())
    ).join(' '),
    html,
    ...gitMetadata,
    slug: `/${slugPrefix}${convertToSeoSlug(snippet.slice(0, -3))}`,
    url: `${repoUrlPrefix}/${snippet}`,
  };

  snippetData.ranking = rankSnippet({
    ...snippetData,
    language: commonData.language,
    biasPenaltyMultiplier: biasPenaltyMultiplier
      ? biasPenaltyMultiplier
      : 1.0,
  });

  const outDir = `${outPath}/${snippetData.slug.slice(1)}`;
  fs.ensureDirSync(outDir);
  fs.writeFileSync(
    `${outDir}/index.json`,
    JSON.stringify({
      template: 'SnippetPage',
      fullRoute: `https://30secondsofcode.org${snippetData.slug}`,
      relRoute: `${snippetData.slug}`,
      priority: (snippetData.ranking * 0.85).toFixed(2),
    }, null, 2)
  );
  fs.writeFileSync(
    `${outDir}/snippet.json`,
    JSON.stringify({
      snippet: transformSnippetContext(snippetData, cardTemplate),
    }, null, 2)
  );
  fs.writeFileSync(
    `${outDir}/metadata.json`,
    JSON.stringify({
      cardTemplate,
      breadcrumbs: transformBreadcrumbs(snippetData, cardTemplate),
      pageDescription: transformSnippetDescription(snippetData, cardTemplate),
    }, null, 2)
  );

  const trimmedData = {
    id: snippetData.id,
    tags: snippetData.tags,
    language: {
      long: snippetData.language.long,
      short: snippetData.language.short,
    },
    searchTokens: snippetData.searchTokens,
    ranking: snippetData.ranking,
    blog: snippetData.blog,
    title: snippetData.title,
    expertise: snippetData.expertise,
    icon: snippetData.icon,
    slug: snippetData.slug,
    html: {
      description: snippetData.html.description,
    },
  };

  return trimmedData;
};

export const getParams = (config, langData, assetPath, outPath) => {
  const isCssSnippet = config.dirName === '30css';
  const isBlogSnippet = config.isBlog;
  const hasOptionalLanguage = !isCssSnippet && !isBlogSnippet && config.optionalLanguage && config.optionalLanguage.short;
  const languages = isBlogSnippet ? [] : [
    config.language.short,
    isCssSnippet ? config.secondLanguage.short : null,
    hasOptionalLanguage || isCssSnippet ? config.optionalLanguage.short : null,
  ].filter(Boolean).join('|');
  const icon = config.theme ? config.theme.iconName : null;
  return {
    sourceDir: `${config.dirName}/${config.snippetPath}`,
    commonData: config.commonData,
    slugPrefix: config.slugPrefix,
    language: config.language,
    cardTemplate: config.cardTemplate,
    biasPenaltyMultiplier: config.biasPenaltyMultiplier,
    repoUrlPrefix: config.repoUrlPrefix,
    isCssSnippet, isBlogSnippet, hasOptionalLanguage, languages, icon,
    langData, assetPath, outPath,
  };
};

/**
 * Synchronously read all snippets and sort them as necessary.
 * The sorting is case-insensitive.
 * @param {string} snippetsPath - The path of the snippets directory.
 * @param {string} assetPath - The public path of the assets directory.
 * @param {string} outPath - The output path of the snippets directory.
 * @param {object} config - The project's enriched configuration
 *  (containing the spread config, commonData and prefixes).
 * @param {array} langData - An array of `(language, icon)` tuples.
 * @param {function} boundLog - A bound logger.log function.
 */
export const readSnippets = async(snippetsPath, assetPath, outPath, config, langData, boundLog) => {
  const snippetFilenames = getFilesInDir(snippetsPath, boundLog);
  const params = getParams(config, langData, assetPath, outPath);

  let snippets = [];
  try {
    for (let snippet of snippetFilenames) {
      const snippetData = await parseSnippet(snippetsPath, snippet, params);
      snippets.push(snippetData);
    }
  } catch (err) {
    /* istanbul ignore next */
    boundLog(`Fatal error while reading snippets: ${err}`, 'error');
    boundLog(`Stack trace: ${err.stack}`, 'error');
    /* istanbul ignore next */
    process.exit(1);
  }
  return snippets;
};

export default readSnippets;
