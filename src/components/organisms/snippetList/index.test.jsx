import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import SnippetList from './index';
import { anchorItems } from 'test/fixtures/listingAnchors';
import SnippetFactory from 'test/fixtures/factories/snippet';
import PaginatorFactory from 'test/fixtures/factories/paginator';

const paginator = PaginatorFactory.create('Paginator');

describe('<SnippetList />', () => {
  const snippetList = SnippetFactory.createMany('PreviewSnippet', 2);
  const listingName = 'Snippet list';

  let wrapper, pageTitle, paginate;

  beforeEach(() => {
    wrapper = renderWithContext(
      <SnippetList
        snippetList={snippetList}
        paginator={paginator}
        listingName={listingName}
        listingSublinks={anchorItems}
      />
    ).container;
    pageTitle = wrapper.querySelector('.page-title');
    paginate = wrapper.querySelector('.paginator');
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a PageTitle component', () => {
      expect(wrapper.querySelectorAll('.page-title')).toHaveLength(1);
    });

    it('a Paginator component', () => {
      expect(wrapper.querySelectorAll('.paginator')).toHaveLength(1);
    });

    it('a ListingAnchors component', () => {
      expect(wrapper.querySelectorAll('.listing-anchors')).toHaveLength(1);
    });

    it('the appropriate PreviewCard components', () => {
      expect(wrapper.querySelectorAll('.list-card')).toHaveLength(2);
    });
  });

  it('should pass the listingName to PageTitle', () => {
    expect(pageTitle.textContent).toBe(listingName);
  });

  it('should pass the paginator to Paginator', () => {
    expect(paginate.querySelector('span').textContent).toEqual(
      `${paginator.pageNumber}`
    );
  });

  describe('with empty list', () => {
    beforeEach(() => {
      wrapper = renderWithContext(
        <SnippetList
          snippetList={[]}
          paginator={paginator}
          listingName={listingName}
          listingSublinks={anchorItems}
        />
      ).container;
    });

    it('should not render', () => {
      expect(wrapper.children).toHaveLength(0);
    });
  });

  describe('with empty sublinks', () => {
    beforeEach(() => {
      wrapper = renderWithContext(
        <SnippetList
          snippetList={snippetList}
          paginator={paginator}
          listingName={listingName}
        />
      ).container;
    });

    it('should not render a ListingAnchors component', () => {
      expect(wrapper.querySelectorAll('.listing-anchors')).toHaveLength(0);
    });
  });
});
