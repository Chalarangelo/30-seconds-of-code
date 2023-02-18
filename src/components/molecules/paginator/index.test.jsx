import { render, cleanup } from '@testing-library/react';
import Paginator from './index';
import { paginator } from 'test/fixtures/paginator';

describe('<Paginator />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<Paginator paginator={paginator} />).container;
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a previous button', () => {
      expect(wrapper.querySelectorAll('.btn.previous-page')).toHaveLength(1);
    });

    it('a next button', () => {
      expect(wrapper.querySelectorAll('.btn.next-page')).toHaveLength(1);
    });

    it('an element for current page', () => {
      expect(wrapper.querySelectorAll('span')).toHaveLength(1);
    });

    it('appropriate buttons for other pages', () => {
      expect(wrapper.querySelectorAll('a.btn')).toHaveLength(4);
    });
  });

  describe('has a rel attribute', () => {
    it('of "prev" for previous button', () => {
      expect(
        wrapper.querySelector('.btn.previous-page').getAttribute('rel')
      ).toBe('prev');
    });

    it('of "next" for next button', () => {
      expect(wrapper.querySelector('.btn.next-page').getAttribute('rel')).toBe(
        'next'
      );
    });
  });
});
