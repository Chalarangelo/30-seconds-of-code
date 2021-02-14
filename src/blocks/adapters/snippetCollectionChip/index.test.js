import { SnippetCollectionChip } from '.';
import { Snippet } from 'blocks/entities/snippet';
import { SnippetCollection } from 'blocks/entities/snippetCollection';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { ArgsError } from 'blocks/utilities/error';
import { rawConfigs } from 'fixtures/blocks/contentConfigs';
import { rawSnippets } from 'fixtures/blocks/snippets';
import { Env } from 'blocks/utilities/env';

describe('SnippetCollectionChip', () => {
  let configs = {};
  let collections = {};
  let listings = {};

  beforeAll(() => {
    Env.setup();
    Object.keys(rawConfigs).forEach(name => {
      configs[name] = new ContentConfig(rawConfigs[name]);
    });
    collections.language = new SnippetCollection(
      {
        type: 'language',
        slugPrefix: 'dart',
        config: configs.dart,
      },
      [new Snippet(rawSnippets.normal, configs.dart)]
    );
    Object.keys(collections).forEach(name => {
      listings[name] = new SnippetCollectionChip(collections[name]);
    });
  });

  describe('constructor', () => {
    it('throws if passed a non-snippetCollection object', () => {
      expect(() => new SnippetCollectionChip({})).toThrow(ArgsError);
    });
  });

  describe('toObject', () => {
    let results = {};

    beforeAll(() => {
      Object.keys(listings).forEach(name => {
        results[name] = listings[name].toObject({
          withDescription: true,
          withSearchTokens: true,
        });
      });
    });

    it('returns the appropriate attributes', () => {
      expect(Object.keys(results.language)).toEqual(
        SnippetCollectionChip.serializableAttributes
      );
    });

    it('returns the correct title', () => {
      expect(results.language.title).toBe(collections.language.shortName);
    });

    it('returns the correct url', () => {
      expect(results.language.url).toBe(collections.language.url);
    });

    it('returns the correct icon', () => {
      expect(results.language.icon).toBe(collections.language.icon);
    });

    it('returns the correct description', () => {
      expect(results.language.description).toBe(
        collections.language.shortDescription
      );
    });

    it('returns no description if not required', () => {
      expect(
        listings.language.toObject({ withDescription: false }).description
      ).toBe(undefined);
    });

    it('returns no search tokens if not required', () => {
      expect(
        listings.language.toObject({ withSearchTokens: false }).searchTokens
      ).toBe(undefined);
    });
  });
});
