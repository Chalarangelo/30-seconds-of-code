import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TagList from './index';

configure({ adapter: new Adapter() });

describe('<TagList />', () => {
  const tags = ['array', 'adapter', 'function'];
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TagList tags={ tags } />);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('div.tag-list');
  });

  it('should render a child for each passed tag name', () => {
    expect(wrapper.find('span.tag')).toHaveLength(tags.length);
  });

  describe('with duplicate tag names', () => {
    const dupedTags = ['array', 'adapter', 'array', 'function', 'function'];
    const uniqueTagLength = new Set(dupedTags).size;

    beforeEach(() => {
      wrapper = mount(<TagList tags={ dupedTags } />);
    });

    it('should render each tag name only once', () => {
      expect(wrapper.find('span.tag')).toHaveLength(uniqueTagLength);
    });
  });
});

