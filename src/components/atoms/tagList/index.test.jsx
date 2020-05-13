import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TagList from './index';

import { tags } from 'fixtures/tags';

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
});

