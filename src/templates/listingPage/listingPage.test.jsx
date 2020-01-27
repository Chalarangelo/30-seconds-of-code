import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ListingPage from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const { store } = createStore();

describe('<ListingPage />', () => {
  const logoSrc = '/assets/logo.png';
  const splashLogoSrc = '/assets/splash.png';
  const paginator = {
    totalPages: 7,
    pageNumber: 4,
    baseUrl: '/list',
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
  let wrapper, shell, meta, snippetListComponent;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <ListingPage pageContext={ { logoSrc, splashLogoSrc, snippetList, paginator, listingName } } />
      </Provider>
    );
    shell = wrapper.find('Shell');
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

  it('should pass the correct data to the Shell component', () => {
    expect(shell.prop('logoSrc')).toBe(logoSrc);
    expect(shell.prop('isSearch')).toBe(false);
    expect(shell.prop('isListing')).toBe(true);
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.prop('logoSrc')).toBe(splashLogoSrc);
  });

  it('should pass the correct data to the SnippetList component', () => {
    expect(snippetListComponent.prop('snippetList')).toEqual(snippetList);
    expect(snippetListComponent.prop('listingName')).toEqual(listingName);
    expect(snippetListComponent.prop('paginator')).toEqual(paginator);
  });
});
