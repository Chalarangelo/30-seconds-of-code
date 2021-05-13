import SnippetFactory from './factories/snippet';
import { collectionChip } from './collections';

const previewSnippet = SnippetFactory.create('PreviewSnippet');
const previewBlogSnippet = SnippetFactory.create('PreviewBlogSnippet');

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
