/* eslint-disable no-unused-vars */
import { describe, it, expect } from 'vitest';
import Loader from '#src/lib/loader.js';
import settings from '#src/config/settings.js';

describe('ContentModel', () => {
  Loader.loadModules();
  const { SnippetFactory, CollectionFactory } = Loader.buildFactories();

  const snippet = SnippetFactory.create({
    id: 'js/s/my-snippet',
    description: '<p>A <a href="https://example.com">description</a></p>.',
  });

  const collection = CollectionFactory.create({
    id: 'js/s/array',
  });

  describe('slug', () => {
    it('returns the slugified id', () => {
      expect(snippet.slug).toEqual(`/${snippet.id}`);
      expect(collection.slug).toEqual(`/${collection.id}`);
    });
  });

  describe('slugId', () => {
    it('returns the last part of the slug', () => {
      expect(snippet.slugId).toEqual('my-snippet');
      expect(collection.slugId).toEqual('array');
    });
  });

  describe('url', () => {
    it('returns the slug for snippets', () => {
      expect(snippet.url).toEqual(`/${snippet.id}`);
    });

    it('returns the first page slug for collections', () => {
      expect(collection.url).toEqual(`/${collection.id}/p/1`);
    });
  });

  describe('fullUrl', () => {
    it('returns the full url for the record', () => {
      expect(snippet.fullUrl).toEqual(`${settings.website.url}${snippet.url}`);
      expect(collection.fullUrl).toEqual(
        `${settings.website.url}${collection.url}`
      );
    });
  });

  describe('formattedDescription', () => {
    it('strips html tags and paragraphs from the description', () => {
      expect(snippet.formattedDescription).toEqual('A description.');
    });
  });

  describe('seoDescription', () => {
    it('strips html from the description', () => {
      expect(snippet.seoDescription).toEqual('A description.');
    });
  });

  describe('isSnippet', () => {
    it('returns true if the record is a snippet', () => {
      expect(snippet.isSnippet).toEqual(true);
      expect(collection.isSnippet).toEqual(false);
    });
  });

  describe('type', () => {
    it('returns the model name in lowercase', () => {
      expect(snippet.type).toEqual('snippet');
      expect(collection.type).toEqual('collection');
    });
  });

  describe('serializeAs', () => {
    it('serializes the object using the specified serializer', () => {
      expect(snippet.serializeAs('SnippetContext').slug).toEqual(snippet.slug);
      expect(collection.serializeAs('CollectionContext').title).toEqual(
        collection.title
      );
    });
  });

  describe('context', () => {
    it('returns the snippet context for snippets', () => {
      expect(snippet.context).toEqual(snippet.serializeAs('SnippetContext'));
    });

    it('returns the collection context for collections', () => {
      expect(collection.context).toEqual(
        collection.serializeAs('CollectionContext')
      );
    });
  });
});
