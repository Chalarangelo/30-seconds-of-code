import { snippetPrefix } from '../config.js';
import { FileHandler } from '../fileHandler.js';
import { MarkdownParser } from '../markdownParser/markdownParser.js';
import { stripMarkdownFormat } from '../utils.js';
import tokenize from '#search';
import { Ranker } from '../ranker.js';
import { TocReader } from '../tocReader.js';

export const extractSnippetData = async (snippetGlob, languageData) => {
  const snipppetData = await FileHandler.read(snippetGlob);

  return await Promise.all(
    snipppetData.map(async snippet => {
      const {
        filePath,
        title,
        shortTitle = title,
        tags,
        language: languageKey,
        body: fullText,
        excerpt: shortDescription,
        cover,
        dateModified,
        listed,
      } = snippet;

      const language = languageData.get(languageKey);
      const id = filePath.replace(snippetPrefix, '').slice(0, -3);

      const [descriptionHtml, fullDescriptionHtml] = await Promise.all([
        MarkdownParser.parse(shortDescription, language?.short),
        MarkdownParser.parse(fullText, language?.short),
      ]);

      const tokens = tokenize(
        stripMarkdownFormat(`${shortDescription} ${title}`)
      );
      const ranking = Ranker.rankIndexableContent(
        [title, ...tags, language?.long, fullText, shortDescription]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
      );
      const tableOfContentsHtml = TocReader.readToC(fullDescriptionHtml) || '';

      return {
        id,
        title,
        tags: tags.join(';').toLowerCase(),
        shortTitle,
        dateModified,
        listed,
        descriptionHtml,
        fullDescriptionHtml,
        tableOfContentsHtml,
        cover,
        languageKey,
        tokens: tokens.join(';'),
        ranking,
      };
    })
  );
};

export const exportSnippetData = snippetData => {
  /* eslint-disable camelcase */
  return snippetData.map(snippet => {
    return {
      cid: snippet.id,
      title: snippet.title,
      _tags: snippet.tags,
      short_title: snippet.shortTitle,
      date_modified: snippet.dateModified,
      listed: snippet.listed,
      short_description: snippet.descriptionHtml,
      description: snippet.fullDescriptionHtml,
      table_of_contents: snippet.tableOfContentsHtml,
      cover: snippet.cover,
      language_cid: snippet.languageKey,
      _tokens: snippet.tokens,
      ranking: snippet.ranking,
    };
  });
  /* eslint-enable camelcase */
};
