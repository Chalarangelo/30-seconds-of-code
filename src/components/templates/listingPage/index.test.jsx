import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import ListingPage from './index';
import SnippetFactory from 'test/fixtures/factories/snippet';
import PaginatorFactory from 'test/fixtures/factories/paginator';

const paginator = PaginatorFactory.create('Paginator');

describe('<ListingPage />', () => {
  const snippetList = SnippetFactory.createMany('PreviewSnippet', 2);
  const listingName = 'Snippet list';
  const listingTitle = 'Snippet list';
  const pageDescription = 'Browse 100 snippets on 30 seconds of code';
  let wrapper;

  beforeEach(() => {
    wrapper = renderWithContext(
      <ListingPage
        snippetList={snippetList}
        paginator={paginator}
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

    it('a SnippetList component', () => {
      expect(wrapper.querySelectorAll('.list-section')).toHaveLength(1);
    });
  });

  it('should pass the correct data to the Meta component', () => {
    expect(document.title).toContain(listingName);
  });

  it('should pass the correct data to the SnippetList component', () => {
    expect(wrapper.querySelectorAll('.list-section .list-card')).toHaveLength(
      snippetList.length
    );
    expect(wrapper.querySelector('.page-title').textContent).toContain(
      listingTitle
    );
  });
});
