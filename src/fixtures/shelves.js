import { previewSnippet, previewBlogSnippet } from './snippets';
import { collectionChip } from './collections';

export const snippetShelf = {
  shelfType: 'snippets',
  shelfData: [previewSnippet, previewBlogSnippet],
  shelfName: 'Snippet Shlef',
  shelfUrl: 'http://web.site/shelf1',
};

export const collectionShelf = {
  shelfType: 'collections',
  shelfData: [collectionChip],
  shelfName: 'Collection Shlef',
  shelfUrl: 'http://web.site/shelf2',
};
