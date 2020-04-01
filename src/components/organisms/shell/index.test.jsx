import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Shell from './index';
import { toggleDarkMode } from 'state/shell';
import * as env from '../../../../.build/env';

configure({ adapter: new Adapter() });

const { store } = createStore();

describe('<Shell />', () => {
  const logoSrc = '/assets/logo.png';
  let wrapper, pageContainer;
  const innerText = 'Hi there!';

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <Shell
          logoSrc={ logoSrc }
        >
          { innerText }
        </Shell>
      </Provider>
    );
    pageContainer = wrapper.find('div.page-container');
  });

  describe('should render', () => {
    it('the page container', () => {
      expect(wrapper).toContainMatchingElement('div.page-container');
    });

    it('a header component', () => {
      expect(pageContainer).toContainMatchingElement('header');
    });

    it('the content container', () => {
      expect(pageContainer).toContainMatchingElement('div.content');
    });

    it('a footer component', () => {
      expect(pageContainer).toContainMatchingElement('footer');
    });
  });

  it('should render passed children', () => {
    expect(wrapper.text()).toContain(innerText);
  });

  describe('when on a settings page', () => {

    beforeEach(() => {
      wrapper = mount(
        <Provider store={ store }>
          <Shell
            logoSrc={ logoSrc }
            isSettings
          >
            { innerText }
          </Shell>
        </Provider>
      );
      pageContainer = wrapper.find('div.page-container');
    });

    it('should not link to the settings page', () => {
      expect(wrapper).not.toContainMatchingElement('a.icon-settings[href="/settings"]');
    });
  });

  describe('when in dark mode', () => {

    beforeEach(() => {
      store.dispatch(toggleDarkMode(true));
      wrapper = mount(
        <Provider store={ store }>
          <Shell
            logoSrc={ logoSrc }
            isSettings
          >
            { innerText }
          </Shell>
        </Provider>
      );
      pageContainer = wrapper.find('div.page-container');
    });

    it('should pass the appropriate class to the container', () => {
      expect(pageContainer.prop('className').indexOf('dark')).not.toBe(-1);
    });
  });

  describe('when in production without cookies enabled', () => {

    beforeEach(() => {
      env.default = 'PRODUCTION';
      wrapper = mount(
        <Provider store={ store }>
          <Shell
            logoSrc={ logoSrc }
            isSettings
          >
            { innerText }
          </Shell>
        </Provider>
      );
    });

    it('should render a CookieConsentPopup', () => {
      expect(wrapper).toContainMatchingElement('CookieConsentPopup');
    });
  });
});
