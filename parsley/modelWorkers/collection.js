/* eslint-disable no-unused-vars */
import { FileHandler } from '../fileHandler.js';
import tokenize from '#search';
import { Ranker } from '../ranker.js';

export const extractCollectionData = async (collectionGlob, hub) => {
  const { featuredListings } = hub;
  const collections = await FileHandler.read(collectionGlob);

  return [...collections, hub].map(config => {
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

    const tokens = tokenize(`${shortDescription || ''} ${title}`).join(';');
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
      shortDescription,
      topLevel,
      allowUnlisted,
      parent,
      tokens,
      matchers: {
        language: languageMatcher,
        tag: tagMatcher,
      },
      snippetIds,
      ranking,
    };
  });
};

export const exportCollectionData = collectionData => {
  /* eslint-disable camelcase */
  return collectionData.map(collection => {
    return {
      cid: collection.id,
      title: collection.title,
      short_title: collection.shortTitle,
      mini_title: collection.miniTitle,
      listed: collection.listed,
      featured_index: collection.featuredIndex,
      cover: collection.splash,
      description: collection.description,
      short_description: collection.shortDescription,
      top_level: collection.topLevel,
      parent_cid: collection.parent,
      _tokens: collection.tokens,
      ranking: collection.ranking,
    };
  });
  /* eslint-enable camelcase */
};
