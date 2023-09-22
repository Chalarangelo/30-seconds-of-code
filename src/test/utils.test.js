import {
  uniqueElements,
  chunk,
  capitalize,
  getURLParameters,
  escapeHTML,
  stripMarkdownFormat,
  stripHTMLTags,
  toKebabCase,
  convertToSeoSlug,
  convertToValidId,
} from 'utils';

import search, { quickParseTokens as clientSearchEngine } from 'utils/search';

describe('uniqueElements', () => {
  it('returns the unique elements in an array', () => {
    expect(uniqueElements([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
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

describe('capitalize', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalize('fooBar')).toBe('FooBar');
  });

  it('capitalizes the first letter of a string, lowercases the rest', () => {
    expect(capitalize('fooBar', true)).toBe('Foobar');
  });
});

describe('getURLParameters', () => {
  it('returns an object containing the parameters of the current URL', () => {
    expect(
      getURLParameters('http://url.com/page?name=Adam&surname=Smith')
    ).toEqual({
      name: 'Adam',
      surname: 'Smith',
    });
  });
});

describe('stripHTMLTags', () => {
  it('strips down HTML tags', () => {
    const html =
      'The dreaded <code class="notranslate">act(...)</code> warning';
    const output = 'The dreaded act(...) warning';
    expect(stripHTMLTags(html)).toBe(output);
  });
});

describe('stripMarkdownFormat', () => {
  it('strips down markdown format', () => {
    const md = 'I have `code` and [links](lala). \nI am also multiline.';
    const output = 'I have code and links. I am also multiline.';
    expect(stripMarkdownFormat(md)).toBe(output);
  });
});

describe('escapeHTML', () => {
  it('escapes HTML', () => {
    const code = `<b>"Max & Min's"</b>`;
    const output = '&lt;b&gt;&quot;Max &amp; Min&#39;s&quot;&lt;/b&gt;';
    expect(escapeHTML(code)).toBe(output);
  });
});

describe('toKebabCase', () => {
  it('works with camel case', () => {
    expect(toKebabCase('camelCase')).toBe('camel-case');
  });
  it('works with spaces', () => {
    expect(toKebabCase('some text')).toBe('some-text');
  });
  it('works with mixed strings', () => {
    expect(
      toKebabCase('some-mixed-string With spaces-underscores-and-hyphens')
    ).toBe('some-mixed-string-with-spaces-underscores-and-hyphens');
  });
  it('works with capital words in camel case', () => {
    expect(
      toKebabCase(
        'IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML'
      )
    ).toBe(
      'i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-some-xml-and-html'
    );
  });
});

describe('convertToSeoSlug', () => {
  it('returns the SEO-friendly slug', () => {
    expect(convertToSeoSlug('mySnippet')).toBe('/my-snippet');
  });
});

describe('convertToValidId', () => {
  it('returns a valid id', () => {
    expect(
      convertToValidId(
        'The dreaded <code class="notranslate">act(...)</code> warning'
      )
    ).toBe('the-dreaded-act-warning');
  });
});

describe('search', () => {
  it('parses the tokens from the given string', () => {
    const str = 'Creates an object with the same values.';
    const result = ['creat', 'object', 'same', 'valu'];
    expect(search(str)).toEqual(result);
  });
});

describe('clientSearchEngine', () => {
  it('parses the tokens from the given string', () => {
    const str = 'Creates an object with the same values.';
    const result = ['creat', 'object', 'same', 'valu'];
    expect(clientSearchEngine(str)).toEqual(result);
  });
});
