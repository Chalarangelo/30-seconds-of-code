import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SnippetList from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const { store } = createStore();

describe('<SnippetList />', () => {
  const paginator = {
    totalPages: 7,
    pageNumber: 4,
    baseUrl: '/list',
  };
  const sorter = {
    orders: [
      {title: 'Popularity', url: '/list/p/1'},
      {title: 'Expertise', url: '/list/e/1'},
    ],
    selected: 'Popularity',
  };
  const snippetList = [
    {
      title: 'compose',
      language: 'JavaScript',
      primaryTag: 'function',
      expertise: 'Intermediate',
      description: '<p>Performs right-to-left function composition.</p>',
      url: 'snippets/compose',
    },
  ];
  const listingName = 'Snippet list';

  let wrapper, pageTitle, paginate;

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
    pageTitle = wrapper.find('PageTitle');
    paginate = wrapper.find('Paginator');
  });

  describe('should render', () => {
    it('a PageTitle component', () => {
      expect(wrapper).toContainMatchingElement('PageTitle');
    });

    it('a Paginator component', () => {
      expect(wrapper).toContainMatchingElement('Paginator');
    });

    it('a PreviewCard component', () => {
      expect(wrapper).toContainMatchingElement('PreviewCard');
    });
  });

  it('should pass the listinName to PageTitle', () => {
    expect(pageTitle.prop('children')).toBe(listingName);
  });

  it('should pass the paginator to Paginator', () => {
    expect(paginate.prop('paginator')).toEqual(paginator);
  });

});
