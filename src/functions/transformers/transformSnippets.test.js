import {
  transformSnippetIndex
} from './transformSnippets';

describe('transformSnippetIndex', () => {
  it('transforms the snippet index', () => {
    const edges = [
      {
        node: {
          title: 'a',
          expertise: 'Intermediate',
          tags: {
            primary: 'array',
          },
          language: {
            long: 'lang',
            short: 'l',
          },
          html: {
            description: 'desc ',
          },
          slug: '/a',
          searchTokens: '',
          irrelevantStuff: 'data',
        },
      },
    ];
    const result = transformSnippetIndex(edges);
    expect(result[0].title).toBe(edges[0].node.title);
    expect(result[0].expertise).toBe('Intermediate');
    expect(result[0].primaryTag).toBe('Array');
    expect(result[0].language).toBe(edges[0].node.language.long);
    expect(result[0].description).toBe(edges[0].node.html.description.trim());
    expect(result[0].url).toBe(edges[0].node.slug);
    expect(result[0].searchTokens).toBe(edges[0].node.searchTokens);
    expect(result[0].irrelevantStuff).toBe(undefined);
  });

  it('handles an empty language appropriately', () => {
    const edges = [
      {
        node: {
          title: 'a',
          expertise: 'Intermediate',
          tags: {
            primary: 'array',
          },
          language: {},
          html: {
            description: 'desc ',
          },
          slug: '/a',
          searchTokens: '',
          irrelevantStuff: 'data',
        },
      },
    ];
    const result = transformSnippetIndex(edges);
    expect(result[0].language).toBe(undefined);
  });
});
