import React from 'react';
import Helmet from 'react-helmet';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import literals from 'lang/en/settings';
import SettingsPage from './index';

console.warn = jest.fn();
console.error = jest.fn();

describe('<SettingsPage />', () => {
  let wrapper, shell, store, meta, getByLabelText;

  beforeEach(() => {
    const utils = renderWithContext(
      <SettingsPage pageContext={{ stringLiterals: literals }} />
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
    expect(
      shell.querySelector('.nav-btn.icon-settings').href.endsWith('/settings')
    ).toBe(false);
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.title).toContain(literals.title);
  });
});
