import { transformBreadcrumbs } from './transformBreadcrumbs';
import { fullSnippet, fullBlogSnippet } from 'fixtures/snippets';

describe('transformBreadcrumbs', () => {
  it('should produce the appropriate breadcrumbs for a normal snippet', () => {
    const breadcrumbs = transformBreadcrumbs(fullSnippet, 'standard');
    expect(breadcrumbs).toEqual([
      { link: { internal: true, url: '/js/p/1'}, name: 'JavaScript' },
      { link: { internal: true, url: '/js/string/p/1' }, name: 'JavaScript String'},
    ]);
  });
  it('should produce the appropriate breadcrumbs for a blog snippet', () => {
    const breadcrumbs = transformBreadcrumbs(fullBlogSnippet, 'blog');
    expect(breadcrumbs).toEqual([
      { link: { internal: true, url: '/blog/p/1'}, name: 'Blog' },
    ]);
  });
});
