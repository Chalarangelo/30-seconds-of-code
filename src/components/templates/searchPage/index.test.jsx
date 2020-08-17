import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import literals from 'lang/en/client/search';

import SearchPage from './index';
import { pushNewQuery } from 'state/search';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const { store } = createStore();

describe('<SearchPage />', () => {
  let wrapper, shell, meta, search;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <SearchPage pageContext={ { pageDescription: '' } } />
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
    expect(shell.prop('isSearch')).toBe(true);
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.prop('title').indexOf(literals.search)).not.toBe(-1);
  });

  it('should pass the correct data to the Search component', () => {
    expect(search.prop('isMainSearch')).toBe(true);
  });

  describe('with a given search query', () => {

    beforeEach(() => {
      store.dispatch(pushNewQuery('test'));
      wrapper = mount(
        <Provider store={ store }>
          <SearchPage pageContext={ { pageDescription: '' } } />
        </Provider>
      );
      meta = wrapper.find('Meta');
    });

    it('should pass the correct title to the Meta component', () => {
      expect(meta.prop('title').indexOf(literals.resultsFor('test'))).not.toBe(-1);
    });
  });
});

