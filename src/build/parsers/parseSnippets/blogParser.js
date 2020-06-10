import { red } from 'kleur';
import {
  getFilesInDir,
  getData,
  getTextualContent,
  getGitMetadata,
  getId,
  getTags
} from './standardParser';

/**
 * Synchronously read all snippets and sort them as necessary.
 * The sorting is case-insensitive.
 * @param snippetsPath The path of the snippets directory.
 */
const readSnippets = async snippetsPath => {
  const snippetFilenames = getFilesInDir(snippetsPath, false);

  let snippets = {};
  try {
    for (let snippet of snippetFilenames) {
      let data = getData(snippetsPath, snippet);
      const tags = getTags(data.attributes.tags);

      snippets[snippet] = {
        id: getId(snippet),
        title: data.attributes.title,
        type: `blog.${data.attributes.type}`,
        tags: {
          all: tags,
          primary: tags[0],
        },
        expertise: 'blog',
        attributes: {
          fileName: snippet,
          cover: data.attributes.cover,
          excerpt: data.attributes.excerpt,
          authors: getTags(data.attributes.authors),
          text: data.body,
        },
        meta: await getGitMetadata(snippet, snippetsPath),
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
  readSnippets,
};
