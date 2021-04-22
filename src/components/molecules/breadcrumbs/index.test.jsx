import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Breadcrumbs from './index';
import { breadcrumbs } from 'fixtures/breadcrumbs';

describe('<Breadcrumbs />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<Breadcrumbs breadcrumbs={breadcrumbs} />).container;
  });

  afterEach(cleanup);

  describe('it renders', () => {
    it('the appropriate wrapper element', () => {
      expect(wrapper.querySelectorAll('.breadcrumbs')).toHaveLength(1);
    });

    it('an appropriate element for each breadcrumb', () => {
      expect(wrapper.querySelectorAll('.breadcrumb-item')).toHaveLength(
        breadcrumbs.length
      );
    });

    it('the breadcrumb links', () => {
      expect(wrapper.querySelectorAll('.breadcrumb-item > a')).toHaveLength(
        breadcrumbs.length
      );
    });
  });

  describe('accessibility', () => {
    it('uses an appropriate aria-label', () => {
      expect(
        wrapper.querySelectorAll('nav[aria-label="breadcrumbs"]')
      ).toHaveLength(1);
    });

    it('uses an appropriate aria-current', () => {
      expect(
        wrapper.querySelectorAll(
          '.breadcrumb-item:last-of-type > a[aria-current="page"]'
        )
      ).toHaveLength(1);
    });
  });
});
