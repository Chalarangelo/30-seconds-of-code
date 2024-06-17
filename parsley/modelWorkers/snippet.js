import { snippetPrefix, mdCodeFence } from '../config.js';
import { FileHandler } from '../fileHandler.js';
import { MarkdownParser } from '../markdownParser/markdownParser.js';
import { stripMarkdownFormat } from '#utils';
import tokenize from '#search';
import { Ranker } from '../ranker.js';
import { TocReader } from '../tocReader.js';

export const extractSnippetData = async (snippetGlob, languageData) => {
  const snipppetData = await FileHandler.read(snippetGlob);

  return snipppetData.map(snippet => {
    const {
      filePath,
      fileName,
      title,
      shortTitle = title,
      tags: rawTags,
      type = 'snippet',
      language: languageKey,
      excerpt,
      cover,
      dateModified,
      body,
      unlisted,
    } = snippet;

    const language = languageData.get(languageKey) || undefined;
    const id = filePath.replace(snippetPrefix, '').slice(0, -3);
    const tags = rawTags.join(';').toLowerCase();

    const bodyText = body
      .slice(0, body.indexOf(mdCodeFence))
      .replace(/\r\n/g, '\n');
    const shortText =
      excerpt?.trim() || bodyText.slice(0, bodyText.indexOf('\n\n'));

    const fullText = body;

    const { descriptionHtml, fullDescriptionHtml } =
      MarkdownParser.parseSegments(
        {
          fullDescription: fullText,
          description: shortText,
        },
        language?.short
      );

    const tokens = tokenize(stripMarkdownFormat(`${shortText} ${title}`)).join(
      ';'
    );
    const indexableContent = [
      title,
      ...rawTags,
      language?.long,
      fullText,
      shortText,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    const ranking = Ranker.rankIndexableContent(indexableContent);
    const tableOfContentsHtml = TocReader.readToC(fullDescriptionHtml) || '';

    return {
      id,
      fileName,
      title,
      tags,
      shortTitle,
      dateModified,
      listed: unlisted === true ? false : true,
      ctype: type,
      shortText,
      fullText,
      descriptionHtml,
      fullDescriptionHtml,
      tableOfContentsHtml,
      cover,
      languageKey,
      tokens,
      ranking,
    };
  });
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
