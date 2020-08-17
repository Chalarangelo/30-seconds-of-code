import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ListingPage from './index';
import { previewSnippet, previewBlogSnippet } from 'fixtures/snippets';
import { paginator, firstPagePaginator } from 'fixtures/paginator';
import { orders } from 'fixtures/sorter';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const { store } = createStore();

describe('<ListingPage />', () => {
  const snippetList = [ previewSnippet, previewBlogSnippet ];
  const listingName = 'Snippet list';
  const listingTitle = 'Snippet list';
  const pageDescription = 'Browse 100 snippets on 30 seconds of code';
  let wrapper, meta, snippetListComponent;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
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
      </Provider>
    );
    meta = wrapper.find('Meta');
    snippetListComponent = wrapper.find('SnippetList');
  });

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper).toContainMatchingElement('Shell');
    });

    it('a Meta component', () => {
      expect(wrapper).toContainMatchingElement('Meta');
    });

    it('a SnippetList component', () => {
      expect(wrapper).toContainMatchingElement('SnippetList');
    });
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.prop('title')).toBe(listingName);
    expect(meta.prop('description')).toBe(pageDescription);
  });

  it('should pass the correct data to the SnippetList component', () => {
    expect(snippetListComponent.prop('snippetList')).toEqual(snippetList);
    expect(snippetListComponent.prop('listingName')).toEqual(listingTitle);
    expect(snippetListComponent.prop('paginator')).toEqual(paginator);
  });

  describe('when is first page', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={ store }>
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
          } } />
        </Provider>
      );
      meta = wrapper.find('Meta');
      snippetListComponent = wrapper.find('SnippetList');
    });

    it('should render the home title', () => {
      expect(wrapper).toContainMatchingElement('h1.home-title');
    });
  });
});
