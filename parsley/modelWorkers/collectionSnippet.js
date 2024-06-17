export const extractCollectionSnippetData = (collections, snippets) => {
  const rankedSnippets = [...snippets].sort((a, b) => b.ranking - a.ranking);

  const collectionSnippets = collections
    .map(collection => {
      const {
        id: collectionId,
        snippetIds,
        matchers,
        allowUnlisted,
      } = collection;
      if (collectionId === 'snippets') {
        return [...rankedSnippets].map((snippet, index) => ({
          collectionId,
          snippetId: snippet.id,
          position: snippet.listed ? index : -1,
        }));
      }

      if (snippetIds && snippetIds.length) {
        // TODO: Note that this doesn't account for unlisted snippets
        return snippetIds.map((snippetId, index) => ({
          collectionId,
          snippetId,
          position: index,
        }));
      }

      let collectionSnippets = [...rankedSnippets];
      if (matchers.language) {
        collectionSnippets = collectionSnippets.filter(
          snippet => snippet.languageKey === matchers.language
        );
      }

      if (matchers.tag) {
        collectionSnippets = collectionSnippets.filter(snippet =>
          snippet.tags.includes(matchers.tag)
        );
      }

      if (allowUnlisted) {
        return collectionSnippets.map((snippet, index) => ({
          collectionId,
          snippetId: snippet.id,
          position: index,
        }));
      }

      return collectionSnippets.map((snippet, index) => ({
        collectionId,
        snippetId: snippet.id,
        position: snippet.listed ? index : -1,
      }));
    })
    .flat();

  return collectionSnippets;
};

export const exportCollectionSnippetData = collectionSnippetData => {
  /* eslint-disable camelcase */
  return collectionSnippetData.map(collectionSnippet => {
    return {
      collection_cid: collectionSnippet.collectionId,
      snippet_cid: collectionSnippet.snippetId,
      position: collectionSnippet.position,
    };
  });
  /* eslint-enable camelcase */
};
