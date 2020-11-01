import React from 'react';
import Helmet from 'react-helmet';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderConnected } from 'test/utils';
import literals from 'lang/en/settings';
import SettingsPage from './index';

console.warn = jest.fn();

describe('<SettingsPage />', () => {
  let wrapper, shell, store, meta, getByLabelText;

  beforeEach(() => {
    const utils = renderConnected(
      <SettingsPage pageContext={ { stringLiterals: literals } } />
    );
    wrapper = utils.container;
    store = utils.store;
    shell = wrapper.querySelector('.page-container');
    meta = Helmet.peek();
    getByLabelText = utils.getByLabelText;
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper.querySelectorAll('.page-container')).toHaveLength(1);
    });

    it('a PageTitle component', () => {
      expect(wrapper.querySelectorAll('.page-title')).toHaveLength(1);
    });

    it('a SimpleCard component', () => {
      expect(wrapper.querySelectorAll('.card')).toHaveLength(1);
    });
  });

  it('should pass the correct data to the Shell component', () => {
    expect(shell.querySelector('.nav-btn.icon-settings').href.endsWith('/settings')).toBe(false);
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.title).toContain(literals.title);
  });

  describe('when the dark mode toggle is clicked', () => {
    it('changes the dark mode setting', () => {
      fireEvent.click(getByLabelText(literals.settings.darkMode));
      expect(store.getState().shell.isDarkMode).toBe(true);
    });
  });

  describe('when the cookies is clicked', () => {
    it('changes the cookies setting', () => {
      fireEvent.click(getByLabelText(literals.settings.cookies));
      expect(store.getState().shell.acceptsCookies).toBe(true);
    });
  });
});

