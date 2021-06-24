import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import literals from 'lang/en/client/search';
import SearchPage from './index';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
useRouter.mockImplementation(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  pathname: '/',
  query: {},
  basePath: '/',
}));

describe('<SearchPage />', () => {
  let wrapper;

  beforeEach(() => {
    const utils = renderWithContext(<SearchPage pageDescription='' />);
    wrapper = utils.container;
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
    expect(document.title).toContain(literals.search);
  });
});
