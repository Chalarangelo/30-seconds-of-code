import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { act } from 'react-dom/test-utils';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CookieConsentPopup from './index';

configure({ adapter: new Adapter() });

const { store } = createStore();
console.warn = jest.fn();

describe('<CookieConsentPopup />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <CookieConsentPopup />
      </Provider>
    );
  });

  describe('it renders', () => {
    it('the appropriate wrapper element', () => {
      expect(wrapper).toContainMatchingElement('div.cookie-consent-popup');
    });

    it('the cookie disclaimer', () => {
      expect(wrapper).toContainMatchingElement('div > p');
      expect(wrapper).toContainMatchingElement('p a');
    });

    it('the buttons', () => {
      expect(wrapper).toContainMatchingElements(2, 'Button');
    });
  });

  describe('when accept button is clicked', () => {
    it('accepts cookies', () => {
      act(() => {
        wrapper.find('Button').at(0).prop('onClick')({ preventDefault: () => null });
      });
      expect(store.getState().shell.acceptsCookies).toBe(true);
    });
  });

  describe('when decline button is clicked', () => {
    it('declines cookies', () => {
      act(() => {
        wrapper.find('Button').at(1).prop('onClick')({ preventDefault: () => null });
      });
      expect(store.getState().shell.acceptsCookies).toBe(false);
    });
  });

});

