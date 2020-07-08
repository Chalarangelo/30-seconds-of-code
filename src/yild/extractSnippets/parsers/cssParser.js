import { red } from 'kleur';
import sass from 'node-sass';
import tokenizeSnippet from 'engines/searchIndexingEngine';
import { uniqueElements } from 'utils';
import { determineExpertiseFromTags, stripExpertiseFromTags } from 'build/transformers';
import { parseMarkdown } from 'build/parsers';
import resolvers from 'build/resolvers';
import {
  getFilesInDir,
  getData,
  getTextualContent,
  getGitMetadata,
  getId,
  getTags
} from './standardParser';
// TODO: Remove usage and package after update to Node.js v12.x
import matchAll from 'string.prototype.matchall';

const mdCodeFence = '```';
/**
 * Gets the code blocks for a snippet.
 * @param str The snippet's raw content.
 * @param config The project's configuration file.
 */
const getCodeBlocks = (str, config, snippetName) => {
  const regex = new RegExp(`${mdCodeFence}[.\\S\\s]*?${mdCodeFence}`, 'g');
  const languages = [
    config.language.short,
    config.secondLanguage.short,
    config.optionalLanguage.short,
  ].filter(Boolean).join('|');
  const replacer = new RegExp(`^${mdCodeFence}(${languages})?`, 'gm');

  // TODO: Replace matchAll(str, regex) with str.matchAll(regex) after update to Node.js v12.x
  let results = Array.from(
    matchAll(str, regex),
    m => m[0]
  ).map(v => v.replace(replacer, '').trim());

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
};

/**
 * Synchronously read all snippets and sort them as necessary.
 * The sorting is case-insensitive.
 * @param snippetsPath The path of the snippets directory.
 * @param config The project's configuration file.
 */
const readSnippets = async(snippetsPath, config) => {
  const snippetFilenames = getFilesInDir(snippetsPath, false);
  const sourceDir = `${config.dirName}/${config.snippetPath}`;
  const resolver = config.resolver ? config.resolver : 'stdResolver';

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
        code: getCodeBlocks(data.body, config, snippet.slice(0, -3)),
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
  getTextualContent,
  getGitMetadata,
  getId,
  getTags,
  getCodeBlocks,
  readSnippets,
};
