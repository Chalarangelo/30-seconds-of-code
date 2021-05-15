import { SnippetPreview } from '.';
import { ArgsError } from 'blocks/utilities/error';
import SnippetFactory from 'test/fixtures/factories/blockSnippet';

describe('SnippetPreview', () => {
  let snippet, snippetPreview;

  beforeAll(() => {
    const snippets = SnippetFactory.create('SnippetPresets');
    snippet = snippets.snippet;
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
