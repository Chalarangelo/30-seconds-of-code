import { SnippetContext } from '.';
import { ArgsError } from 'blocks/utilities/error';
import SnippetFactory from 'test/fixtures/factories/blockSnippet';

describe('SnippetContext', () => {
  let snippet,
    snippetContext,
    blogSnippet,
    blogSnippetContext,
    cssSnippet,
    cssSnippetContext;

  beforeAll(() => {
    const snippets = SnippetFactory.create('SnippetPresets');
    snippet = snippets.snippet;
    blogSnippet = snippets.blogSnippet;
    cssSnippet = snippets.cssSnippet;
    snippetContext = new SnippetContext(snippet);
    blogSnippetContext = new SnippetContext(blogSnippet);
    cssSnippetContext = new SnippetContext(cssSnippet);
  });

  describe('constructor', () => {
    it('throws if passed a non-snippet object', () => {
      expect(() => new SnippetContext({})).toThrow(ArgsError);
    });
  });

  describe('toObject', () => {
    let result, blogResult, cssResult;

    beforeAll(() => {
      result = snippetContext.toObject({ withVscodeUrl: true });
      blogResult = blogSnippetContext.toObject({ withVscodeUrl: false });
      cssResult = cssSnippetContext.toObject({ withVscodeUrl: true });
    });

    it('returns the appropriate attributes', () => {
      expect(Object.keys(blogResult)).toEqual(
        SnippetContext.serializableAttributes.filter(
          a => !['code', 'vscodeUrl', 'actionType'].includes(a)
        )
      );
      expect(Object.keys(result)).toEqual(
        SnippetContext.serializableAttributes.filter(
          a => !['authors', 'type', 'cover', 'code'].includes(a)
        )
      );
      expect(Object.keys(cssResult)).toEqual(
        SnippetContext.serializableAttributes.filter(
          a => !['authors', 'type', 'cover'].includes(a)
        )
      );
    });

    it('returns the correct authors', () => {
      expect(blogResult.authors).not.toBe(undefined);
      expect(result.authors).toBe(undefined);
    });

    it('returns the correct type', () => {
      expect(blogResult.type).not.toBe(undefined);
      expect(result.type).toBe(undefined);
    });

    it('returns the correct cover', () => {
      expect(blogResult.cover).not.toBe(undefined);
      expect(result.cover).toBe(undefined);
    });

    it('returns the correct id', () => {
      expect(result.id).toBe(snippet.id);
    });

    it('returns the correct title', () => {
      expect(result.title).toBe(snippet.title);
    });

    it('returns the correct description', () => {
      expect(result.description).toBe(snippet.text.short.replace(/`/g, ''));
    });

    it('returns the correct url', () => {
      expect(result.url).toBe(snippet.url);
    });

    it('returns the correct slug', () => {
      expect(result.slug).toBe(snippet.slug);
    });

    it('returns the correct firstSeen', () => {
      expect(result.firstSeen).toBe(snippet.firstSeen);
    });

    it('returns the correct lastUpdated', () => {
      expect(result.lastUpdated).toBe(snippet.lastUpdated);
    });

    it('returns the correct language', () => {
      expect(result.language).toBe(snippet.language);
    });

    it('returns the correct icon', () => {
      expect(result.icon).toBe(snippet.icon);
    });

    it('returns the correct tags', () => {
      expect(result.tags.primary.toLowerCase()).toBe(
        snippet.tags.primary.toLowerCase()
      );
    });

    it('returns the correct html', () => {
      expect(result.html).toStrictEqual(snippet.html);
    });

    it('returns the correct actionType', () => {
      expect(result.actionType).toBe('codepen');
      expect(cssResult.actionType).toBe('cssCodepen');
      expect(blogResult.actionType).toBe(undefined);
    });

    it('returns the correct code', () => {
      expect(cssResult.code).toBe(cssSnippet.code);
    });

    it('returns the correct vscodeUrl', () => {
      expect(result.vscodeUrl).toBe(snippet.vscodeUrl);
      expect(blogResult.vscodeUrl).toBe(undefined);
    });
  });
});
