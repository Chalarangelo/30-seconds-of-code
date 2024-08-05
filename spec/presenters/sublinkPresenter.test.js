/* eslint-disable no-unused-vars */
import { describe, it, expect } from 'vitest';
import Loader from '#src/lib/loader.js';
import SublinkPresenter from '#src/presenters/sublinkPresenter.js';
import settings from '#src/config/settings.js';

describe('SublinkPresenter', () => {
  Loader.loadModules();
  const { CollectionFactory } = Loader.buildFactories();

  const mainCollection = CollectionFactory.create('main');
  const primaryCollection = CollectionFactory.create('primary', {
    id: 'js',
    miniTitle: 'JavaScript',
  });
  const secondaryCollection = CollectionFactory.create('secondary', {
    id: 'js/c/array',
    parentId: 'js',
    miniTitle: 'Array',
  });
  const otherSecondaryCollection = CollectionFactory.create('secondary', {
    id: 'js/c/object',
    parentId: 'js',
    miniTitle: 'Object',
  });
  const orphanedSecondaryCollection = CollectionFactory.create('secondary', {
    id: 'js/c/number',
    miniTitle: 'Number',
  });

  const mainPresenter = new SublinkPresenter(mainCollection);
  const primaryPresenter = new SublinkPresenter(primaryCollection);
  const secondaryPresenter = new SublinkPresenter(secondaryCollection);
  const orphanedSecondaryPresenter = new SublinkPresenter(
    orphanedSecondaryCollection
  );

  describe('sublinks', () => {
    it('returns all primary collections for the main collection', () => {
      expect(mainPresenter.sublinks).toEqual([
        {
          title: 'JavaScript',
          url: '/js/p/1',
          selected: false,
        },
        settings.sublinks.moreCollections,
      ]);
    });

    it('returns all children for the primary collection', () => {
      expect(primaryPresenter.sublinks).toEqual([
        { title: 'All', url: '/js/p/1', selected: true },
        { title: 'Array', url: '/js/c/array/p/1', selected: false },
        { title: 'Object', url: '/js/c/object/p/1', selected: false },
      ]);
    });

    it('returns the parent collection sublink for the secondary collection', () => {
      expect(secondaryPresenter.sublinks).toEqual([
        { title: 'All', url: '/js/p/1', selected: false },
        { title: 'Array', url: '/js/c/array/p/1', selected: true },
        { title: 'Object', url: '/js/c/object/p/1', selected: false },
      ]);
    });

    it('returns the parent collection sublink for orphaned secondary collections', () => {
      expect(orphanedSecondaryPresenter.sublinks).toEqual([]);
    });
  });
});
