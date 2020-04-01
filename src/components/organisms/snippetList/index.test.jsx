import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SnippetList from './index';
import { paginator } from 'fixtures/paginator';
import { orders } from 'fixtures/sorter';
import { previewSnippet, previewBlogSnippet } from 'fixtures/snippets';
import { anchorItems } from 'fixtures/listingAnchors';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const { store } = createStore();

describe('<SnippetList />', () => {
  const sorter = { orders, selected: 'Popularity' };
  const snippetList = [ previewSnippet, previewBlogSnippet];
  const listingName = 'Snippet list';

  let wrapper, pageTitle, paginate, sort;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <SnippetList
          snippetList={ snippetList }
          paginator={ paginator }
          sorter={ sorter }
          listingName={ listingName }
          listingSublinks={ anchorItems }
        />
      </Provider>
    );
    pageTitle = wrapper.find('PageTitle');
    paginate = wrapper.find('Paginator');
    sort = wrapper.find('Sorter');
  });

  describe('should render', () => {
    it('a PageTitle component', () => {
      expect(wrapper).toContainMatchingElement('PageTitle');
    });

    it('a Paginator component', () => {
      expect(wrapper).toContainMatchingElement('Paginator');
    });

    it('a ListingAnchors component', () => {
      expect(wrapper).toContainMatchingElement('ListingAnchors');
    });

    it('a Sorter component', () => {
      expect(wrapper).toContainMatchingElement('Sorter');
    });

    it('the appropriate PreviewCard components', () => {
      expect(wrapper).toContainMatchingElements(2, 'PreviewCard');
    });

    it('a CTA component', () => {
      expect(wrapper).toContainMatchingElement('CTA');
    });
  });

  it('should pass the listinName to PageTitle', () => {
    expect(pageTitle.prop('children')).toBe(listingName);
  });

  it('should pass the paginator to Paginator', () => {
    expect(paginate.prop('paginator')).toEqual(paginator);
  });

  it('should pass the sorter to sorter', () => {
    expect(sort.prop('sorter')).toEqual(sorter);
  });

  describe('with empty list', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={ store }>
          <SnippetList
            snippetList={ [] }
            paginator={ paginator }
            sorter={ sorter }
            listingName={ listingName }
            listingSublinks={ anchorItems }
          />
        </Provider>
      );
    });

    it('should not render', () => {
      expect(wrapper).toEqual({});
    });
  });

  describe('with empty sublinks', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={ store }>
          <SnippetList
            snippetList={ snippetList }
            paginator={ paginator }
            sorter={ sorter }
            listingName={ listingName }
          />
        </Provider>
      );
    });

    it('should not render a ListingAnchors component', () => {
      expect(wrapper).not.toContainMatchingElement('ListingAnchors');
    });
  });

});
