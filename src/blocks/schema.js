export const schema = {
  name: 'WebData',
  relationships: [
    {
      from: { model: 'Snippet', name: 'repository' },
      to: { model: 'Repository', name: 'snippets' },
      type: 'manyToOne',
    },
    {
      from: { model: 'Collection', name: 'snippets' },
      to: { model: 'Snippet', name: 'collections' },
      type: 'manyToMany',
    },
    {
      from: { model: 'Repository', name: 'language' },
      to: { model: 'Language', name: 'repository' },
      type: 'oneToOne',
    },
    {
      from: { model: 'Snippet', name: 'author' },
      to: { model: 'Author', name: 'articles' },
      type: 'manyToOne',
    },
    {
      from: { model: 'Listing', name: 'parent' },
      to: { model: 'Listing', name: 'children' },
      type: 'manyToOne',
    },
    {
      from: { model: 'Page', name: 'snippets' },
      to: { model: 'Snippet', name: 'pages' },
      type: 'manyToMany',
    },
    {
      from: { model: 'Page', name: 'listings' },
      to: { model: 'Listing', name: 'pages' },
      type: 'manyToMany',
    },
  ],
  config: {
    experimentalAPIMessages: 'off',
  },
};
