import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ListingAnchors from './index';

import { anchorItems } from 'fixtures/listingAnchors';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<ListingAnchors />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ListingAnchors items={ anchorItems } />);
  });

  describe('should render', () => {
    it('a container component', () => {
      expect(wrapper).toContainMatchingElement('.listing-anchors');
    });

    it('two anchor buttons', () => {
      expect(wrapper).toContainMatchingElements(anchorItems.length, 'a');
    });
  });

  describe('compact variant', () => {
    beforeEach(() => {
      wrapper = mount(
        <ListingAnchors isCompact items={ anchorItems } />);
    });

    describe('should render', () => {
      it('a container component', () => {
        expect(wrapper).toContainMatchingElement('.listing-anchors.compact');
      });

      it('two anchor buttons', () => {
        expect(wrapper).toContainMatchingElements(anchorItems.length, 'a');
      });

      it('a selected anchor', () => {
        expect(wrapper).toContainMatchingElement('.selected');
      });
    });
  });
});

