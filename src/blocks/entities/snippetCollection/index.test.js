import { SnippetCollection } from '.';
import { Snippet } from 'blocks/entities/snippet';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { CollectionConfig } from 'blocks/entities/collectionConfig';
import { ArgsError } from 'blocks/utilities/error';
import { rawConfigs } from 'fixtures/blocks/contentConfigs';
import { rawCollections } from 'fixtures/blocks/collectionConfigs';
import { rawSnippets } from 'fixtures/blocks/snippets';
import { Env } from 'blocks/utilities/env';

describe('SnippetCollection', () => {
  let configs = {};
  let collectionConfigs = {};
  let snippets = [];
  beforeAll(() => {
    Env.setup();
    Object.keys(rawConfigs).forEach(name => {
      configs[name] = new ContentConfig(rawConfigs[name]);
    });
    Object.keys(rawCollections).forEach(name => {
      collectionConfigs[name] = new CollectionConfig(rawCollections[name]);
    });
    snippets.push(new Snippet(rawSnippets.normal, configs.react));
    snippets.push(new Snippet(rawSnippets.blog, configs.blog));
    snippets.push(new Snippet(rawSnippets.normal, configs.dart));
    snippets.push(new Snippet(rawSnippets.css, configs.css));
  });

  describe('constructor', () => {
    it('throws an error if called without all required keys', () => {
      expect(() => new SnippetCollection({}, snippets)).toThrow(ArgsError);
    });

    it('throws an error if snippets is not of the correct type', () => {
      expect(
        () =>
          new SnippetCollection(
            { type: 'collection', slugPrefix: 'slug' },
            null
          )
      ).toThrow(ArgsError);
      expect(
        () =>
          new SnippetCollection({ type: 'collection', slugPrefix: 'slug' }, [])
      ).toThrow(ArgsError);
    });

    it('throws an error if the type is incorrect', () => {
      expect(
        () =>
          new SnippetCollection(
            { type: 'invalid', slugPrefix: 'slug' },
            snippets
          )
      ).toThrow(ArgsError);
    });

    it('throws an error if the type is "language" or "tag" and there is no config', () => {
      expect(
        () =>
          new SnippetCollection(
            { type: 'language', slugPrefix: 'slug' },
            snippets
          )
      ).toThrow(ArgsError);
      expect(
        () =>
          new SnippetCollection({ type: 'tag', slugPrefix: 'slug' }, snippets)
      ).toThrow(ArgsError);
    });

    it('throws an error if the type is "tag" and no "parentCollection" key is present', () => {
      expect(
        () =>
          new SnippetCollection(
            { type: 'tag', slugPrefix: 'slug', config: configs.dart },
            snippets
          )
      ).toThrow(ArgsError);
    });
  });

  describe('constructed with valid data', () => {
    let collections = {};
    beforeAll(() => {
      collections.main = new SnippetCollection(
        {
          type: 'main',
          slugPrefix: '/main',
        },
        snippets
      );
      collections.blog = new SnippetCollection(
        {
          type: 'blog',
          slugPrefix: '/blog',
          config: configs.blog,
        },
        [snippets[1]]
      );
      collections.language = new SnippetCollection(
        {
          type: 'language',
          slugPrefix: '/dart',
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
      collections.tagWithMetadata = new SnippetCollection(
        {
          type: 'tag',
          slugPrefix: '/dart/t/array',
          config: configs.dart,
          parentCollection: collections.language,
          tag: 'array',
        },
        [snippets[2]]
      );
      collections.collection = new SnippetCollection(
        {
          type: 'collection',
          config: collectionConfigs.collection,
          slugPrefix: `/${collectionConfigs.collection.slug}`,
        },
        collectionConfigs.collection.snippetIds.map(id => Snippet.instances[id])
      );
    });

    it('passes any given data to the collection', () => {
      expect(collections.tag.type).toBe('tag');
      expect(collections.tag.tag).toBe('list');
      expect(collections.tag.parentCollection).toBe(collections.language);
    });

    it('sorts snippets in non-collection-type collections', () => {
      expect(collections.main.snippets.map(s => s.name)).toEqual(
        snippets.sort((a, b) => b.ranking - a.ranking).map(s => s.name)
      );
    });

    it('keeps snippets unsorted in collection-type collections', () => {
      expect(collections.collection.snippets.map(s => s.id)).toEqual(
        rawCollections.collection.snippetIds
      );
    });

    it('should produce the correct id', () => {
      expect(collections.language.id).toBe('language/dart');
    });

    it('should produce the correct orders', () => {
      expect(collections.main.orders).toEqual(['p']);
      expect(collections.blog.orders).toEqual(['p', 'n']);
      expect(collections.language.orders).toEqual(['p', 'a', 'e']);
      expect(collections.tag.orders).toEqual(['p', 'a', 'e']);
    });

    it('should produce the correct tag metadata', () => {
      expect(collections.main.tagMetadata).toBeFalsy();
      expect(collections.tag.tagMetadata).toBeFalsy();
      expect(collections.tagWithMetadata.tagMetadata).toBeTruthy();
    });

    it('should produce the correct name', () => {
      expect(collections.main.name).not.toBe(null);
      expect(collections.blog.name).not.toBe(null);
      expect(collections.language.name).not.toBe(null);
      expect(collections.tag.name).not.toBe(null);
      expect(collections.collection.name).not.toBe(null);
      expect(collections.tagWithMetadata.name).not.toBe(collections.tag.name);
    });

    it('should produce the correct shortName', () => {
      expect(collections.main.shortName).not.toBe(null);
      expect(collections.blog.shortName).not.toBe(null);
      expect(collections.language.shortName).not.toBe(null);
      expect(collections.tag.shortName).not.toBe(null);
      expect(collections.collection.shortName).not.toBe(null);
      expect(collections.tagWithMetadata.shortName).not.toBe(null);
    });

    it('should produce the correct description', () => {
      expect(collections.main.description).toBe(null);
      expect(collections.blog.description).toBe(null);
      expect(collections.language.description).not.toBe(null);
      expect(collections.tag.description).not.toBe(null);
      expect(collections.collection.description).not.toBe(null);
      expect(collections.tagWithMetadata.description).not.toBe(null);
    });

    it('should produce the correct shortDescription', () => {
      expect(collections.main.shortDescription).toBe(null);
      expect(collections.blog.shortDescription).toBe(null);
      expect(collections.language.shortDescription).not.toBe(null);
      expect(collections.tag.shortDescription).not.toBe(null);
      expect(collections.collection.shortDescription).not.toBe(null);
      expect(collections.tagWithMetadata.shortDescription).not.toBe(null);
    });

    it('should produce the correct seoDescription', () => {
      expect(collections.blog.seoDescription).not.toBe(null);
    });

    it('should produce the correct tags', () => {
      expect(collections.main.tags).toBe(undefined);
      expect(collections.language.tags).toEqual(['array']);
      expect(collections.tag.tags).toEqual(['array']);
      expect(collections.blog.tags).toEqual(['visual']);
    });

    it('should produce the correct featured value', () => {
      expect(collections.language.featured).toBe(configs.dart.featured);
    });

    it('should produce the correct blog value', () => {
      expect(collections.blog.blog).toBe(true);
      expect(collections.language.blog).toBe(false);
    });

    it('should produce the correct icon', () => {
      expect(collections.language.icon).toBe(configs.dart.iconName);
      expect(collections.tag.icon).toBe(configs.dart.iconName);
      expect(collections.collection.icon).toBe(
        collectionConfigs.collection.iconName
      );
    });

    it('should produce the correct url', () => {
      expect(collections.tag.url).toBe(`${collections.tag.slugPrefix}/p/1`);
    });

    it('should produce the correct rootUrl', () => {
      expect(collections.language.rootUrl).toBe(
        collections.language.slugPrefix
      );
      expect(collections.tag.rootUrl).toBe(collections.language.rootUrl);
    });

    it('should produce the correct language', () => {
      expect(collections.language.language).not.toBe(undefined);
      expect(collections.tag.language).not.toBe(undefined);
      expect(collections.blog.language).toBe(undefined);
    });

    it('should produce the correct isTopLevel value', () => {
      expect(collections.language.isTopLevel).toBe(true);
      expect(collections.blog.isTopLevel).toBe(true);
      expect(collections.tag.isTopLevel).toBe(false);
    });

    it('should produce the correct isListed value', () => {
      expect(collections.main.isListed).toBe(true);
      expect(collections.blog.isListed).toBe(true);
      expect(collections.language.isListed).toBe(false);
      expect(collections.tag.isListed).toBe(false);
      expect(collections.collection.isListed).toBe(true);
    });

    describe('addSnippets', () => {
      beforeAll(() => {
        collections.language.addSnippets([snippets[1]]);
        collections.collection.addSnippets([snippets[1]]);
      });

      it('should add snippets to the collection', () => {
        expect(collections.language.snippets.length).toBe(2);
        expect(collections.collection.snippets.length).toBe(3);
      });

      it('sorts snippets in non-collection-type collections', () => {
        expect(collections.language.snippets.map(s => s.name)).toEqual(
          collections.language.snippets
            .sort((a, b) => b.ranking - a.ranking)
            .map(s => s.name)
        );
      });

      it('keeps snippets unsorted in non-collection-type collections', () => {
        expect(collections.collection.snippets.map(s => s.id)).toEqual([
          ...rawCollections.collection.snippetIds,
          snippets[1].id,
        ]);
      });
    });
  });
});
