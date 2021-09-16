import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import CollectionsPage from './index';
import { collectionChip } from 'test/fixtures/collections';

describe('<CollectionsPage />', () => {
  const chipList = [collectionChip, collectionChip];
  const listingName = 'Collection list';
  const listingTitle = 'Collection list';
  const pageDescription = 'Browse 20 snippet collections on 30 seconds of code';
  let wrapper, pageTitle;

  beforeEach(() => {
    wrapper = renderWithContext(
      <CollectionsPage
        chipList={chipList}
        listingName={listingName}
        listingTitle={listingTitle}
        pageDescription={pageDescription}
      />
    ).container;
    pageTitle = wrapper.querySelector('.page-title');
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper.querySelectorAll('.page-container')).toHaveLength(1);
    });

    it('a PageTitle component', () => {
      expect(wrapper.querySelectorAll('.page-title')).toHaveLength(1);
    });

    it('the appropriate PreviewCard components', () => {
      expect(wrapper.querySelectorAll('.list-card')).toHaveLength(2);
    });

    it('a CollectionList component', () => {
      expect(wrapper.querySelectorAll('.list-section')).toHaveLength(1);
    });
  });

  it('should pass the correct data to the Meta component', () => {
    expect(document.title).toContain(listingName);
  });

  it('should pass the listingName to PageTitle', () => {
    expect(pageTitle.textContent).toBe(listingName);
  });
});
