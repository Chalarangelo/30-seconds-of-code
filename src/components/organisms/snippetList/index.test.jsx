import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import SnippetList from './index';
import { paginator } from 'fixtures/paginator';
import { orders } from 'fixtures/sorter';
import { previewSnippet, previewBlogSnippet } from 'fixtures/snippets';
import { anchorItems } from 'fixtures/listingAnchors';

console.warn = jest.fn();
console.error = jest.fn();

describe('<SnippetList />', () => {
  const sorter = { orders, selected: 'Popularity' };
  const snippetList = [previewSnippet, previewBlogSnippet];
  const listingName = 'Snippet list';

  let wrapper, pageTitle, paginate, sort;

  beforeEach(() => {
    wrapper = renderWithContext(
      <SnippetList
        snippetList={snippetList}
        paginator={paginator}
        sorter={sorter}
        listingName={listingName}
        listingSublinks={anchorItems}
      />
    ).container;
    pageTitle = wrapper.querySelector('.page-title');
    paginate = wrapper.querySelector('.paginator');
    sort = wrapper.querySelector('.sorter');
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

    it('a Sorter component', () => {
      expect(wrapper.querySelectorAll('.sorter')).toHaveLength(1);
    });

    it('the appropriate PreviewCard components', () => {
      expect(wrapper.querySelectorAll('.preview-card')).toHaveLength(2);
    });
  });

  it('should pass the listingName to PageTitle', () => {
    expect(pageTitle.textContent).toBe(listingName);
  });

  it('should pass the paginator to Paginator', () => {
    expect(paginate.querySelector('.current-page').textContent).toEqual(
      `${paginator.pageNumber}`
    );
  });

  it('should pass the sorter to sorter', () => {
    expect(sort.querySelectorAll('a')[0].textContent).toEqual('Popularity');
  });

  describe('with empty list', () => {
    beforeEach(() => {
      wrapper = renderWithContext(
        <SnippetList
          snippetList={[]}
          paginator={paginator}
          sorter={sorter}
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
          sorter={sorter}
          listingName={listingName}
        />
      ).container;
    });

    it('should not render a ListingAnchors component', () => {
      expect(wrapper.querySelectorAll('.listing-anchors')).toHaveLength(0);
    });
  });

  describe('with a single sorting order', () => {
    beforeEach(() => {
      wrapper = renderWithContext(
        <SnippetList
          snippetList={snippetList}
          paginator={paginator}
          sorter={{ orders: orders.slice(0, 1), selected: 'Popularity' }}
          listingName={listingName}
        />
      ).container;
      pageTitle = wrapper.querySelector('.page-title');
    });

    it('should not add the sorter styles to PageTitle', () => {
      expect(pageTitle.className).not.toContain('with-sorter');
    });
  });
});
