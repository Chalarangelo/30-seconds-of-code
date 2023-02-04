import { render, cleanup } from '@testing-library/react';
import ListingChips from './index';
import { chipItems } from 'test/fixtures/listingChips';

describe('<ListingChips />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<ListingChips items={chipItems} />).container;
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a container component', () => {
      expect(wrapper.querySelectorAll('.listing-chips')).toHaveLength(1);
    });

    it('two anchor buttons', () => {
      expect(wrapper.querySelectorAll('a')).toHaveLength(chipItems.length);
    });

    it('a selected anchor', () => {
      expect(wrapper.querySelectorAll('.selected')).toHaveLength(1);
    });
  });
});
