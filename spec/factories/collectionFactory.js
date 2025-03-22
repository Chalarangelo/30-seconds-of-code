const base = {
  id: 'collection',
  title: 'My Collection',
  shortTitle: 'My Collection',
  miniTitle: 'My Collection',
  content: '<p>My collection <code>description</code>.</p>',
  description: 'My collection short description.',
  listed: true,
  featuredIndex: 1,
  topLevel: false,
  parentCid: null,
  cover: 'cover',
  recTokens: 'my collection short description',
  docTokens: 'my collection short description',
  ranking: 0.65,
};

const traits = {
  main: {
    id: 'snippets',
  },
  collections: {
    id: 'collections',
  },
  listed: {
    listed: true,
  },
  unlisted: {
    listed: false,
  },
  featured: {
    featuredIndex: 1,
  },
  notFeatured: {
    featuredIndex: null,
  },
  primary: { topLevel: true },
  secondary: { parentId: 'parent-collection', topLevel: false },
};

export default { model: 'Collection', base, traits };
