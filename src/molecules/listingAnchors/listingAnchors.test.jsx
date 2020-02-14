import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ListingAnchors from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<ListingAnchors />', () => {
  const items = [
    {
      name: 'My list',
      link: { internal: true, url: '/my-list'},
    },
    {
      name: 'My other list',
      link: { internal: true, url: '/my-other-list'},
      selected: true,
    },
  ];
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ListingAnchors items={ items } />);
  });

  describe('should render', () => {
    it('a container component', () => {
      expect(wrapper).toContainMatchingElement('.listing-anchors');
    });

    it('two AnchorButton components', () => {
      expect(wrapper).toContainMatchingElements(2, 'AnchorButton');
    });
  });

  describe('compact variant', () => {
    beforeEach(() => {
      wrapper = mount(
        <ListingAnchors isCompact items={ items } />);
    });

    describe('should render', () => {
      it('a container component', () => {
        expect(wrapper).toContainMatchingElement('.listing-anchors.compact');
      });

      it('two AnchorButton components', () => {
        expect(wrapper).toContainMatchingElements(2, 'AnchorButton');
      });

      it('a selected anchor', () => {
        expect(wrapper).toContainMatchingElement('.selected');
      });
    });
  });
});

