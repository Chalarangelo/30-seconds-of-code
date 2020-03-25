import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Paginator from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<Paginator />', () => {
  const pageNumber = 3, totalPages = 7, baseUrl = '/list';
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Paginator paginator={ {
        pageNumber,
        totalPages,
        baseUrl,
      } } />);
  });

  describe('should render', () => {
    it('a previous button', () => {
      expect(wrapper).toContainMatchingElement('.btn.previous-page');
    });

    it('a next button', () => {
      expect(wrapper).toContainMatchingElement('.btn.next-page');
    });

    it('a button for current page', () => {
      expect(wrapper).toContainMatchingElement('.btn.current-page');
    });
  });

  describe('with first page as current', () => {
    beforeEach(() => {
      wrapper = mount(
        <Paginator paginator={ {
          pageNumber: 1,
          totalPages,
          baseUrl,
        } } />);
    });

    describe('should render', () => {
      it('not a previous button', () => {
        expect(wrapper).not.toContainMatchingElement('.btn.previous-page');
      });

      it('appropriate buttons for next and other pages', () => {
        expect(wrapper).toContainMatchingElements(3, 'a.btn');
      });
    });
  });

  describe('with last page as current', () => {
    beforeEach(() => {
      wrapper = mount(
        <Paginator paginator={ {
          pageNumber: totalPages,
          totalPages,
          baseUrl,
        } } />);
    });

    describe('should render', () => {
      it('not a next button', () => {
        expect(wrapper).not.toContainMatchingElement('.btn.next-page');
      });

      it('appropriate buttons for next and other pages', () => {
        expect(wrapper).toContainMatchingElements(3, 'a.btn');
      });
    });
  });

});

