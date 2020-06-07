import { transformBreadcrumbs } from './transformBreadcrumbs';
import { fullSnippet, fullBlogSnippet } from 'fixtures/snippets';

describe('transformBreadcrumbs', () => {
  it('should produce the appropriate breadcrumbs for a normal snippet', () => {
    const breadcrumbs = transformBreadcrumbs(fullSnippet, 'StandardSnippetCard');
    expect(breadcrumbs).toEqual([
      { url: '/js/p/1', name: 'JavaScript' },
      { url: '/js/string/p/1', name: 'JavaScript String'},
    ]);
  });
  it('should produce the appropriate breadcrumbs for a blog snippet', () => {
    const breadcrumbs = transformBreadcrumbs(fullBlogSnippet, 'BlogSnippetCard');
    expect(breadcrumbs).toEqual([
      { url: '/blog/p/1', name: 'Blog' },
    ]);
  });
});
