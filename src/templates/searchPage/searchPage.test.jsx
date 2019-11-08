import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import _ from 'lang';
const _l = _('en');

import SearchPage from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const { store } = createStore();

describe('<SearchPage />', () => {
  const logoSrc = '/assets/logo.png';
  let wrapper, shell, meta, search;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <SearchPage pageContext={ { logoSrc } } />
      </Provider>
    );
    shell = wrapper.find('Shell');
    meta = wrapper.find('Meta');
    search = wrapper.find('Search');
  });

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper).toContainMatchingElement('Shell');
    });

    it('a Meta component', () => {
      expect(wrapper).toContainMatchingElement('Meta');
    });

    it('a Search component', () => {
      expect(wrapper).toContainMatchingElement('Search');
    });

    it('a SearchResults component', () => {
      expect(wrapper).toContainMatchingElement('SearchResults');
    });
  });

  it('should pass the correct data to the Shell component', () => {
    expect(shell.prop('logoSrc')).toBe(logoSrc);
    expect(shell.prop('isSearch')).toBe(true);
    expect(shell.prop('isListing')).toBe(false);
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.prop('logoSrc')).toBe(logoSrc);
    expect(meta.prop('title')).not.toBe(undefined);
  });

  it('should pass the correct data to the Search component', () => {
    expect(search.prop('shouldUpdateHistory')).toBe(true);
  });
});

