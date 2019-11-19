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
      count: '200 snippets',
    },
    {
      name: 'My other list',
      link: { internal: true, url: '/my-other-list'},
      count: '34 snippets',
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

    it('a PageSubtitle component', () => {
      expect(wrapper).toContainMatchingElement('PageSubtitle');
    });

    it('two AnchorButton components', () => {
      expect(wrapper).toContainMatchingElements(2, 'AnchorButton');
    });
  });

  describe('with compact mode', () => {
    beforeEach(() => {
      wrapper = mount(
        <ListingAnchors items={ items } isCompact />);
    });

    it('should render with the correct className', () => {
      expect(wrapper).toContainMatchingElement('.listing-anchors.compact');
    });
  });

});

