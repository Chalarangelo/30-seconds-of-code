import {
  transformSnippetIndex,
  transformSnippetDescription,
  transformSnippetContext
} from './transformSnippets';

describe('transformSnippetIndex', () => {
  it('transforms the snippet index', () => {
    const snippets = [
      {
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
    ];
    const result = transformSnippetIndex(snippets);
    expect(result[0].title).toBe(snippets[0].title);
    expect(result[0].expertise).toBe('Intermediate');
    expect(result[0].primaryTag).toBe('Array');
    expect(result[0].language).toBe(snippets[0].language.long);
    expect(result[0].description).toBe(snippets[0].html.description.trim());
    expect(result[0].url).toBe(snippets[0].slug);
    expect(result[0].searchTokens).toBe(undefined);
    expect(result[0].irrelevantStuff).toBe(undefined);
  });

  it('handles an empty language appropriately', () => {
    const snippets = [
      {
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
    ];
    const result = transformSnippetIndex(snippets);
    expect(result[0].language).toBe(undefined);
  });

  it('returns search tokens when explicitly told to do so', () => {
    const snippets = [
      {
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
        searchTokens: 'my tokens',
        irrelevantStuff: 'data',
      },
    ];
    const result = transformSnippetIndex(snippets, true);
    expect(result[0].searchTokens).toBe(snippets[0].searchTokens);
  });

  it('correctly injects any additional primary tags', () => {
    const snippets = [
      {
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
        searchTokens: 'my tokens',
        irrelevantStuff: 'data',
      },
    ];
    const result = transformSnippetIndex(snippets, false, 'math');
    expect(result[0].primaryTag).toBe('Array, Math');
  });
});

describe('transformSnippetContext', () => {
  const snippet = {
    id: 'snippet-a',
    title: 'a',
    text: {
      short: 'description',
    },
    url: '/a',
    slug: '/a',
    firstSeen: 'firstSeen',
    lastUpdated: 'lastUpdated',
    expertise: 'intermediate',
    language: {
      long: 'lang',
      short: 'l',
    },
    tags: {
      primary: 'array',
      all: ['array', 'function', 'intermediate'],
    },
    html: {
      description: 'desc ',
    },
    code: {
      src: 'code',
    },
    irrelevantStuff: 'data',
  };

  it('transforms the snippet context', () => {
    const result = transformSnippetContext(snippet);
    expect(result.id).toBe(snippet.id);
    expect(result.title).toBe(snippet.title);
    expect(result.description).toBe(snippet.text.short);
    expect(result.url).toBe(snippet.url);
    expect(result.slug).toBe(snippet.slug);
    expect(result.firstSeen).toBe(snippet.firstSeen);
    expect(result.lastUpdated).toBe(snippet.lastUpdated);
    expect(result.expertise).toBe('Intermediate');
    expect(result.language).toEqual(snippet.language);
    expect(result.tags.primary).toBe('Array');
    expect(result.tags.all).toEqual(['Array', 'Function']);
    expect(result.html).toEqual(snippet.html);
    expect(result.code).toEqual(snippet.code);
    expect(result.irrelevantStuff).toBe(undefined);
  });

  it('handles the blog template appropriately', () => {
    const result = transformSnippetContext({
      ...snippet, authors: ['a', 'b'], type: 'blog.story', cover: 'img.png',
      html: { fullDescription: '<p></p>'},
    }, 'BlogSnippetCard', [{
      node: { absolutePath: 'img.png', childImageSharp: { fluid: { src: 'xxx'} }},
    }]);
    expect(result.authors).toEqual(['a', 'b']);
    expect(result.type).toBe('blog.story');
  });
});

describe('transformSnippetDescription', () => {
  it('returns the appropriate description for a normal snippet', () => {
    expect(
      transformSnippetDescription(
        { text: { short: '`without` backticks'} }, 'blog'
      )
    ).toBe('without backticks');
  });
  it('returns the appropriate description for a blog snippet', () => {
    expect(
      transformSnippetDescription(
        { title: 'test', language: { long: 'language' }, text: {
          short: 'This is much much longer than the predefined 160 characters limit so the transformer should output the generic description instead. Makeing this string londer la la la la.',
        } }, 'notblog'
      )
    ).toBe('Learn how to code a test snippet in language on 30 seconds of code.');
  });
});
