import { SnippetContext } from '.';
import { Snippet } from 'blocks/entities/snippet';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { ArgsError } from 'blocks/utilities/error';
import { rawConfigs } from 'fixtures/blocks/contentConfigs';
import { rawSnippets } from 'fixtures/blocks/snippets';
import { Env } from 'blocks/utilities/env';

describe('SnippetContext', () => {
  let configs = {};
  let snippet, snippetContext, blogSnippet, blogSnippetContext;

  beforeAll(() => {
    Env.setup();
    Object.keys(rawConfigs).forEach(name => {
      configs[name] = new ContentConfig(rawConfigs[name]);
    });
    snippet = new Snippet(rawSnippets.normal, configs.react);
    snippetContext = new SnippetContext(snippet);
    blogSnippet = new Snippet(rawSnippets.blog, configs.blog);
    blogSnippetContext = new SnippetContext(blogSnippet);
  });

  describe('constructor', () => {
    it('throws if passed a non-snippet object', () => {
      expect(() => new SnippetContext({})).toThrow(ArgsError);
    });
  });

  describe('toObject', () => {
    let result, blogResult;

    beforeAll(() => {
      result = snippetContext.toObject({ withVscodeUrl: true });
      blogResult = blogSnippetContext.toObject({ withVscodeUrl: false });
    });

    it('returns the appropriate attributes', () => {
      expect(Object.keys(blogResult)).toEqual(
        SnippetContext.serializableAttributes.filter(
          a => !['code', 'vscodeUrl'].includes(a)
        )
      );
      expect(Object.keys(result)).toEqual(
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

    it('returns the correct code', () => {
      expect(result.code).toBe(snippet.code);
    });

    it('returns the correct vscodeUrl', () => {
      expect(result.vscodeUrl).toBe(snippet.vscodeUrl);
      expect(blogResult.vscodeUrl).toBe(undefined);
    });
  });
});
