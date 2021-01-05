import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderConnected } from 'test/utils';
import CookieConsentPopup from './index';

console.warn = jest.fn();
console.error = jest.fn();

describe('<CookieConsentPopup />', () => {
  let wrapper, store;

  beforeEach(() => {
    const utils = renderConnected(<CookieConsentPopup />);
    wrapper = utils.container;
    store = utils.store;
  });

  afterEach(cleanup);

  describe('it renders', () => {
    it('the appropriate wrapper element', () => {
      expect(wrapper.querySelectorAll('div.cookie-consent-popup')).toHaveLength(
        1
      );
    });

    it('the cookie disclaimer', () => {
      expect(wrapper.querySelectorAll('div > p')).toHaveLength(1);
      expect(wrapper.querySelectorAll('p a')).toHaveLength(1);
    });

    it('the buttons', () => {
      expect(wrapper.querySelectorAll('.btn')).toHaveLength(2);
    });
  });

  describe('when accept button is clicked', () => {
    it('accepts cookies', () => {
      fireEvent.click(wrapper.querySelectorAll('.btn')[0], {
        preventDefault: () => null,
      });
      expect(store.getState().shell.acceptsCookies).toBe(true);
    });
  });

  describe('when decline button is clicked', () => {
    it('declines cookies', () => {
      fireEvent.click(wrapper.querySelectorAll('.btn')[1], {
        preventDefault: () => null,
      });
      expect(store.getState().shell.acceptsCookies).toBe(false);
    });
  });
});
