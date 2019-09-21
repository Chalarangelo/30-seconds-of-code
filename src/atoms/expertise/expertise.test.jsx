import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Expertise from './index';

configure({ adapter: new Adapter() });

describe('<Expertise />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Expertise />);
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('div.expertise');
  });

});

