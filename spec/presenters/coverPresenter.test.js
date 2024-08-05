import { describe, it, expect } from 'vitest';
import Loader from '#src/lib/loader.js';
import CoverPresenter from '#src/presenters/coverPresenter.js';

describe('CoverPresenter', () => {
  Loader.loadModules();
  const { CollectionFactory, SnippetFactory } = Loader.buildFactories();

  const snippet = SnippetFactory.create({ cover: 'snippet-cover' });
  const collection = CollectionFactory.create({ cover: 'collection-cover' });

  const snippetPresenter = new CoverPresenter(snippet);
  const collectionPresenter = new CoverPresenter(collection);

  describe('coverUrl', () => {
    it('returns the cover url for a snippet', () => {
      expect(snippetPresenter.coverUrl()).toEqual(
        '/assets/cover/snippet-cover-400.webp'
      );
    });

    it('returns the cover url for a snippet with full size', () => {
      expect(snippetPresenter.coverUrl(true)).toEqual(
        '/assets/cover/snippet-cover-800.webp'
      );
    });

    it('returns the cover url for a collection', () => {
      expect(collectionPresenter.coverUrl()).toEqual(
        '/assets/splash/collection-cover-600.webp'
      );
    });
  });

  describe('coverSrcset', () => {
    it('returns the cover srcset for a snippet', () => {
      expect(snippetPresenter.coverSrcset()).toEqual([
        '/assets/cover/snippet-cover-400.webp 400w',
        '/assets/cover/snippet-cover-800.webp 800w',
      ]);
    });

    it('returns the cover srcset for a snippet with full size', () => {
      expect(snippetPresenter.coverSrcset(true)).toEqual([
        '/assets/cover/snippet-cover-800.webp 800w',
        '/assets/cover/snippet-cover-400.webp 400w',
        '/assets/cover/snippet-cover-1200.webp 1200w',
      ]);
    });

    it('returns the cover srcset for a collection', () => {
      expect(collectionPresenter.coverSrcset()).toEqual([
        '/assets/splash/collection-cover-600.webp 600w',
        '/assets/splash/collection-cover-400.webp 400w',
      ]);
    });
  });
});
