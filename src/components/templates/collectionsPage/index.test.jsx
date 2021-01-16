import React from 'react';
import Helmet from 'react-helmet';
import { cleanup } from '@testing-library/react';
import { renderConnected } from 'test/utils';
import CollectionsPage from './index';
import { collectionChip } from 'fixtures/collections';

console.warn = jest.fn();
console.error = jest.fn();

describe('<CollectionsPage />', () => {
  const chipList = [collectionChip];
  const listingName = 'Collection list';
  const listingTitle = 'Collection list';
  const pageDescription = 'Browse 20 snippet collections on 30 seconds of code';
  let wrapper, meta;

  beforeEach(() => {
    wrapper = renderConnected(
      <CollectionsPage
        pageContext={{
          chipList,
          listingName,
          listingTitle,
          pageDescription,
        }}
      />
    ).container;
    meta = Helmet.peek();
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper.querySelectorAll('.page-container')).toHaveLength(1);
    });

    it('a CollectionList component', () => {
      expect(wrapper.querySelectorAll('.collection-list')).toHaveLength(1);
    });
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.title).toContain(listingName);
  });

  it('should pass the correct data to the CollectionList component', () => {
    expect(
      wrapper.querySelectorAll('.collection-list .collection-chip')
    ).toHaveLength(chipList.length);
    expect(wrapper.querySelector('.page-title').textContent).toContain(
      listingTitle
    );
  });
});
