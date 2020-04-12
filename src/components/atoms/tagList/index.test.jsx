import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TagList from './index';

import { tags, dupedTags } from 'fixtures/tags';

configure({ adapter: new Adapter() });

describe('<TagList />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TagList tags={ tags } />);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('.tag-list');
  });

  it('should render a child for each passed tag name', () => {
    expect(wrapper.text()).toBe('array, adapter, function');
  });

  describe('with duplicate tag names', () => {

    beforeEach(() => {
      wrapper = mount(<TagList tags={ dupedTags } />);
    });

    it('should render each tag name only once', () => {
      expect(wrapper.text()).toBe('array, adapter, function');
    });
  });
});

