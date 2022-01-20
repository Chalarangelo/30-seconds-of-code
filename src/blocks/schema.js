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
      to: { model: 'Language', name: 'repositories' },
      type: 'manyToOne',
    },
    {
      from: { model: 'Repository', name: 'otherLanguages' },
      to: { model: 'Language', name: 'secondaryRepositories' },
      type: 'manyToMany',
    },
    {
      from: { model: 'Tag', name: 'repository' },
      to: { model: 'Repository', name: 'tags' },
      type: 'manyToOne',
    },
    {
      from: { model: 'Snippet', name: 'authors' },
      to: { model: 'Author', name: 'articles' },
      type: 'manyToMany',
    },
    {
      from: { model: 'Listing', name: 'children' },
      to: { model: 'Listing', name: 'parent' },
      type: 'oneToMany',
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
