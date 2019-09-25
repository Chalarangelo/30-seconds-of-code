import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Tag from './index';

configure({ adapter: new Adapter() });

describe('<Tag />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Tag name='array' />);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('span.tag');
  });

});

