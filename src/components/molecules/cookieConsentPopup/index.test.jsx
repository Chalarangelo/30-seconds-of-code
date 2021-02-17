import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import CookieConsentPopup from './index';

console.warn = jest.fn();
console.error = jest.fn();

describe('<CookieConsentPopup />', () => {
  let wrapper;

  beforeEach(() => {
    const utils = renderWithContext(<CookieConsentPopup />);
    wrapper = utils.container;
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

  describe('with cookies accepted', () => {
    beforeEach(() => {
      const utils = renderWithContext(<CookieConsentPopup />, {
        initialState: { shell: { acceptsCookies: true } },
      });
      wrapper = utils.container;
    });

    it('does not render', () => {
      expect(wrapper.querySelectorAll('div.cookie-consent-popup')).toHaveLength(
        1
      );
    });
  });

  describe('with cookies declined', () => {
    beforeEach(() => {
      const utils = renderWithContext(<CookieConsentPopup />, {
        initialState: { shell: { acceptsCookies: false } },
      });
      wrapper = utils.container;
    });

    it('does not render', () => {
      expect(wrapper.querySelectorAll('div.cookie-consent-popup')).toHaveLength(
        1
      );
    });
  });
});
