import { transformBreadcrumbs } from './transformBreadcrumbs';
import { fullSnippet, fullBlogSnippet } from 'fixtures/snippets';

describe('transformBreadcrumbs', () => {
  it('should produce the appropriate breadcrumbs for a normal snippet', () => {
    const breadcrumbs = transformBreadcrumbs(fullSnippet, 'StandardSnippetCard');
    expect(breadcrumbs).toEqual([
      { url: '/', name: 'Home' },
      { url: '/js/p/1', name: 'JavaScript' },
      { url: '/js/t/string/p/1', name: 'String'},
      { url: '/js/s/map-string', name: 'mapString'},
    ]);
  });
  it('should produce the appropriate breadcrumbs for a blog snippet', () => {
    const breadcrumbs = transformBreadcrumbs(fullBlogSnippet, 'BlogSnippetCard');
    expect(breadcrumbs).toEqual([
      { url: '/', name: 'Home' },
      { url: '/blog/p/1', name: 'Blog' },
      { url: '/blog/s/javascript-for-in-for-of-foreach', name: 'What is the difference between JavaScript\'s for...in, for...of and forEach?' },
    ]);
  });
});
