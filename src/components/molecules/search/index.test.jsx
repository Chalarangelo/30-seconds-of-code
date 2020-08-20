import React from 'react';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { renderConnected } from 'test/utils';
import Search from './index';
import { pushNewQuery, initializeIndex } from 'state/search';

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
  let wrapper, store, input, rerender;

  beforeEach(() => {
    const utils = renderConnected(<Search />);
    wrapper = utils.container;
    store = utils.store;
    store.dispatch = jest.fn();
    input = wrapper.querySelector('input');
    rerender = utils.rerenderConnected;
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('input[type="search"]')).toHaveLength(1);
    expect(wrapper.querySelectorAll('a.btn.icon.icon-search.search-btn')).toHaveLength(1);
  });

  describe('on keyUp event', () => {

    it('should call dispatch', () => {
      fireEvent.keyUp(input, { target: { value: 'p'} });
      waitFor(() =>
        expect(store.dispatch.mock.calls.length).toBeGreaterThan(0)
      );
    });
  });

  describe('when entering a keyphrase from non-main search', () => {

    it('should redirect to search', () => {
      fireEvent.keyPress(input, { charCode: 13 });
      expect(window.location.href.indexOf('/search/')).not.toBe(-1);
    });
  });

  describe('when clicked and isMainSearch', () => {
    it('should push the state to history', () => {
      store.dispatch(initializeIndex([]));
      store.dispatch(pushNewQuery('tes'));
      wrapper = rerender(<Search isMainSearch />).container;
      input = wrapper.querySelector('input');
      fireEvent.keyUp(input, { target: { value: 'test'} });
      expect(window.history.pushState.mock.calls.length).toBeGreaterThan(0);
    });
  });
});
