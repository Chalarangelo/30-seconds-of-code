import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import CollectionsPage from './index';
import { collectionChip } from 'fixtures/collections';

describe('<CollectionsPage />', () => {
  const chipList = [collectionChip];
  const listingName = 'Collection list';
  const listingTitle = 'Collection list';
  const pageDescription = 'Browse 20 snippet collections on 30 seconds of code';
  let wrapper;

  beforeEach(() => {
    wrapper = renderWithContext(
      <CollectionsPage
        chipList={chipList}
        listingName={listingName}
        listingTitle={listingTitle}
        pageDescription={pageDescription}
      />
    ).container;
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper.querySelectorAll('.page-container')).toHaveLength(1);
    });

    it('a CollectionList component', () => {
      expect(wrapper.querySelectorAll('.list-section')).toHaveLength(1);
    });
  });

  it('should pass the correct data to the Meta component', () => {
    expect(document.title).toContain(listingName);
  });

  it('should pass the correct data to the CollectionList component', () => {
    expect(
      wrapper.querySelectorAll('.list-section .collection-chip')
    ).toHaveLength(chipList.length);
    expect(wrapper.querySelector('.page-title').textContent).toContain(
      listingTitle
    );
  });
});
