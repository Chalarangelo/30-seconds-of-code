import {
  transformSnippetIndex,
  uniqueElements,
  similarity,
  weightedSample,
  chunk
} from './array';

describe('transformSnippetIndex', () => {
  it('transforms the snippet index', () => {
    const edges = [
      {
        node: {
          title: 'a',
          expertise: 'intermediate',
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
    expect(result[0].expertise).toBe(edges[0].node.expertise);
    expect(result[0].primaryTag).toBe(edges[0].node.tags.primary);
    expect(result[0].language).toBe(edges[0].node.language.long);
    expect(result[0].description).toBe(edges[0].node.html.description.trim());
    expect(result[0].url).toBe(edges[0].node.slug);
    expect(result[0].searchTokens).toBe(edges[0].node.searchTokens);
    expect(result[0].irrelevantStuff).toBe(undefined);
  });
});

describe('uniqueElements', () => {
  it('returns the unique elements in an array', () => {
    expect(uniqueElements([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('similarity', () => {
  it('returns an array of elements that appear in both arrays.', () => {
    expect(similarity([1, 2, 3], [1, 2, 4])).toEqual([1, 2]);
  });
});

describe('weightedSample', () => {
  it('returns a random element from the array', () => {
    const arr = [3, 7, 9, 11];
    const weights = [0.1, 0.2, 0.6, 0.1];
    expect(arr.includes(weightedSample(arr, weights))).toBeTruthy();
  });
});

describe('chunk', () => {
  it('chunks an array with a remainder', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
  it('chunks an empty array', () => {
    expect(chunk([])).toEqual([]);
  });
});
