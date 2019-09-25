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

  it('should render a child for each passed value', () => {
    console.log(wrapper);
    expect(wrapper.find('span.tag')).toHaveLength(tags.length);
  });

});

