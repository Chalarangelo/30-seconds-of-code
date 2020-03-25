import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavBar from './index';

configure({ adapter: new Adapter() });

const { store } = createStore();

describe('<NavBar />', () => {
  let wrapper, websiteLogoBtn, searchBar, settingsBtn;
  const homeLink = {
    internal: true,
    url: '/',
  };
  const settingsLink = {
    internal: true,
    url: '/settings/',
  };
  const logoSrc = '/my-logo.png';

  beforeAll(() => {
    wrapper = mount(
      <Provider store={ store }>
        <NavBar
          logoSrc={ logoSrc }
          homeLink={ homeLink }
          settingsLink={ settingsLink }
        />
      </Provider>
    );
    websiteLogoBtn = wrapper.find('.nav-btn:not(.icon)');
    searchBar = wrapper.find('.search-box');
    settingsBtn = wrapper.find('.nav-btn.icon-settings');
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('header.nav-bar');
  });

  it('should render the website logo', () => {
    expect(wrapper).toContainMatchingElement('.nav-btn .nav-website-logo');
  });

  it('should render the search bar', () => {
    expect(wrapper).toContainMatchingElement('.search-box');
  });

  it('should render the settings button', () => {
    expect(wrapper).toContainMatchingElement('.nav-btn.icon-settings');
  });

  it('should render the correct website logo', () => {
    expect(websiteLogoBtn.find('img').prop('src')).toBe(logoSrc);
  });

  it('should link to the correct home URL', () => {
    expect(websiteLogoBtn.find('a').prop('href')).toBe(homeLink.url);
  });

  it('should have the correct type of search box', () => {
    expect(searchBar.prop('isMainSearch')).not.toBe(true);
  });

  it('should link to the correct settings URL', () => {
    expect(settingsBtn.find('a').prop('href')).toBe(settingsLink.url);
  });

  describe('when hasMainSearch is true', () => {
    beforeAll(() => {
      wrapper = mount(
        <Provider store={ store }>
          <NavBar
            logoSrc={ logoSrc }
            homeLink={ homeLink }
            settingsLink={ settingsLink }
            hasMainSearch
          />
        </Provider>
      );
      searchBar = wrapper.find('Search');
    });

    it('should have the correct type of search box', () => {
      expect(searchBar.prop('isMainSearch')).toBe(true);
    });
  });
});

