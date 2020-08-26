import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderConnected } from 'test/utils';
import Shell from './index';
import { toggleDarkMode } from 'state/shell';

describe('<Shell />', () => {
  let wrapper, pageContainer, store, rerender;
  const innerText = 'Hi there!';

  beforeEach(() => {
    const utils = renderConnected(
      <Shell>
        { innerText }
      </Shell>
    );
    wrapper = utils.container;
    store = utils.store;
    rerender = utils.rerenderConnected;
    pageContainer = wrapper.querySelector('div.page-container');
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('the page container', () => {
      expect(wrapper.querySelectorAll('div.page-container')).toHaveLength(1);
    });

    it('a header component', () => {
      expect(pageContainer.querySelectorAll('header')).toHaveLength(1);
    });

    it('the content container', () => {
      expect(pageContainer.querySelectorAll('div.content')).toHaveLength(1);
    });

    it('a footer component', () => {
      expect(pageContainer.querySelectorAll('footer')).toHaveLength(1);
    });
  });

  it('should render passed children', () => {
    expect(wrapper.textContent).toContain(innerText);
  });

  describe('when on a settings page', () => {

    beforeEach(() => {
      wrapper = rerender(<Shell isSettings/>).container;
      pageContainer = wrapper.querySelector('div.page-container');
    });

    it('should not link to the settings page', () => {
      expect(wrapper.querySelectorAll('a.icon-settings[href="/settings"]')).toHaveLength(0);
    });
  });

  describe('when in dark mode', () => {

    beforeEach(() => {
      store.dispatch(toggleDarkMode(true));
      wrapper = rerender(
        <Shell isSettings>
          { innerText }
        </Shell>
      ).container;
      pageContainer = wrapper.querySelector('div.page-container');
    });

    it('should pass the appropriate class to the container', () => {
      expect(pageContainer.className).toContain('dark');
    });
  });

  describe('when in production without cookies enabled', () => {

    beforeEach(() => {
      wrapper = rerender(
        <Shell isSettings>
          { innerText }
        </Shell>
      ).container;
    });

    it('should render a CookieConsentPopup', () => {
      expect(wrapper.querySelectorAll('.cookie-consent-popup')).toHaveLength(1);
    });
  });
});
