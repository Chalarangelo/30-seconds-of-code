/* eslint-disable camelcase */
import { describe, it, expect, vi } from 'vitest';
import { config } from 'spec/mocks/parsley/config.js';
import { Parsley } from '#parsley';

vi.mock('../../parsley/config.js', async importOriginal => {
  const original = await importOriginal();
  return {
    ...original,
    ...config,
  };
});

vi.mock('../../parsley/fileHandler.js', async importOriginal => {
  const original = await importOriginal();
  return {
    ...original,
    FileHandler: {
      ...original.FileHandler,
      write: (filePath, data, mode) => ({ filePath, data, mode }),
    },
  };
});

describe('Parsley.prepareContent', async () => {
  const result = await Parsley.prepareContent();

  it('should output content to the correct path', () => {
    expect(result.filePath).toEqual(config.outputPath);
  });

  it('should output all content keys', () => {
    expect(Object.keys(result.data)).toEqual([
      'collections',
      'snippets',
      'languages',
      'collection_snippets',
    ]);
  });

  describe('should output the correct language data', () => {
    const languageData = result.data.languages;

    it('should output the correct number of languages', () => {
      expect(languageData.length).toEqual(3);
    });

    it('should output the correct language objects', () => {
      expect(languageData).toContainEqual({
        cid: 'javascript',
        long: 'javascript',
        short: 'js',
        name: 'JavaScript',
      });
      expect(languageData).toContainEqual({
        cid: 'html',
        long: 'html',
        short: 'html',
        name: 'HTML',
      });
      expect(languageData).toContainEqual({
        cid: 'css',
        long: 'css',
        short: 'css',
        name: 'CSS',
      });
    });
  });

  describe('should output the correct collection data', () => {
    const collectionData = result.data.collections;

    it('should output the correct number of collections', () => {
      expect(collectionData.length).toEqual(6);
    });

    it('should output the correct collection cids', () => {
      expect(collectionData.map(({ cid }) => cid).sort()).toEqual(
        [
          'web-development',
          'js',
          'js/array',
          'js/array-methods',
          'css',
          'collections',
        ].sort()
      );
    });

    it('should produce a ranking between 0 and 1 for all collections', () => {
      collectionData.forEach(({ ranking }) => {
        expect(ranking).toBeGreaterThanOrEqual(0);
        expect(ranking).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('should output the correct collection snippet data', () => {
    const collectionSnippetData = result.data.collection_snippets;

    it('should output the correct number of collection snippets', () => {
      expect(collectionSnippetData.length).toEqual(13);
    });

    it('should output the correct collection snippet objects for plain tag matchers', () => {
      expect(
        collectionSnippetData.filter(
          ({ collection_cid, snippet_cid }) =>
            collection_cid === 'web-development' &&
            snippet_cid === 'articles/s/web-development-tips'
        ).length
      ).toEqual(1);
    });

    it('should output the correct collection snippet objects for language matchers', () => {
      const jsSnippets = collectionSnippetData.filter(
        ({ collection_cid }) => collection_cid === 'js'
      );
      const cssSnippets = collectionSnippetData.filter(
        ({ collection_cid }) => collection_cid === 'css'
      );
      expect(jsSnippets.length).toEqual(4);
      expect(cssSnippets.length).toEqual(2);
      expect(jsSnippets.map(({ snippet_cid }) => snippet_cid).sort()).toEqual(
        [
          'js/s/array-grouping',
          'js/s/array-initialize',
          'js/s/array-map-foreach',
          'js/s/array-compare',
        ].sort()
      );
      expect(cssSnippets.map(({ snippet_cid }) => snippet_cid).sort()).toEqual(
        ['css/s/content-centering', 'css/s/css-reset'].sort()
      );
    });

    it('should output the correct collection snippet objects for language and tag matchers', () => {
      const jsArraySnippets = collectionSnippetData.filter(
        ({ collection_cid }) => collection_cid === 'js/array'
      );
      expect(jsArraySnippets.length).toEqual(3);
      expect(
        jsArraySnippets.map(({ snippet_cid }) => snippet_cid).sort()
      ).toEqual(
        [
          'js/s/array-grouping',
          'js/s/array-initialize',
          'js/s/array-compare',
        ].sort()
      );
    });

    describe('should output the correct collection snippet objects for specific snippet ids', () => {
      const jsArrayMethodsSnippets = collectionSnippetData.filter(
        ({ collection_cid }) => collection_cid === 'js/array-methods'
      );

      it('should output the correct collection snippets', () => {
        expect(jsArrayMethodsSnippets.length).toEqual(3);
        expect(
          jsArrayMethodsSnippets.map(({ snippet_cid }) => snippet_cid)
        ).toEqual([
          'js/s/array-map-foreach',
          'js/s/array-compare',
          'js/s/array-initialize',
        ]);
      });

      it('should output the collection snippets in the right order', () => {
        expect(
          jsArrayMethodsSnippets.find(({ position }) => position === 0)
            .snippet_cid
        ).toBe('js/s/array-map-foreach');
        expect(
          jsArrayMethodsSnippets.find(({ position }) => position === 1)
            .snippet_cid
        ).toBe('js/s/array-compare');
        expect(
          jsArrayMethodsSnippets.find(({ position }) => position === 2)
            .snippet_cid
        ).toBe('js/s/array-initialize');
      });
    });
  });

  describe('should output the correct snippet data', () => {
    const snippetData = result.data.snippets;

    it('should output the correct number of snippets', () => {
      expect(snippetData.length).toEqual(7);
    });

    it('should output the correct snippet cids', () => {
      expect(snippetData.map(({ cid }) => cid).sort()).toEqual(
        [
          'articles/s/web-development-tips',
          'js/s/array-grouping',
          'js/s/array-initialize',
          'js/s/array-map-foreach',
          'js/s/array-compare',
          'css/s/content-centering',
          'css/s/css-reset',
        ].sort()
      );
    });

    it('should produce a ranking between 0 and 1 for all snippets', () => {
      snippetData.forEach(({ ranking }) => {
        expect(ranking).toBeGreaterThanOrEqual(0);
        expect(ranking).toBeLessThanOrEqual(1);
      });
    });

    it('should produce a semicolon separated list of tags', () => {
      snippetData.forEach(({ _tags }) => {
        expect(_tags.split(';').length).toBeGreaterThanOrEqual(1);
      });
    });

    it('should match to the correct language_cid', () => {
      snippetData.forEach(({ cid, language_cid }) => {
        if (cid.startsWith('js')) {
          expect(language_cid).toBe('javascript');
        } else if (cid.startsWith('css')) {
          expect(language_cid).toBe('css');
        } else {
          expect(language_cid).toBe(null);
        }
      });
    });

    it('should produce the correct listed attribute', () => {
      const listedSnippets = snippetData.filter(({ listed }) => listed);
      const unlistedSnippets = snippetData.filter(({ listed }) => !listed);
      expect(listedSnippets.length).toEqual(6);
      expect(unlistedSnippets.length).toEqual(1);
      expect(unlistedSnippets[0].cid).toBe('articles/s/web-development-tips');
    });

    it('should produce an HTML content and description', () => {
      snippetData.forEach(({ description, content }) => {
        expect(description).toContain('<p>');
        expect(content).toContain('<p>');
      });
    });

    describe('Markdown parsing', () => {
      it('should highlight code blocks', () => {
        const snippetWithoutTitle = snippetData.find(
          ({ cid }) => cid === 'js/s/array-grouping'
        );
        const snippetWithTitle = snippetData.find(
          ({ cid }) => cid === 'articles/s/web-development-tips'
        );
        expect(snippetWithoutTitle.content).toContain(
          'class="language-js notranslate" translate="no" data-code-language="JavaScript">'
        );
        expect(snippetWithTitle.content).toContain(
          'class="language-js notranslate" translate="no" data-code-language="JavaScript" data-code-title="aFunction.js">'
        );
      });

      it('should link inline code only if the language references match it', () => {
        const arrayFromReference =
          '<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from" data-code-reference="true" rel="noopener noreferrer" target="_blank"><code class="notranslate" translate="no">Array.from()</code></a>';
        const jsSnippet = snippetData.find(
          ({ cid }) => cid === 'js/s/array-initialize'
        );
        const noJsSnippet = snippetData.find(
          ({ cid }) => cid === 'articles/s/web-development-tips'
        );
        expect(jsSnippet.content).toContain(arrayFromReference);
        expect(noJsSnippet.content).not.toContain(arrayFromReference);
      });

      it('should safeguard only external links', () => {
        const externalLinkSnippet = snippetData.find(
          ({ cid }) => cid === 'articles/s/web-development-tips'
        );
        const internalLinkSnippet = snippetData.find(
          ({ cid }) => cid === 'js/s/array-map-foreach'
        );
        expect(externalLinkSnippet.content).toContain(
          '<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder" rel="noopener noreferrer" target="_blank">modulo operator(<code class="notranslate" translate="no">%</code>)</a>'
        );
        expect(internalLinkSnippet.content).toContain(
          '<a href="/js/s/array-compare">here</a>'
        );
      });

      it('should transform headings', () => {
        const snippetWithHeadings = snippetData.find(
          ({ cid }) => cid === 'articles/s/web-development-tips'
        );
        expect(snippetWithHeadings.content).toContain(
          '<h2><a href="#this-is-a-level-2-heading-with-some-code" id="this-is-a-level-2-heading-with-some-code">This is a level 2 heading with <code class="notranslate" translate="no">some code</code></a></h2>'
        );
      });

      it('should transform image paths', () => {
        const snippetWithImages = snippetData.find(
          ({ cid }) => cid === 'articles/s/web-development-tips'
        );
        expect(snippetWithImages.content).toContain(
          '<img src="/assets/illustrations/flexbox-diagram.svg" alt="Diagram of Flexbox properties">'
        );
      });

      it('should wrap tables', () => {
        const snippetWithTables = snippetData.find(
          ({ cid }) => cid === 'articles/s/web-development-tips'
        );
        expect(snippetWithTables.content).toContain(
          '<figure class="table-wrapper"><table>'
        );
      });

      it('should embed codepens from links', () => {
        const snippetWithTables = snippetData.find(
          ({ cid }) => cid === 'css/s/content-centering'
        );
        expect(snippetWithTables.content).toContain('<p class="codepen"');
        expect(snippetWithTables.content).toContain(
          '<span>See the <a href="https://codepen.io/chalarangelo/pen/wvbwQKg" target="_blank" rel="noopener noreferrer">embedded CodePen</a></span>'
        );
        expect(snippetWithTables.content).toContain(
          '<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>'
        );
      });

      it('should transform admonitions', () => {
        const snippetWithAdmonitions = snippetData.find(
          ({ cid }) => cid === 'articles/s/web-development-tips'
        );
        expect(snippetWithAdmonitions.content).toContain(
          '<figcaption>💡  Tip</figcaption>'
        );
        expect(snippetWithAdmonitions.content).toContain(
          '<figcaption>⚠️  Warning</figcaption>'
        );
      });
    });
  });
});
