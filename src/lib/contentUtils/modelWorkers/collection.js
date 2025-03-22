/* eslint-disable no-unused-vars */
import FileHandler from '#src/lib/contentUtils/fileHandler.js';
import MarkdownParser from '#src/lib/contentUtils/markdownParser/markdownParser.js';
import Ranker from '#src/lib/contentUtils/ranker.js';
import { tokenize } from '#src/lib/search/server.js';

export const extractCollectionData = async (collectionGlob, hub) => {
  const { featuredListings } = hub;
  const collections = await FileHandler.read(collectionGlob);

  return await Promise.all(
    [...collections, hub].map(async config => {
      const {
        snippetIds = [],
        slug: id,
        title,
        shortTitle = title,
        miniTitle = shortTitle,
        description,
        shortDescription,
        topLevel = false,
        allowUnlisted = false,
        splash,
        listed = false,
        parent = null,
        languageMatcher,
        tagMatcher,
      } = config;

      const descriptionHtml = await MarkdownParser.parse(description);

      const recTokens = tokenize({
        text: `${shortDescription} ${title}`,
      }).replace(/:\d+/g, '');

      const docContent = listed
        ? {
            html: descriptionHtml,
            text: [title, shortTitle, miniTitle, description].join(' '),
            tokens: [
              ...id.toLowerCase().split('/').slice(-1)[0].split('-'),
              title,
              shortTitle,
              miniTitle,
            ].join(' '),
          }
        : {};
      const docTokens = tokenize(docContent);

      const indexableContent = [title, description, shortDescription]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const ranking = Ranker.rankIndexableContent(indexableContent);
      const featuredIndex = featuredListings.includes(id)
        ? featuredListings.indexOf(id)
        : null;

      return {
        id,
        title,
        shortTitle,
        miniTitle,
        listed,
        featuredIndex,
        splash,
        description,
        descriptionHtml,
        shortDescription,
        topLevel,
        allowUnlisted,
        parent,
        recTokens,
        docTokens,
        matchers: {
          language: languageMatcher,
          tag: tagMatcher,
        },
        snippetIds,
        ranking,
      };
    })
  );
};

export const exportCollectionData = collectionData => {
  /* eslint-disable camelcase */
  return collectionData.map(collection => {
    return {
      model: 'Collection',
      id: collection.id,
      title: collection.title,
      shortTitle: collection.shortTitle,
      miniTitle: collection.miniTitle,
      listed: collection.listed,
      featuredIndex: collection.featuredIndex,
      cover: collection.splash,
      content: collection.descriptionHtml,
      description: collection.shortDescription,
      topLevel: collection.topLevel,
      parentId: collection.parent,
      recTokens: collection.recTokens,
      docTokens: collection.docTokens,
      ranking: collection.ranking,
    };
  });
  /* eslint-enable camelcase */
};
