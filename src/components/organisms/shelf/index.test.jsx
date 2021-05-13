import { render, cleanup } from '@testing-library/react';
import Shelf from './index';
import { snippetShelf, collectionShelf } from 'test/fixtures/shelves';

describe('<Shelf />', () => {
  let wrapper, pageTitle;

  afterEach(cleanup);

  describe('snippet shelf', () => {
    beforeEach(() => {
      wrapper = render(<Shelf shelf={snippetShelf} />).container;
      pageTitle = wrapper.querySelector('.page-title');
    });

    describe('should render', () => {
      it('the correct shelf link', () => {
        expect(wrapper.querySelectorAll('a.snippets-shelf-title')).toHaveLength(
          1
        );
      });

      it('a PageTitle component', () => {
        expect(wrapper.querySelectorAll('.page-title')).toHaveLength(1);
      });

      it('the correct shelf', () => {
        expect(wrapper.querySelectorAll('.snippets-shelf-list')).toHaveLength(
          1
        );
      });

      it('the appropriate PreviewCard components', () => {
        expect(wrapper.querySelectorAll('.list-card')).toHaveLength(2);
      });
    });

    it('should pass the listingName to PageTitle', () => {
      expect(pageTitle.textContent).toBe(snippetShelf.shelfName);
    });
  });

  describe('collection shelf', () => {
    beforeEach(() => {
      wrapper = render(<Shelf shelf={collectionShelf} />).container;
      pageTitle = wrapper.querySelector('.page-title');
    });

    describe('should render', () => {
      it('the correct shelf link', () => {
        expect(
          wrapper.querySelectorAll('a.collections-shelf-title')
        ).toHaveLength(1);
      });

      it('a PageTitle component', () => {
        expect(wrapper.querySelectorAll('.page-title')).toHaveLength(1);
      });

      it('the correct shelf', () => {
        expect(
          wrapper.querySelectorAll('.collections-shelf-list')
        ).toHaveLength(1);
      });

      it('the appropriate CollectionChip components', () => {
        expect(wrapper.querySelectorAll('.collection-chip')).toHaveLength(1);
      });
    });

    it('should pass the listingName to PageTitle', () => {
      expect(pageTitle.textContent).toBe(collectionShelf.shelfName);
    });
  });

  describe('with empty list', () => {
    beforeEach(() => {
      wrapper = render(<Shelf shelf={{ ...snippetShelf, shelfData: [] }} />)
        .container;
    });

    it('should not render', () => {
      expect(wrapper.children).toHaveLength(0);
    });
  });
});
