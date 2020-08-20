import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Paginator from './index';

console.warn = jest.fn();

describe('<Paginator />', () => {
  const pageNumber = 3, totalPages = 7, baseUrl = '/list';
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <Paginator paginator={ {
        pageNumber,
        totalPages,
        baseUrl,
      } }
      />
    ).container;
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a previous button', () => {
      expect(wrapper.querySelectorAll('.btn.previous-page')).toHaveLength(1);
    });

    it('a next button', () => {
      expect(wrapper.querySelectorAll('.btn.next-page')).toHaveLength(1);
    });

    it('a button for current page', () => {
      expect(wrapper.querySelectorAll('.btn.current-page')).toHaveLength(1);
    });
  });

  describe('with first page as current', () => {
    beforeEach(() => {
      wrapper = render(
        <Paginator paginator={ {
          pageNumber: 1,
          totalPages,
          baseUrl,
        } }
        />
      ).container;
    });

    describe('should render', () => {
      it('not a previous button', () => {
        expect(wrapper.querySelectorAll('.btn.previous-page')).toHaveLength(0);
      });

      it('appropriate buttons for next and other pages', () => {
        expect(wrapper.querySelectorAll('a.btn')).toHaveLength(3);
      });
    });
  });

  describe('with last page as current', () => {
    beforeEach(() => {
      wrapper = render(
        <Paginator paginator={ {
          pageNumber: totalPages,
          totalPages,
          baseUrl,
        } }
        />
      ).container;
    });

    describe('should render', () => {
      it('not a next button', () => {
        expect(wrapper.querySelectorAll('.btn.next-page')).toHaveLength(0);
      });

      it('appropriate buttons for next and other pages', () => {
        expect(wrapper.querySelectorAll('a.btn')).toHaveLength(3);
      });
    });
  });

  describe('with three or fewer buttons', () => {
    beforeEach(() => {
      wrapper = render(
        <Paginator paginator={ {
          pageNumber: 1,
          totalPages: 2,
          baseUrl,
        } }
        />
      ).container;
    });

    it('should render the correct buttons', () => {
      expect(wrapper.querySelectorAll('a.btn')).toHaveLength(2);
    });
  });

  describe('with only one button', () => {
    beforeEach(() => {
      wrapper = render(
        <Paginator paginator={ {
          pageNumber: 1,
          totalPages: 1,
          baseUrl,
        } }
        />
      ).container;
    });

    it('should not render', () => {
      expect(wrapper.querySelectorAll('a.btn')).toHaveLength(0);
    });
  });
});

