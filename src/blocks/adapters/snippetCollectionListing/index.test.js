import { SnippetCollectionListing } from '.';
import { SnippetCollection } from 'blocks/entities/snippetCollection';
import { ArgsError } from 'blocks/utilities/error';
import ContentConfigFactory from 'test/fixtures/factories/contentConfig';
import SnippetFactory from 'test/fixtures/factories/blockSnippet';

describe('SnippetCollectionListing', () => {
  let configs = {};
  let snippets = [];
  let collections = {};
  let listings = {};

  beforeAll(() => {
    snippets = [
      SnippetFactory.create('Snippet'),
      SnippetFactory.create('Snippet', 'react'),
      SnippetFactory.create('Snippet', 'blog'),
      SnippetFactory.create('Snippet', 'css'),
    ];
    configs = ContentConfigFactory.create('ContentConfigPresets');
    collections.main = new SnippetCollection(
      {
        type: 'main',
        slugPrefix: 'main',
      },
      snippets
    );
    collections.blog = new SnippetCollection(
      {
        type: 'blog',
        slugPrefix: 'blog',
        config: configs.blog,
      },
      [snippets[1]]
    );
    collections.language = new SnippetCollection(
      {
        type: 'language',
        slugPrefix: 'dart',
        config: configs.dart,
      },
      [snippets[2]]
    );
    collections.tag = new SnippetCollection(
      {
        type: 'tag',
        slugPrefix: 'dart/t/list',
        config: configs.dart,
        parentCollection: collections.language,
        tag: 'list',
      },
      [snippets[2]]
    );
    Object.keys(collections).forEach(name => {
      listings[name] = new SnippetCollectionListing(collections[name]);
    });
  });

  describe('constructor', () => {
    it('throws if passed a non-snippetCollection object', () => {
      expect(() => new SnippetCollectionListing({})).toThrow(ArgsError);
    });
  });

  describe('toObject', () => {
    let results = {};

    beforeAll(() => {
      Object.keys(listings).forEach(name => {
        results[name] = listings[name].toObject();
      });
    });

    it('returns the appropriate attributes', () => {
      expect(Object.keys(results.main)).toEqual(
        SnippetCollectionListing.serializableAttributes
      );
    });

    it('returns the correct listing name', () => {
      expect(results.main.listingName).toBe(collections.main.name);
    });

    it('returns the correct listing title', () => {
      expect(results.language.listingTitle).toBe(collections.language.name);
      expect(results.tag.listingTitle).toBe(collections.tag.language);
    });

    it('returns the correct listing type', () => {
      expect(results.main.listingType).toBe(collections.main.type);
      expect(results.blog.listingType).toBe(collections.blog.type);
      expect(results.language.listingType).toBe(collections.language.type);
      expect(results.tag.listingType).toBe(collections.tag.type);
    });

    it('returns the correct listing sublinks', () => {
      expect(results.blog.listingSublinks.length).toBe(1);
      expect(results.language.listingSublinks.length).toBe(2);
      expect(results.tag.listingSublinks.length).toBe(2);
    });

    it('returns the correct page description', () => {
      expect(results.main.pageDescription).toBe(
        collections.main.seoDescription
      );
    });
  });
});
