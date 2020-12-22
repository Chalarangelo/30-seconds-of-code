import { SnippetPreview } from '.';
import { Snippet } from 'blocks/entities/snippet';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { ArgsError } from 'blocks/utilities/error';
import { rawConfigs } from 'fixtures/blocks/contentConfigs';
import { rawSnippets } from 'fixtures/blocks/snippets';
import { setupEnv } from 'blocks/utilities/env';

describe('SnippetPreview', () => {
  let configs = {};
  let snippet, snippetPreview;

  beforeAll(() => {
    setupEnv();
    Object.keys(rawConfigs).forEach(name => {
      configs[name] = new ContentConfig(rawConfigs[name]);
    });
    snippet = new Snippet(rawSnippets.normal, configs.react);
    snippetPreview = new SnippetPreview(snippet);
  });

  describe('constructor', () => {
    it('throws if passed a non-snippet object', () => {
      expect(() => new SnippetPreview({})).toThrow(ArgsError);
    });
  });

  describe('toObject', () => {
    let result;

    beforeAll(() => {
      result = snippetPreview.toObject({ withSearchTokens: true });
    });

    it('returns the appropriate attributes', () => {
      expect(Object.keys(result)).toEqual(
        SnippetPreview.serializableAttributes
      );
    });

    it('returns the appropriate title', () => {
      expect(result.title).toBe(snippet.title);
    });

    it('returns the appropriate expertise', () => {
      expect(result.expertise.toLowerCase()).toBe(
        snippet.expertise.toLowerCase()
      );
    });

    it('returns the appropriate primary tag', () => {
      expect(result.primaryTag.toLowerCase()).toBe(
        snippet.tags.primary.toLowerCase()
      );
    });

    it('injects a tag into the primary tag', () => {
      expect(
        snippetPreview
          .toObject({ injectIntoPrimaryTag: 'test' })
          .primaryTag.toLowerCase()
      ).toBe(`${snippet.tags.primary}, test`.toLowerCase());
    });

    it('returns the correct language', () => {
      expect(result.language).toBe(snippet.language.long);
    });

    it('returns the correct icon', () => {
      expect(result.icon).toBe(snippet.icon);
    });

    it('returns the correct description', () => {
      expect(result.description).toBe(snippet.html.description.trim());
    });

    it('returns the correct url', () => {
      expect(result.url).toBe(snippet.slug);
    });

    it('returns search tokens if required', () => {
      expect(result.searchTokens).not.toBe(undefined);
    });

    it('returns no search tokens if not required', () => {
      expect(
        snippetPreview.toObject({ withSearchTokens: false }).searchTokens
      ).toBe(undefined);
    });
  });
});
