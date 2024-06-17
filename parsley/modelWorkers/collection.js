/* eslint-disable no-unused-vars */
import { FileHandler } from '../fileHandler.js';
import tokenize from '#search';
import { Ranker } from '../ranker.js';

export const extractCollectionData = async (collectionGlob, hub) => {
  const { featuredListings } = hub;
  const collections = await FileHandler.read(collectionGlob);

  return collections.map(config => {
    const {
      snippetIds = [],
      slug: id,
      name,
      shortName = name,
      miniName = shortName,
      description,
      shortDescription,
      topLevel = false,
      allowUnlisted = false,
      splash,
      featured = false,
      parent = null,
      languageMatcher,
      tagMatcher,
    } = config;

    const tokens = tokenize(`${shortDescription || ''} ${name}`).join(';');
    const indexableContent = [name, description, shortDescription]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    const ranking = Ranker.rankIndexableContent(indexableContent);
    const featuredIndex = featuredListings.includes(id)
      ? featuredListings.indexOf(id)
      : null;

    return {
      id,
      name,
      shortName,
      miniName,
      featured,
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
      name: collection.name,
      short_name: collection.shortName,
      mini_name: collection.miniName,
      featured: collection.featured,
      featured_index: collection.featuredIndex,
      splash: collection.splash,
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
