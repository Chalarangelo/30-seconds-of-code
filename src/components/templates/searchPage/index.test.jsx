import React from 'react';
import Helmet from 'react-helmet';
import { cleanup } from '@testing-library/react';
import { renderConnected } from 'test/utils';
import literals from 'lang/en/client/search';
import SearchPage from './index';

console.warn = jest.fn();
console.error = jest.fn();

describe('<SearchPage />', () => {
  let wrapper, meta;

  beforeEach(() => {
    const utils = renderConnected(
      <SearchPage pageContext={{ pageDescription: '' }} />
    );
    wrapper = utils.container;
    meta = Helmet.peek();
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper.querySelectorAll('.page-container')).toHaveLength(1);
    });

    it('a Search component', () => {
      expect(wrapper.querySelectorAll('input[type="search"]')).toHaveLength(1);
    });

    it('a SearchResults component', () => {
      expect(wrapper.querySelectorAll('.search-page-text')).toHaveLength(1);
    });
  });

  it('should pass the correct data to the Meta component', () => {
    expect(meta.title).toContain(literals.search);
  });
});
