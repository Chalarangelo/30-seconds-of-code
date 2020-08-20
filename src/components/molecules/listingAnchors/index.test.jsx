import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ListingAnchors from './index';
import { anchorItems } from 'fixtures/listingAnchors';

console.warn = jest.fn();

describe('<ListingAnchors />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <ListingAnchors items={ anchorItems } />
    ).container;
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a container component', () => {
      expect(wrapper.querySelectorAll('.listing-anchors')).toHaveLength(1);
    });

    it('two anchor buttons', () => {
      expect(wrapper.querySelectorAll('a')).toHaveLength(anchorItems.length);
    });
  });

  describe('compact variant', () => {
    beforeEach(() => {
      wrapper = render(
        <ListingAnchors isCompact items={ anchorItems } />
      ).container;
    });

    describe('should render', () => {
      it('a container component', () => {
        expect(wrapper.querySelectorAll('.listing-anchors.compact')).toHaveLength(1);
      });

      it('two anchor buttons', () => {
        expect(wrapper.querySelectorAll('a')).toHaveLength(anchorItems.length);
      });

      it('a selected anchor', () => {
        expect(wrapper.querySelectorAll('.selected')).toHaveLength(1);
      });
    });
  });
});

