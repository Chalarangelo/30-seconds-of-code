import { snippetPrefix } from '#src/lib/contentUtils/config.js';
import FileHandler from '#src/lib/contentUtils/fileHandler.js';
import MarkdownParser from '#src/lib/contentUtils/markdownParser/markdownParser.js';
import Ranker from '#src/lib/contentUtils/ranker.js';
import TocReader from '#src/lib/contentUtils/tocReader.js';
import { tokenize } from '#src/lib/search/server.js';

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
        tocEnabled = true,
        journeyId = null,
      } = snippet;

      const language = languageData.get(languageKey);
      const id = filePath.replace(snippetPrefix, '').slice(0, -3);

      const [descriptionHtml, fullDescriptionHtml] = await Promise.all([
        MarkdownParser.parse(shortDescription, language?.short),
        MarkdownParser.parse(fullText, language?.short),
      ]);

      const recTokens = tokenize({
        text: `${shortDescription} ${title}`,
        tokens: [
          ...tags,
          ...id.toLowerCase().split('/').slice(-1)[0].split('-'),
          language?.short?.toLowerCase(),
          language?.long?.toLowerCase(),
          title,
        ]
          .filter(Boolean)
          .join(' '),
      }).replace(/:\d+/g, '');

      const docContent = listed
        ? {
            html: [fullDescriptionHtml, descriptionHtml].join(' '),
            text: [title, shortTitle].join(' '),
            tokens: [
              ...id.toLowerCase().split('/').slice(-1)[0].split('-'),
              ...tags,
              language?.short?.toLowerCase(),
              language?.long?.toLowerCase(),
              title,
              shortTitle,
            ]
              .filter(Boolean)
              .join(' '),
          }
        : {};
      const docTokens = tokenize(docContent);

      const ranking = Ranker.rankIndexableContent(
        [title, ...tags, language?.long, fullText, shortDescription]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
      );
      const tableOfContentsHtml = tocEnabled
        ? TocReader.readToC(fullDescriptionHtml) || ''
        : '';

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
        recTokens,
        docTokens,
        ranking,
        journeyId,
      };
    })
  );
};

export const exportSnippetData = snippetData => {
  /* eslint-disable camelcase */
  return snippetData.map(snippet => {
    return {
      model: 'Snippet',
      id: snippet.id,
      title: snippet.title,
      tags: snippet.tags,
      shortTitle: snippet.shortTitle,
      dateModified: snippet.dateModified,
      listed: snippet.listed,
      description: snippet.descriptionHtml,
      content: snippet.fullDescriptionHtml,
      tableOfContents: snippet.tableOfContentsHtml,
      cover: snippet.cover,
      languageId: snippet.languageKey,
      recTokens: snippet.recTokens,
      docTokens: snippet.docTokens,
      ranking: snippet.ranking,
      journeyId: snippet.journeyId,
    };
  });
  /* eslint-enable camelcase */
};
