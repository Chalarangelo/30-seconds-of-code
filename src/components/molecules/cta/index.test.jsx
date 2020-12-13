import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderConnected } from 'test/utils';
import CTA from './index';
import { decideCookies } from 'state/shell';

console.warn = jest.fn();

global.window = Object.create(window);
global.gtag = Object.create(() => null);
Object.defineProperty(window, 'gtag', {
  value: jest.fn(),
});
Object.defineProperty(window, 'open', {
  value: jest.fn(),
});

describe('<CTA />', () => {
  let wrapper, store;

  beforeEach(() => {
    const utils = renderConnected(<CTA />);
    wrapper = utils.container;
    store = utils.store;
  });

  afterEach(cleanup);

  it('should render a PageBackdrop component', () => {
    expect(wrapper.querySelectorAll('.page-graphic')).toHaveLength(1);
  });

  it('should render an anchor element component with the appropriate class', () => {
    expect(wrapper.querySelectorAll('a.btn')).toHaveLength(1);
  });

  describe('with cookies enabled', () => {
    beforeEach(() => {
      store.dispatch(decideCookies(true));
    });

    it('should call the appropriate functions when the link is clicked', () => {
      fireEvent.click(wrapper.querySelector('a'), {
        target: { href: 'test' },
        preventDefault: () => null,
      });
      expect(window.gtag.mock.calls.length).toBeGreaterThan(0);
      expect(window.open.mock.calls.length).toBeGreaterThan(0);
    });
  });
});
