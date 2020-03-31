import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';

import Search from './index';

import { pushNewQuery, finishIndexFetch } from 'state/search';

configure({ adapter: new Adapter() });

const { store } = createStore();
global.window = Object.create(window);
Object.defineProperty(window, 'location', {
  value: {
    href: 'https://localhost/',
  },
});
Object.defineProperty(window, 'history', {
  value: {
    replaceState: jest.fn(),
    pushState: jest.fn(),
  },
});

describe('<Search />', () => {

  let wrapper;
  store.dispatch = jest.fn();
  let input;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <Search />
      </Provider>
    );
    input = wrapper.find('input');
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('input[type="search"]');
    expect(wrapper).toContainMatchingElement('a.icon.icon-search.search-btn');
  });

  describe('with passed id and className', () => {
    const className = 'my-search';
    const id = 'the-search';

    beforeEach(() => {
      wrapper = mount(
        <Provider store={ store }>
          <Search className={ className } id={ id } />
        </Provider>
      );
      input = wrapper.find('input');
    });

    it('should pass className to the input element', () => {
      expect(input.prop('className')).toBe(`search-box ${className}`);
    });

    it('should pass id to the input element', () => {
      expect(input.prop('id')).toBe(id);
    });
  });

  describe('on keyUp event', () => {

    it('should call dispatch', () => {
      act(() => {
        input.prop('onKeyUp')({ target: { value: 'p'} });
        expect(store.dispatch.mock.calls.length).toBeGreaterThan(0);
      });
    });
  });

  describe('when entering a keyphrase from non-main search', () => {

    it('should redirect to search', () => {
      act(() => {
        input.prop('onKeyPress')({ charCode: 13 });
      });
      expect(window.location.href.indexOf('/search/')).not.toBe(-1);
    });
  });

  describe('when clicked and isMainSearch', () => {
    it('should push the state to history', () => {
      act(() => {
        store.dispatch(finishIndexFetch([]));
        store.dispatch(pushNewQuery('tes'));
        wrapper = mount(
          <Provider store={ store }>
            <Search isMainSearch />
          </Provider>
        );
        input = wrapper.find('input');
        input.prop('onKeyUp')({ target: { value: 'test'} });
      });
      expect(window.history.pushState.mock.calls.length).toBeGreaterThan(0);
    });
  });
});
