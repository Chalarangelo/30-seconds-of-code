import { author } from '#blocks/models/author';
import { collection } from '#blocks/models/collection';
import { language } from '#blocks/models/language';
import { snippet } from '#blocks/models/snippet';

import { collectionPage } from '#blocks/models/pages/collectionPage';
import { collectionsPage } from '#blocks/models/pages/collectionsPage';
import { homePage } from '#blocks/models/pages/homePage';
import { snippetPage } from '#blocks/models/pages/snippetPage';

import { pageSerializer } from '#blocks/serializers/pageSerializer';
import { previewSerializer } from '#blocks/serializers/previewSerializer';
import { searchResultSerializer } from '#blocks/serializers/searchResultSerializer';
import { snippetContextSerializer } from '#blocks/serializers/snippetContextSerializer';

export default {
  models: [
    // Main models
    author,
    collection,
    language,
    snippet,
    // Page models
    collectionPage,
    collectionsPage,
    homePage,
    snippetPage,
  ],
  serializers: [
    pageSerializer,
    previewSerializer,
    searchResultSerializer,
    snippetContextSerializer,
  ],
  relationships: [
    // Main models
    {
      from: { model: 'Snippet', name: 'author' },
      to: { model: 'Author', name: 'articles' },
      type: 'manyToOne',
    },
    {
      from: { model: 'Snippet', name: 'language' },
      to: { model: 'Language', name: 'snippets' },
      type: 'manyToOne',
    },
    {
      from: { model: 'Collection', name: 'snippets' },
      to: { model: 'Snippet', name: 'collections' },
      type: 'manyToMany',
    },
    {
      from: { model: 'Collection', name: 'parent' },
      to: { model: 'Collection', name: 'children' },
      type: 'manyToOne',
    },
    // Page models (always refer the main model from the page model, not the other way around)
    {
      from: { model: 'SnippetPage', name: 'snippet' },
      to: { model: 'Snippet', name: 'page' },
      type: 'oneToOne',
    },
    {
      from: { model: 'CollectionPage', name: 'collection' },
      to: { model: 'Collection', name: 'page' },
      type: 'oneToOne',
    },
    {
      from: { model: 'CollectionPage', name: 'snippets' },
      to: { model: 'Snippet', name: 'collectionPages' },
      type: 'manyToMany',
    },
    {
      from: { model: 'CollectionsPage', name: 'collections' },
      to: { model: 'Collection', name: 'collectionsPage' },
      type: 'oneToMany',
    },
    {
      from: { model: 'HomePage', name: 'snippets' },
      to: { model: 'Snippet', name: 'homePage' },
      type: 'oneToMany',
    },
    {
      from: { model: 'HomePage', name: 'collections' },
      to: { model: 'Collection', name: 'homePage' },
      type: 'oneToMany',
    },
  ],
  config: {
    experimentalAPIMessages: 'off',
  },
};
