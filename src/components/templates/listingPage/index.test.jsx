import React from 'react';
import Helmet from 'react-helmet';
import { cleanup } from '@testing-library/react';
import { renderConnected } from 'test/utils';
import ListingPage from './index';
import { previewSnippet, previewBlogSnippet } from 'fixtures/snippets';
import { paginator, firstPagePaginator } from 'fixtures/paginator';
import { orders } from 'fixtures/sorter';

console.warn = jest.fn();

describe('<ListingPage />', () => {
  const snippetList = [ previewSnippet, previewBlogSnippet ];
  const listingName = 'Snippet list';
  const listingTitle = 'Snippet list';
  const pageDescription = 'Browse 100 snippets on 30 seconds of code';
  let wrapper, meta;

  beforeEach(() => {
    wrapper = renderConnected(
      <ListingPage pageContext={ {
        snippetList,
        paginator,
        sorter: {
          orders,
          selected: 'Popularity',
        },
        listingName,
        listingTitle,
        pageDescription,
      } } />
    ).container;
    meta = Helmet.peek();
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper.querySelectorAll('.page-container')).toHaveLength(1);
    });

    it('a SnippetList component', () => {
      expect(wrapper.querySelectorAll('.snippet-list')).toHaveLength(1);
    });
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.title).toContain(listingName);
  });

  it('should pass the correct data to the SnippetList component', () => {
    expect(wrapper.querySelectorAll('.snippet-list .preview-card')).toHaveLength(snippetList.length);
    expect(wrapper.querySelector('.page-title').textContent).toContain(listingTitle);
  });

  describe('when is first page', () => {
    beforeEach(() => {
      wrapper = renderConnected(
        <ListingPage pageContext={ {
          snippetList,
          paginator: firstPagePaginator,
          sorter: {
            orders,
            selected: 'Popularity',
          },
          listingName,
          listingTitle,
          listingType: 'main',
          pageDescription,
        } }
        />
      ).container;
    });

    it('should render the home title', () => {
      expect(wrapper.querySelectorAll('h1.home-title')).toHaveLength(1);
    });
  });
});
