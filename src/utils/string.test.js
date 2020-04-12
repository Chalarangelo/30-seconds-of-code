import {
  combineClassNames,
  capitalize,
  optimizeNodes,
  optimizeAllNodes,
  getURLParameters,
  getBaseURL,
  stripMarkdownFormat,
  toKebabCase,
  convertToSeoSlug,
  addTrailingSlashToSlug
} from './string';

const stringComparator = (str1, str2) => {
  return expect(str1.split(' ').sort()).toEqual(str2.split(' ').sort());
};

describe('combineClassNames', () => {

  describe('with plain-text only', () => {
    it('should return the provided plain-text', () => {
      stringComparator(combineClassNames`my-class`, 'my-class');
    });

    it('should deduplicate the provided plain-text', () => {
      stringComparator(combineClassNames`my-class yada my-class`, 'my-class yada');
      stringComparator(combineClassNames`my-class my-class yada`, 'my-class yada');
    });

    it('should trim the provided plain-text', () => {
      stringComparator(combineClassNames`my-class  `, 'my-class');
      stringComparator(combineClassNames`  my-class`, 'my-class');
      stringComparator(combineClassNames`  my-class  `, 'my-class');
      stringComparator(combineClassNames`my-class yada    `, 'my-class yada');
      stringComparator(combineClassNames`my-class     yada`, 'my-class yada');
      stringComparator(combineClassNames`  my-class yada`, 'my-class yada');
      stringComparator(combineClassNames`  my-class     yada   `, 'my-class yada');
    });
  });

  describe('with interpolations only', () => {
    it('should return the provided interpolations', () => {
      stringComparator(combineClassNames`${'my-class'}`, 'my-class');
    });

    it('should deduplicate the provided interpolations', () => {
      stringComparator(combineClassNames`${'my-class'}${'yada'}${'my-class'}`, 'my-class yada');
      stringComparator(combineClassNames`${'my-class'}${'my-class'}${'yada'}`, 'my-class yada');
    });

    it('should not return any falsey interpolations', () => {
      stringComparator(combineClassNames`${'my-class'}${''}`, 'my-class');
      stringComparator(combineClassNames`${'my-class'}${undefined}`, 'my-class');
      stringComparator(combineClassNames`${'my-class'}${null}`, 'my-class');
      stringComparator(combineClassNames`${'my-class'}${false}`, 'my-class');
    });

    it('should trim the provided interpolations', () => {
      stringComparator(combineClassNames`${'my-class  '}`, 'my-class');
      stringComparator(combineClassNames`${'  my-class'}`, 'my-class');
      stringComparator(combineClassNames`${'  my-class  '}`, 'my-class');
      stringComparator(combineClassNames`${'my-class '}${'yada    '}`, 'my-class yada');
      stringComparator(combineClassNames`${'my-class  '}${'   yada'}`, 'my-class yada');
      stringComparator(combineClassNames`${'  my-class '}${'yada'}`, 'my-class yada');
      stringComparator(combineClassNames`${'  my-class '}${'    yada   '}`, 'my-class yada');
    });

    it('should tokenize the provided interpolations', () => {
      stringComparator(combineClassNames`${'my-class  yada '}`, 'my-class yada');
      stringComparator(combineClassNames`${'my-class'}${'yada yoda'}`, 'my-class yada yoda');
      stringComparator(combineClassNames`${'my-class yada'}${'yada'}`, 'my-class yada');
      stringComparator(combineClassNames`${'my-class yada yada'}${'yoda'}`, 'my-class yada yoda');
    });
  });

  describe('with plain-text and interpolations', () => {
    it('should return the combined result', () => {
      stringComparator(combineClassNames`yada ${'my-class'}`, 'yada my-class');
      stringComparator(combineClassNames`yada ${'my-class'} yoda`, 'yada yoda my-class');
      stringComparator(combineClassNames`${'my-class'} yoda`, 'yoda my-class');
      stringComparator(combineClassNames`${'my-class'} yoda ${'yada'}`, 'my-class yoda yada');
      stringComparator(combineClassNames`a ${'my-class'} yoda ${'yada'} b`, 'a my-class yoda yada b');
      stringComparator(combineClassNames`a c ${'my-class'}${'d'} yoda ${'yada'} b`, 'a c my-class d yoda yada b');
    });

    it('should deduplicate the combined result', () => {
      stringComparator(combineClassNames`yada yada ${'my-class'}`, 'yada my-class');
      stringComparator(combineClassNames`yada ${'my-class my-class'}`, 'yada my-class');
      stringComparator(combineClassNames`yada ${'yada my-class'}`, 'yada my-class');
      stringComparator(combineClassNames`yada my-class ${'my-class'}`, 'yada my-class');
      stringComparator(combineClassNames`yada yada my-class ${'my-class'}`, 'yada my-class');
      stringComparator(combineClassNames`yada ${'my-class yada my-class'}`, 'yada my-class');
    });

    it('should trim the combined result', () => {
      stringComparator(combineClassNames`yada    ${'my-class'}`, 'yada my-class');
      stringComparator(combineClassNames`yada ${'my-class    '}`, 'yada my-class');
      stringComparator(combineClassNames`   yada ${'my-class'}`, 'yada my-class');
      stringComparator(combineClassNames`   yada   ${'  my-class '}  `, 'yada my-class');
      stringComparator(combineClassNames`   yada   ${'  my-class '}  yoda`, 'yada my-class yoda');
      stringComparator(combineClassNames`   yada   ${'  my-class '}  yoda  ${'a'}`, 'a yada my-class yoda');
    });

    it('should not return any falsey interpolations', () => {
      stringComparator(combineClassNames`yada ${'my-class'} ${null}`, 'yada my-class');
      stringComparator(combineClassNames`yada ${'my-class'} ${undefined}`, 'yada my-class');
      stringComparator(combineClassNames`yada ${false} ${'my-class'}`, 'yada my-class');
      stringComparator(combineClassNames`${undefined} yada ${'my-class'}`, 'yada my-class');
      stringComparator(combineClassNames`${''} yada ${undefined} ${null}${'my-class'} ${false}`, 'yada my-class');
    });
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

describe('optimizeNodes', () => {
  it('optimizes nodes', () => {
    const data = '<span class="token punctuation">foo</span><span class="token punctuation">bar</span>';
    const regexp = /<span class="token punctuation">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token punctuation">([^\0]*?)<\/span>/gm;
    const replacer = (match, p1, p2, p3) =>
      `<span class="token punctuation">${p1}${p2}${p3}</span>`;
    const result = '<span class="token punctuation">foobar</span>';
    expect(optimizeNodes(data, regexp, replacer)).toBe(result);
  });
});

describe('optimizeAllNodes', () => {
  it('optimizes all nodes', () => {
    const data = '<span class="token punctuation">foo</span><span class="token punctuation">bar</span> <span class="token keyword">foo</span><span class="token keyword">bar</span> <span class="token operator">foo</span><span class="token operator">bar</span>';
    const result = '<span class="token punctuation">foobar</span> <span class="token keyword">foobar</span> <span class="token operator">foobar</span>';
    expect(optimizeAllNodes(data)).toBe(result);
  });
});

describe('getURLParameters', () => {
  it('returns an object containing the parameters of the current URL', () => {
    expect(getURLParameters('http://url.com/page?name=Adam&surname=Smith')).toEqual({
      name: 'Adam',
      surname: 'Smith',
    });
  });
});

describe('getBaseURL', () => {
  it('returns the current URL without parameters', () => {
    expect(getBaseURL('http://url.com/page?name=Adam&surname=Smith')).toBe('http://url.com/page');
  });
});

describe('stripMarkdownFormat', () => {
  it('strips down markdown format', () => {
    const md = 'I have `code` and [links](lala). \nI am also multiline.';
    const output = 'I have code and links. I am also multiline.';
    expect(stripMarkdownFormat(md)).toBe(output);
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
    expect(toKebabCase('some-mixed-string With spaces-underscores-and-hyphens')).toBe(
      'some-mixed-string-with-spaces-underscores-and-hyphens'
    );
  });
  it('works with capital words in camel case', () => {
    expect(
      toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML')
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

describe('addTrailingSlashToSlug', () => {
  it('returns the slug as-is if it ends with a "/"', () => {
    const slug = 'https://mysite.com/a-slug/';
    expect(addTrailingSlashToSlug(slug)).toBe(slug);
  });

  it('returns the slug with a trailing "/"', () => {
    const slug = 'https://mysite.com/a-slug';
    expect(addTrailingSlashToSlug(slug)).toBe(`${slug}/`);
  });

  it('returns the slug as-is if it has params preceded by "/"', () => {
    const slug = 'https://mysite.com/a-slug/?keyphrase=something';
    expect(addTrailingSlashToSlug(slug)).toBe(slug);
  });

  it('returns the slug with a "/" before the params', () => {
    const slug = 'https://mysite.com/a-slug';
    const params = '?keyphrase=something';
    expect(addTrailingSlashToSlug(`${slug}${params}`)).toBe(`${slug}/${params}`);
  });
});
