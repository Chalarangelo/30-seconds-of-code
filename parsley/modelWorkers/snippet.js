import { snippetPrefix } from '../config.js';
import { FileHandler } from '../fileHandler.js';
import { MarkdownParser } from '../markdownParser/markdownParser.js';
import { stripMarkdownFormat } from '#utils';
import tokenize from '#search';
import { Ranker } from '../ranker.js';
import { TocReader } from '../tocReader.js';

export const extractSnippetData = async (snippetGlob, languageData) => {
  const snipppetData = await FileHandler.read(snippetGlob);

  return await Promise.all(
    snipppetData.map(async snippet => {
      const {
        filePath,
        fileName,
        title,
        shortTitle = title,
        tags,
        language: languageKey,
        body: fullText,
        // TODO: Add an excerpt everywhere and get rid of this.
        excerpt = fullText.replace(/\r\n/g, '\n').split('\n\n')[0],
        cover,
        dateModified,
        unlisted,
      } = snippet;

      const language = languageData.get(languageKey);
      const id = filePath.replace(snippetPrefix, '').slice(0, -3);
      const shortText = excerpt.trim();

      const [descriptionHtml, fullDescriptionHtml] = await Promise.all([
        MarkdownParser.parse(shortText, language?.short),
        MarkdownParser.parse(fullText, language?.short),
      ]);

      const tokens = tokenize(stripMarkdownFormat(`${shortText} ${title}`));
      const ranking = Ranker.rankIndexableContent(
        [title, ...tags, language?.long, fullText, shortText]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
      );
      const tableOfContentsHtml = TocReader.readToC(fullDescriptionHtml) || '';

      return {
        id,
        fileName,
        title,
        tags: tags.join(';').toLowerCase(),
        shortTitle,
        dateModified,
        listed: unlisted === true ? false : true,
        shortText,
        fullText,
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
      file_name: snippet.fileName,
      title: snippet.title,
      _tags: snippet.tags,
      short_title: snippet.shortTitle,
      date_modified: snippet.dateModified,
      listed: snippet.listed,
      short_text: snippet.shortText,
      full_text: snippet.fullText,
      description_html: snippet.descriptionHtml,
      full_description_html: snippet.fullDescriptionHtml,
      table_of_contents_html: snippet.tableOfContentsHtml,
      cover: snippet.cover,
      language_cid: snippet.languageKey,
      _tokens: snippet.tokens,
      ranking: snippet.ranking,
    };
  });
  /* eslint-enable camelcase */
};
