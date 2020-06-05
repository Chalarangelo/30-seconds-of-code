import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CTA from './index';
import { decideCookies } from 'state/shell';
import { act } from 'react-dom/test-utils';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const { store } = createStore();
global.window = Object.create(window);
global.gtag = Object.create(() => null);
Object.defineProperty(window, 'gtag', {
  value: jest.fn(),
});
Object.defineProperty(window, 'open', {
  value: jest.fn(),
});

describe('<CTA />', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <Provider store={ store }>
        <CTA />
      </Provider>
    );
  });

  it('should render a PageBackdrop component', () => {
    expect(wrapper).toContainMatchingElement('PageBackdrop');
  });

  it('should render an AnchorButton component', () => {
    expect(wrapper).toContainMatchingElement('AnchorButton');
  });

  describe('with cookies enabled', () => {

    beforeAll(() => {
      store.dispatch(decideCookies(true));
      wrapper = mount(
        <Provider store={ store }>
          <CTA />
        </Provider>
      );
    });

    it('should call the appropriate functions when the link is clicked', () => {
      act(() => {
        wrapper.find('Anchor').prop('onClick')({ target: { href: 'test'}, preventDefault: () => null });
      });
      expect(window.gtag.mock.calls.length).toBeGreaterThan(0);
      expect(window.open.mock.calls.length).toBeGreaterThan(0);
    });

  });
});
