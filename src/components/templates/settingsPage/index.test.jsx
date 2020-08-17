import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import createStore from 'state';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import literals from 'lang/en/settings';

import SettingsPage from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

const { store } = createStore();

describe('<SettingsPage />', () => {
  let wrapper, shell, meta;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <SettingsPage pageContext={ { stringLiterals: literals } } />
      </Provider>
    );
    shell = wrapper.find('Shell');
    meta = wrapper.find('Meta');
  });

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper).toContainMatchingElement('Shell');
    });

    it('a Meta component', () => {
      expect(wrapper).toContainMatchingElement('Meta');
    });

    it('a PageTitle component', () => {
      expect(wrapper).toContainMatchingElement('PageTitle');
    });

    it('a SimpleCard components', () => {
      expect(wrapper).toContainMatchingElement('SimpleCard');
    });
  });

  it('should pass the correct data to the Shell component', () => {
    expect(shell.prop('isSettings')).toBe(true);
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.prop('title')).toBe(literals.title);
  });

  describe('when the dark mode toggle is clicked', () => {
    it('changes the dark mode setting', () => {
      act(() => {
        wrapper.find(`Toggle[children="${literals.settings.darkMode}"]`).prop('onChange')();
      });
      expect(store.getState().shell.isDarkMode).toBe(true);
    });
  });

  describe('when the github links is clicked', () => {
    it('changes the dark mode setting', () => {
      act(() => {
        wrapper.find(`Toggle[children="${literals.settings.githubLinks}"]`).prop('onChange')();
      });
      expect(store.getState().shell.hasGithubLinksEnabled).toBe(true);
    });
  });

  describe('when the cookies is clicked', () => {
    it('changes the cookies setting', () => {
      act(() => {
        wrapper.find(`Toggle[children="${literals.settings.cookies}"]`).prop('onChange')();
      });
      expect(store.getState().shell.acceptsCookies).toBe(true);
    });
  });
});

