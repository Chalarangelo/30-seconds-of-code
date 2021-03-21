import React from 'react';
import Helmet from 'react-helmet';
import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import literals from 'lang/en/client/notFound';
import NotFoundPage from './index';

console.warn = jest.fn();
console.error = jest.fn();

describe('<NotFoundPage />', () => {
  let wrapper, meta, anchorButton;

  beforeEach(() => {
    wrapper = renderWithContext(<NotFoundPage />).container;
    meta = Helmet.peek();
    anchorButton = wrapper.querySelector('a.btn.btn-home');
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper.querySelectorAll('.page-container')).toHaveLength(1);
    });

    it('a PageBackdrop component', () => {
      expect(wrapper.querySelectorAll('.page-graphic')).toHaveLength(1);
    });

    it('an anchor element', () => {
      expect(wrapper.querySelectorAll('a.btn.btn-home')).toHaveLength(1);
    });
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.title).toContain(literals.pageNotFound);
  });

  it('should pass the correct graphic name to the PageBackdrop component', () => {
    expect(wrapper.querySelectorAll('.page-graphic')).toHaveLength(1);
  });

  it('should pass a link to the anchor button', () => {
    expect(anchorButton.href).not.toBe(undefined);
  });

  it('should pass the correct class to the anchor button', () => {
    expect(anchorButton.className).toContain('btn-home');
  });
});
