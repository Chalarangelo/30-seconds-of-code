import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import Search from './index';

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
  let wrapper, input;

  beforeEach(() => {
    const utils = renderWithContext(<Search />);
    wrapper = utils.container;
    input = wrapper.querySelector('input');
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('input[type="search"]')).toHaveLength(1);
    expect(
      wrapper.querySelectorAll('a.btn.icon.icon-search.search-btn')
    ).toHaveLength(1);
  });

  describe('when entering a keyphrase from non-main search', () => {
    it('should redirect to search', () => {
      fireEvent.keyPress(input, { charCode: 13 });
      expect(window.location.href.indexOf('/search/')).not.toBe(-1);
    });
  });

  describe('when clicked and isMainSearch', () => {
    it('should push the state to history', () => {
      wrapper = renderWithContext(<Search isMainSearch />, {
        initialState: {
          search: {
            searchQuery: 'tes',
            searchIndex: [],
          },
        },
      }).container;
      input = wrapper.querySelector('input');
      fireEvent.keyUp(input, { target: { value: 'test' } });
      expect(window.history.pushState.mock.calls.length).toBeGreaterThan(0);
    });
  });
});
