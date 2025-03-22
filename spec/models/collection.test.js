/* eslint-disable no-unused-vars */
import { describe, it, expect } from 'vitest';
import Collection from '#src/models/collection.js';
import Loader from '#src/lib/loader.js';
import settings from '#src/config/settings.js';

describe('Collection', () => {
  Loader.loadModules();
  const { SnippetFactory, CollectionSnippetFactory, CollectionFactory } =
    Loader.buildFactories();

  const mainCollection = CollectionFactory.create('main');
  const collectionsCollection = CollectionFactory.create('collections');

  const primaryCollection = CollectionFactory.create('primary', {
    id: 'js',
    recTokens: 'primary collection short description',
    docTokens: 'primary collection short description',
  });

  const secondaryCollection = CollectionFactory.create({
    id: 'js/c/array',
    parentId: primaryCollection.id,
  });

  const otherSecondaryCollection = CollectionFactory.create({
    id: 'js/c/object',
    parentId: primaryCollection.id,
  });

  const snippet = SnippetFactory.create();
  const collectionSnippet = CollectionSnippetFactory.create({
    snippetId: snippet.id,
    collectionId: primaryCollection.id,
  });

  describe('.main', () => {
    it('returns main collection', () => {
      expect(Collection.main).toEqual(mainCollection);
    });
  });

  describe('.collections', () => {
    it('returns collections collection', () => {
      expect(Collection.collections).toEqual(collectionsCollection);
    });
  });

  describe('hasParent', () => {
    it('returns false if no parent', () => {
      expect(primaryCollection.hasParent).toEqual(false);
    });

    it('returns true if parent exists', () => {
      expect(secondaryCollection.hasParent).toEqual(true);
    });
  });

  describe('isMain', () => {
    it('returns true if main collection', () => {
      expect(mainCollection.isMain).toEqual(true);
    });

    it('returns false if not main collection', () => {
      expect(primaryCollection.isMain).toEqual(false);
    });
  });

  describe('isCollections', () => {
    it('returns true if collections collection', () => {
      expect(collectionsCollection.isCollections).toEqual(true);
    });

    it('returns false if not collections collection', () => {
      expect(primaryCollection.isCollections).toEqual(false);
    });
  });

  describe('isPrimary', () => {
    it('returns true if primary collection', () => {
      expect(primaryCollection.isPrimary).toEqual(true);
    });

    it('returns false if not primary collection', () => {
      expect(secondaryCollection.isPrimary).toEqual(false);
    });
  });

  describe('isSecondary', () => {
    it('returns false if primary collection', () => {
      expect(primaryCollection.isSecondary).toEqual(false);
    });

    it('returns true if secondary collection', () => {
      expect(secondaryCollection.isSecondary).toEqual(true);
    });
  });

  describe('rootUrl', () => {
    it('returns the slug if it is a parent', () => {
      expect(primaryCollection.rootUrl).toEqual(primaryCollection.slug);
    });

    it('returns the parent slug if it has a parent', () => {
      expect(secondaryCollection.rootUrl).toEqual(
        secondaryCollection.parent.slug
      );
    });
  });

  describe('siblings', () => {
    it('returns siblings if it has a parent', () => {
      expect(secondaryCollection.siblings).toEqual([
        secondaryCollection,
        otherSecondaryCollection,
      ]);
    });

    it('returns an empty array if it has no parent', () => {
      expect(primaryCollection.siblings).toEqual([]);
    });
  });

  describe('siblingsExceptSelf', () => {
    it('returns siblings except self if it has a parent', () => {
      expect(secondaryCollection.siblingsExceptSelf).toEqual([
        otherSecondaryCollection,
      ]);
    });

    it('returns an empty array if it has no parent', () => {
      expect(primaryCollection.siblingsExceptSelf).toEqual([]);
    });
  });

  describe('firstPageSlug', () => {
    it('returns first page slug', () => {
      expect(primaryCollection.firstPageSlug).toEqual(
        `${primaryCollection.slug}/p/1`
      );
    });
  });

  describe('listedSnippets', () => {
    it('returns listed snippets', () => {
      expect(primaryCollection.listedSnippets).toEqual([snippet]);
    });
  });

  describe('formattedSnippetCount', () => {
    it('returns formatted snippet count', () => {
      expect(primaryCollection.formattedSnippetCount).toEqual('1 articles');
    });
  });

  describe('pageCount', () => {
    it('returns page count', () => {
      expect(primaryCollection.pageCount).toEqual(1);
    });
  });

  describe('allPageSlugs', () => {
    it('returns all page slugs', () => {
      expect(primaryCollection.allPageSlugs).toEqual([
        `${primaryCollection.slug}/p/1`,
      ]);
    });
  });

  describe('allPageFullUrls', () => {
    it('returns all page full urls', () => {
      expect(primaryCollection.allPageFullUrls).toEqual([
        `${settings.website.url}${primaryCollection.slug}/p/1`,
      ]);
    });
  });

  describe('matchesTag', () => {
    it('returns true if collection matches tag', () => {
      expect(secondaryCollection.matchesTag('array')).toEqual(true);
    });

    it('returns false if collection does not match tag', () => {
      expect(secondaryCollection.matchesTag('js')).toEqual(false);
    });
  });

  describe('pages', () => {
    it('returns page objects with the correct snippet', () => {
      expect(primaryCollection.pages[0].key).toEqual('js/p/1');
    });
  });
});
