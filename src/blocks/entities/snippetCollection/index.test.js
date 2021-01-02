import { SnippetCollection } from '.';
import { Snippet } from 'blocks/entities/snippet';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { ArgsError } from 'blocks/utilities/error';
import { rawConfigs } from 'fixtures/blocks/contentConfigs';
import { rawSnippets } from 'fixtures/blocks/snippets';
import { Env } from 'blocks/utilities/env';

describe('SnippetCollection', () => {
  let configs = {};
  let snippets = [];
  beforeAll(() => {
    Env.setup();
    Object.keys(rawConfigs).forEach(name => {
      configs[name] = new ContentConfig(rawConfigs[name]);
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
    });

    it('should store collection metadata', () => {
      expect(SnippetCollection.collectionMetas.length).not.toBe(0);
    });

    it('passes any given data to the collection', () => {
      expect(collections.tag.type).toBe('tag');
      expect(collections.tag.tag).toBe('list');
      expect(collections.tag.parentCollection).toBe(collections.language);
    });

    it('sorts snippets in the collection', () => {
      expect(collections.main.snippets.map(s => s.name)).toEqual(
        snippets.sort((a, b) => b.ranking - a.ranking).map(s => s.name)
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

    it('should produce the correct meta', () => {
      expect(Object.keys(collections.language.meta)).toEqual([
        'name',
        'tags',
        'url',
        'slugPrefix',
        'featured',
        'blog',
        'icon',
      ]);
    });

    it('should produce the correct name', () => {
      expect(collections.main.name).not.toBe(null);
      expect(collections.blog.name).not.toBe(null);
      expect(collections.language.name).not.toBe(null);
      expect(collections.tag.name).not.toBe(null);
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
      expect(collections.language.icon).toBe(configs.dart.theme.iconName);
      expect(collections.tag.icon).toBe(undefined);
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
    });

    describe('addSnippets', () => {
      beforeAll(() => {
        collections.language.addSnippets([snippets[1]]);
      });

      it('should add snippets to the collection', () => {
        expect(collections.language.snippets.length).toBe(2);
      });

      it('sorts snippets in the collection', () => {
        expect(collections.language.snippets.map(s => s.name)).toEqual(
          collections.language.snippets
            .sort((a, b) => b.ranking - a.ranking)
            .map(s => s.name)
        );
      });
    });
  });
});
