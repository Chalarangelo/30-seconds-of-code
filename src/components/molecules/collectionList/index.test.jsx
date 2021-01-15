import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CollectionList from './index';
import { collectionChip } from 'fixtures/collections';

const listingName = 'Collections';

describe('<CollectionList />', () => {
  let wrapper, pageTitle;

  beforeEach(() => {
    wrapper = render(
      <CollectionList
        chipList={[collectionChip, collectionChip]}
        listingName={listingName}
      />
    ).container;
    pageTitle = wrapper.querySelector('.page-title');
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a PageTitle component', () => {
      expect(wrapper.querySelectorAll('.page-title')).toHaveLength(1);
    });

    it('the appropriate CollectionChip components', () => {
      expect(wrapper.querySelectorAll('.collection-chip')).toHaveLength(2);
    });
  });

  it('should pass the listingName to PageTitle', () => {
    expect(pageTitle.textContent).toBe(listingName);
  });

  describe('with empty list', () => {
    beforeEach(() => {
      wrapper = render(
        <CollectionList chipList={[]} listingName={listingName} />
      ).container;
    });

    it('should not render', () => {
      expect(wrapper.children).toHaveLength(0);
    });
  });
});
